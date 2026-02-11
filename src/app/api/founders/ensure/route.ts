import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Auto-creates a founder record for the current authenticated user if one doesn't exist.
// Also saves trust score data if provided.
export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if founder already exists
    const { data: existingFounder } = await supabase
      .from('founders')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (existingFounder) {
      const founderId = (existingFounder as { id: string }).id

      // If trust score data is provided and no trust score exists yet, save it
      const body = await request.json().catch(() => ({}))
      if (body.trustScore) {
        const { data: existingScore } = await supabase
          .from('trust_scores')
          .select('id')
          .eq('founder_id', founderId)
          .single()

        if (!existingScore) {
          await (supabase.from('trust_scores') as ReturnType<typeof supabase.from>).insert({
            founder_id: founderId,
            total_score: body.trustScore.totalScore || 0,
            identity_score: body.trustScore.identityScore || 0,
            business_score: body.trustScore.businessScore || 0,
            digital_lineage_score: body.trustScore.digitalLineageScore || 0,
            network_score: body.trustScore.networkScore || 0,
            country_adjustment: body.trustScore.countryAdjustment || 0,
            status: body.trustScore.status || 'review_needed',
            score_breakdown: body.trustScore.breakdown || {},
            version: 2,
          })
        }
      }

      return NextResponse.json({ founder: { id: founderId }, created: false })
    }

    // Create founder record using auth metadata
    const meta = user.user_metadata || {}
    const body = await request.json().catch(() => ({}))

    const { data: founder, error: founderError } = await (supabase
      .from('founders') as ReturnType<typeof supabase.from>)
      .insert({
        user_id: user.id,
        email: user.email || '',
        full_name: meta.full_name || body.fullName || user.email?.split('@')[0] || 'User',
        phone: body.phone || null,
        country_of_origin: body.countryOfOrigin || '',
        country_of_residence: body.countryOfResidence || '',
        onboarding_completed: !!body.trustScore,
      })
      .select('id')
      .single()

    if (founderError) {
      return NextResponse.json({ error: founderError.message }, { status: 500 })
    }

    const founderId = (founder as { id: string }).id

    // Save trust score if provided
    if (body.trustScore) {
      await (supabase.from('trust_scores') as ReturnType<typeof supabase.from>).insert({
        founder_id: founderId,
        total_score: body.trustScore.totalScore || 0,
        identity_score: body.trustScore.identityScore || 0,
        business_score: body.trustScore.businessScore || 0,
        digital_lineage_score: body.trustScore.digitalLineageScore || 0,
        network_score: body.trustScore.networkScore || 0,
        country_adjustment: body.trustScore.countryAdjustment || 0,
        status: body.trustScore.status || 'review_needed',
        score_breakdown: body.trustScore.breakdown || {},
        version: 2,
      })
    }

    return NextResponse.json({ founder: { id: founderId }, created: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
