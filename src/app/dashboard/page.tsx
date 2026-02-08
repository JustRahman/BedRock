'use client'

import { useEffect, useState } from 'react'
import { FileText, Calendar, Shield, Building2 } from 'lucide-react'
import { StatusCard, ActionItems, TrustScoreCard } from '@/components/dashboard'
import { Card, CardContent } from '@/components/ui/card'

interface TrustScoreData {
  total_score: number
  identity_score: number
  business_score: number
  digital_lineage_score: number
  network_score: number
  status: 'elite' | 'approved' | 'review_needed' | 'conditional' | 'not_eligible'
}

interface DocumentData {
  id: string
  verified: boolean
}

interface DeadlineData {
  id: string
  completed: boolean
  due_date: string
}

const statusLabels: Record<string, string> = {
  elite: 'Elite',
  approved: 'Approved',
  review_needed: 'Review Needed',
  conditional: 'Conditional',
  not_eligible: 'Not Eligible',
}

export default function DashboardPage() {
  const [trustScore, setTrustScore] = useState<TrustScoreData | null>(null)
  const [documents, setDocuments] = useState<DocumentData[]>([])
  const [deadlines, setDeadlines] = useState<DeadlineData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [tsRes, docRes, compRes] = await Promise.all([
          fetch('/api/trust-score'),
          fetch('/api/documents'),
          fetch('/api/compliance'),
        ])

        if (tsRes.ok) {
          const tsData = await tsRes.json()
          setTrustScore(tsData.trustScore ?? null)
        }
        if (docRes.ok) {
          const docData = await docRes.json()
          setDocuments(docData.documents ?? [])
        }
        if (compRes.ok) {
          const compData = await compRes.json()
          setDeadlines(compData.deadlines ?? [])
        }
      } catch {
        // silently fail — cards show empty state
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-4 w-72 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-24 animate-pulse rounded bg-gray-100" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="h-48 animate-pulse rounded bg-gray-100" />
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <div className="h-48 animate-pulse rounded bg-gray-100" />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const verifiedDocs = documents.filter((d) => d.verified).length
  const pendingDocs = documents.filter((d) => !d.verified).length
  const upcomingDeadlines = deadlines.filter((d) => !d.completed).length
  const overdueDeadlines = deadlines.filter(
    (d) => !d.completed && new Date(d.due_date) < new Date()
  ).length

  // Build dynamic action items
  const actionItems: {
    id: string
    title: string
    description: string
    priority: 'high' | 'medium' | 'low'
    icon: 'document' | 'calendar' | 'payment' | 'alert'
    href: string
  }[] = []

  if (documents.length === 0) {
    actionItems.push({
      id: 'upload-docs',
      title: 'Upload Documents',
      description: 'Upload your verification documents to get started',
      priority: 'high',
      icon: 'document',
      href: '/dashboard/documents',
    })
  }

  if (overdueDeadlines > 0) {
    actionItems.push({
      id: 'overdue',
      title: `${overdueDeadlines} Overdue Deadline${overdueDeadlines > 1 ? 's' : ''}`,
      description: 'You have overdue compliance deadlines that need attention',
      priority: 'high',
      icon: 'alert',
      href: '/dashboard/compliance',
    })
  }

  if (upcomingDeadlines > 0 && overdueDeadlines === 0) {
    actionItems.push({
      id: 'upcoming',
      title: `${upcomingDeadlines} Upcoming Deadline${upcomingDeadlines > 1 ? 's' : ''}`,
      description: 'Stay on top of your compliance deadlines',
      priority: 'medium',
      icon: 'calendar',
      href: '/dashboard/compliance',
    })
  }

  if (!trustScore) {
    actionItems.push({
      id: 'onboard',
      title: 'Complete Onboarding',
      description: 'Finish the onboarding process to calculate your trust score',
      priority: 'high',
      icon: 'alert',
      href: '/onboarding',
    })
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Here&apos;s an overview of your account status.
        </p>
      </div>

      {/* Status Overview */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatusCard
          title="Trust Score"
          icon={Shield}
          status={trustScore ? 'completed' : 'not_started'}
          statusText={trustScore ? `${trustScore.total_score} / 100` : 'Not calculated'}
          description={trustScore ? statusLabels[trustScore.status] : 'Complete onboarding first'}
        />
        <StatusCard
          title="Documents"
          icon={FileText}
          status={documents.length > 0 ? (pendingDocs > 0 ? 'in_progress' : 'completed') : 'not_started'}
          statusText={`${documents.length} uploaded`}
          description={`${verifiedDocs} verified, ${pendingDocs} pending`}
        />
        <StatusCard
          title="Compliance"
          icon={Calendar}
          status={overdueDeadlines > 0 ? 'pending' : upcomingDeadlines > 0 ? 'in_progress' : 'completed'}
          statusText={`${upcomingDeadlines} upcoming`}
          description={overdueDeadlines > 0 ? `${overdueDeadlines} overdue` : 'All on track'}
        />
        <StatusCard
          title="Bank Account"
          icon={Building2}
          status="not_started"
          statusText="Coming Soon"
          description="Available after approval"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Trust Score */}
        <div className="lg:col-span-1">
          {trustScore ? (
            <TrustScoreCard
              score={trustScore.total_score}
              status={trustScore.status}
              statusLabel={statusLabels[trustScore.status]}
              breakdown={{
                digitalLineage: trustScore.digital_lineage_score,
                business: trustScore.business_score,
                identity: trustScore.identity_score,
                network: trustScore.network_score,
              }}
            />
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Shield className="mx-auto mb-3 h-10 w-10 text-gray-300" />
                <p className="font-medium text-gray-900">No Trust Score Yet</p>
                <p className="mt-1 text-sm text-gray-500">
                  Complete the onboarding process to calculate your score.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Action Items */}
        <div className="lg:col-span-2">
          <ActionItems items={actionItems} />
        </div>
      </div>
    </div>
  )
}
