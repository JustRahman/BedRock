import { TrustScoreResult } from '@/lib/trust-score'
import { TrendingUp } from 'lucide-react'

interface TrustScoreCardProps {
  score: number
  status: TrustScoreResult['status']
  statusLabel: string
  breakdown: {
    digitalLineage: number
    business: number
    identity: number
    network: number
  }
}

function getScoreColor(score: number): string {
  if (score >= 85) return 'text-emerald-400'
  if (score >= 70) return 'text-blue-400'
  if (score >= 50) return 'text-yellow-400'
  if (score >= 30) return 'text-orange-400'
  return 'text-red-400'
}

function getStatusStyle(status: TrustScoreResult['status']): string {
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
  const pct = (value / max) * 100
  if (pct >= 75) return 'bg-emerald-500'
  if (pct >= 50) return 'bg-blue-500'
  if (pct >= 25) return 'bg-yellow-500'
  return 'bg-zinc-600'
}

export function TrustScoreCard({ score, status, statusLabel, breakdown }: TrustScoreCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
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
        <ScoreBar label="Digital Lineage" value={breakdown.digitalLineage} max={40} />
        <ScoreBar label="Business" value={breakdown.business} max={25} />
        <ScoreBar label="Identity" value={breakdown.identity} max={20} />
        <ScoreBar label="Network" value={breakdown.network} max={15} />
      </div>
    </div>
  )
}

function ScoreBar({ label, value, max }: { label: string; value: number; max: number }) {
  const percentage = Math.round((value / max) * 100)

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-zinc-500">{label}</span>
        <span className="font-medium text-zinc-300">
          {value}/{max}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
        <div
          className={`h-full rounded-full transition-all ${getBarColor(value, max)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
