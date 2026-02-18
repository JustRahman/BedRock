import { createServiceClient } from '@/lib/supabase/server'
import { calculateTrustScoreV2, TrustScoreV2Input, getStatusFromScore } from '@/lib/trust-score-v2'
import type { GitHubProfileData } from '@/lib/oauth/github'
import type { StripeProfileData } from '@/lib/oauth/stripe'
import type { LinkedInProfileData } from '@/lib/oauth/linkedin'
import type { CryptoWalletScoreBreakdown } from '@/lib/crypto/types'

interface VerificationRow {
  verification_type: string
  status: string
  metadata: Record<string, unknown> | null
}

interface FounderInfo {
  id: string
  country_of_origin?: string
  country_of_residence?: string
}

/**
 * Recalculate trust score for a founder from their stored verifications.
 * Call this directly — no HTTP fetch needed.
 */
export async function recalculateTrustScore(founder: FounderInfo) {
  const supabase = createServiceClient()

  const { data: verifications } = await supabase
    .from('founder_verifications')
    .select('verification_type, status, metadata')
    .eq('founder_id', founder.id)

  const verifs = (verifications || []) as VerificationRow[]

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
    } else if (v.verification_type === 'digital_presence' && meta) {
      const dp = meta as Record<string, unknown>
      v2Input.digitalPresence = {
        websiteVerified: !!dp.websiteVerified,
        appStoreVerified: !!dp.appStoreVerified,
      }
    } else if (v.verification_type === 'referral' && meta) {
      if (!v2Input.network) v2Input.network = { referralVerified: false, universityEmailVerified: false, acceleratorVerified: false, hasEmployer: false }
      v2Input.network.referralVerified = !!(meta as Record<string, unknown>).referralVerified
    } else if (v.verification_type === 'university_email' && meta) {
      if (!v2Input.network) v2Input.network = { referralVerified: false, universityEmailVerified: false, acceleratorVerified: false, hasEmployer: false }
      v2Input.network.universityEmailVerified = !!(meta as Record<string, unknown>).verified
    } else if (v.verification_type === 'accelerator' && meta) {
      if (!v2Input.network) v2Input.network = { referralVerified: false, universityEmailVerified: false, acceleratorVerified: false, hasEmployer: false }
      v2Input.network.acceleratorVerified = !!(meta as Record<string, unknown>).verified
    } else if (v.verification_type === 'employer_verification') {
      if (!v2Input.network) v2Input.network = { referralVerified: false, universityEmailVerified: false, acceleratorVerified: false, hasEmployer: false }
      v2Input.network.hasEmployer = true
    }
  }

  const result = calculateTrustScoreV2(v2Input)
  const { status } = getStatusFromScore(result.score)

  const { error } = await (supabase
    .from('trust_scores') as ReturnType<typeof supabase.from>)
    .upsert({
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
    }, { onConflict: 'founder_id' })

  if (error) {
    console.error('[recalculate] Trust score upsert failed:', error.message)
  }

  return { result, status, error }
}
