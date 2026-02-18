'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Shield, ArrowRight, CreditCard, Loader2, CheckCircle } from 'lucide-react'
import { TrustScoreV2Result, TrustScoreV2Input, calculateTrustScoreV2 } from '@/lib/trust-score-v2'
import type { GitHubProfileData } from '@/lib/oauth/github'
import type { LinkedInProfileData } from '@/lib/oauth/linkedin'
import {
  ScoreDisplay,
  ScoreBreakdownDetail,
  ImprovementSuggestions,
} from '@/components/trust-score'
import { createClient } from '@/lib/supabase/client'

export default function OnboardingResultPage() {
  const router = useRouter()
  const [result, setResult] = useState<TrustScoreV2Result | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'breakdown' | 'next-steps'>('breakdown')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [scoreSaved, setScoreSaved] = useState(false)
  const [savingScore, setSavingScore] = useState(false)

  useEffect(() => {
    async function init() {
      // Check if user is logged in
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) setIsLoggedIn(true)

      // Check for a pre-computed v2 result in sessionStorage
      const storedResult = sessionStorage.getItem('trustScoreResult') || localStorage.getItem('trustScoreResult')
      if (storedResult) {
        try {
          const parsed = JSON.parse(storedResult)
          // If it looks like a v2 result (has `score` and `breakdown.github`), use directly
          if (parsed.breakdown?.github) {
            setResult(parsed as TrustScoreV2Result)
            if (user) await saveTrustScoreViaAPI(parsed as TrustScoreV2Result)
            setIsLoading(false)
            return
          }
        } catch {
          // Continue to calculate from onboarding data
        }
      }

      // Build v2 input from onboarding + OAuth data
      const storedData = sessionStorage.getItem('onboardingData') || localStorage.getItem('onboardingData')
      if (storedData) {
        try {
          const data = JSON.parse(storedData)
          const v2Input = buildV2Input(data)
          const calculated = calculateTrustScoreV2(v2Input)
          setResult(calculated)
          // Store the v2 result for potential re-use
          try {
            sessionStorage.setItem('trustScoreResult', JSON.stringify(calculated))
          } catch { /* ignore */ }
          if (user) await saveTrustScoreViaAPI(calculated)
          setIsLoading(false)
          return
        } catch {
          // Redirect to onboarding if data is invalid
        }
      }

      router.push('/onboarding')
    }

    function buildV2Input(data: Record<string, unknown>): TrustScoreV2Input {
      const input: TrustScoreV2Input = {}

      // GitHub OAuth data
      const ghRaw = sessionStorage.getItem('oauth_github_data') || localStorage.getItem('oauth_github_data')
      if (ghRaw) {
        try {
          input.github = JSON.parse(ghRaw) as GitHubProfileData
        } catch { /* ignore */ }
      }
      const codeHistory = data.codeHistory as Record<string, unknown> | undefined
      if (!input.github && codeHistory?.hasGithub) {
        input.githubUsernameOnly = !codeHistory.githubConnected
      }

      // LinkedIn OAuth data
      const liRaw = sessionStorage.getItem('oauth_linkedin_data') || localStorage.getItem('oauth_linkedin_data')
      if (liRaw) {
        try {
          input.linkedin = JSON.parse(liRaw) as LinkedInProfileData
        } catch { /* ignore */ }
      }
      const professional = data.professional as Record<string, unknown> | undefined
      if (!input.linkedin && professional?.hasLinkedin) {
        input.linkedinUrlOnly = !professional.linkedinConnected
      }

      // Identity verification
      const id = data.identity as Record<string, unknown> | undefined
      if (id) {
        input.identity = {
          hasPassport: !!id.hasPassport,
          passportNameMatch: id.passportNameMatch as boolean | undefined,
          passportDobMatch: id.passportDobMatch as boolean | undefined,
          passportGenderMatch: id.passportGenderMatch as boolean | undefined,
          passportNationalityMatch: id.passportNationalityMatch as boolean | undefined,
          hasLocalId: !!id.hasLocalId,
          hasLivenessCheck: !!id.hasLivenessCheck,
          faceSkipped: !!id.faceSkipped,
          hasAddressProof: !!id.hasAddressProof,
        }
      }

      // Digital presence
      const dp = data.digitalPresence as Record<string, unknown> | undefined
      if (dp) {
        input.digitalPresence = {
          websiteVerified: !!dp.websiteVerified,
          appStoreVerified: !!dp.appStoreVerified,
        }
      }

      // Network / trust signals
      const ts = data.trustSignals as Record<string, unknown> | undefined
      if (ts) {
        input.network = {
          referralVerified: !!ts.referralVerified,
          universityEmailVerified: !!ts.universityEmailVerified,
          acceleratorVerified: !!ts.acceleratorVerified,
          hasEmployer: !!ts.hasEmployerVerification,
        }
      }

      // Country info
      const basicInfo = data.basicInfo as Record<string, unknown> | undefined
      if (basicInfo) {
        input.countryOfOrigin = (basicInfo.countryOfOrigin as string) || undefined
        input.countryOfResidence = (basicInfo.countryOfResidence as string) || undefined
      }

      return input
    }

    async function saveTrustScoreViaAPI(score: TrustScoreV2Result) {
      setSavingScore(true)
      try {
        const onboardingRaw = sessionStorage.getItem('onboardingData') || localStorage.getItem('onboardingData')
        const onboardingData = onboardingRaw ? JSON.parse(onboardingRaw) : null

        // Collect OAuth data from sessionStorage
        const oauthData: Record<string, unknown> = {}
        try {
          const gh = sessionStorage.getItem('oauth_github_data') || localStorage.getItem('oauth_github_data')
          const li = sessionStorage.getItem('oauth_linkedin_data') || localStorage.getItem('oauth_linkedin_data')
          const st = sessionStorage.getItem('oauth_stripe_data') || localStorage.getItem('oauth_stripe_data')
          if (gh) oauthData.github = JSON.parse(gh)
          if (li) oauthData.linkedin = JSON.parse(li)
          if (st) oauthData.stripe = JSON.parse(st)
        } catch { /* ignore */ }

        const res = await fetch('/api/founders/ensure', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            trustScore: score,
            trustScoreVersion: 2,
            onboardingData,
            oauthData: Object.keys(oauthData).length > 0 ? oauthData : undefined,
          }),
        })

        if (res.ok) {
          const resData = await res.json().catch(() => ({}))
          if (resData.trustScoreSaved) {
            setScoreSaved(true)
            try {
              sessionStorage.setItem('just_completed_onboarding', '1')
              sessionStorage.removeItem('onboardingData')
              sessionStorage.removeItem('trustScoreResult')
              localStorage.removeItem('onboardingData')
              localStorage.removeItem('trustScoreResult')
              localStorage.removeItem('oauth_github_data')
              localStorage.removeItem('oauth_linkedin_data')
              localStorage.removeItem('oauth_stripe_data')
            } catch { /* ignore */ }
          }
          // If trustScoreSaved is false, keep localStorage so dashboard can retry
        }
      } catch {
        // Non-critical — dashboard will retry from localStorage
      } finally {
        setSavingScore(false)
      }
    }

    init()
  }, [router])

  if (isLoading || !result) {
    return (
      <div className="dark min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="flex items-center gap-3 text-zinc-400">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Calculating your Trust Score...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="dark min-h-screen bg-[#09090b] text-white py-12 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[128px]" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-violet-600/25 rounded-full blur-[128px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative mx-auto max-w-2xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 transition-transform duration-300 group-hover:scale-105">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">BedRock</span>
          </Link>
        </div>

        {/* Score Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm mb-6">
          <h2 className="mb-6 text-center text-xl font-bold text-white">Your Trust Score</h2>
          <ScoreDisplay result={result} />
        </div>

        {/* Improvement Suggestions */}
        {result.improvements.length > 0 && (
          <div className="mb-6">
            <ImprovementSuggestions improvements={result.improvements} />
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex rounded-xl border border-white/[0.08] bg-white/[0.03] p-1">
            <button
              type="button"
              onClick={() => setActiveTab('breakdown')}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === 'breakdown'
                  ? 'bg-white/[0.08] text-white'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Score Breakdown
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('next-steps')}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === 'next-steps'
                  ? 'bg-white/[0.08] text-white'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Next Steps
            </button>
          </div>

          <div className="mt-4">
            {activeTab === 'breakdown' && <ScoreBreakdownDetail result={result} />}
            {activeTab === 'next-steps' && <NextSteps result={result} />}
          </div>
        </div>

        {/* Score saved confirmation */}
        {scoreSaved && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
            <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
            <p className="text-sm text-emerald-300">Your trust score has been saved to your account.</p>
          </div>
        )}
        {savingScore && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
            <Loader2 className="h-5 w-5 text-blue-400 shrink-0 animate-spin" />
            <p className="text-sm text-blue-300">Saving trust score to your account...</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          {isLoggedIn ? (
            <Link href="/dashboard" className="flex-1">
              <Button
                className="w-full gap-2 bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:from-blue-400 hover:to-violet-500 rounded-xl py-6 text-base font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                size="lg"
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Link href="/register" className="flex-1">
              <Button
                className="w-full gap-2 bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:from-blue-400 hover:to-violet-500 rounded-xl py-6 text-base font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                size="lg"
              >
                Create Account & Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
          {result.score >= 60 && (
            <Link href="/onboarding/payment" className="flex-1">
              <Button
                className="w-full gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-400 hover:to-emerald-500 rounded-xl py-6 text-base font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                size="lg"
              >
                <CreditCard className="h-4 w-4" />
                Choose Your Plan
              </Button>
            </Link>
          )}
          <Link href="/onboarding" className="flex-1">
            <Button
              variant="ghost"
              className="w-full border border-white/[0.1] text-zinc-300 hover:text-white hover:bg-white/[0.05] rounded-xl py-6 text-base"
              size="lg"
            >
              Update Information
            </Button>
          </Link>
        </div>

        {!isLoggedIn && (
          <p className="mt-6 text-center text-sm text-zinc-500">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}

function NextSteps({ result }: { result: TrustScoreV2Result }) {
  const steps = getPersonalizedSteps(result)

  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
      <ol className="space-y-4">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-4">
            <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
              step.type === 'done'
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                : step.type === 'action'
                  ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                  : 'bg-zinc-500/10 border border-zinc-500/20 text-zinc-400'
            }`}>
              {step.type === 'done' ? '\u2713' : index + 1}
            </div>
            <div>
              <p className={`font-medium ${step.type === 'done' ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>
                {step.title}
              </p>
              <p className="mt-0.5 text-sm text-zinc-500">{step.description}</p>
              {step.points ? (
                <span className="mt-1 inline-block text-xs text-emerald-400/70">+{step.points} pts</span>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

interface StepItem {
  title: string
  description: string
  type: 'done' | 'action' | 'info'
  points?: number
}

function getPersonalizedSteps(result: TrustScoreV2Result): StepItem[] {
  const steps: StepItem[] = []
  const b = result.breakdown

  // Always start with account creation
  steps.push({
    title: 'Create Your Account',
    description: 'Sign up to save your progress and access your dashboard.',
    type: 'action',
  })

  // GitHub
  if (b.github.score > 0) {
    if (b.github.details.username_only) {
      steps.push({ title: 'GitHub Username Added', description: 'Connect via OAuth for the full score.', type: 'done' })
      steps.push({ title: 'Connect GitHub via OAuth', description: 'Authenticate with GitHub to unlock full scoring.', type: 'action', points: 10 })
    } else {
      steps.push({ title: 'GitHub Connected', description: 'Your code history is verified.', type: 'done' })
    }
  } else {
    steps.push({ title: 'Connect GitHub', description: 'Link your GitHub account to prove your developer history.', type: 'action', points: 25 })
  }

  // Economic Activity
  if (b.economic_activity.score > 0) {
    steps.push({ title: 'Economic Signals Added', description: `Earning ${b.economic_activity.score}/${b.economic_activity.max} points.`, type: 'done' })
    if (b.economic_activity.score < b.economic_activity.max) {
      steps.push({ title: 'Strengthen Economic Signals', description: 'Connect a wallet, Stripe, or complete payment.', type: 'action' })
    }
  } else {
    steps.push({ title: 'Add Economic Activity', description: 'Verify a crypto wallet or connect Stripe for up to +25 points.', type: 'action', points: 25 })
  }

  // LinkedIn
  if (b.linkedin.score > 0) {
    if (b.linkedin.details.url_only) {
      steps.push({ title: 'LinkedIn URL Added', description: 'Connect via OAuth for more points.', type: 'done' })
      steps.push({ title: 'Connect LinkedIn via OAuth', description: 'Authenticate with LinkedIn for +7 more points.', type: 'action', points: 7 })
    } else {
      steps.push({ title: 'LinkedIn Connected', description: 'Your professional network is verified.', type: 'done' })
    }
  } else {
    steps.push({ title: 'Connect LinkedIn', description: 'Link your LinkedIn profile to verify your professional background.', type: 'action', points: 10 })
  }

  // Identity
  if (b.identity.score >= 18) {
    steps.push({ title: 'Identity Fully Verified', description: 'Passport, face scan, and documents confirmed.', type: 'done' })
  } else if (b.identity.score > 0) {
    steps.push({ title: 'Identity Partially Verified', description: `Earning ${b.identity.score}/${b.identity.max} points.`, type: 'done' })
    if (!b.identity.details.passport) {
      steps.push({ title: 'Upload Passport', description: 'Verify your identity with a valid passport.', type: 'action', points: 8 })
    }
    if (b.identity.details.face_skipped) {
      steps.push({ title: 'Complete Face Verification', description: 'Removing the skip penalty and earning face scan points.', type: 'action', points: 6 })
    } else if (!b.identity.details.face_verified) {
      steps.push({ title: 'Complete Face Scan', description: 'Take a selfie to verify it matches your passport.', type: 'action', points: 4 })
    }
    if (!b.identity.details.local_id) {
      steps.push({ title: 'Add Local Government ID', description: 'Upload a national ID or driver\'s license.', type: 'action', points: 5 })
    }
    if (!b.identity.details.address_verified) {
      steps.push({ title: 'Add Proof of Address', description: 'Upload a utility bill or bank statement.', type: 'action', points: 3 })
    }
  } else {
    steps.push({ title: 'Verify Your Identity', description: 'Upload passport, face scan, and local ID to earn up to +20 points.', type: 'action', points: 20 })
  }

  // Digital Presence
  if (b.digital_presence.score > 0 && b.digital_presence.score < b.digital_presence.max) {
    steps.push({ title: 'Add More Digital Presence', description: 'Verify website, social accounts, or app store listing.', type: 'action', points: b.digital_presence.max - b.digital_presence.score })
  } else if (b.digital_presence.score === 0) {
    steps.push({ title: 'Verify Digital Presence', description: 'Add your website, social accounts, or app store listing.', type: 'action', points: 10 })
  }

  // Network
  if (b.network.score === 0) {
    steps.push({ title: 'Add Trust Network Signals', description: 'Get a referral, verify your university email, or add accelerator affiliation.', type: 'action', points: 10 })
  } else if (b.network.score < b.network.max) {
    steps.push({ title: 'Strengthen Trust Network', description: 'Add more referrals or credentials.', type: 'action', points: b.network.max - b.network.score })
  }

  // Final step based on recommendation
  if (result.recommendation === 'approve') {
    steps.push({ title: 'Choose Your Plan & Get Approved', description: 'Select a service package and we\'ll submit your bank application.', type: 'action' })
  } else if (result.recommendation === 'review') {
    steps.push({ title: 'Application Review', description: 'Our team may schedule a brief video call to verify your information.', type: 'info' })
  } else if (result.recommendation === 'enhanced_review') {
    steps.push({ title: 'Manual Review Required', description: 'Complete the steps above to improve your score, then our team will review.', type: 'info' })
  } else {
    steps.push({ title: 'Complete Steps Above & Resubmit', description: 'Each step above strengthens your application. We\u2019re here to help you get approved.', type: 'info' })
  }

  return steps
}
