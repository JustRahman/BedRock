import { NextResponse } from 'next/server'
import { calculateTrustScoreV2, TrustScoreV2Input, getStatusFromScore } from '@/lib/trust-score-v2'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/email'
import { trustScoreEmail } from '@/lib/email-templates'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import type { GitHubProfileData } from '@/lib/oauth/github'
import type { StripeProfileData } from '@/lib/oauth/stripe'
import type { LinkedInProfileData } from '@/lib/oauth/linkedin'
import type { CryptoWalletScoreBreakdown } from '@/lib/crypto/types'

interface FounderData {
  id: string
  email?: string
  full_name?: string
  country_of_origin?: string
  country_of_residence?: string
}

interface VerificationRow {
  verification_type: string
  status: string
  metadata: Record<string, unknown> | null
}

// POST — Calculate trust score from form data (v2 engine)
export async function POST(request: Request) {
  // Rate limit: 10 req/min per IP
  const ip = getClientIp(request)
  const { allowed, resetIn } = checkRateLimit(`trust-score-calc:${ip}`, 10, 60_000)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(resetIn / 1000)) } }
    )
  }

  try {
    const body = await request.json()

    // Build v2 input from form data
    const v2Input: TrustScoreV2Input = {}

    // Identity
    if (body.identity) {
      v2Input.identity = {
        hasPassport: body.identity.hasPassport || false,
        passportNameMatch: body.identity.passportNameMatch,
        passportDobMatch: body.identity.passportDobMatch,
        passportGenderMatch: body.identity.passportGenderMatch,
        passportNationalityMatch: body.identity.passportNationalityMatch,
        hasLocalId: body.identity.hasLocalId || false,
        hasLivenessCheck: body.identity.hasLivenessCheck || false,
        faceSkipped: body.identity.faceSkipped || false,
        hasAddressProof: body.identity.hasAddressProof || false,
      }
    }

    // GitHub — use OAuth profile data if available, otherwise form-based
    if (body.oauthData?.github) {
      v2Input.github = body.oauthData.github as GitHubProfileData
    } else if (body.codeHistory?.hasGithub) {
      v2Input.githubUsernameOnly = !body.codeHistory.githubConnected
    }

    // LinkedIn — use OAuth profile data if available, otherwise form-based
    if (body.oauthData?.linkedin) {
      v2Input.linkedin = body.oauthData.linkedin as LinkedInProfileData
    } else if (body.professional?.hasLinkedin) {
      v2Input.linkedinUrlOnly = !body.professional.linkedinConnected
    }

    // Stripe — use OAuth profile data if available (maps into economicActivity)
    if (body.oauthData?.stripe) {
      if (!v2Input.economicActivity) v2Input.economicActivity = {}
      v2Input.economicActivity.stripe = body.oauthData.stripe as StripeProfileData
    }

    // Digital presence
    if (body.digitalPresence) {
      v2Input.digitalPresence = {
        websiteVerified: body.digitalPresence.websiteVerified || false,
        appStoreVerified: body.digitalPresence.appStoreVerified || false,
      }
    }

    // Network / trust signals
    if (body.trustSignals) {
      v2Input.network = {
        referralVerified: body.trustSignals.referralVerified || false,
        universityEmailVerified: body.trustSignals.universityEmailVerified || false,
        acceleratorVerified: body.trustSignals.acceleratorVerified || false,
        hasEmployer: body.trustSignals.hasEmployerVerification || false,
      }
    }

    // Country
    if (body.basicInfo) {
      v2Input.countryOfOrigin = body.basicInfo.countryOfOrigin || undefined
      v2Input.countryOfResidence = body.basicInfo.countryOfResidence || undefined
    }

    const result = calculateTrustScoreV2(v2Input)

    return NextResponse.json(result)
  } catch {
    return NextResponse.json(
      { error: 'Failed to calculate trust score' },
      { status: 500 }
    )
  }
}

