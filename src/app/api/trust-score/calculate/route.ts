import { NextResponse } from 'next/server'
import { calculateTrustScore, TrustScoreInput } from '@/lib/trust-score'
import { createClient } from '@/lib/supabase/server'

interface FounderData {
  id: string
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate input — require all 7 sections
    if (
      !body.basicInfo ||
      !body.identity ||
      !body.codeHistory ||
      !body.professional ||
      !body.financial ||
      !body.digitalPresence ||
      !body.trustSignals
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Map form data to trust score input format
    const input: TrustScoreInput = {
      basicInfo: {
        countryOfOrigin: body.basicInfo.countryOfOrigin || '',
        countryOfResidence: body.basicInfo.countryOfResidence || '',
      },
      identity: {
        hasPassport: body.identity.hasPassport || false,
        hasLocalId: body.identity.hasLocalId || false,
        hasAddressProof: body.identity.hasAddressProof || false,
        hasLivenessCheck: body.identity.hasLivenessCheck || false,
      },
      codeHistory: {
        hasGithub: body.codeHistory.hasGithub || false,
        githubConnected: body.codeHistory.githubConnected || false,
      },
      professional: {
        hasLinkedin: body.professional.hasLinkedin || false,
        linkedinConnected: body.professional.linkedinConnected || false,
      },
      financial: {
        hasStripeConnected: body.financial.hasStripeConnected || false,
        monthlyRevenue: body.financial.monthlyRevenue || '0',
        customerGeography: body.financial.customerGeography || '',
        chargebackRate: body.financial.chargebackRate || '',
        hasBankStatements: body.financial.hasBankStatements || false,
      },
      digitalPresence: {
        website: body.digitalPresence.website || '',
        twitterHandle: body.digitalPresence.twitterHandle || '',
        otherSocialProfiles: body.digitalPresence.otherSocialProfiles || '',
        appStoreUrl: body.digitalPresence.appStoreUrl || '',
      },
      trustSignals: {
        hasReferral: body.trustSignals.hasReferral || false,
        hasUniversityEmail: body.trustSignals.hasUniversityEmail || false,
        hasAccelerator: body.trustSignals.hasAccelerator || false,
        hasEmployerVerification: body.trustSignals.hasEmployerVerification || false,
      },
    }

    // Calculate trust score
    const result = calculateTrustScore(input)

    return NextResponse.json(result)
  } catch {
    return NextResponse.json(
      { error: 'Failed to calculate trust score' },
      { status: 500 }
    )
  }
}

// Save trust score for authenticated user
export async function PUT(request: Request) {
  try {
    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get founder
    const { data: founderData } = await supabase
      .from('founders')
      .select('id')
      .eq('user_id', user.id)
      .single()

    const founder = founderData as FounderData | null

    if (!founder) {
      return NextResponse.json({ error: 'Founder not found' }, { status: 404 })
    }

    const body = await request.json()

    // Upsert trust score with new field names
    const upsertData = {
      founder_id: founder.id,
      total_score: body.totalScore,
      identity_score: body.identityScore,
      business_score: body.businessScore,
      digital_lineage_score: body.digitalLineageScore,
      network_score: body.networkScore,
      country_adjustment: body.countryAdjustment,
      status: body.status,
      score_breakdown: body.breakdown,
      version: 2,
      calculated_at: new Date().toISOString(),
    }

    const { data: trustScore, error } = await (supabase
      .from('trust_scores') as ReturnType<typeof supabase.from>)
      .upsert(upsertData, {
        onConflict: 'founder_id',
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ trustScore })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
