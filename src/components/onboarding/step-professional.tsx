'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { professionalSchema, ProfessionalFormData } from '@/lib/validations/onboarding'
import { ArrowLeft, ArrowRight, Linkedin, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { LinkedInProfileData } from '@/lib/oauth/linkedin'

interface StepProfessionalProps {
  data: Partial<ProfessionalFormData>
  onNext: (data: ProfessionalFormData) => void
  onBack: () => void
}

export function StepProfessional({ data, onNext, onBack }: StepProfessionalProps) {
  const [mockConnected, setMockConnected] = useState(data.linkedinConnected ?? false)
  const [linkedinData, setLinkedinData] = useState<LinkedInProfileData | null>(null)
  const [oauthAvailable, setOauthAvailable] = useState(true)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm<ProfessionalFormData>({
    resolver: zodResolver(professionalSchema),
    defaultValues: {
      hasLinkedin: data.hasLinkedin ?? false,
      linkedinUrl: data.linkedinUrl ?? '',
      linkedinConnected: data.linkedinConnected ?? false,
    },
  })

  const hasLinkedin = watch('hasLinkedin')

  // Check for OAuth data in sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('oauth_linkedin_data')
      if (stored) {
        const parsed = JSON.parse(stored) as LinkedInProfileData
        setLinkedinData(parsed)
        setMockConnected(true)
        setValue('linkedinConnected', true)
        setValue('hasLinkedin', true)
      }
    } catch {
      // Ignore parse errors
    }

    // Check if OAuth is configured
    fetch('/api/oauth/linkedin/connect', { method: 'HEAD' })
      .then((res) => {
        if (res.status === 503) setOauthAvailable(false)
      })
      .catch(() => setOauthAvailable(false))
  }, [setValue])

  const handleOAuthConnect = () => {
    window.location.href = '/api/oauth/linkedin/connect'
  }

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Professional Graph</h3>
        <p className="mt-1 text-sm text-gray-600">
          Your professional network history proves who you are through years of connections
          and endorsements that can&apos;t be fabricated.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 p-6">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Linkedin className="h-6 w-6 text-blue-700" />
          </div>
          <h4 className="mt-3 font-medium text-gray-900">Connect LinkedIn</h4>
          <p className="mt-1 text-sm text-gray-500">
            We analyze account age, connections, endorsements, and career progression.
          </p>

          {mockConnected ? (
            <div className="mt-4 rounded-lg bg-green-50 p-4 text-sm text-green-700">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <p className="font-medium">LinkedIn Connected</p>
              </div>
              <div className="mt-2 space-y-1 text-left">
                {linkedinData ? (
                  <>
                    <p>Name: {linkedinData.name}</p>
                    {linkedinData.email && <p>Email: {linkedinData.email}</p>}
                    <p>Profile verified</p>
                  </>
                ) : (
                  <>
                    <p>Account age: 6 years</p>
                    <p>Connections: 500+</p>
                    <p>Endorsements: 47</p>
                    <p>Career positions: 4</p>
                  </>
                )}
              </div>
            </div>
          ) : oauthAvailable ? (
            <Button
              type="button"
              variant="outline"
              className="mt-4 gap-2"
              onClick={handleOAuthConnect}
            >
              <Linkedin className="h-4 w-4" />
              Connect with LinkedIn
            </Button>
          ) : null}
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 p-4">
        <div className="flex items-start gap-4">
          <Checkbox
            id="hasLinkedin"
            checked={hasLinkedin}
            onCheckedChange={(checked) => setValue('hasLinkedin', !!checked)}
          />
          <div className="flex-1">
            <Label htmlFor="hasLinkedin" className="text-base font-medium">
              Or provide LinkedIn URL
            </Label>
            <p className="mt-1 text-sm text-gray-500">
              If you prefer not to connect via OAuth, enter your profile URL for analysis.
            </p>
            {hasLinkedin && !mockConnected && (
              <div className="mt-3">
                <Input
                  placeholder="https://linkedin.com/in/yourname"
                  {...register('linkedinUrl')}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        This step is optional but significantly impacts your Digital Lineage score (up to 15 points).
      </p>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button type="submit" className="gap-2">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}
