import { NextResponse } from 'next/server'
import { calculateTrustScore, TrustScoreInput } from '@/lib/trust-score'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/email'
import { trustScoreEmail } from '@/lib/email-templates'

interface FounderData {
  id: string
  email?: string
  full_name?: string
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
        faceSkipped: body.identity.faceSkipped || false,
        passportNameMatch: body.identity.passportNameMatch,
        passportDobMatch: body.identity.passportDobMatch,
        passportGenderMatch: body.identity.passportGenderMatch,
        passportNationalityMatch: body.identity.passportNationalityMatch,
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
        websiteVerified: body.digitalPresence.websiteVerified || false,
        twitterHandle: body.digitalPresence.twitterHandle || '',
        twitterVerified: body.digitalPresence.twitterVerified || false,
        instagramHandle: body.digitalPresence.instagramHandle || '',
        instagramVerified: body.digitalPresence.instagramVerified || false,
        appStoreUrl: body.digitalPresence.appStoreUrl || '',
        appStoreVerified: body.digitalPresence.appStoreVerified || false,
      },
      trustSignals: {
        hasReferral: body.trustSignals.hasReferral || false,
        referralVerified: body.trustSignals.referralVerified || false,
        hasUniversityEmail: body.trustSignals.hasUniversityEmail || false,
        universityEmailVerified: body.trustSignals.universityEmailVerified || false,
        hasAccelerator: body.trustSignals.hasAccelerator || false,
        acceleratorVerified: body.trustSignals.acceleratorVerified || false,
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
    const authClient = await createClient()
    const supabase = createServiceClient()

    // Get current user
    const { data: { user }, error: userError } = await authClient.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get founder
    const { data: founderData } = await supabase
      .from('founders')
      .select('id, email, full_name')
      .eq('user_id', user.id)
      .single()

    const founder = founderData as FounderData | null

    if (!founder) {
      return NextResponse.json({ error: 'Founder not found' }, { status: 404 })
    }

    const body = await request.json()

    // Upsert trust score — use actual DB column names
    const upsertData = {
      founder_id: founder.id,
      total_score: body.totalScore,
      identity_score: body.identityScore,
      business_score: body.businessScore,
      financial_score: body.businessScore || 0,
      social_score: body.networkScore || 0,
      country_adjustment: body.countryAdjustment || 0,
      status: body.status,
      score_breakdown: body.breakdown,
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

    // Send trust score email (non-blocking)
    if (founder?.email && founder?.full_name) {
      try {
        await sendEmail(
          founder.email,
          'Your Trust Score is Ready - BedRock',
          trustScoreEmail(founder.full_name, body.totalScore, body.status)
        )
      } catch {
        // Non-critical
      }
    }

    return NextResponse.json({ trustScore })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
