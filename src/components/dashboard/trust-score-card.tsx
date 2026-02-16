import { TrendingUp } from 'lucide-react'

type TrustScoreStatus = 'elite' | 'approved' | 'review_needed' | 'conditional' | 'not_eligible'

interface V2ProviderBreakdown {
  score: number
  max: number
  details?: Record<string, string | number | boolean>
}

interface TrustScoreCardProps {
  score: number
  status: TrustScoreStatus
  statusLabel: string
  breakdown: {
    digitalLineage: number
    business: number
    identity: number
    network: number
  }
  scoreBreakdown?: Record<string, unknown> | null
}

function getScoreColor(score: number): string {
  if (score >= 85) return 'text-emerald-400'
  if (score >= 70) return 'text-blue-400'
  if (score >= 50) return 'text-yellow-400'
  if (score >= 30) return 'text-orange-400'
  return 'text-red-400'
}

function getStatusStyle(status: TrustScoreStatus): string {
  switch (status) {
    case 'elite': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    case 'approved': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    case 'review_needed': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    case 'conditional': return 'bg-orange-500/10 text-orange-400 border-orange-500/20'
    case 'not_eligible': return 'bg-red-500/10 text-red-400 border-red-500/20'
    default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
  }
}

function getBarColor(value: number, max: number): string {
  if (max === 0) return 'bg-zinc-600'
  const pct = (value / max) * 100
  if (pct >= 75) return 'bg-emerald-500'
  if (pct >= 50) return 'bg-blue-500'
  if (pct >= 25) return 'bg-yellow-500'
  return 'bg-zinc-600'
}

export function TrustScoreCard({ score, status, statusLabel, breakdown, scoreBreakdown }: TrustScoreCardProps) {
  // If v2 score_breakdown JSON is available, use real per-provider scores
  const hasV2 = scoreBreakdown && typeof scoreBreakdown === 'object' && 'github' in scoreBreakdown

  let bars: { label: string; value: number; max: number }[]

  if (hasV2) {
    const github = scoreBreakdown.github as V2ProviderBreakdown | undefined
    const stripe = scoreBreakdown.stripe as V2ProviderBreakdown | undefined
    const linkedin = scoreBreakdown.linkedin as V2ProviderBreakdown | undefined
    const identity = scoreBreakdown.identity as V2ProviderBreakdown | undefined
    const dp = scoreBreakdown.digital_presence as V2ProviderBreakdown | undefined
    const network = scoreBreakdown.network as V2ProviderBreakdown | undefined

    bars = [
      { label: 'GitHub', value: github?.score ?? 0, max: github?.max ?? 30 },
      { label: 'Stripe / Financial', value: stripe?.score ?? 0, max: stripe?.max ?? 35 },
      { label: 'LinkedIn', value: linkedin?.score ?? 0, max: linkedin?.max ?? 15 },
      { label: 'Identity', value: identity?.score ?? 0, max: identity?.max ?? 20 },
      { label: 'Digital Presence', value: dp?.score ?? 0, max: dp?.max ?? 10 },
      { label: 'Trust Network', value: network?.score ?? 0, max: network?.max ?? 10 },
    ]
  } else {
    // Legacy fallback: approximate from DB columns
    const githubScore = Math.min(25, Math.round(breakdown.digitalLineage * 0.71))
    const digitalPresenceScore = Math.min(10, breakdown.digitalLineage - githubScore)
    const stripeScore = Math.min(25, breakdown.business)
    const linkedinScore = Math.min(10, breakdown.identity)
    const networkScore = Math.min(10, breakdown.network)

    bars = [
      { label: 'GitHub', value: githubScore, max: 25 },
      { label: 'Stripe / Financial', value: stripeScore, max: 25 },
      { label: 'LinkedIn', value: linkedinScore, max: 10 },
      { label: 'Digital Presence', value: digitalPresenceScore, max: 10 },
      { label: 'Trust Network', value: networkScore, max: 10 },
    ]
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Trust Score</h3>
        <TrendingUp className="h-5 w-5 text-zinc-600" />
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
          {score}
        </div>
        <div>
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusStyle(status)}`}>
            {statusLabel}
          </span>
          <p className="mt-1 text-sm text-zinc-500">out of 100 points</p>
        </div>
      </div>

      <div className="space-y-3">
        {bars.map((bar) => (
          <ScoreBar key={bar.label} label={bar.label} value={bar.value} max={bar.max} />
        ))}
      </div>
    </div>
  )
}

function ScoreBar({ label, value, max }: { label: string; value: number; max: number }) {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-zinc-500">{label}</span>
        <span className="font-medium text-zinc-300">
          {value}/{max}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all ${getBarColor(value, max)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
