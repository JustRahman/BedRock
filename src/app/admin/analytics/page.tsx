export const dynamic = 'force-dynamic'

import { createServiceClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StatsCard } from '@/components/admin'
import { Users, Building2, DollarSign, TrendingUp } from 'lucide-react'

export default async function AnalyticsPage() {
  const supabase = createServiceClient()

  const [
    { count: totalFounders },
    { count: totalCompanies },
    { data: scores },
    { data: payments },
    { data: companiesByState },
    { data: recentFounders },
  ] = await Promise.all([
    supabase.from('founders').select('*', { count: 'exact', head: true }),
    supabase.from('companies').select('*', { count: 'exact', head: true }),
    supabase.from('trust_scores').select('total_score, status'),
    supabase.from('payments').select('amount, status').eq('status', 'completed'),
    supabase.from('companies').select('state'),
    supabase.from('founders').select('created_at').order('created_at', { ascending: false }).limit(30),
  ])

  const allScores = (scores || []) as { total_score: number; status: string }[]
  const avgScore = allScores.length > 0
    ? Math.round(allScores.reduce((s, x) => s + x.total_score, 0) / allScores.length)
    : 0

  const totalRevenue = ((payments || []) as { amount: number }[])
    .reduce((s, p) => s + p.amount, 0)

  const stateBreakdown = ((companiesByState || []) as { state: string | null }[])
    .reduce((acc, c) => {
      const st = c.state || 'Unknown'
      acc[st] = (acc[st] || 0) + 1
      return acc
    }, {} as Record<string, number>)

  const scoreDistribution = [
    { range: '80-100', count: allScores.filter((s) => s.total_score >= 80).length, color: 'bg-green-500' },
    { range: '70-79', count: allScores.filter((s) => s.total_score >= 70 && s.total_score < 80).length, color: 'bg-blue-500' },
    { range: '50-69', count: allScores.filter((s) => s.total_score >= 50 && s.total_score < 70).length, color: 'bg-yellow-500' },
    { range: '30-49', count: allScores.filter((s) => s.total_score >= 30 && s.total_score < 50).length, color: 'bg-orange-500' },
    { range: '0-29', count: allScores.filter((s) => s.total_score < 30).length, color: 'bg-red-500' },
  ]

  const total = allScores.length || 1

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-1 text-sm text-gray-500">Platform metrics and insights.</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Founders" value={totalFounders || 0} icon={Users} />
        <StatsCard title="Total Companies" value={totalCompanies || 0} icon={Building2} />
        <StatsCard title="Avg Trust Score" value={avgScore} icon={TrendingUp} />
        <StatsCard title="Total Revenue" value={`$${(totalRevenue / 100).toFixed(0)}`} icon={DollarSign} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Score Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Trust Score Distribution</CardTitle>
            <CardDescription>{allScores.length} scores recorded</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scoreDistribution.map((item) => (
                <div key={item.range} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-600">{item.range}</div>
                  <div className="flex-1">
                    <div className="h-4 rounded-full bg-gray-200">
                      <div
                        className={`h-4 rounded-full ${item.color}`}
                        style={{ width: `${Math.round((item.count / total) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-12 text-right text-sm font-medium text-gray-900">{item.count}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* State Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Companies by State</CardTitle>
            <CardDescription>Formation state distribution</CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(stateBreakdown).length === 0 ? (
              <p className="text-sm text-gray-500">No companies yet.</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(stateBreakdown)
                  .sort((a, b) => b[1] - a[1])
                  .map(([state, count]) => (
                    <div key={state} className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                      <span className="font-medium text-gray-900">
                        {state === 'DE' ? 'Delaware' : state === 'WY' ? 'Wyoming' : state}
                      </span>
                      <span className="text-sm font-medium text-gray-600">{count} companies</span>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Signups */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Signup Activity (Last 30)</CardTitle>
            <CardDescription>Recent founder registrations</CardDescription>
          </CardHeader>
          <CardContent>
            {(recentFounders || []).length === 0 ? (
              <p className="text-sm text-gray-500">No signups yet.</p>
            ) : (
              <div className="flex h-32 items-end gap-1">
                {getLast30DayCounts(recentFounders as { created_at: string }[]).map((count, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className="w-full rounded-sm bg-blue-500"
                      style={{ height: `${Math.max(count * 24, count > 0 ? 8 : 2)}px` }}
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function getLast30DayCounts(founders: { created_at: string }[]): number[] {
  const counts = new Array(30).fill(0)
  const now = new Date()
  founders.forEach((f) => {
    const days = Math.floor((now.getTime() - new Date(f.created_at).getTime()) / (1000 * 60 * 60 * 24))
    if (days >= 0 && days < 30) counts[29 - days]++
  })
  return counts
}
