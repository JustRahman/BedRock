import { Users, FileText, CheckCircle, Clock, AlertTriangle, TrendingUp } from 'lucide-react'
import { StatsCard } from '@/components/admin'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AdminDashboardPage() {
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
          value={247}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Pending Applications"
          value={18}
          icon={Clock}
          description="Awaiting review"
        />
        <StatsCard
          title="Approved This Month"
          value={34}
          icon={CheckCircle}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Avg. Trust Score"
          value="72"
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
              <CardDescription>Latest applications awaiting review</CardDescription>
            </div>
            <Link href="/admin/applications">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 font-medium text-gray-600">
                      {app.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{app.name}</p>
                      <p className="text-sm text-gray-500">{app.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getScoreBadgeColor(app.trustScore)}>
                      Score: {app.trustScore}
                    </Badge>
                    <Badge className={getStatusBadgeColor(app.status)}>
                      {app.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Compliance Alerts</CardTitle>
              <CardDescription>Items requiring attention</CardDescription>
            </div>
            <Link href="/admin/compliance">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 rounded-lg border p-4 ${
                    alert.severity === 'high'
                      ? 'border-red-200 bg-red-50'
                      : alert.severity === 'medium'
                      ? 'border-yellow-200 bg-yellow-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <AlertTriangle
                    className={`h-5 w-5 mt-0.5 ${
                      alert.severity === 'high'
                        ? 'text-red-500'
                        : alert.severity === 'medium'
                        ? 'text-yellow-500'
                        : 'text-gray-500'
                    }`}
                  />
                  <div>
                    <p className="font-medium text-gray-900">{alert.title}</p>
                    <p className="text-sm text-gray-600">{alert.description}</p>
                    <p className="mt-1 text-xs text-gray-500">{alert.affectedCount} founders affected</p>
                  </div>
                </div>
              ))}
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
              {scoreDistribution.map((item) => (
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
                  Review Pending (18)
                </Button>
              </Link>
              <Link href="/admin/applications?status=conditional">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Conditional (5)
                </Button>
              </Link>
              <Link href="/admin/compliance">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FileText className="h-4 w-4" />
                  Compliance Queue
                </Button>
              </Link>
              <Link href="/admin/founders">
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

const recentApplications = [
  { id: '1', name: 'Sarah Chen', country: 'Singapore', trustScore: 82, status: 'Pre-approved' },
  { id: '2', name: 'Marcus Weber', country: 'Germany', trustScore: 65, status: 'Review Needed' },
  { id: '3', name: 'Priya Sharma', country: 'India', trustScore: 78, status: 'Approved' },
  { id: '4', name: 'João Silva', country: 'Brazil', trustScore: 45, status: 'High Risk' },
]

const complianceAlerts = [
  {
    title: 'Expiring Documents',
    description: '12 founders have documents expiring in the next 30 days',
    severity: 'high',
    affectedCount: 12,
  },
  {
    title: 'Missing Annual Reports',
    description: 'Delaware annual report deadline approaching',
    severity: 'medium',
    affectedCount: 8,
  },
  {
    title: 'Pending Verifications',
    description: 'Identity verifications pending for more than 48 hours',
    severity: 'medium',
    affectedCount: 5,
  },
]

const scoreDistribution = [
  { range: '80-100', count: 45, percentage: 18, color: 'bg-green-500' },
  { range: '70-79', count: 72, percentage: 29, color: 'bg-blue-500' },
  { range: '50-69', count: 89, percentage: 36, color: 'bg-yellow-500' },
  { range: '30-49', count: 31, percentage: 13, color: 'bg-orange-500' },
  { range: '0-29', count: 10, percentage: 4, color: 'bg-red-500' },
]

function getScoreBadgeColor(score: number): string {
  if (score >= 80) return 'bg-green-100 text-green-700'
  if (score >= 70) return 'bg-blue-100 text-blue-700'
  if (score >= 50) return 'bg-yellow-100 text-yellow-700'
  return 'bg-red-100 text-red-700'
}

function getStatusBadgeColor(status: string): string {
  switch (status) {
    case 'Pre-approved':
      return 'bg-green-100 text-green-700'
    case 'Approved':
      return 'bg-blue-100 text-blue-700'
    case 'Review Needed':
      return 'bg-yellow-100 text-yellow-700'
    case 'High Risk':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}
