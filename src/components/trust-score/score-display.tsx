'use client'

import { TrustScoreResult } from '@/lib/trust-score'
import { Check, X, Lightbulb } from 'lucide-react'

interface ScoreDisplayProps {
  result: TrustScoreResult
}

function getDarkScoreColor(score: number): string {
  if (score >= 85) return 'text-emerald-400'
  if (score >= 70) return 'text-blue-400'
  if (score >= 50) return 'text-yellow-400'
  if (score >= 30) return 'text-orange-400'
  return 'text-red-400'
}

function getDarkStatusStyle(status: TrustScoreResult['status']): { bg: string; text: string; border: string } {
  switch (status) {
    case 'elite':
      return { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' }
    case 'approved':
      return { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' }
    case 'review_needed':
      return { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' }
    case 'conditional':
      return { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' }
    case 'not_eligible':
      return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' }
    default:
      return { bg: 'bg-zinc-500/10', text: 'text-zinc-400', border: 'border-zinc-500/20' }
  }
}

function getBarColor(score: number, max: number): string {
  const pct = (score / max) * 100
  if (pct >= 75) return 'bg-emerald-500'
  if (pct >= 50) return 'bg-blue-500'
  if (pct >= 25) return 'bg-yellow-500'
  return 'bg-zinc-600'
}

export function ScoreDisplay({ result }: ScoreDisplayProps) {
  const statusStyle = getDarkStatusStyle(result.status)

  return (
    <div className="space-y-6">
      {/* Main Score */}
      <div className="text-center">
        <div className={`text-7xl font-bold tracking-tight ${getDarkScoreColor(result.totalScore)}`}>
          {result.totalScore}
        </div>
        <p className="mt-1 text-sm text-zinc-500">out of 100 points</p>
        <div className={`mt-4 inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
          {result.statusLabel}
        </div>
        <p className="mt-3 text-sm text-zinc-400">{result.statusDescription}</p>
      </div>

      {/* Score Breakdown Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <ScoreCategory
          name="Digital Lineage"
          score={result.digitalLineageScore}
          max={result.breakdown.digitalLineage.max}
        />
        <ScoreCategory
          name="Business"
          score={result.businessScore}
          max={result.breakdown.business.max}
        />
        <ScoreCategory
          name="Identity"
          score={result.identityScore}
          max={result.breakdown.identity.max}
        />
        <ScoreCategory
          name="Network"
          score={result.networkScore}
          max={result.breakdown.network.max}
        />
      </div>

      {/* Country Adjustment */}
      {result.countryAdjustment !== 0 && (
        <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 px-4 py-3 text-center text-sm text-orange-300">
          Country risk adjustment: {result.countryAdjustment} points
        </div>
      )}
    </div>
  )
}

function ScoreCategory({ name, score, max }: { name: string; score: number; max: number }) {
  const percentage = Math.round((score / max) * 100)

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
  result: TrustScoreResult
}

export function ScoreBreakdownDetail({ result }: ScoreBreakdownDetailProps) {
  return (
    <div className="space-y-4">
      {/* Digital Lineage — with nested sub-sections */}
      <BreakdownCard
        name="Digital Lineage"
        total={result.breakdown.digitalLineage.total}
        max={result.breakdown.digitalLineage.max}
      >
        <SubSection name="Code History" data={result.breakdown.digitalLineage.codeHistory} />
        <SubSection name="Professional Graph" data={result.breakdown.digitalLineage.professionalGraph} />
        <SubSection name="Digital Presence" data={result.breakdown.digitalLineage.digitalPresence} />
      </BreakdownCard>

      <CategoryCard name="Business Signals" data={result.breakdown.business} />
      <CategoryCard name="Identity Verification" data={result.breakdown.identity} />
      <CategoryCard name="Trust Network" data={result.breakdown.network} />
    </div>
  )
}

function BreakdownCard({ name, total, max, children }: { name: string; total: number; max: number; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-200">{name}</span>
        <span className="text-sm text-zinc-500">{total} / {max}</span>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}

function SubSection({
  name,
  data,
}: {
  name: string
  data: { total: number; max: number; items: { name: string; points: number; earned: boolean }[] }
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="font-medium text-zinc-400">{name}</span>
        <span className="text-zinc-600">{data.total} / {data.max}</span>
      </div>
      <ul className="space-y-1">
        {data.items.map((item, index) => (
          <ScoreItem key={index} item={item} />
        ))}
      </ul>
    </div>
  )
}

function CategoryCard({
  name,
  data,
}: {
  name: string
  data: { total: number; max: number; items: { name: string; points: number; earned: boolean }[] }
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-200">{name}</span>
        <span className="text-sm text-zinc-500">{data.total} / {data.max}</span>
      </div>
      <ul className="space-y-2">
        {data.items.map((item, index) => (
          <ScoreItem key={index} item={item} />
        ))}
      </ul>
    </div>
  )
}

function ScoreItem({ item }: { item: { name: string; points: number; earned: boolean } }) {
  return (
    <li className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-2">
        {item.earned ? (
          <Check className="h-3.5 w-3.5 text-emerald-400" />
        ) : (
          <X className="h-3.5 w-3.5 text-zinc-600" />
        )}
        <span className={item.earned ? 'text-zinc-300' : 'text-zinc-600'}>
          {item.name}
        </span>
      </span>
      <span
        className={
          item.earned
            ? item.points > 0
              ? 'font-medium text-emerald-400'
              : 'font-medium text-red-400'
            : 'text-zinc-600'
        }
      >
        {item.points > 0 ? '+' : ''}{item.points}
      </span>
    </li>
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
