import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, email, fullName, phone, countryOfOrigin, countryOfResidence, trustScore, oauthVerifications } = body

    if (!email || !fullName) {
      return NextResponse.json({ error: 'Email and full name are required' }, { status: 400 })
    }

    const supabase = await createServiceClient()

    // Find the auth user — prefer userId if provided, otherwise look up by email
    let authUserId = userId

    if (authUserId) {
      // Verify the user exists
      const { data: { user }, error } = await supabase.auth.admin.getUserById(authUserId)
      if (error || !user) {
        authUserId = null // Fall through to email lookup
      }
    }

    if (!authUserId) {
      // Fallback: find user by email using admin API with page size 1
      const { data: { users } } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 })
      const authUser = users?.find((u) => u.email === email)
      if (!authUser) {
        return NextResponse.json({ error: 'User not found in auth' }, { status: 404 })
      }
      authUserId = authUser.id
    }

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
        country_of_origin: countryOfOrigin || '',
        country_of_residence: countryOfResidence || '',
        onboarding_completed: !!trustScore,
      })
      .select('id')
      .single()

    if (founderError) {
      return NextResponse.json({ error: `Founder creation failed: ${founderError.message}` }, { status: 500 })
    }

    const founderId = (founder as { id: string }).id

    // Save trust score if provided
    if (trustScore && founderId) {
      const { error: tsError } = await (supabase.from('trust_scores') as ReturnType<typeof supabase.from>).insert({
        founder_id: founderId,
        total_score: trustScore.totalScore || 0,
        identity_score: trustScore.identityScore || 0,
        business_score: trustScore.businessScore || 0,
        digital_lineage_score: trustScore.digitalLineageScore || 0,
        network_score: trustScore.networkScore || 0,
        country_adjustment: trustScore.countryAdjustment || 0,
        status: trustScore.status || 'review_needed',
        score_breakdown: trustScore.breakdown || {},
        version: 2,
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
