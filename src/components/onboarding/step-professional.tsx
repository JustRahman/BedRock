'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { professionalSchema, ProfessionalFormData } from '@/lib/validations/onboarding'
import { ArrowLeft, ArrowRight, Linkedin, CheckCircle, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { LinkedInProfileData } from '@/lib/oauth/linkedin'

function normalizeName(s: string): string[] {
  return s.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(Boolean).sort()
}

function nameMatches(a: string, b: string): boolean {
  const aParts = normalizeName(a)
  const bParts = normalizeName(b)
  if (aParts.join(' ') === bParts.join(' ')) return true
  const aSet = new Set(aParts)
  const bSet = new Set(bParts)
  if (bParts.every((p) => aSet.has(p)) || aParts.every((p) => bSet.has(p))) return true
  if (bParts.filter((p) => aSet.has(p)).length >= 2) return true
  return false
}

interface StepProfessionalProps {
  data: Partial<ProfessionalFormData>
  founderName?: string
  onNext: (data: ProfessionalFormData) => void
  onBack: () => void
}

export function StepProfessional({ data, founderName, onNext, onBack }: StepProfessionalProps) {
  const [connected, setConnected] = useState(data.linkedinConnected ?? false)
  const [linkedinData, setLinkedinData] = useState<LinkedInProfileData | null>(null)

  const {
    handleSubmit,
    setValue,
  } = useForm<ProfessionalFormData>({
    resolver: zodResolver(professionalSchema),
    defaultValues: {
      hasLinkedin: data.hasLinkedin ?? false,
      linkedinUrl: data.linkedinUrl ?? '',
      linkedinConnected: data.linkedinConnected ?? false,
    },
  })

  // Check for OAuth data in sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('oauth_linkedin_data')
      if (stored) {
        const parsed = JSON.parse(stored) as LinkedInProfileData
        setLinkedinData(parsed)
        setConnected(true)
        setValue('linkedinConnected', true)
        setValue('hasLinkedin', true)
      }
    } catch {
      // Ignore parse errors
    }
  }, [setValue])

  const handleOAuthConnect = () => {
    window.location.href = '/api/oauth/linkedin/connect'
  }

  const handleDisconnect = () => {
    setLinkedinData(null)
    setConnected(false)
    setValue('linkedinConnected', false)
    setValue('linkedinUrl', '')
    sessionStorage.removeItem('oauth_linkedin_data')
  }

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white">Professional Graph</h3>
        <p className="mt-1 text-sm text-zinc-400">
          Your professional network history proves who you are through years of connections
          and endorsements that can&apos;t be fabricated.
        </p>
      </div>

      <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-6">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/[0.15]">
            <Linkedin className="h-6 w-6 text-blue-400" />
          </div>
          <h4 className="mt-3 font-medium text-white">Connect LinkedIn</h4>
          <p className="mt-1 text-sm text-zinc-400">
            We analyze account age, connections, endorsements, and career progression.
          </p>

          {connected && linkedinData ? (
            <div className="mt-4 rounded-lg bg-emerald-500/[0.1] border border-emerald-500/20 p-4 text-sm text-emerald-400">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <p className="font-medium">LinkedIn Connected</p>
              </div>
              <div className="mt-3 flex items-center gap-3 text-left">
                {linkedinData.picture ? (
                  <img
                    src={linkedinData.picture}
                    alt={linkedinData.name}
                    className="h-10 w-10 rounded-full border border-white/10"
                  />
                ) : null}
                <div>
                  <p className="font-medium text-zinc-200">{linkedinData.name}</p>
                  {linkedinData.email ? (
                    <p className="text-zinc-400">{linkedinData.email}</p>
                  ) : null}
                </div>
              </div>
              <p className="mt-2 text-left text-zinc-300">Profile verified</p>
              {founderName && linkedinData.name ? (
                nameMatches(linkedinData.name, founderName) ? (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400">
                    <CheckCircle className="h-3.5 w-3.5" />
                    Name matches your profile
                  </div>
                ) : (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-orange-400">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Name does not match your profile
                  </div>
                )
              ) : null}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-3 text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]"
                onClick={handleDisconnect}
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="ghost"
              className="mt-4 gap-2 border border-white/[0.1] text-zinc-300 hover:text-zinc-200 hover:bg-white/[0.05]"
              onClick={handleOAuthConnect}
            >
              <Linkedin className="h-4 w-4" />
              Connect with LinkedIn
            </Button>
          )}
        </div>
      </div>

      <p className="text-sm text-zinc-500">
        This step is optional but significantly impacts your Digital Lineage score (up to 15 points).
      </p>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="ghost" onClick={onBack} className="gap-2 border border-white/[0.1] text-zinc-300 hover:text-zinc-200 hover:bg-white/[0.05]">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button type="submit" variant="ghost" className="gap-2 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 hover:text-white text-white border-0 shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-shadow">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}
