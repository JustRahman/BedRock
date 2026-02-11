import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, fullName, phone, countryOfOrigin, countryOfResidence, trustScore, oauthVerifications } = body

    if (!email || !fullName) {
      return NextResponse.json({ error: 'Email and full name are required' }, { status: 400 })
    }

    const supabase = await createServiceClient()

    // Verify the user actually exists in auth.users
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()
    if (listError) {
      return NextResponse.json({ error: 'Failed to verify user' }, { status: 500 })
    }

    const authUser = users.find((u) => u.email === email)
    if (!authUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check user was created recently (within 10 minutes) to prevent abuse
    const createdAt = new Date(authUser.created_at)
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000)
    if (createdAt < tenMinutesAgo) {
      // User exists but wasn't just created — check if founder already exists
      const { data: existingFounder } = await (supabase
        .from('founders') as ReturnType<typeof supabase.from>)
        .select('id')
        .eq('user_id', authUser.id)
        .single()

      if (existingFounder) {
        return NextResponse.json({ message: 'Founder already exists' })
      }
    }

    // Check if founder already exists
    const { data: existingFounder } = await (supabase
      .from('founders') as ReturnType<typeof supabase.from>)
      .select('id')
      .eq('user_id', authUser.id)
      .single()

    if (existingFounder) {
      return NextResponse.json({ message: 'Founder already exists' })
    }

    // Create founder record
    const { data: founder, error: founderError } = await (supabase
      .from('founders') as ReturnType<typeof supabase.from>)
      .insert({
        user_id: authUser.id,
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
      return NextResponse.json({ error: founderError.message }, { status: 500 })
    }

    const founderId = (founder as { id: string }).id

    // Save trust score if provided
    if (trustScore && founderId) {
      await (supabase.from('trust_scores') as ReturnType<typeof supabase.from>).insert({
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
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
