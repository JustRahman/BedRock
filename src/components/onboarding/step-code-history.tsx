'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { codeHistorySchema, CodeHistoryFormData } from '@/lib/validations/onboarding'
import { ArrowLeft, ArrowRight, Github, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { GitHubProfileData } from '@/lib/oauth/github'

interface StepCodeHistoryProps {
  data: Partial<CodeHistoryFormData>
  onNext: (data: CodeHistoryFormData) => void
  onBack: () => void
}

export function StepCodeHistory({ data, onNext, onBack }: StepCodeHistoryProps) {
  const [mockConnected, setMockConnected] = useState(data.githubConnected ?? false)
  const [githubData, setGithubData] = useState<GitHubProfileData | null>(null)
  const [oauthAvailable, setOauthAvailable] = useState(true)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm<CodeHistoryFormData>({
    resolver: zodResolver(codeHistorySchema),
    defaultValues: {
      hasGithub: data.hasGithub ?? false,
      githubUsername: data.githubUsername ?? '',
      githubConnected: data.githubConnected ?? false,
    },
  })

  const hasGithub = watch('hasGithub')

  // Check for OAuth data in sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('oauth_github_data')
      if (stored) {
        const parsed = JSON.parse(stored) as GitHubProfileData
        setGithubData(parsed)
        setMockConnected(true)
        setValue('githubConnected', true)
        setValue('hasGithub', true)
        setValue('githubUsername', parsed.login)
      }
    } catch {
      // Ignore parse errors
    }

    // Check if OAuth is configured by trying a preflight
    fetch('/api/oauth/github/connect', { method: 'HEAD' })
      .then((res) => {
        if (res.status === 503) setOauthAvailable(false)
      })
      .catch(() => setOauthAvailable(false))
  }, [setValue])

  const handleOAuthConnect = () => {
    window.location.href = '/api/oauth/github/connect'
  }

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Code History</h3>
        <p className="mt-1 text-sm text-gray-600">
          Your code history helps prove your identity through years of commit history that
          can&apos;t be faked retroactively.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 p-6">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <Github className="h-6 w-6 text-gray-900" />
          </div>
          <h4 className="mt-3 font-medium text-gray-900">Connect GitHub</h4>
          <p className="mt-1 text-sm text-gray-500">
            We analyze account age, commit frequency, contribution patterns, and repo quality.
          </p>

          {mockConnected ? (
            <div className="mt-4 rounded-lg bg-green-50 p-4 text-sm text-green-700">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <p className="font-medium">GitHub Connected</p>
              </div>
              <div className="mt-2 space-y-1 text-left">
                {githubData ? (
                  <>
                    {githubData.name && <p>Name: {githubData.name} (@{githubData.login})</p>}
                    <p>Account age: {githubData.accountAgeYears} year{githubData.accountAgeYears !== 1 ? 's' : ''}</p>
                    <p>Public repos: {githubData.publicRepos}</p>
                    <p>Total stars: {githubData.totalStars}</p>
                    {githubData.topLanguages.length > 0 && (
                      <p>Languages: {githubData.topLanguages.join(', ')}</p>
                    )}
                  </>
                ) : (
                  <>
                    <p>Account age: 4 years</p>
                    <p>Total commits: 847</p>
                    <p>Public repos: 23</p>
                    <p>Languages: TypeScript, Python, Go</p>
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
              <Github className="h-4 w-4" />
              Connect with GitHub
            </Button>
          ) : null}
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 p-4">
        <div className="flex items-start gap-4">
          <Checkbox
            id="hasGithub"
            checked={hasGithub}
            onCheckedChange={(checked) => setValue('hasGithub', !!checked)}
          />
          <div className="flex-1">
            <Label htmlFor="hasGithub" className="text-base font-medium">
              Or provide GitHub username
            </Label>
            <p className="mt-1 text-sm text-gray-500">
              If you prefer not to connect via OAuth, enter your username for analysis.
            </p>
            {hasGithub && !mockConnected && (
              <div className="mt-3">
                <Input
                  placeholder="github-username"
                  {...register('githubUsername')}
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
