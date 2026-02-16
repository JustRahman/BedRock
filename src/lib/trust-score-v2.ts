import { getCountryPenalty } from '@/lib/validations/onboarding'
import type { GitHubProfileData } from '@/lib/oauth/github'
import type { StripeProfileData } from '@/lib/oauth/stripe'
import type { LinkedInProfileData } from '@/lib/oauth/linkedin'

// === Input types ===

export interface TrustScoreV2Input {
  github?: GitHubProfileData | null
  stripe?: StripeProfileData | null
  linkedin?: LinkedInProfileData | null
  githubUsernameOnly?: boolean
  linkedinUrlOnly?: boolean
  identity?: {
    hasPassport?: boolean
    passportNameMatch?: boolean
    passportDobMatch?: boolean
    passportGenderMatch?: boolean
    passportNationalityMatch?: boolean
    hasLocalId?: boolean
    hasLivenessCheck?: boolean
    faceSkipped?: boolean
    hasAddressProof?: boolean
  }
  digitalPresence?: {
    websiteVerified?: boolean
    twitterVerified?: boolean
    instagramVerified?: boolean
    appStoreVerified?: boolean
  }
  network?: {
    referralVerified?: boolean
    universityEmailVerified?: boolean
    acceleratorVerified?: boolean
    hasEmployer?: boolean
  }
  hasBankStatements?: boolean
  countryOfOrigin?: string
  countryOfResidence?: string
}

// === Output types ===

export interface ProviderBreakdown {
  score: number
  max: number
  details: Record<string, string | number | boolean>
}

export type TrustStatus = 'elite' | 'approved' | 'review_needed' | 'conditional' | 'not_eligible'

export interface TrustScoreV2Result {
  score: number
  breakdown: {
    github: ProviderBreakdown
    stripe: ProviderBreakdown
    linkedin: ProviderBreakdown
    identity: ProviderBreakdown
    digital_presence: ProviderBreakdown
    network: ProviderBreakdown
  }
  country_adjustment: number
  status: TrustStatus
  risk_level: 'low' | 'medium' | 'high' | 'critical'
  recommendation: 'approve' | 'review' | 'enhanced_review' | 'deny'
  signals_connected: string[]
  improvements: string[]
}

// === Status from score (single source of truth) ===

export function getStatusFromScore(score: number): {
  status: TrustStatus
  risk_level: TrustScoreV2Result['risk_level']
  recommendation: TrustScoreV2Result['recommendation']
} {
  if (score >= 85) {
    return { status: 'elite', risk_level: 'low', recommendation: 'approve' }
  } else if (score >= 65) {
    return { status: 'approved', risk_level: 'low', recommendation: 'approve' }
  } else if (score >= 45) {
    return { status: 'review_needed', risk_level: 'medium', recommendation: 'review' }
  } else if (score >= 25) {
    return { status: 'conditional', risk_level: 'high', recommendation: 'enhanced_review' }
  } else {
    return { status: 'not_eligible', risk_level: 'critical', recommendation: 'deny' }
  }
}

// === Scoring functions ===
// Weights: GitHub 25, Stripe 25, LinkedIn 10, Identity 20, Digital Presence 10, Network 10 = 100

function scoreGitHub(data: GitHubProfileData | null | undefined, usernameOnly: boolean): ProviderBreakdown {
  if (!data) {
    return { score: 0, max: 25, details: { connected: false } }
  }

  // Account age: 0-8 pts (1pt/year, cap 8)
  const accountAge = Math.min(8, Math.floor(data.accountAgeYears))

  // Public repos: 0-5 pts (1pt per 10 repos)
  const repos = Math.min(5, Math.floor(data.publicRepos / 10))

  // Stars: 0-4 pts (1pt per 25 stars)
  const stars = Math.min(4, Math.floor(data.totalStars / 25))

  // Followers: 0-4 pts (1pt per 25 followers)
  const followers = Math.min(4, Math.floor(data.followers / 25))

  // Language diversity: 0-2 pts (1pt per 2 languages)
  const languages = Math.min(2, Math.floor(data.topLanguages.length / 2))

  // Has contributions/activity: 0-2 pts
  const activity = data.publicRepos > 0 ? 2 : 0

  let total = accountAge + repos + stars + followers + languages + activity

  // Username-only cap at 15
  if (usernameOnly) {
    total = Math.min(15, total)
  }

  return {
    score: Math.min(25, total),
    max: 25,
    details: {
      connected: !usernameOnly,
      username: data.login,
      account_age_years: data.accountAgeYears,
      repos: data.publicRepos,
      stars: data.totalStars,
      followers: data.followers,
      languages: data.topLanguages.length,
      username_only: usernameOnly,
    },
  }
}

