'use client'

import { TrustScoreResult, getStatusColor, getScoreColor } from '@/lib/trust-score'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, X, Lightbulb } from 'lucide-react'

interface ScoreDisplayProps {
  result: TrustScoreResult
}

export function ScoreDisplay({ result }: ScoreDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Main Score */}
      <div className="text-center">
        <div className={`text-6xl font-bold ${getScoreColor(result.totalScore)}`}>
          {result.totalScore}
        </div>
        <p className="mt-2 text-sm text-gray-500">out of 100 points</p>
        <Badge className={`mt-4 ${getStatusColor(result.status)}`}>
          {result.statusLabel}
        </Badge>
        <p className="mt-4 text-sm text-gray-600">{result.statusDescription}</p>
      </div>

      {/* Score Breakdown */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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
        <div className="rounded-lg border border-orange-200 bg-orange-50 p-3 text-center text-sm text-orange-700">
          Country risk adjustment: {result.countryAdjustment} points
        </div>
      )}
    </div>
  )
}

function ScoreCategory({ name, score, max }: { name: string; score: number; max: number }) {
  const percentage = (score / max) * 100

  return (
    <div className="rounded-lg border border-gray-200 p-4 text-center">
      <p className="text-sm font-medium text-gray-500">{name}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{score}</p>
      <p className="text-xs text-gray-400">/ {max}</p>
      <Progress value={percentage} className="mt-2 h-2" />
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
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-base">
            <span>Digital Lineage</span>
            <span className="text-sm font-normal text-gray-500">
              {result.breakdown.digitalLineage.total} / {result.breakdown.digitalLineage.max}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SubSection
            name="Code History"
            data={result.breakdown.digitalLineage.codeHistory}
          />
          <SubSection
            name="Professional Graph"
            data={result.breakdown.digitalLineage.professionalGraph}
          />
          <SubSection
            name="Digital Presence"
            data={result.breakdown.digitalLineage.digitalPresence}
          />
        </CardContent>
      </Card>

      {/* Business Signals */}
      <CategoryCard
        name="Business Signals"
        data={result.breakdown.business}
      />

      {/* Identity Verification */}
      <CategoryCard
        name="Identity Verification"
        data={result.breakdown.identity}
      />

      {/* Trust Network */}
      <CategoryCard
        name="Trust Network"
        data={result.breakdown.network}
      />
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
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">{name}</span>
        <span className="text-gray-500">
          {data.total} / {data.max}
        </span>
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
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-base">
          <span>{name}</span>
          <span className="text-sm font-normal text-gray-500">
            {data.total} / {data.max}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {data.items.map((item, index) => (
            <ScoreItem key={index} item={item} />
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function ScoreItem({ item }: { item: { name: string; points: number; earned: boolean } }) {
  return (
    <li className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-2">
        {item.earned ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <X className="h-4 w-4 text-gray-300" />
        )}
        <span className={item.earned ? 'text-gray-900' : 'text-gray-400'}>
          {item.name}
        </span>
      </span>
      <span
        className={
          item.earned
            ? item.points > 0
              ? 'font-medium text-green-600'
              : 'font-medium text-red-600'
            : 'text-gray-400'
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
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base text-blue-800">
          <Lightbulb className="h-5 w-5" />
          Ways to Improve Your Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {improvements.map((improvement, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-blue-700">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
              {improvement}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
