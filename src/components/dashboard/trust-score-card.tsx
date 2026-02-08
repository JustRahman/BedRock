import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { getStatusColor, getScoreColor, TrustScoreResult } from '@/lib/trust-score'
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

export function TrustScoreCard({ score, status, statusLabel, breakdown }: TrustScoreCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Trust Score</CardTitle>
        <TrendingUp className="h-5 w-5 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
            {score}
          </div>
          <div>
            <Badge className={getStatusColor(status)}>{statusLabel}</Badge>
            <p className="mt-1 text-sm text-gray-500">out of 100 points</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <ScoreBar label="Digital Lineage" value={breakdown.digitalLineage} max={40} />
          <ScoreBar label="Business" value={breakdown.business} max={25} />
          <ScoreBar label="Identity" value={breakdown.identity} max={20} />
          <ScoreBar label="Network" value={breakdown.network} max={15} />
        </div>
      </CardContent>
    </Card>
  )
}

function ScoreBar({ label, value, max }: { label: string; value: number; max: number }) {
  const percentage = (value / max) * 100

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">{label}</span>
        <span className="font-medium text-gray-700">
          {value}/{max}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  )
}
