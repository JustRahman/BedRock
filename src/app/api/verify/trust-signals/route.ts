import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/email'
import { universityVerificationEmail } from '@/lib/email-templates'
import { isKnownAccelerator } from '@/lib/accelerators'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import crypto from 'crypto'

// Stateless HMAC-based email verification (no DB table needed)
const HMAC_SECRET = process.env.SUPABASE_SERVICE_ROLE_KEY || 'fallback-secret'

function createVerificationToken(email: string, code: string, expiresAt: string): string {
  const payload = `${email.toLowerCase()}:${code}:${expiresAt}`
  return crypto.createHmac('sha256', HMAC_SECRET).update(payload).digest('hex')
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)
    const { allowed } = checkRateLimit(`verify-ts:${ip}`, 15, 60_000)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      )
    }

    const body = await request.json()
    const { type } = body

    if (!type) {
      return NextResponse.json({ error: 'Missing type' }, { status: 400 })
    }

    switch (type) {
      case 'referral': {
        const supabase = createServiceClient()
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

        // Validate email format
        const domain = email.split('@')[1]?.toLowerCase()
        if (!domain || !domain.includes('.')) {
          return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 })
        }

        // Generate 6-digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString()
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString()

        // Create HMAC token for stateless verification
        const token = createVerificationToken(email, code, expiresAt)

        // Send email
        try {
          await sendEmail(
            email,
            'Verify Your Email - BedRock',
            universityVerificationEmail(code)
          )
        } catch (emailError) {
          console.error('Failed to send verification email:', emailError)
          return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 })
        }

        return NextResponse.json({ sent: true, token, expiresAt })
      }

      case 'university-verify': {
        const { email, code, token, expiresAt } = body
        if (!email || !code || !token || !expiresAt) {
          return NextResponse.json({ error: 'Missing verification data. Please request a new code.' }, { status: 400 })
        }

        // Check expiration
        if (new Date(expiresAt) < new Date()) {
          return NextResponse.json({ error: 'Code expired. Please request a new one.' }, { status: 410 })
        }

        // Verify HMAC token
        const expectedToken = createVerificationToken(email, code.trim(), expiresAt)
        if (expectedToken !== token) {
          return NextResponse.json({ error: 'Incorrect code. Please try again.' }, { status: 400 })
        }

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
