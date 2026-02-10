import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/email'
import { universityVerificationEmail } from '@/lib/email-templates'
import { isKnownAccelerator } from '@/lib/accelerators'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type } = body

    if (!type) {
      return NextResponse.json({ error: 'Missing type' }, { status: 400 })
    }

    const supabase = await createServiceClient()

    switch (type) {
      case 'referral': {
        const { code } = body
        if (!code || typeof code !== 'string') {
          return NextResponse.json({ error: 'Missing referral code' }, { status: 400 })
        }

        const { data: referral, error } = await (supabase
          .from('referral_codes') as ReturnType<typeof supabase.from>)
          .select('*')
          .eq('code', code.trim().toUpperCase())
          .single()

        if (error || !referral) {
          return NextResponse.json({ error: 'Invalid referral code' }, { status: 404 })
        }

        const ref = referral as { is_active: boolean; times_used: number; max_uses: number; founder_name: string; code: string }

        if (!ref.is_active) {
          return NextResponse.json({ error: 'This referral code is no longer active' }, { status: 400 })
        }

        if (ref.times_used >= ref.max_uses) {
          return NextResponse.json({ error: 'This referral code has reached its usage limit' }, { status: 400 })
        }

        return NextResponse.json({
          valid: true,
          referrerName: ref.founder_name,
          code: ref.code,
        })
      }

      case 'university-send': {
        const { email } = body
        if (!email || typeof email !== 'string') {
          return NextResponse.json({ error: 'Missing email' }, { status: 400 })
        }

        // Validate .edu domain
        const domain = email.split('@')[1]?.toLowerCase()
        if (!domain || !domain.endsWith('.edu')) {
          return NextResponse.json({ error: 'Please use a .edu email address' }, { status: 400 })
        }

        // Generate 6-digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString()
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString()

        // Delete any existing codes for this email
        await (supabase
          .from('university_verification_codes') as ReturnType<typeof supabase.from>)
          .delete()
          .eq('email', email.toLowerCase())

        // Store new code
        const { error: insertError } = await (supabase
          .from('university_verification_codes') as ReturnType<typeof supabase.from>)
          .insert({
            email: email.toLowerCase(),
            code,
            verified: false,
            attempts: 0,
            expires_at: expiresAt,
          })

        if (insertError) {
          console.error('Failed to store verification code:', insertError)
          return NextResponse.json({ error: 'Failed to send code' }, { status: 500 })
        }

        // Send email
        try {
          await sendEmail(
            email,
            'Verify Your University Email - BedRock',
            universityVerificationEmail(code)
          )
        } catch (emailError) {
          console.error('Failed to send verification email:', emailError)
          return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 })
        }

        return NextResponse.json({ sent: true })
      }

      case 'university-verify': {
        const { email, code } = body
        if (!email || !code) {
          return NextResponse.json({ error: 'Missing email or code' }, { status: 400 })
        }

        const { data: record, error } = await (supabase
          .from('university_verification_codes') as ReturnType<typeof supabase.from>)
          .select('*')
          .eq('email', email.toLowerCase())
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (error || !record) {
          return NextResponse.json({ error: 'No verification code found. Please request a new one.' }, { status: 404 })
        }

        const rec = record as { id: string; code: string; verified: boolean; attempts: number; expires_at: string }

        if (rec.verified) {
          return NextResponse.json({ verified: true })
        }

        if (rec.attempts >= 3) {
          return NextResponse.json({ error: 'Too many attempts. Please request a new code.' }, { status: 429 })
        }

        if (new Date(rec.expires_at) < new Date()) {
          return NextResponse.json({ error: 'Code expired. Please request a new one.' }, { status: 410 })
        }

        // Increment attempts
        await (supabase
          .from('university_verification_codes') as ReturnType<typeof supabase.from>)
          .update({ attempts: rec.attempts + 1 })
          .eq('id', rec.id)

        if (rec.code !== code.trim()) {
          const remaining = 2 - rec.attempts
          return NextResponse.json(
            { error: `Incorrect code. ${remaining > 0 ? `${remaining} attempt${remaining === 1 ? '' : 's'} remaining.` : 'Please request a new code.'}` },
            { status: 400 }
          )
        }

        // Mark as verified
        await (supabase
          .from('university_verification_codes') as ReturnType<typeof supabase.from>)
          .update({ verified: true })
          .eq('id', rec.id)

        return NextResponse.json({ verified: true })
      }

      case 'accelerator': {
        const { name } = body
        if (!name || typeof name !== 'string') {
          return NextResponse.json({ error: 'Missing accelerator name' }, { status: 400 })
        }

        const known = isKnownAccelerator(name.trim())
        return NextResponse.json({
          name: name.trim(),
          isKnown: known,
          status: known ? 'verified' : 'unverified',
        })
      }

      default:
        return NextResponse.json({ error: 'Unknown verification type' }, { status: 400 })
    }
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