function scoreStripe(data: StripeProfileData | null | undefined, hasBankStatements: boolean): ProviderBreakdown {
  if (!data && !hasBankStatements) {
    return { score: 0, max: 25, details: { connected: false } }
  }

  if (!data) {
    // Bank statements only = 2 pts
    return {
      score: 2,
      max: 25,
      details: { connected: false, bank_statements: true },
    }
  }

  // Account age: 0-7 pts (1pt per 3 months)
  const accountAge = Math.min(7, Math.floor(data.accountAgeMonths / 3))

  // Monthly revenue: 0-9 pts (scaled tiers)
  let revenue = 0
  if (data.monthlyRevenue >= 50000) revenue = 9
  else if (data.monthlyRevenue >= 10000) revenue = 8
  else if (data.monthlyRevenue >= 5000) revenue = 7
  else if (data.monthlyRevenue >= 1000) revenue = 5
  else if (data.monthlyRevenue > 0) revenue = 3

  // Low chargebacks: 0-5 pts
  let chargebacks = 0
  if (data.chargebackRateCategory === 'none') chargebacks = 5
  else if (data.chargebackRateCategory === 'low') chargebacks = 3
  else if (data.chargebackRateCategory === 'medium') chargebacks = 1

  // Transaction volume: 0-4 pts (1pt per 25 charges)
  const volume = Math.min(4, Math.floor(data.totalCharges / 25))

  const total = accountAge + revenue + chargebacks + volume

  return {
    score: Math.min(25, total),
    max: 25,
    details: {
      connected: true,
      monthly_revenue: data.monthlyRevenueFormatted,
      account_age_months: data.accountAgeMonths,
      chargeback_rate: `${data.chargebackRate}%`,
      total_charges: data.totalCharges,
    },
  }
}

function scoreLinkedIn(data: LinkedInProfileData | null | undefined, urlOnly: boolean): ProviderBreakdown {
  if (!data && !urlOnly) {
    return { score: 0, max: 10, details: { connected: false } }
  }

  // URL-only fallback = flat 3 pts
  if (!data && urlOnly) {
    return {
      score: 3,
      max: 10,
      details: { connected: false, url_only: true },
    }
  }

  // OAuth connected: 7 pts
  let total = 7

  // Profile has picture: 2 pts
  if (data!.picture) total += 2

  // Email verified via LinkedIn: 1 pt
  if (data!.verified && data!.email) total += 1

  return {
    score: Math.min(10, total),
    max: 10,
    details: {
      connected: true,
      has_picture: !!data!.picture,
      email_verified: !!(data!.verified && data!.email),
    },
  }
}

function scoreDigitalPresence(input: TrustScoreV2Input['digitalPresence']): ProviderBreakdown {
  if (!input) {
    return { score: 0, max: 10, details: {} }
  }

  let total = 0
  const details: Record<string, boolean> = {}

  if (input.websiteVerified) {
    total += 5
    details.website = true
  }
  if (input.twitterVerified) {
    total += 2
    details.twitter = true
  }
  if (input.instagramVerified) {
    total += 1
    details.instagram = true
  }
  if (input.appStoreVerified) {
    total += 2
    details.app_store = true
  }

  return { score: Math.min(10, total), max: 10, details }
}

function scoreNetwork(input: TrustScoreV2Input['network']): ProviderBreakdown {
  if (!input) {
    return { score: 0, max: 10, details: {} }
  }

  let total = 0
  const details: Record<string, boolean> = {}

  if (input.referralVerified) {
    total += 5
    details.referral = true
  }
  if (input.universityEmailVerified) {
    total += 2
    details.university = true
  }
  if (input.acceleratorVerified) {
    total += 2
    details.accelerator = true
  }
  if (input.hasEmployer) {
    total += 1
    details.employer = true
  }

  return { score: Math.min(10, total), max: 10, details }
}