// Save trust score for authenticated user — uses v2 engine with OAuth data
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
      .select('id, email, full_name, country_of_origin, country_of_residence')
      .eq('user_id', user.id)
      .single()

    const founder = founderData as FounderData | null

    if (!founder) {
      return NextResponse.json({ error: 'Founder not found' }, { status: 404 })
    }

    // Read OAuth verifications from founder_verifications
    const { data: verifications } = await supabase
      .from('founder_verifications')
      .select('verification_type, status, metadata')
      .eq('founder_id', founder.id)

    const verifs = (verifications || []) as VerificationRow[]

    // Build v2 input from verification metadata
    const v2Input: TrustScoreV2Input = {
      countryOfOrigin: founder.country_of_origin,
      countryOfResidence: founder.country_of_residence,
    }

    for (const v of verifs) {
      if (v.status !== 'verified' && v.status !== 'pending') continue
      const meta = v.metadata

      if (v.verification_type === 'github' && meta) {
        v2Input.github = meta as unknown as GitHubProfileData
        v2Input.githubUsernameOnly = false
      } else if (v.verification_type === 'github_username' && meta) {
        v2Input.github = meta as unknown as GitHubProfileData
        v2Input.githubUsernameOnly = true
      } else if (v.verification_type === 'stripe' && meta) {
        if (!v2Input.economicActivity) v2Input.economicActivity = {}
        v2Input.economicActivity.stripe = meta as unknown as StripeProfileData
      } else if (v.verification_type === 'crypto_wallet' && meta) {
        if (!v2Input.economicActivity) v2Input.economicActivity = {}
        const profileData = meta as Record<string, unknown>
        v2Input.economicActivity.crypto = profileData.score as unknown as CryptoWalletScoreBreakdown
      } else if (v.verification_type === 'payment_verified') {
        if (!v2Input.economicActivity) v2Input.economicActivity = {}
        v2Input.economicActivity.paymentVerified = true
      } else if (v.verification_type === 'linkedin' && meta) {
        v2Input.linkedin = meta as unknown as LinkedInProfileData
        v2Input.linkedinUrlOnly = false
      } else if (v.verification_type === 'linkedin_url') {
        v2Input.linkedinUrlOnly = true
      } else if (v.verification_type === 'passport' && meta) {
        if (!v2Input.identity) v2Input.identity = {}
        v2Input.identity.hasPassport = true
        v2Input.identity.passportNameMatch = (meta as Record<string, unknown>).passportNameMatch as boolean | undefined
        v2Input.identity.passportDobMatch = (meta as Record<string, unknown>).passportDobMatch as boolean | undefined
        v2Input.identity.passportGenderMatch = (meta as Record<string, unknown>).passportGenderMatch as boolean | undefined
        v2Input.identity.passportNationalityMatch = (meta as Record<string, unknown>).passportNationalityMatch as boolean | undefined
      } else if (v.verification_type === 'local_id') {
        if (!v2Input.identity) v2Input.identity = {}
        v2Input.identity.hasLocalId = true
      } else if (v.verification_type === 'face_scan') {
        if (!v2Input.identity) v2Input.identity = {}
        v2Input.identity.hasLivenessCheck = true
      } else if (v.verification_type === 'address_proof') {
        if (!v2Input.identity) v2Input.identity = {}
        v2Input.identity.hasAddressProof = true
      }
    }

    // Also read the request body for non-OAuth signals
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any = {}
    try {
      body = await request.json()
    } catch {
      // Empty body is fine for recalculation triggers
    }

    if (body.identity) {
      v2Input.identity = {
        ...v2Input.identity,
        hasPassport: body.identity.hasPassport || v2Input.identity?.hasPassport || false,
        hasLocalId: body.identity.hasLocalId || v2Input.identity?.hasLocalId || false,
        hasLivenessCheck: body.identity.hasLivenessCheck || v2Input.identity?.hasLivenessCheck || false,
        faceSkipped: body.identity.faceSkipped || false,
        hasAddressProof: body.identity.hasAddressProof || v2Input.identity?.hasAddressProof || false,
      }
    }

    if (body.digitalPresence) {
      v2Input.digitalPresence = {
        websiteVerified: body.digitalPresence.websiteVerified || false,
        appStoreVerified: body.digitalPresence.appStoreVerified || false,
      }
    }

    if (body.trustSignals) {
      v2Input.network = {
        referralVerified: body.trustSignals.referralVerified || false,
        universityEmailVerified: body.trustSignals.universityEmailVerified || false,
        acceleratorVerified: body.trustSignals.acceleratorVerified || false,
        hasEmployer: body.trustSignals.hasEmployerVerification || false,
      }
    }

    v2Input.hasBankStatements = body.financial?.hasBankStatements || false

    // Calculate v2 score
    const result = calculateTrustScoreV2(v2Input)

    // Use single source of truth for status
    const { status } = getStatusFromScore(result.score)

    // Check if existing trust score exists (for email spam prevention)
    const { data: existingScore } = await supabase
      .from('trust_scores')
      .select('id, status')
      .eq('founder_id', founder.id)
      .single()

    const previousStatus = (existingScore as { id: string; status: string } | null)?.status

    // Upsert trust score with correct DB column mapping
    const upsertData = {
      founder_id: founder.id,
      total_score: result.score,
      identity_score: result.breakdown.identity.score,
      business_score: result.breakdown.economic_activity.score,
      financial_score: result.breakdown.economic_activity.score,
      social_score: result.breakdown.linkedin.score,
      digital_lineage_score: result.breakdown.github.score + result.breakdown.digital_presence.score,
      network_score: result.breakdown.network.score,
      country_adjustment: result.country_adjustment,
      status,
      score_breakdown: result.breakdown as unknown as Record<string, unknown>,
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

    // Only send email if: no previous score OR status changed
    if (founder?.email && founder?.full_name) {
      if (!previousStatus || previousStatus !== status) {
        try {
          await sendEmail(
            founder.email,
            'Your Trust Score is Ready - BedRock',
            trustScoreEmail(founder.full_name, result.score, status)
          )
        } catch {
          // Non-critical
        }
      }
    }

    return NextResponse.json({
      trustScore,
      v2: result,
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
