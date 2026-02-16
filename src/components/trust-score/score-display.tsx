'use client'

import { TrustScoreV2Result, ProviderBreakdown } from '@/lib/trust-score-v2'
import { Lightbulb } from 'lucide-react'

interface ScoreDisplayProps {
  result: TrustScoreV2Result
}

function getDarkScoreColor(score: number): string {
  if (score >= 85) return 'text-emerald-400'
  if (score >= 65) return 'text-blue-400'
  if (score >= 45) return 'text-yellow-400'
  if (score >= 25) return 'text-orange-400'
  return 'text-red-400'
}

function getStatusFromRisk(risk: TrustScoreV2Result['risk_level']): { label: string; description: string; bg: string; text: string; border: string } {
  switch (risk) {
    case 'low':
      return {
        label: 'Approved',
        description: 'Great news! You meet our approval criteria. Full access to all services.',
        bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20',
      }
    case 'medium':
      return {
        label: 'Review Needed',
        description: 'Your application requires manual review. We may schedule a brief video call.',
        bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20',
      }
    case 'high':
      return {
        label: 'Almost There',
        description: 'A few more verification steps will strengthen your application significantly.',
        bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20',
      }
    case 'critical':
      return {
        label: 'Getting Started',
        description: 'Complete the steps below to strengthen your application — we\u2019re here to help.',
        bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20',
      }
    default:
      return {
        label: 'Unknown',
        description: '',
        bg: 'bg-zinc-500/10', text: 'text-zinc-400', border: 'border-zinc-500/20',
      }
  }
}

function getBarColor(score: number, max: number): string {
  if (max === 0) return 'bg-zinc-600'
  const pct = (score / max) * 100
  if (pct >= 75) return 'bg-emerald-500'
  if (pct >= 50) return 'bg-blue-500'
  if (pct >= 25) return 'bg-yellow-500'
  return 'bg-zinc-600'
}

export function ScoreDisplay({ result }: ScoreDisplayProps) {
  const status = getStatusFromRisk(result.risk_level)
  const b = result.breakdown

  return (
    <div className="space-y-6">
      {/* Main Score */}
      <div className="text-center">
        <div className={`text-7xl font-bold tracking-tight ${getDarkScoreColor(result.score)}`}>
          {result.score}
        </div>
        <p className="mt-1 text-sm text-zinc-500">out of 100 points</p>
        <div className={`mt-4 inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${status.bg} ${status.text} ${status.border}`}>
          {status.label}
        </div>
        <p className="mt-3 text-sm text-zinc-400">{status.description}</p>
      </div>

      {/* Provider Score Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <ScoreCategory name="GitHub" score={b.github.score} max={b.github.max} />
        <ScoreCategory name="Stripe" score={b.stripe.score} max={b.stripe.max} />
        <ScoreCategory name="LinkedIn" score={b.linkedin.score} max={b.linkedin.max} />
        <ScoreCategory name="Identity" score={b.identity.score} max={b.identity.max} />
        <ScoreCategory name="Digital" score={b.digital_presence.score} max={b.digital_presence.max} />
        <ScoreCategory name="Network" score={b.network.score} max={b.network.max} />
      </div>

      {/* Country Adjustment */}
      {result.country_adjustment !== 0 && (
        <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 px-4 py-3 text-center text-sm text-orange-300">
          Country risk adjustment: {result.country_adjustment} points
        </div>
      )}
    </div>
  )
}

function ScoreCategory({ name, score, max }: { name: string; score: number; max: number }) {
  const percentage = max > 0 ? Math.round((score / max) * 100) : 0

  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 text-center">
      <p className="text-xs font-medium text-zinc-500">{name}</p>
      <p className="mt-1 text-2xl font-bold text-white">{score}</p>
      <p className="text-xs text-zinc-600">/ {max}</p>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={`h-full rounded-full transition-all ${getBarColor(score, max)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

interface ScoreBreakdownDetailProps {
  result: TrustScoreV2Result
}

const providerLabels: Record<string, string> = {
  github: 'GitHub',
  stripe: 'Stripe / Financial',
  linkedin: 'LinkedIn',
  identity: 'Identity Verification',
  digital_presence: 'Digital Presence',
  network: 'Trust Network',
}

const detailLabels: Record<string, string> = {
  connected: 'OAuth Connected',
  username: 'Username',
  account_age_years: 'Account Age (years)',
  repos: 'Public Repos',
  stars: 'Total Stars',
  followers: 'Followers',
  languages: 'Languages',
  username_only: 'Username Only (capped)',
  monthly_revenue: 'Monthly Revenue',
  account_age_months: 'Account Age (months)',
  chargeback_rate: 'Chargeback Rate',
  total_charges: 'Total Charges',
  bank_statements: 'Bank Statements',
  has_picture: 'Has Profile Picture',
  email_verified: 'Email Verified',
  url_only: 'URL Only (partial)',
  passport: 'Passport Uploaded',
  name_match: 'Name Matches Passport',
  dob_match: 'DOB Matches Passport',
  gender_match: 'Gender Matches',
  nationality_match: 'Nationality Matches',
  local_id: 'Local Government ID',
  face_verified: 'Face Verification',
  face_skipped: 'Face Scan Skipped',
  address_verified: 'Address Verified',
  website: 'Website Verified',
  twitter: 'Twitter/X Verified',
  instagram: 'Instagram Verified',
  app_store: 'App Store App',
  referral: 'Founder Referral',
  university: 'University Email',
  accelerator: 'Accelerator',
  employer: 'Employer Verification',
}

export function ScoreBreakdownDetail({ result }: ScoreBreakdownDetailProps) {
  const providers = Object.entries(result.breakdown) as [string, ProviderBreakdown][]

  return (
    <div className="space-y-4">
      {providers.map(([key, provider]) => (
        <ProviderCard key={key} name={providerLabels[key] || key} provider={provider} />
      ))}
    </div>
  )
}

function ProviderCard({ name, provider }: { name: string; provider: ProviderBreakdown }) {
  const percentage = provider.max > 0 ? Math.round((provider.score / provider.max) * 100) : 0

  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-200">{name}</span>
        <span className="text-sm text-zinc-500">{provider.score} / {provider.max}</span>
      </div>
      <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={`h-full rounded-full transition-all ${getBarColor(provider.score, provider.max)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {Object.keys(provider.details).length > 0 && (
        <ul className="space-y-1">
          {Object.entries(provider.details).map(([key, value]) => (
            <li key={key} className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">{detailLabels[key] || key}</span>
              <span className={`font-medium ${value === true ? 'text-emerald-400' : value === false ? 'text-zinc-600' : 'text-zinc-300'}`}>
                {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

interface ImprovementSuggestionsProps {
  improvements: string[]
}

export function ImprovementSuggestions({ improvements }: ImprovementSuggestionsProps) {
  if (improvements.length === 0) return null

  return (
    <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-400">
        <Lightbulb className="h-4 w-4" />
        Ways to Improve Your Score
      </div>
      <ul className="space-y-2">
        {improvements.map((improvement, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-blue-300/80">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/50" />
            {improvement}
          </li>
        ))}
      </ul>
    </div>
  )
}