function scoreIdentity(input: TrustScoreV2Input['identity']): ProviderBreakdown {
  if (!input) {
    return { score: 0, max: 20, details: {} }
  }

  let total = 0
  const details: Record<string, string | number | boolean> = {}

  // Passport: +2 base + up to +6 for matching fields (total 8)
  if (input.hasPassport) {
    total += 2
    details.passport = true

    const nameMatch = input.passportNameMatch ?? false
    const dobMatch = input.passportDobMatch ?? false
    const genderMatch = input.passportGenderMatch ?? false
    const nationalityMatch = input.passportNationalityMatch ?? false

    if (nameMatch) { total += 2; details.name_match = true } else { details.name_match = false }
    if (dobMatch) { total += 2; details.dob_match = true } else { details.dob_match = false }
    if (genderMatch) { total += 1; details.gender_match = true } else { details.gender_match = false }
    if (nationalityMatch) { total += 1; details.nationality_match = true } else { details.nationality_match = false }
  } else {
    details.passport = false
  }

  // Local government ID: +5
  if (input.hasLocalId) {
    total += 5
    details.local_id = true
  } else {
    details.local_id = false
  }

  // Face verification: +4 matched, -2 if skipped
  if (input.hasLivenessCheck) {
    total += 4
    details.face_verified = true
  } else if (input.faceSkipped) {
    total -= 2
    details.face_skipped = true
  } else {
    details.face_verified = false
  }

  // Address proof: +3
  if (input.hasAddressProof) {
    total += 3
    details.address_verified = true
  } else {
    details.address_verified = false
  }

  return { score: Math.max(0, Math.min(20, total)), max: 20, details }
}

// === Main scoring function ===

export function calculateTrustScoreV2(input: TrustScoreV2Input): TrustScoreV2Result {
  const github = scoreGitHub(input.github, !!input.githubUsernameOnly)
  const stripe = scoreStripe(input.stripe, !!input.hasBankStatements)
  const linkedin = scoreLinkedIn(input.linkedin, !!input.linkedinUrlOnly)
  const identity = scoreIdentity(input.identity)
  const digital_presence = scoreDigitalPresence(input.digitalPresence)
  const network = scoreNetwork(input.network)

  const signals_connected: string[] = []
  if (github.score > 0) signals_connected.push('github')
  if (stripe.score > 0) signals_connected.push('stripe')
  if (linkedin.score > 0) signals_connected.push('linkedin')
  if (identity.score > 0) signals_connected.push('identity')
  if (digital_presence.score > 0) signals_connected.push('digital_presence')
  if (network.score > 0) signals_connected.push('network')

  // Max possible: 25+25+10+20+10+10 = 100
  const rawScore = github.score + stripe.score + linkedin.score + identity.score + digital_presence.score + network.score

  // Country adjustment — use rawScore to determine penalty reduction
  const country = input.countryOfOrigin || input.countryOfResidence || ''
  let country_adjustment = 0
  if (country) {
    country_adjustment = getCountryPenalty(country)
    if (country_adjustment < 0) {
      if (rawScore >= 75) {
        country_adjustment = 0
      } else if (rawScore >= 55) {
        country_adjustment = Math.round(country_adjustment / 2)
      }
    }
  }

  const score = Math.max(0, Math.min(100, rawScore + country_adjustment))

  // Status, risk level, and recommendation from single source of truth
  const { status, risk_level, recommendation } = getStatusFromScore(score)

  // Improvement suggestions
  const improvements: string[] = []
  if (github.score === 0) {
    improvements.push('Connect GitHub for up to +25 points')
  } else if (input.githubUsernameOnly) {
    improvements.push('Connect GitHub via OAuth for full score (currently capped at 15)')
  }
  if (stripe.score === 0) {
    improvements.push('Connect Stripe for up to +25 points')
  }
  if (linkedin.score === 0) {
    improvements.push('Connect LinkedIn for up to +10 points')
  } else if (input.linkedinUrlOnly) {
    improvements.push('Connect LinkedIn via OAuth for +7 more points')
  }
  if (identity.score === 0) {
    improvements.push('Upload your passport to earn up to +20 points')
  } else if (identity.score < 20) {
    const remaining = 20 - identity.score
    improvements.push(`Complete identity verification for up to +${remaining} more points`)
  }
  if (digital_presence.score < 10) {
    const remaining = 10 - digital_presence.score
    improvements.push(`Verify more digital presence for up to +${remaining} points`)
  }
  if (network.score < 10) {
    const remaining = 10 - network.score
    improvements.push(`Add trust network signals for up to +${remaining} points`)
  }

  return {
    score,
    breakdown: { github, stripe, linkedin, identity, digital_presence, network },
    country_adjustment,
    status,
    risk_level,
    recommendation,
    signals_connected,
    improvements: improvements.slice(0, 5),
  }
}
