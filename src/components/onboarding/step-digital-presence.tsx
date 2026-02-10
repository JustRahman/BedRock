'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { digitalPresenceSchema, DigitalPresenceFormData } from '@/lib/validations/onboarding'
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Twitter,
  Instagram,
  Smartphone,
  CheckCircle,
  AlertCircle,
  Loader2,
  Search,
  X,
  ExternalLink,
  Shield,
  Star,
  UserCheck,
} from 'lucide-react'
import type {
  DomainVerificationResult,
  TwitterVerificationResult,
  InstagramVerificationResult,
  AppStoreVerificationResult,
} from '@/lib/digital-presence-verification'

interface StepDigitalPresenceProps {
  data: Partial<DigitalPresenceFormData>
  founderName?: string
  onNext: (data: DigitalPresenceFormData) => void
  onBack: () => void
}

const STORAGE_KEY = 'digital_presence_verification'

interface StoredVerification {
  website?: DomainVerificationResult
  twitter?: TwitterVerificationResult
  instagram?: InstagramVerificationResult
  appStore?: AppStoreVerificationResult
}

export function StepDigitalPresence({ data, founderName, onNext, onBack }: StepDigitalPresenceProps) {
  const [websiteResult, setWebsiteResult] = useState<DomainVerificationResult | null>(null)
  const [twitterResult, setTwitterResult] = useState<TwitterVerificationResult | null>(null)
  const [instagramResult, setInstagramResult] = useState<InstagramVerificationResult | null>(null)
  const [appStoreResult, setAppStoreResult] = useState<AppStoreVerificationResult | null>(null)
  const [verifying, setVerifying] = useState({ website: false, appStore: false })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DigitalPresenceFormData>({
    resolver: zodResolver(digitalPresenceSchema),
    defaultValues: {
      website: data.website ?? '',
      twitterHandle: data.twitterHandle ?? '',
      instagramHandle: data.instagramHandle ?? '',
      appStoreUrl: data.appStoreUrl ?? '',
      websiteVerified: data.websiteVerified ?? false,
      twitterVerified: data.twitterVerified ?? false,
      instagramVerified: data.instagramVerified ?? false,
      appStoreVerified: data.appStoreVerified ?? false,
    },
  })

  const website = watch('website')
  const twitterHandle = watch('twitterHandle')
  const instagramHandle = watch('instagramHandle')
  const appStoreUrl = watch('appStoreUrl')

  // Restore verification results from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as StoredVerification
        if (parsed.website) {
          setWebsiteResult(parsed.website)
          setValue('websiteVerified', parsed.website.isLive && !parsed.website.error && parsed.website.nameFound === true)
        }
        if (parsed.twitter) {
          setTwitterResult(parsed.twitter)
          setValue('twitterVerified', parsed.twitter.valid)
        }
        if (parsed.instagram) {
          setInstagramResult(parsed.instagram)
          setValue('instagramVerified', parsed.instagram.valid)
        }
        if (parsed.appStore) {
          setAppStoreResult(parsed.appStore)
          setValue('appStoreVerified', !parsed.appStore.error)
        }
      }
    } catch {
      // Ignore
    }
  }, [setValue])

  // Persist verification results to sessionStorage
  function persistResults(
    ws?: DomainVerificationResult | null,
    tw?: TwitterVerificationResult | null,
    ig?: InstagramVerificationResult | null,
    app?: AppStoreVerificationResult | null,
  ) {
    try {
      const stored: StoredVerification = {}
      if (ws) stored.website = ws
      if (tw) stored.twitter = tw
      if (ig) stored.instagram = ig
      if (app) stored.appStore = app
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    } catch {
      // Ignore
    }
  }

  // === Verify Handlers ===

  const handleVerifyWebsite = async () => {
    const url = website?.trim()
    if (!url) return

    setVerifying((v) => ({ ...v, website: true }))
    setWebsiteResult(null)

    try {
      const res = await fetch('/api/verify/digital-presence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'domain', value: url, founderName }),
      })
      const json = await res.json()
      const result = json.data as DomainVerificationResult
      setWebsiteResult(result)
      // Only fully verified if site is live AND founder name found on page
      setValue('websiteVerified', json.success && result.nameFound === true)
      persistResults(result, twitterResult, instagramResult, appStoreResult)
    } catch {
      setWebsiteResult({ isLive: false, hasSSL: false, error: 'Verification request failed' })
      setValue('websiteVerified', false)
    } finally {
      setVerifying((v) => ({ ...v, website: false }))
    }
  }

  const handleVerifyTwitter = () => {
    const handle = twitterHandle?.trim()
    if (!handle) return

    // Client-side format validation — call the same logic
    let normalized = handle.replace(/^https?:\/\/(www\.)?(twitter|x)\.com\//, '').replace(/^@/, '').split('/')[0].split('?')[0]
    const valid = /^[a-zA-Z0-9_]{1,15}$/.test(normalized)
    const result: TwitterVerificationResult = { handle: normalized, valid, profileUrl: `https://x.com/${normalized}` }
    setTwitterResult(result)
    setValue('twitterVerified', valid)
    setValue('twitterHandle', normalized)
    persistResults(websiteResult, result, instagramResult, appStoreResult)
  }

  const handleVerifyInstagram = () => {
    const handle = instagramHandle?.trim()
    if (!handle) return

    let normalized = handle.replace(/^https?:\/\/(www\.)?instagram\.com\//, '').replace(/^@/, '').split('/')[0].split('?')[0]
    const valid = /^[a-zA-Z0-9_.]{1,30}$/.test(normalized)
    const result: InstagramVerificationResult = { handle: normalized, valid, profileUrl: `https://instagram.com/${normalized}` }
    setInstagramResult(result)
    setValue('instagramVerified', valid)
    setValue('instagramHandle', normalized)
    persistResults(websiteResult, twitterResult, result, appStoreResult)
  }

  const handleVerifyAppStore = async () => {
    const url = appStoreUrl?.trim()
    if (!url) return

    setVerifying((v) => ({ ...v, appStore: true }))
    setAppStoreResult(null)

    try {
      const res = await fetch('/api/verify/digital-presence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'appstore', value: url }),
      })
      const json = await res.json()
      const result = json.data as AppStoreVerificationResult
      setAppStoreResult(result)
      setValue('appStoreVerified', json.success)
      persistResults(websiteResult, twitterResult, instagramResult, result)
    } catch {
      setAppStoreResult({ error: 'Verification request failed' })
      setValue('appStoreVerified', false)
    } finally {
      setVerifying((v) => ({ ...v, appStore: false }))
    }
  }

  // === Clear Handlers ===

  const clearWebsite = () => {
    setWebsiteResult(null)
    setValue('website', '')
    setValue('websiteVerified', false)
    persistResults(null, twitterResult, instagramResult, appStoreResult)
  }

  const clearTwitter = () => {
    setTwitterResult(null)
    setValue('twitterHandle', '')
    setValue('twitterVerified', false)
    persistResults(websiteResult, null, instagramResult, appStoreResult)
  }

  const clearInstagram = () => {
    setInstagramResult(null)
    setValue('instagramHandle', '')
    setValue('instagramVerified', false)
    persistResults(websiteResult, twitterResult, null, appStoreResult)
  }

  const clearAppStore = () => {
    setAppStoreResult(null)
    setValue('appStoreUrl', '')
    setValue('appStoreVerified', false)
    persistResults(websiteResult, twitterResult, instagramResult, null)
  }

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white">Digital Presence</h3>
        <p className="mt-1 text-sm text-zinc-400">
          Your online presence across websites and social platforms helps verify your
          identity. Click &quot;Verify&quot; to check each entry.
        </p>
      </div>

      {/* Website */}
      <div className="space-y-2">
        <Label htmlFor="website" className="flex items-center gap-2 text-zinc-300">
          <Globe className="h-4 w-4" />
          Website URL
        </Label>
        {websiteResult && !websiteResult.error ? (
          <div className={`rounded-lg p-4 text-sm ${websiteResult.nameFound ? 'bg-emerald-500/[0.1] border border-emerald-500/20' : 'bg-orange-500/[0.1] border border-orange-500/20'}`}>
            <div className="flex items-center justify-between">
              <div className={`flex items-center gap-2 ${websiteResult.nameFound ? 'text-emerald-400' : 'text-orange-400'}`}>
                {websiteResult.nameFound ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <span className="font-medium">{websiteResult.nameFound ? 'Website Verified' : 'Website Found — Name Not Detected'}</span>
              </div>
              <Button type="button" variant="ghost" size="sm" onClick={clearWebsite} className="h-6 w-6 p-0 text-zinc-400 hover:text-zinc-200">
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="mt-3 space-y-1.5 text-zinc-300">
              {websiteResult.title ? (
                <p><span className="text-zinc-500">Title:</span> {websiteResult.title}</p>
              ) : null}
              {websiteResult.description ? (
                <p className="line-clamp-2"><span className="text-zinc-500">Description:</span> {websiteResult.description}</p>
              ) : null}
              {websiteResult.domainAge != null ? (
                <p><span className="text-zinc-500">Domain age:</span> {websiteResult.domainAge} year{websiteResult.domainAge !== 1 ? 's' : ''}</p>
              ) : null}
              {websiteResult.registrar ? (
                <p><span className="text-zinc-500">Registrar:</span> {websiteResult.registrar}</p>
              ) : null}
              <div className="flex items-center gap-3 pt-1">
                {websiteResult.hasSSL ? (
                  <span className="flex items-center gap-1 text-emerald-400 text-xs"><Shield className="h-3 w-3" /> SSL</span>
                ) : (
                  <span className="flex items-center gap-1 text-orange-400 text-xs"><AlertCircle className="h-3 w-3" /> No SSL</span>
                )}
                {websiteResult.isLive ? (
                  <span className="text-emerald-400 text-xs">Live</span>
                ) : (
                  <span className="text-orange-400 text-xs">Unreachable</span>
                )}
                {websiteResult.nameFound != null ? (
                  websiteResult.nameFound ? (
                    <span className="flex items-center gap-1 text-emerald-400 text-xs"><UserCheck className="h-3 w-3" /> Name found</span>
                  ) : (
                    <span className="flex items-center gap-1 text-zinc-500 text-xs"><UserCheck className="h-3 w-3" /> Name not found</span>
                  )
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex gap-2">
              <Input
                id="website"
                placeholder="https://yourcompany.com"
                {...register('website')}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleVerifyWebsite()
                  }
                }}
              />
              <Button
                type="button"
                variant="ghost"
                className="gap-2 border border-white/[0.1] text-zinc-300 hover:text-zinc-200 hover:bg-white/[0.05]"
                onClick={handleVerifyWebsite}
                disabled={verifying.website || !website?.trim()}
              >
                {verifying.website ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                {verifying.website ? 'Verifying...' : 'Verify'}
              </Button>
            </div>
            {errors.website ? (
              <p className="text-sm text-red-400">{errors.website.message}</p>
            ) : null}
            {websiteResult?.error ? (
              <div className="flex items-center gap-2 text-sm text-orange-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {websiteResult.error}
              </div>
            ) : null}
            <p className="text-xs text-zinc-500">
              We check domain age and website content via WHOIS lookup.
            </p>
          </>
        )}
      </div>

      {/* Twitter/X */}
      <div className="space-y-2">
        <Label htmlFor="twitterHandle" className="flex items-center gap-2 text-zinc-300">
          <Twitter className="h-4 w-4" />
          Twitter/X Handle
        </Label>
        {twitterResult?.valid ? (
          <div className="rounded-lg bg-emerald-500/[0.1] border border-emerald-500/20 p-4 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle className="h-4 w-4" />
                <span className="font-medium">Valid Handle</span>
              </div>
              <Button type="button" variant="ghost" size="sm" onClick={clearTwitter} className="h-6 w-6 p-0 text-zinc-400 hover:text-zinc-200">
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="mt-2 flex items-center gap-2 text-zinc-300">
              <span>@{twitterResult.handle}</span>
              <a
                href={twitterResult.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="flex gap-2">
              <Input
                id="twitterHandle"
                placeholder="@yourhandle"
                {...register('twitterHandle')}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleVerifyTwitter()
                  }
                }}
              />
              <Button
                type="button"
                variant="ghost"
                className="gap-2 border border-white/[0.1] text-zinc-300 hover:text-zinc-200 hover:bg-white/[0.05]"
                onClick={handleVerifyTwitter}
                disabled={!twitterHandle?.trim()}
              >
                <Search className="h-4 w-4" />
                Verify
              </Button>
            </div>
            {twitterResult && !twitterResult.valid ? (
              <div className="flex items-center gap-2 text-sm text-orange-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                Invalid handle format. Use 1-15 characters: letters, numbers, underscores.
              </div>
            ) : null}
            <p className="text-xs text-zinc-500">
              We validate the handle format (letters, numbers, underscores, max 15 chars).
            </p>
          </>
        )}
      </div>

      {/* Instagram */}
      <div className="space-y-2">
        <Label htmlFor="instagramHandle" className="flex items-center gap-2 text-zinc-300">
          <Instagram className="h-4 w-4" />
          Instagram Handle
        </Label>
        {instagramResult?.valid ? (
          <div className="rounded-lg bg-emerald-500/[0.1] border border-emerald-500/20 p-4 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle className="h-4 w-4" />
                <span className="font-medium">Valid Handle</span>
              </div>
              <Button type="button" variant="ghost" size="sm" onClick={clearInstagram} className="h-6 w-6 p-0 text-zinc-400 hover:text-zinc-200">
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="mt-2 flex items-center gap-2 text-zinc-300">
              <span>@{instagramResult.handle}</span>
              <a
                href={instagramResult.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="flex gap-2">
              <Input
                id="instagramHandle"
                placeholder="@yourhandle"
                {...register('instagramHandle')}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleVerifyInstagram()
                  }
                }}
              />
              <Button
                type="button"
                variant="ghost"
                className="gap-2 border border-white/[0.1] text-zinc-300 hover:text-zinc-200 hover:bg-white/[0.05]"
                onClick={handleVerifyInstagram}
                disabled={!instagramHandle?.trim()}
              >
                <Search className="h-4 w-4" />
                Verify
              </Button>
            </div>
            {instagramResult && !instagramResult.valid ? (
              <div className="flex items-center gap-2 text-sm text-orange-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                Invalid handle format. Use 1-30 characters: letters, numbers, periods, underscores.
              </div>
            ) : null}
            <p className="text-xs text-zinc-500">
              We validate the handle format (letters, numbers, periods, underscores, max 30 chars).
            </p>
          </>
        )}
      </div>

      {/* App Store */}
      <div className="space-y-2">
        <Label htmlFor="appStoreUrl" className="flex items-center gap-2 text-zinc-300">
          <Smartphone className="h-4 w-4" />
          App Store URL (if applicable)
        </Label>
        {appStoreResult && !appStoreResult.error ? (
          <div className="rounded-lg bg-emerald-500/[0.1] border border-emerald-500/20 p-4 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle className="h-4 w-4" />
                <span className="font-medium">App Found</span>
              </div>
              <Button type="button" variant="ghost" size="sm" onClick={clearAppStore} className="h-6 w-6 p-0 text-zinc-400 hover:text-zinc-200">
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="mt-3 flex items-start gap-3">
              {appStoreResult.iconUrl ? (
                <img
                  src={appStoreResult.iconUrl}
                  alt={appStoreResult.appName || 'App icon'}
                  className="h-12 w-12 rounded-xl border border-white/10"
                />
              ) : null}
              <div className="space-y-1 text-zinc-300">
                {appStoreResult.appName ? (
                  <p className="font-medium text-zinc-200">{appStoreResult.appName}</p>
                ) : null}
                {appStoreResult.developer ? (
                  <p className="text-zinc-400">{appStoreResult.developer}</p>
                ) : null}
                <div className="flex items-center gap-3 text-xs">
                  {appStoreResult.rating != null ? (
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      {appStoreResult.rating}
                      {appStoreResult.ratingCount ? ` (${appStoreResult.ratingCount.toLocaleString()})` : ''}
                    </span>
                  ) : null}
                  {appStoreResult.price ? (
                    <span>{appStoreResult.price}</span>
                  ) : null}
                  {appStoreResult.genre ? (
                    <span className="text-zinc-500">{appStoreResult.genre}</span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex gap-2">
              <Input
                id="appStoreUrl"
                placeholder="https://apps.apple.com/app/..."
                {...register('appStoreUrl')}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleVerifyAppStore()
                  }
                }}
              />
              <Button
                type="button"
                variant="ghost"
                className="gap-2 border border-white/[0.1] text-zinc-300 hover:text-zinc-200 hover:bg-white/[0.05]"
                onClick={handleVerifyAppStore}
                disabled={verifying.appStore || !appStoreUrl?.trim()}
              >
                {verifying.appStore ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                {verifying.appStore ? 'Verifying...' : 'Verify'}
              </Button>
            </div>
            {errors.appStoreUrl ? (
              <p className="text-sm text-red-400">{errors.appStoreUrl.message}</p>
            ) : null}
            {appStoreResult?.error ? (
              <div className="flex items-center gap-2 text-sm text-orange-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {appStoreResult.error}
              </div>
            ) : null}
          </>
        )}
      </div>

      <p className="text-sm text-zinc-500">
        All fields are optional. Verified entries earn more trust score points (up to 10 points total).
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
