'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Shield } from 'lucide-react'
import {
  ProgressIndicator,
  StepBasicInfo,
  StepIdentity,
  StepCodeHistory,
  StepProfessional,
  StepFinancial,
  StepDigitalPresence,
  StepTrustSignals,
} from '@/components/onboarding'
import {
  BasicInfoFormData,
  IdentityFormData,
  CodeHistoryFormData,
  ProfessionalFormData,
  FinancialFormData,
  DigitalPresenceFormData,
  TrustSignalsFormData,
} from '@/lib/validations/onboarding'

const steps = [
  { id: 1, name: 'Basic Info', description: 'Your details' },
  { id: 2, name: 'Identity', description: 'Verification docs' },
  { id: 3, name: 'Code History', description: 'Digital Lineage' },
  { id: 4, name: 'Professional', description: 'LinkedIn graph' },
  { id: 5, name: 'Financial', description: 'Revenue signals' },
  { id: 6, name: 'Presence', description: 'Digital footprint' },
  { id: 7, name: 'Trust Signals', description: 'Boost your score' },
]

const STEP_STORAGE_KEY = 'onboarding_current_step'

interface OnboardingData {
  basicInfo: Partial<BasicInfoFormData>
  identity: Partial<IdentityFormData>
  codeHistory: Partial<CodeHistoryFormData>
  professional: Partial<ProfessionalFormData>
  financial: Partial<FinancialFormData>
  digitalPresence: Partial<DigitalPresenceFormData>
  trustSignals: Partial<TrustSignalsFormData>
}

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const [data, setData] = useState<OnboardingData>({
    basicInfo: {},
    identity: {},
    codeHistory: {},
    professional: {},
    financial: {},
    digitalPresence: {},
    trustSignals: {},
  })

  // Restore step from sessionStorage on mount (for OAuth redirects)
  useEffect(() => {
    try {
      const savedStep = sessionStorage.getItem(STEP_STORAGE_KEY)
      if (savedStep) {
        const step = parseInt(savedStep, 10)
        if (step >= 1 && step <= 7) {
          setCurrentStep(step)
        }
      }
    } catch {
      // Ignore sessionStorage errors
    }
    setIsHydrated(true)
  }, [])

  // Persist step to sessionStorage on every change
  const updateStep = useCallback((step: number) => {
    setCurrentStep(step)
    try {
      sessionStorage.setItem(STEP_STORAGE_KEY, step.toString())
    } catch {
      // Ignore sessionStorage errors
    }
  }, [])

  const handleBasicInfoNext = (basicInfo: BasicInfoFormData) => {
    setData((prev) => ({ ...prev, basicInfo }))
    updateStep(2)
  }

  const handleIdentityNext = (identity: IdentityFormData) => {
    setData((prev) => ({ ...prev, identity }))
    updateStep(3)
  }

  const handleCodeHistoryNext = (codeHistory: CodeHistoryFormData) => {
    setData((prev) => ({ ...prev, codeHistory }))
    updateStep(4)
  }

  const handleProfessionalNext = (professional: ProfessionalFormData) => {
    setData((prev) => ({ ...prev, professional }))
    updateStep(5)
  }

  const handleFinancialNext = (financial: FinancialFormData) => {
    setData((prev) => ({ ...prev, financial }))
    updateStep(6)
  }

  const handleDigitalPresenceNext = (digitalPresence: DigitalPresenceFormData) => {
    setData((prev) => ({ ...prev, digitalPresence }))
    updateStep(7)
  }

  const handleTrustSignalsSubmit = async (trustSignals: TrustSignalsFormData) => {
    setIsSubmitting(true)
    const finalData = { ...data, trustSignals }

    // Merge OAuth data from sessionStorage into submission
    try {
      const githubData = sessionStorage.getItem('oauth_github_data')
      const linkedinData = sessionStorage.getItem('oauth_linkedin_data')
      const stripeData = sessionStorage.getItem('oauth_stripe_data')

      if (githubData) {
        finalData.codeHistory = {
          ...finalData.codeHistory,
          githubConnected: true,
          hasGithub: true,
        }
      }
      if (linkedinData) {
        finalData.professional = {
          ...finalData.professional,
          linkedinConnected: true,
          hasLinkedin: true,
        }
      }
      if (stripeData) {
        finalData.financial = {
          ...finalData.financial,
          hasStripeConnected: true,
        }
      }
    } catch {
      // Ignore sessionStorage errors
    }

    try {
      sessionStorage.setItem('onboardingData', JSON.stringify(finalData))

      const response = await fetch('/api/trust-score/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      })

      const result = await response.json()
      sessionStorage.setItem('trustScoreResult', JSON.stringify(result))

      // Clean up OAuth and step storage
      try {
        sessionStorage.removeItem(STEP_STORAGE_KEY)
        sessionStorage.removeItem('oauth_github_data')
        sessionStorage.removeItem('oauth_linkedin_data')
        sessionStorage.removeItem('oauth_stripe_data')
      } catch {
        // Ignore cleanup errors
      }

      router.push('/onboarding/result')
    } catch (error) {
      console.error('Error calculating trust score:', error)
      router.push('/onboarding/result')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    updateStep(Math.max(1, currentStep - 1))
  }

  // Don't render steps until hydrated to avoid flash of wrong step
  if (!isHydrated) {
    return (
      <div className="dark min-h-screen bg-[#09090b] text-white py-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-40">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[128px]" />
          <div className="absolute top-20 right-1/4 w-80 h-80 bg-violet-600/25 rounded-full blur-[128px]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="relative mx-auto max-w-2xl px-4">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-white">BedRock</span>
            </Link>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-white">Check Your Eligibility</h2>
            <p className="mt-1 text-sm text-zinc-400">Loading...</p>
          </div>
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
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 transition-transform duration-300 group-hover:scale-105">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">BedRock</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">Check Your Eligibility</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Complete these steps to calculate your Trust Score and see your bank account options.
            </p>
          </div>

          <ProgressIndicator steps={steps} currentStep={currentStep} />

          {currentStep === 1 && (
            <StepBasicInfo
              data={data.basicInfo}
              onNext={handleBasicInfoNext}
            />
          )}

          {currentStep === 2 && (
            <StepIdentity
              data={data.identity}
              onNext={handleIdentityNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && (
            <StepCodeHistory
              data={data.codeHistory}
              onNext={handleCodeHistoryNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 4 && (
            <StepProfessional
              data={data.professional}
              onNext={handleProfessionalNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 5 && (
            <StepFinancial
              data={data.financial}
              onNext={handleFinancialNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 6 && (
            <StepDigitalPresence
              data={data.digitalPresence}
              onNext={handleDigitalPresenceNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 7 && (
            <StepTrustSignals
              data={data.trustSignals}
              onSubmit={handleTrustSignalsSubmit}
              onBack={handleBack}
              isSubmitting={isSubmitting}
            />
          )}
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
