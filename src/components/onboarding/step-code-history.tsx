'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { codeHistorySchema, CodeHistoryFormData } from '@/lib/validations/onboarding'
import { ArrowLeft, ArrowRight, Github, CheckCircle, Loader2, Search, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { GitHubProfileData } from '@/lib/oauth/github'

interface StepCodeHistoryProps {
  data: Partial<CodeHistoryFormData>
  onNext: (data: CodeHistoryFormData) => void
  onBack: () => void
}

export function StepCodeHistory({ data, onNext, onBack }: StepCodeHistoryProps) {
  const [connected, setConnected] = useState(data.githubConnected ?? false)
  const [githubData, setGithubData] = useState<GitHubProfileData | null>(null)
  const [lookingUp, setLookingUp] = useState(false)
  const [lookupError, setLookupError] = useState('')

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
  const githubUsername = watch('githubUsername')

  // Check for OAuth data in sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('oauth_github_data')
      if (stored) {
        const parsed = JSON.parse(stored) as GitHubProfileData
        setGithubData(parsed)
        setConnected(true)
        setValue('githubConnected', true)
        setValue('hasGithub', true)
        setValue('githubUsername', parsed.login)
      }
    } catch {
      // Ignore parse errors
    }

  }, [setValue])

  const handleOAuthConnect = () => {
    window.location.href = '/api/oauth/github/connect'
  }

  const handleUsernameLookup = async () => {
    const username = githubUsername?.trim()
    if (!username) {
      setLookupError('Please enter a GitHub username.')
      return
    }

    setLookingUp(true)
    setLookupError('')

    try {
      const res = await fetch(`/api/oauth/github/lookup?username=${encodeURIComponent(username)}`)

      if (!res.ok) {
        const err = await res.json()
        setLookupError(err.error || 'Lookup failed')
        return
      }

      const profile = await res.json() as GitHubProfileData
      setGithubData(profile)
      setConnected(true)
      setValue('githubConnected', true)
      setValue('githubUsername', profile.login)
      // Store in sessionStorage so it persists across step navigation
      sessionStorage.setItem('oauth_github_data', JSON.stringify(profile))
    } catch {
      setLookupError('Failed to look up username. Please try again.')
    } finally {
      setLookingUp(false)
    }
  }

  const handleDisconnect = () => {
    setGithubData(null)
    setConnected(false)
    setValue('githubConnected', false)
    setValue('githubUsername', '')
    sessionStorage.removeItem('oauth_github_data')
  }

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white">Code History</h3>
        <p className="mt-1 text-sm text-zinc-400">
          Your code history helps prove your identity through years of commit history that
          can&apos;t be faked retroactively.
        </p>
      </div>

      <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-6">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.08]">
            <Github className="h-6 w-6 text-white" />
          </div>
          <h4 className="mt-3 font-medium text-white">Connect GitHub</h4>
          <p className="mt-1 text-sm text-zinc-400">
            We analyze account age, commit frequency, contribution patterns, and repo quality.
          </p>

          {connected && githubData ? (
            <div className="mt-4 rounded-lg bg-emerald-500/[0.1] border border-emerald-500/20 p-4 text-sm text-emerald-400">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <p className="font-medium">GitHub Connected</p>
              </div>
              <div className="mt-3 flex items-center gap-3 text-left">
                <img
                  src={githubData.avatarUrl}
                  alt={githubData.login}
                  className="h-10 w-10 rounded-full border border-white/10"
                />
                <div>
                  {githubData.name ? (
                    <p className="font-medium text-zinc-200">{githubData.name}</p>
                  ) : null}
                  <p className="text-zinc-400">@{githubData.login}</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-left text-zinc-300">
                <p>Account age: {githubData.accountAgeYears} year{githubData.accountAgeYears !== 1 ? 's' : ''}</p>
                <p>Public repos: {githubData.publicRepos}</p>
                <p>Followers: {githubData.followers}</p>
                <p>Total stars: {githubData.totalStars}</p>
                {githubData.topLanguages.length > 0 && (
                  <p className="col-span-2">Languages: {githubData.topLanguages.join(', ')}</p>
                )}
              </div>
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
              <Github className="h-4 w-4" />
              Connect with GitHub
            </Button>
          )}
        </div>
      </div>

      {!connected && (
        <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-4">
          <div className="flex items-start gap-4">
            <Checkbox
              id="hasGithub"
              checked={hasGithub}
              onCheckedChange={(checked) => setValue('hasGithub', !!checked)}
            />
            <div className="flex-1">
              <Label htmlFor="hasGithub" className="text-base font-medium text-zinc-200">
                Or look up by GitHub username
              </Label>
              <p className="mt-1 text-sm text-zinc-400">
                If you prefer not to connect via OAuth, enter your username and we&apos;ll fetch your public profile.
              </p>
              {hasGithub && (
                <div className="mt-3 flex gap-2">
                  <Input
                    placeholder="github-username"
                    {...register('githubUsername')}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleUsernameLookup()
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="gap-2 border border-white/[0.1] text-zinc-300 hover:text-zinc-200 hover:bg-white/[0.05]"
                    onClick={handleUsernameLookup}
                    disabled={lookingUp}
                  >
                    {lookingUp ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                    {lookingUp ? 'Looking up...' : 'Lookup'}
                  </Button>
                </div>
              )}
              {lookupError && (
                <div className="mt-2 flex items-center gap-2 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  {lookupError}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
