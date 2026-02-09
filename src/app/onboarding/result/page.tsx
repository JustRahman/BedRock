'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, ArrowRight, RefreshCw, CreditCard } from 'lucide-react'
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

  useEffect(() => {
    // Try to get result from session storage first
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

    // Calculate from stored onboarding data
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

    // No data found, redirect to onboarding
    router.push('/onboarding')
  }, [router])

  if (isLoading || !result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex items-center gap-2 text-gray-500">
          <RefreshCw className="h-5 w-5 animate-spin" />
          <span>Calculating your Trust Score...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">Bedrock</span>
          </Link>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center">Your Trust Score</CardTitle>
          </CardHeader>
          <CardContent>
            <ScoreDisplay result={result} />
          </CardContent>
        </Card>

        <div className="mb-6">
          <ImprovementSuggestions improvements={result.improvements} />
        </div>

        <Tabs defaultValue="breakdown" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="breakdown">Score Breakdown</TabsTrigger>
            <TabsTrigger value="next-steps">Next Steps</TabsTrigger>
          </TabsList>
          <TabsContent value="breakdown" className="mt-4">
            <ScoreBreakdownDetail result={result} />
          </TabsContent>
          <TabsContent value="next-steps" className="mt-4">
            <NextSteps status={result.status} />
          </TabsContent>
        </Tabs>

        <div className="flex flex-col gap-4 sm:flex-row">
          {result.status !== 'not_eligible' && (
            <Link href="/register" className="flex-1">
              <Button className="w-full gap-2" size="lg">
                Create Account & Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
          {result.totalScore >= 50 && (
            <Link href="/onboarding/payment" className="flex-1">
              <Button variant="default" className="w-full gap-2 bg-green-600 hover:bg-green-700" size="lg">
                <CreditCard className="h-4 w-4" />
                Choose Your Plan
              </Button>
            </Link>
          )}
          <Link href="/onboarding" className="flex-1">
            <Button variant="outline" className="w-full" size="lg">
              Update Information
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

function NextSteps({ status }: { status: TrustScoreResult['status'] }) {
  const steps = getNextSteps(status)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">What Happens Next?</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-4">
          {steps.map((step, index) => (
            <li key={index} className="flex gap-4">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-gray-900">{step.title}</p>
                <p className="mt-1 text-sm text-gray-500">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}

function getNextSteps(status: TrustScoreResult['status']) {
  switch (status) {
    case 'elite':
      return [
        {
          title: 'Create Your Account',
          description: 'Sign up to lock in your Elite status and start the fast-track process.',
        },
        {
          title: 'Choose Your Plan',
          description: 'Select the service package that fits your needs. Elite founders get priority processing.',
        },
        {
          title: 'Complete Verification',
          description: 'Upload your documents for final verification.',
        },
        {
          title: 'Get Bank Approved',
          description: 'We\'ll match you with partner banks and submit your application with auto-approval.',
        },
      ]
    case 'approved':
      return [
        {
          title: 'Create Your Account',
          description: 'Sign up to save your progress and access your dashboard.',
        },
        {
          title: 'Complete Identity Verification',
          description: 'Upload remaining documents to finalize your profile.',
        },
        {
          title: 'Choose Your Plan',
          description: 'Select the service package that fits your needs.',
        },
        {
          title: 'Bank Application Submission',
          description: 'We\'ll prepare and submit your bank application.',
        },
      ]
    case 'review_needed':
      return [
        {
          title: 'Create Your Account',
          description: 'Sign up to continue the application process.',
        },
        {
          title: 'Improve Your Trust Score',
          description: 'Add more verification signals to boost your chances.',
        },
        {
          title: 'Schedule a Verification Call',
          description: 'Our team will conduct a brief video call to verify your information.',
        },
        {
          title: 'Application Review',
          description: 'We\'ll review your application and provide next steps.',
        },
      ]
    case 'conditional':
      return [
        {
          title: 'Strengthen Your Digital Lineage',
          description: 'Connect GitHub and LinkedIn to significantly boost your score.',
        },
        {
          title: 'Submit Additional Documents',
          description: 'Provide extra documentation to support your application.',
        },
        {
          title: 'Manual Review Process',
          description: 'Your application will go through our compliance team.',
        },
        {
          title: 'Decision & Next Steps',
          description: 'We\'ll inform you of the outcome and available options.',
        },
      ]
    case 'not_eligible':
      return [
        {
          title: 'Review Requirements',
          description: 'Check our eligibility criteria and identify gaps.',
        },
        {
          title: 'Build Your Trust Profile',
          description: 'Work on improving the areas where you scored low.',
        },
        {
          title: 'Try Again Later',
          description: 'Once you\'ve made improvements, submit a new eligibility check.',
        },
        {
          title: 'Contact Support',
          description: 'If you believe there\'s an error, reach out to our team.',
        },
      ]
    default:
      return []
  }
}
