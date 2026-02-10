import { getCountryPenalty } from '@/lib/validations/onboarding'

export interface TrustScoreInput {
  basicInfo: {
    countryOfOrigin: string
    countryOfResidence: string
  }
  identity: {
    hasPassport: boolean
    hasLocalId: boolean
    hasAddressProof: boolean
    hasLivenessCheck?: boolean
  }
  codeHistory: {
    hasGithub: boolean
    githubConnected?: boolean
  }
  professional: {
    hasLinkedin: boolean
    linkedinConnected?: boolean
  }
  financial: {
    hasStripeConnected: boolean
    monthlyRevenue?: string
    customerGeography?: string
    chargebackRate?: string
    hasBankStatements: boolean
  }
  digitalPresence: {
    website?: string
    websiteVerified?: boolean
    twitterHandle?: string
    twitterVerified?: boolean
    instagramHandle?: string
    instagramVerified?: boolean
    appStoreUrl?: string
    appStoreVerified?: boolean
  }
  trustSignals: {
    hasReferral: boolean
    referralVerified?: boolean
    hasUniversityEmail: boolean
    universityEmailVerified?: boolean
    hasAccelerator: boolean
    acceleratorVerified?: boolean
    hasEmployerVerification: boolean
  }
}

export interface ScoreBreakdown {
  digitalLineage: {
    total: number
    max: number
    codeHistory: {
      total: number
      max: number
      items: { name: string; points: number; earned: boolean }[]
    }
    professionalGraph: {
      total: number
      max: number
      items: { name: string; points: number; earned: boolean }[]
    }
    digitalPresence: {
      total: number
      max: number
      items: { name: string; points: number; earned: boolean }[]
    }
  }
  business: {
    total: number
    max: number
    items: { name: string; points: number; earned: boolean }[]
  }
  identity: {
    total: number
    max: number
    items: { name: string; points: number; earned: boolean }[]
  }
  network: {
    total: number
    max: number
    items: { name: string; points: number; earned: boolean }[]
  }
}

export interface TrustScoreResult {
  totalScore: number
  digitalLineageScore: number
  businessScore: number
  identityScore: number
  networkScore: number
  countryAdjustment: number
  status: 'elite' | 'approved' | 'review_needed' | 'conditional' | 'not_eligible'
  statusLabel: string
  statusDescription: string
  breakdown: ScoreBreakdown
  improvements: string[]
}

