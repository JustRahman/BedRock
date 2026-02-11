'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Shield, ArrowRight, CreditCard, Loader2 } from 'lucide-react'
import { TrustScoreResult, calculateTrustScore } from '@/lib/trust-score'
import {
  ScoreDisplay,
  ScoreBreakdownDetail,
  ImprovementSuggestions,
} from '@/components/trust-score'

export default function OnboardingResultPage() {
  const router = useRouter()
  const [result, setResult] = useState<TrustScoreResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'breakdown' | 'next-steps'>('breakdown')

  useEffect(() => {
    const storedResult = sessionStorage.getItem('trustScoreResult')
    if (storedResult) {
      try {
        setResult(JSON.parse(storedResult))
        setIsLoading(false)
        return
      } catch {
        // Continue to calculate from onboarding data
      }
    }

    const storedData = sessionStorage.getItem('onboardingData')
    if (storedData) {
      try {
        const data = JSON.parse(storedData)
        const calculated = calculateTrustScore(data)
        setResult(calculated)
        setIsLoading(false)
        return
      } catch {
        // Redirect to onboarding if data is invalid
      }
    }

    router.push('/onboarding')
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

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/register" className="flex-1">
            <Button
              className="w-full gap-2 bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:from-blue-400 hover:to-violet-500 rounded-xl py-6 text-base font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
              size="lg"
            >
              Create Account & Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          {result.totalScore >= 50 && (
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

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

function NextSteps({ result }: { result: TrustScoreResult }) {
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

function getPersonalizedSteps(result: TrustScoreResult): StepItem[] {
  const steps: StepItem[] = []
  const bd = result.breakdown

  // Always start with account creation
  steps.push({
    title: 'Create Your Account',
    description: 'Sign up to save your progress and access your dashboard.',
    type: 'action',
  })

  // Identity — check what's missing
  const identityItems = bd.identity.items
  const hasPassport = identityItems.find(i => i.name === 'Passport Uploaded')?.earned
  const nameMatch = identityItems.find(i => i.name === 'Name Matches Passport')?.earned
  const dobMatch = identityItems.find(i => i.name === 'DOB Matches Passport')?.earned
  const hasLocalId = identityItems.find(i => i.name === 'Local Government ID')?.earned
  const hasLiveness = identityItems.find(i => i.name === 'Face Verification')?.earned
  const faceSkipped = identityItems.find(i => i.name === 'Face Verification Skipped')?.earned
  const hasAddress = identityItems.find(i => i.name === 'Address Verified')?.earned

  if (hasPassport && hasLiveness && nameMatch && dobMatch) {
    steps.push({ title: 'Identity Fully Verified', description: 'Passport, face scan, and all details confirmed.', type: 'done' })
  } else if (hasPassport) {
    steps.push({ title: 'Passport Uploaded', description: 'Document received.', type: 'done' })
    if (!nameMatch) {
      steps.push({ title: 'Fix Name Mismatch', description: 'Your profile name doesn\u2019t match your passport. Update your info or re-upload.', type: 'action', points: 2 })
    }
    if (!dobMatch) {
      steps.push({ title: 'Fix Date of Birth', description: 'Your date of birth doesn\u2019t match your passport.', type: 'action', points: 2 })
    }
  } else {
    steps.push({ title: 'Upload Your Passport', description: 'Verify your identity with a valid passport.', type: 'action', points: 8 })
  }
  if (faceSkipped) {
    steps.push({ title: 'Complete Face Verification', description: 'You skipped the face scan \u2014 completing it removes the -2 penalty and earns +4 points.', type: 'action', points: 6 })
  } else if (!hasLiveness && hasPassport) {
    steps.push({ title: 'Complete Face Scan', description: 'Take a selfie to verify it matches your passport photo.', type: 'action', points: 4 })
  }
  if (!hasLocalId) {
    steps.push({ title: 'Add Local Government ID', description: 'Upload a national ID or driver\'s license for additional verification.', type: 'action', points: 5 })
  }
  if (!hasAddress) {
    steps.push({ title: 'Add Proof of Address', description: 'Upload a utility bill or bank statement showing your address.', type: 'action', points: 3 })
  }

  // Digital Lineage — Code History
  const codeItems = bd.digitalLineage.codeHistory.items
  const hasGithub = codeItems.find(i => i.name === 'GitHub Connected')?.earned
  if (hasGithub) {
    steps.push({ title: 'GitHub Connected', description: 'Your code history is verified.', type: 'done' })
  } else {
    steps.push({ title: 'Connect GitHub', description: 'Link your GitHub account to prove your developer history.', type: 'action', points: 8 })
  }

  // Digital Lineage — Professional
  const proItems = bd.digitalLineage.professionalGraph.items
  const hasLinkedin = proItems.find(i => i.name === 'LinkedIn Connected')?.earned
  if (hasLinkedin) {
    steps.push({ title: 'LinkedIn Connected', description: 'Your professional network is verified.', type: 'done' })
  } else {
    steps.push({ title: 'Connect LinkedIn', description: 'Link your LinkedIn profile to verify your professional background.', type: 'action', points: 6 })
  }

  // Business signals
  if (bd.business.total === 0) {
    steps.push({ title: 'Add Revenue Signals', description: 'Connect Stripe or add bank statements to prove business traction.', type: 'action', points: 15 })
  } else if (bd.business.total < bd.business.max) {
    steps.push({ title: 'Strengthen Business Signals', description: 'Add more financial documentation to boost your business score.', type: 'action' })
  }

  // Final step based on status
  if (result.status === 'elite' || result.status === 'approved') {
    steps.push({ title: 'Choose Your Plan & Get Approved', description: 'Select a service package and we\'ll submit your bank application.', type: 'action' })
  } else if (result.status === 'review_needed') {
    steps.push({ title: 'Application Review', description: 'Our team may schedule a brief video call to verify your information.', type: 'info' })
  } else if (result.status === 'conditional') {
    steps.push({ title: 'Manual Review Required', description: 'Complete the steps above to improve your score, then our team will review.', type: 'info' })
  } else {
    steps.push({ title: 'Complete Steps Above & Resubmit', description: 'Each step above strengthens your application. We\u2019re here to help you get approved.', type: 'info' })
  }

  return steps
}
