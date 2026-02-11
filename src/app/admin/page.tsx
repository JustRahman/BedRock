import { Users, CheckCircle, Clock, TrendingUp, AlertTriangle, FileText } from 'lucide-react'
import { StatsCard } from '@/components/admin'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { createServiceClient } from '@/lib/supabase/server'

interface FounderRow {
  id: string
  full_name: string
  country_of_residence: string
  created_at: string
  trust_scores: { total_score: number; status: string }[] | null
}

interface DeadlineRow {
  id: string
  title: string
  description: string | null
  due_date: string
  founder_id: string
  founders: { full_name: string } | null
}

export default async function AdminDashboardPage() {
  const supabase = createServiceClient()

  // Fetch stats in parallel
  const [
    { count: totalFounders },
    { count: pendingCount },
    { data: scoresData },
    { data: recentData },
    { data: deadlinesData },
  ] = await Promise.all([
    supabase.from('founders').select('*', { count: 'exact', head: true }),
    supabase.from('founders').select('*', { count: 'exact', head: true }).eq('status', 'onboarding'),
    supabase.from('trust_scores').select('total_score, status'),
    supabase
      .from('founders')
      .select('id, full_name, country_of_residence, created_at, trust_scores(total_score, status)')
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('compliance_deadlines')
      .select('id, title, description, due_date, founder_id, founders(full_name)')
      .eq('completed', false)
      .lte('due_date', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString())
      .order('due_date', { ascending: true })
      .limit(5),
  ])

  const scores = (scoresData || []) as { total_score: number; status: string }[]
  const recentApplications = (recentData || []) as FounderRow[]
  const deadlines = (deadlinesData || []) as DeadlineRow[]

  // Calculate stats
  const avgScore = scores.length > 0
    ? Math.round(scores.reduce((sum, s) => sum + s.total_score, 0) / scores.length)
    : 0

  const approvedThisMonth = scores.filter(
    (s) => s.status === 'approved' || s.status === 'elite'
  ).length

  // Score distribution
  const scoreDistribution = [
    { range: '80-100', count: scores.filter((s) => s.total_score >= 80).length, color: 'bg-green-500' },
    { range: '70-79', count: scores.filter((s) => s.total_score >= 70 && s.total_score < 80).length, color: 'bg-blue-500' },
    { range: '50-69', count: scores.filter((s) => s.total_score >= 50 && s.total_score < 70).length, color: 'bg-yellow-500' },
    { range: '30-49', count: scores.filter((s) => s.total_score >= 30 && s.total_score < 50).length, color: 'bg-orange-500' },
    { range: '0-29', count: scores.filter((s) => s.total_score < 30).length, color: 'bg-red-500' },
  ]

  const totalScores = scores.length || 1
  const distributionWithPercentage = scoreDistribution.map((item) => ({
    ...item,
    percentage: Math.round((item.count / totalScores) * 100),
  }))

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of all applications and metrics.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Founders"
          value={totalFounders || 0}
          icon={Users}
        />
        <StatsCard
          title="Pending Applications"
          value={pendingCount || 0}
          icon={Clock}
          description="Awaiting review"
        />
        <StatsCard
          title="Approved"
          value={approvedThisMonth}
          icon={CheckCircle}
        />
        <StatsCard
          title="Avg. Trust Score"
          value={avgScore}
          icon={TrendingUp}
          description="Across all founders"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Latest applications</CardDescription>
            </div>
            <Link href="/admin/applications">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.length === 0 ? (
                <p className="text-sm text-gray-500">No applications yet.</p>
              ) : (
                recentApplications.map((app) => {
                  const score = Array.isArray(app.trust_scores) && app.trust_scores[0]
                    ? app.trust_scores[0].total_score
                    : null
                  const status = Array.isArray(app.trust_scores) && app.trust_scores[0]
                    ? app.trust_scores[0].status
                    : 'pending'

                  return (
                    <Link key={app.id} href={`/admin/founders/${app.id}`}>
                      <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 font-medium text-gray-600">
                            {app.full_name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{app.full_name}</p>
                            <p className="text-sm text-gray-500">{app.country_of_residence || 'N/A'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {score !== null && (
                            <Badge className={getScoreBadgeColor(score)}>
                              Score: {score}
                            </Badge>
                          )}
                          <Badge className={getStatusBadgeColor(status)}>
                            {formatStatus(status)}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Compliance Alerts</CardTitle>
              <CardDescription>Upcoming deadlines (30 days)</CardDescription>
            </div>
            <Link href="/admin/compliance">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deadlines.length === 0 ? (
                <p className="text-sm text-gray-500">No upcoming deadlines.</p>
              ) : (
                deadlines.map((deadline) => {
                  const daysUntil = Math.ceil(
                    (new Date(deadline.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                  )
                  const isOverdue = daysUntil < 0
                  const severity = isOverdue ? 'high' : daysUntil <= 7 ? 'medium' : 'low'

                  return (
                    <div
                      key={deadline.id}
                      className={`flex items-start gap-4 rounded-lg border p-4 ${
                        severity === 'high'
                          ? 'border-red-200 bg-red-50'
                          : severity === 'medium'
                          ? 'border-yellow-200 bg-yellow-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <AlertTriangle
                        className={`h-5 w-5 mt-0.5 ${
                          severity === 'high'
                            ? 'text-red-500'
                            : severity === 'medium'
                            ? 'text-yellow-500'
                            : 'text-gray-500'
                        }`}
                      />
                      <div>
                        <p className="font-medium text-gray-900">{deadline.title}</p>
                        <p className="text-sm text-gray-600">
                          {isOverdue ? `${Math.abs(daysUntil)} days overdue` : `${daysUntil} days remaining`}
                        </p>
                        {deadline.founders && (
                          <p className="mt-1 text-xs text-gray-500">
                            {(deadline.founders as { full_name: string }).full_name}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Score Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Trust Score Distribution</CardTitle>
            <CardDescription>Breakdown of founders by score range</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {distributionWithPercentage.map((item) => (
                <div key={item.range} className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium text-gray-600">
                    {item.range}
                  </div>
                  <div className="flex-1">
                    <div className="h-4 rounded-full bg-gray-200">
                      <div
                        className={`h-4 rounded-full ${item.color}`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-16 text-right text-sm font-medium text-gray-900">
                    {item.count} ({item.percentage}%)
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/admin/applications?status=pending">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Clock className="h-4 w-4" />
                  Review Pending ({pendingCount || 0})
                </Button>
              </Link>
              <Link href="/admin/applications?status=conditional">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Conditional
                </Button>
              </Link>
              <Link href="/admin/compliance">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FileText className="h-4 w-4" />
                  Compliance Queue
                </Button>
              </Link>
              <Link href="/admin/applications">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Users className="h-4 w-4" />
                  All Founders
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function getScoreBadgeColor(score: number): string {
  if (score >= 80) return 'bg-green-100 text-green-700'
  if (score >= 70) return 'bg-blue-100 text-blue-700'
  if (score >= 50) return 'bg-yellow-100 text-yellow-700'
  return 'bg-red-100 text-red-700'
}

function getStatusBadgeColor(status: string): string {
  switch (status) {
    case 'elite':
      return 'bg-green-100 text-green-700'
    case 'approved':
      return 'bg-blue-100 text-blue-700'
    case 'review_needed':
      return 'bg-yellow-100 text-yellow-700'
    case 'conditional':
      return 'bg-orange-100 text-orange-700'
    case 'not_eligible':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

function formatStatus(status: string): string {
  return status
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