export function calculateTrustScore(input: TrustScoreInput): TrustScoreResult {
  const breakdown: ScoreBreakdown = {
    digitalLineage: {
      total: 0,
      max: 40,
      codeHistory: { total: 0, max: 15, items: [] },
      professionalGraph: { total: 0, max: 15, items: [] },
      digitalPresence: { total: 0, max: 10, items: [] },
    },
    business: { total: 0, max: 25, items: [] },
    identity: { total: 0, max: 20, items: [] },
    network: { total: 0, max: 15, items: [] },
  }

  const improvements: string[] = []

  // === DIGITAL LINEAGE (40 pts) ===

  // Code History (15 pts)
  if (input.codeHistory.hasGithub) {
    if (input.codeHistory.githubConnected) {
      breakdown.digitalLineage.codeHistory.items.push({ name: 'GitHub Connected (OAuth)', points: 15, earned: true })
      breakdown.digitalLineage.codeHistory.total += 15
    } else {
      breakdown.digitalLineage.codeHistory.items.push({ name: 'GitHub Username Provided', points: 10, earned: true })
      breakdown.digitalLineage.codeHistory.total += 10
      improvements.push('Connect GitHub via OAuth for +5 more points')
    }
  } else {
    breakdown.digitalLineage.codeHistory.items.push({ name: 'GitHub Profile', points: 15, earned: false })
    improvements.push('Connect your GitHub profile to earn up to +15 points')
  }

  // Professional Graph (15 pts)
  if (input.professional.hasLinkedin) {
    if (input.professional.linkedinConnected) {
      breakdown.digitalLineage.professionalGraph.items.push({ name: 'LinkedIn Connected (OAuth)', points: 15, earned: true })
      breakdown.digitalLineage.professionalGraph.total += 15
    } else {
      breakdown.digitalLineage.professionalGraph.items.push({ name: 'LinkedIn URL Provided', points: 10, earned: true })
      breakdown.digitalLineage.professionalGraph.total += 10
      improvements.push('Connect LinkedIn via OAuth for +5 more points')
    }
  } else {
    breakdown.digitalLineage.professionalGraph.items.push({ name: 'LinkedIn Profile', points: 15, earned: false })
    improvements.push('Connect your LinkedIn profile to earn up to +15 points')
  }

  // Digital Presence (10 pts)
  // Website: +3 provided, +5 verified (max 5 total for website)
  const hasWebsite = input.digitalPresence.website && input.digitalPresence.website.length > 0
  if (hasWebsite && input.digitalPresence.websiteVerified) {
    breakdown.digitalLineage.digitalPresence.items.push({ name: 'Website Verified', points: 5, earned: true })
    breakdown.digitalLineage.digitalPresence.total += 5
  } else if (hasWebsite) {
    breakdown.digitalLineage.digitalPresence.items.push({ name: 'Website URL', points: 3, earned: true })
    breakdown.digitalLineage.digitalPresence.total += 3
    improvements.push('Verify your website to earn +2 more points')
  } else {
    breakdown.digitalLineage.digitalPresence.items.push({ name: 'Website Verified', points: 5, earned: false })
    improvements.push('Add and verify your website URL to earn up to +5 points')
  }

  // Twitter: +1 provided, +2 valid format (max 2 total)
  const hasTwitter = input.digitalPresence.twitterHandle && input.digitalPresence.twitterHandle.length > 0
  if (hasTwitter && input.digitalPresence.twitterVerified) {
    breakdown.digitalLineage.digitalPresence.items.push({ name: 'Twitter/X Verified', points: 2, earned: true })
    breakdown.digitalLineage.digitalPresence.total += 2
  } else if (hasTwitter) {
    breakdown.digitalLineage.digitalPresence.items.push({ name: 'Twitter/X Handle', points: 1, earned: true })
    breakdown.digitalLineage.digitalPresence.total += 1
  } else {
    breakdown.digitalLineage.digitalPresence.items.push({ name: 'Twitter/X Handle', points: 2, earned: false })
  }

  // Instagram: +1 if valid
  const hasInstagram = input.digitalPresence.instagramHandle && input.digitalPresence.instagramHandle.length > 0
  if (hasInstagram && input.digitalPresence.instagramVerified) {
    breakdown.digitalLineage.digitalPresence.items.push({ name: 'Instagram Verified', points: 1, earned: true })
    breakdown.digitalLineage.digitalPresence.total += 1
  } else {
    breakdown.digitalLineage.digitalPresence.items.push({ name: 'Instagram Handle', points: 1, earned: false })
  }

  // App Store: +2 if found
  const hasAppStore = input.digitalPresence.appStoreUrl && input.digitalPresence.appStoreUrl.length > 0
  if (hasAppStore && input.digitalPresence.appStoreVerified) {
    breakdown.digitalLineage.digitalPresence.items.push({ name: 'App Store App', points: 2, earned: true })
    breakdown.digitalLineage.digitalPresence.total += 2
  } else {
    breakdown.digitalLineage.digitalPresence.items.push({ name: 'App Store App', points: 2, earned: false })
  }

  // Calculate Digital Lineage total
  breakdown.digitalLineage.total =
    breakdown.digitalLineage.codeHistory.total +
    breakdown.digitalLineage.professionalGraph.total +
    breakdown.digitalLineage.digitalPresence.total

  // === BUSINESS SIGNALS (25 pts) ===

  // Revenue existence: +10
  const hasRevenue = input.financial.monthlyRevenue && input.financial.monthlyRevenue !== '0'
  if (hasRevenue) {
    breakdown.business.items.push({ name: 'Has Revenue', points: 10, earned: true })
    breakdown.business.total += 10
  } else {
    breakdown.business.items.push({ name: 'Has Revenue', points: 10, earned: false })
    improvements.push('Show revenue to earn +10 points')
  }

  // Revenue > $1k/month: +5
  const highRevenueValues = ['1000-5000', '5000-10000', '10000-50000', '50000+']
  if (input.financial.monthlyRevenue && highRevenueValues.includes(input.financial.monthlyRevenue)) {
    breakdown.business.items.push({ name: 'Revenue > $1,000/mo', points: 5, earned: true })
    breakdown.business.total += 5
  } else {
    breakdown.business.items.push({ name: 'Revenue > $1,000/mo', points: 5, earned: false })
  }

  // Customer geography (US/EU = +5)
  if (input.financial.customerGeography === 'us_eu') {
    breakdown.business.items.push({ name: 'US/EU Customers', points: 5, earned: true })
    breakdown.business.total += 5
  } else if (input.financial.customerGeography === 'mixed') {
    breakdown.business.items.push({ name: 'Mixed Geography Customers', points: 3, earned: true })
    breakdown.business.total += 3
  } else {
    breakdown.business.items.push({ name: 'US/EU Customers', points: 5, earned: false })
  }

  // Low chargeback rate: +3
  if (input.financial.chargebackRate === 'none' || input.financial.chargebackRate === 'low') {
    breakdown.business.items.push({ name: 'Low Chargeback Rate', points: 3, earned: true })
    breakdown.business.total += 3
  } else {
    breakdown.business.items.push({ name: 'Low Chargeback Rate', points: 3, earned: false })
  }

  // Bank statements / Stripe: +2
  if (input.financial.hasStripeConnected || input.financial.hasBankStatements) {
    breakdown.business.items.push({ name: 'Financial Documentation', points: 2, earned: true })
    breakdown.business.total += 2
  } else {
    breakdown.business.items.push({ name: 'Financial Documentation', points: 2, earned: false })
    improvements.push('Connect Stripe or upload bank statements to earn +2 points')
  }

  // === IDENTITY VERIFICATION (20 pts) ===

  // Passport: +8
  if (input.identity.hasPassport) {
    breakdown.identity.items.push({ name: 'Passport Verified', points: 8, earned: true })
    breakdown.identity.total += 8
  } else {
    breakdown.identity.items.push({ name: 'Passport Verified', points: 8, earned: false })
    improvements.push('Upload your passport to earn +8 points')
  }

  // Local ID: +5
  if (input.identity.hasLocalId) {
    breakdown.identity.items.push({ name: 'Local Government ID', points: 5, earned: true })
    breakdown.identity.total += 5
  } else {
    breakdown.identity.items.push({ name: 'Local Government ID', points: 5, earned: false })
    improvements.push('Upload a local ID to earn +5 points')
  }

  // Liveness check: +4
  if (input.identity.hasLivenessCheck) {
    breakdown.identity.items.push({ name: 'Liveness Check', points: 4, earned: true })
    breakdown.identity.total += 4
  } else {
    breakdown.identity.items.push({ name: 'Liveness Check', points: 4, earned: false })
  }

  // Address proof: +3
  if (input.identity.hasAddressProof) {
    breakdown.identity.items.push({ name: 'Address Verified', points: 3, earned: true })
    breakdown.identity.total += 3
  } else {
    breakdown.identity.items.push({ name: 'Address Verified', points: 3, earned: false })
  }

  // === TRUST NETWORK (15 pts) ===

  // Referral: verified +10, unverified +3
  if (input.trustSignals.hasReferral) {
    if (input.trustSignals.referralVerified) {
      breakdown.network.items.push({ name: 'Verified Founder Referral', points: 10, earned: true })
      breakdown.network.total += 10
    } else {
      breakdown.network.items.push({ name: 'Referral (unverified)', points: 3, earned: true })
      breakdown.network.total += 3
      improvements.push('Verify your referral code to earn +7 more points')
    }
  } else {
    breakdown.network.items.push({ name: 'Verified Founder Referral', points: 10, earned: false })
    improvements.push('Get a referral from a verified BedRock founder to earn +10 points')
  }

  // University email: verified +3, unverified +1
  if (input.trustSignals.hasUniversityEmail) {
    if (input.trustSignals.universityEmailVerified) {
      breakdown.network.items.push({ name: 'University Email (verified)', points: 3, earned: true })
      breakdown.network.total += 3
    } else {
      breakdown.network.items.push({ name: 'University Email (unverified)', points: 1, earned: true })
      breakdown.network.total += 1
      improvements.push('Verify your university email to earn +2 more points')
    }
  } else {
    breakdown.network.items.push({ name: 'University Email', points: 3, earned: false })
  }

  // Accelerator: verified +5, unverified +2
  if (input.trustSignals.hasAccelerator) {
    if (input.trustSignals.acceleratorVerified) {
      breakdown.network.items.push({ name: 'Accelerator (verified)', points: 5, earned: true })
      breakdown.network.total += 5
    } else {
      breakdown.network.items.push({ name: 'Accelerator (unverified)', points: 2, earned: true })
      breakdown.network.total += 2
    }
  } else {
    breakdown.network.items.push({ name: 'Accelerator Affiliation', points: 5, earned: false })
  }

  // Employer: self-reported +2
  if (input.trustSignals.hasEmployerVerification) {
    breakdown.network.items.push({ name: 'Employer (self-reported)', points: 2, earned: true })
    breakdown.network.total += 2
  } else {
    breakdown.network.items.push({ name: 'Employer Verification', points: 2, earned: false })
  }

  // === CALCULATE TOTALS ===
  const digitalLineageScore = Math.min(breakdown.digitalLineage.total, 40)
  const businessScore = Math.min(breakdown.business.total, 25)
  const identityScore = Math.min(breakdown.identity.total, 20)
  const networkScore = Math.min(breakdown.network.total, 15)

  let rawScore = digitalLineageScore + businessScore + identityScore + networkScore

  // === COUNTRY RISK ADJUSTMENT ===
  const country = input.basicInfo.countryOfOrigin || input.basicInfo.countryOfResidence
  let countryAdjustment = getCountryPenalty(country)

  // Digital Lineage override: >30 = 50% reduction, >35 = eliminated
  if (countryAdjustment < 0) {
    if (digitalLineageScore > 35) {
      countryAdjustment = 0
    } else if (digitalLineageScore > 30) {
      countryAdjustment = Math.round(countryAdjustment / 2)
    }
  }

  const totalScore = Math.max(0, Math.min(100, rawScore + countryAdjustment))

  // === DETERMINE STATUS ===
  let status: TrustScoreResult['status']
  let statusLabel: string
  let statusDescription: string

  if (totalScore >= 85) {
    status = 'elite'
    statusLabel = 'Elite'
    statusDescription = 'Congratulations! You qualify for auto-approval with premium support and fastest processing.'
  } else if (totalScore >= 70) {
    status = 'approved'
    statusLabel = 'Approved'
    statusDescription = 'Great news! You meet our standard approval criteria. Full access to all services.'
  } else if (totalScore >= 50) {
    status = 'review_needed'
    statusLabel = 'Review Needed'
    statusDescription = 'Your application requires manual review. We may schedule a brief video call to verify your information.'
  } else if (totalScore >= 30) {
    status = 'conditional'
    statusLabel = 'Conditional'
    statusDescription = 'Significant additional verification is needed. Consider improving your Digital Lineage score.'
  } else {
    status = 'not_eligible'
    statusLabel = 'Not Eligible'
    statusDescription = 'You don\'t currently meet our minimum requirements. Build your Digital Lineage and try again.'
  }

  const topImprovements = improvements.slice(0, 5)

  return {
    totalScore,
    digitalLineageScore,
    businessScore,
    identityScore,
    networkScore,
    countryAdjustment,
    status,
    statusLabel,
    statusDescription,
    breakdown,
    improvements: topImprovements,
  }
}

export function getStatusColor(status: TrustScoreResult['status']): string {
  switch (status) {
    case 'elite':
      return 'text-green-600 bg-green-50 border-green-200'
    case 'approved':
      return 'text-blue-600 bg-blue-50 border-blue-200'
    case 'review_needed':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'conditional':
      return 'text-orange-600 bg-orange-50 border-orange-200'
    case 'not_eligible':
      return 'text-red-600 bg-red-50 border-red-200'
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}

export function getScoreColor(score: number): string {
  if (score >= 85) return 'text-green-600'
  if (score >= 70) return 'text-blue-600'
  if (score >= 50) return 'text-yellow-600'
  if (score >= 30) return 'text-orange-600'
  return 'text-red-600'
}
