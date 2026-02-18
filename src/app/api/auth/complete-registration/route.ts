import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { getStatusFromScore } from '@/lib/trust-score-v2'

export async function POST(request: Request) {
  try {
    const authClient = await createClient()
    const { data: { user: authUser }, error: authError } = await authClient.auth.getUser()
    if (authError || !authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { email, fullName, phone, dateOfBirth, countryOfOrigin, countryOfResidence, trustScore, oauthVerifications, role } = body

    if (!email || !fullName) {
      return NextResponse.json({ error: 'Email and full name are required' }, { status: 400 })
    }

    const supabase = createServiceClient()

    // Use the authenticated user's ID directly
    const authUserId = authUser.id

    // Check if founder already exists
    const { data: existingFounder } = await (supabase
      .from('founders') as ReturnType<typeof supabase.from>)
      .select('id')
      .eq('user_id', authUserId)
      .single()

    if (existingFounder) {
      return NextResponse.json({ message: 'Founder already exists', founderId: (existingFounder as { id: string }).id })
    }

    // Create founder record
    const { data: founder, error: founderError } = await (supabase
      .from('founders') as ReturnType<typeof supabase.from>)
      .insert({
        user_id: authUserId,
        email,
        full_name: fullName,
        phone: phone || null,
        date_of_birth: dateOfBirth || null,
        country_of_origin: countryOfOrigin || '',
        country_of_residence: countryOfResidence || '',
        onboarding_completed: !!trustScore,
        role: role || 'founder',
      })
      .select('id')
      .single()

    if (founderError) {
      return NextResponse.json({ error: `Founder creation failed: ${founderError.message}` }, { status: 500 })
    }

    const founderId = (founder as { id: string }).id

    // Save trust score if provided (v2 format: score, breakdown.github.score, etc.)
    if (trustScore && founderId) {
      const b = trustScore.breakdown || {}
      const { status } = getStatusFromScore(trustScore.score || 0)

      const { error: tsError } = await (supabase.from('trust_scores') as ReturnType<typeof supabase.from>).insert({
        founder_id: founderId,
        total_score: trustScore.score || 0,
        identity_score: b.identity?.score || 0,
        business_score: b.stripe?.score || 0,
        financial_score: b.stripe?.score || 0,
        social_score: b.linkedin?.score || 0,
        digital_lineage_score: (b.github?.score || 0) + (b.digital_presence?.score || 0),
        network_score: b.network?.score || 0,
        country_adjustment: trustScore.country_adjustment || 0,
        status,
        score_breakdown: b,
      })

      if (tsError) {
        console.error('Trust score insert failed:', tsError.message)
      }
    }

    // Save OAuth verifications if provided
    if (oauthVerifications && founderId) {
      for (const v of oauthVerifications) {
        try {
          await (supabase.from('founder_verifications') as ReturnType<typeof supabase.from>)
            .upsert({
              founder_id: founderId,
              verification_type: v.type,
              status: 'verified',
              verified_at: new Date().toISOString(),
              metadata: v.data,
            }, { onConflict: 'founder_id,verification_type' })
        } catch {
          // Non-critical
        }
      }
    }

    return NextResponse.json({ success: true, founderId })
  } catch (err) {
    console.error('complete-registration error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
