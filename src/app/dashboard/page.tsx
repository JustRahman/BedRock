'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { FileText, Calendar, Shield, Building2, Landmark, RefreshCw } from 'lucide-react'
import { StatusCard, ActionItems, TrustScoreCard } from '@/components/dashboard'
import { EconomicActivityCard } from '@/components/dashboard/economic-activity-card'
import { PendingUploadBanner } from '@/components/dashboard/pending-upload-banner'
import { createClient } from '@/lib/supabase/client'

const RE_ONBOARD_EMAILS = [
  'contact@nazarly.digital',
  'ra@nemy.agency',
]

interface TrustScoreData {
  total_score: number
  identity_score: number
  business_score: number
  financial_score: number
  social_score: number
  digital_lineage_score: number
  network_score: number
  status: 'elite' | 'approved' | 'review_needed' | 'conditional' | 'not_eligible'
  score_breakdown?: Record<string, unknown> | null
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

interface CompanyData {
  id: string
  name: string
  formation_status: string
  ein: string | null
}

interface BankAppData {
  id: string
  status: string
  bank_name: string | null
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
  const [company, setCompany] = useState<CompanyData | null>(null)
  const [bankApp, setBankApp] = useState<BankAppData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showReOnboard, setShowReOnboard] = useState(false)

  const refreshDocuments = useCallback(async () => {
    try {
      const res = await fetch('/api/documents')
      if (res.ok) {
        const data = await res.json()
        setDocuments(data.documents ?? [])
      }
    } catch {
      // silently fail
    }
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        // Check if current user should see re-onboard banner
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user?.email && RE_ONBOARD_EMAILS.includes(user.email)) {
          setShowReOnboard(true)
        }

        // Step 1: Ensure founder exists (auto-create if missing)
        // Also pass any unsaved onboarding data from localStorage
        let trustScorePayload = undefined
        let onboardingPayload = undefined
        let oauthPayload: Record<string, unknown> | undefined = undefined
        try {
          const storedScore = localStorage.getItem('trustScoreResult')
          if (storedScore) trustScorePayload = JSON.parse(storedScore)
          const storedData = localStorage.getItem('onboardingData')
          if (storedData) onboardingPayload = JSON.parse(storedData)
          // Collect OAuth profile data from localStorage
          const oauthData: Record<string, unknown> = {}
          const gh = localStorage.getItem('oauth_github_data')
          const li = localStorage.getItem('oauth_linkedin_data')
          const st = localStorage.getItem('oauth_stripe_data')
          if (gh) oauthData.github = JSON.parse(gh)
          if (li) oauthData.linkedin = JSON.parse(li)
          if (st) oauthData.stripe = JSON.parse(st)
          if (Object.keys(oauthData).length > 0) oauthPayload = oauthData
        } catch { /* ignore */ }

        const ensureRes = await fetch('/api/founders/ensure', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            trustScore: trustScorePayload,
            onboardingData: onboardingPayload,
            oauthData: oauthPayload,
          }),
        })

        // Only clean up after confirmed save
        if (ensureRes.ok) {
          try {
            localStorage.removeItem('trustScoreResult')
            localStorage.removeItem('onboardingData')
            localStorage.removeItem('oauth_github_data')
            localStorage.removeItem('oauth_linkedin_data')
            localStorage.removeItem('oauth_stripe_data')
          } catch { /* ignore */ }
        }

        // Step 2: Fetch all dashboard data
        const [tsRes, docRes, compRes, coRes, bankRes] = await Promise.all([
          fetch('/api/trust-score'),
          fetch('/api/documents'),
          fetch('/api/compliance'),
          fetch('/api/companies'),
          fetch('/api/bank-applications'),
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
        if (coRes.ok) {
          const coData = await coRes.json()
          setCompany(coData.company ?? null)
        }
        if (bankRes.ok) {
          const bankData = await bankRes.json()
          if (bankData.applications && bankData.applications.length > 0) {
            setBankApp(bankData.applications[0])
          }
        }
      } catch {
        // silently fail
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
          <div className="h-8 w-48 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-72 animate-pulse rounded bg-muted" />
        </div>
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-6">
              <div className="h-24 animate-pulse rounded bg-muted" />
            </div>
          ))}
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

  // Formation status
  const formationStatus = company?.formation_status || 'not_started'
  const formationText = company
    ? formationStatus === 'formed'
      ? company.ein
        ? 'LLC Formed + EIN'
        : 'LLC Formed'
      : formationStatus === 'processing'
      ? 'Processing'
      : 'Pending'
    : 'Not Started'

  // Bank status
  const bankStatus = bankApp?.status || 'not_started'
  const bankText = bankApp
    ? bankApp.status === 'approved'
      ? 'Approved'
      : bankApp.status === 'submitted' || bankApp.status === 'under_review'
      ? `${bankApp.bank_name} - ${bankApp.status.replace('_', ' ')}`
      : 'Draft'
    : 'Not Started'

  // Build dynamic action items
  const actionItems: {
    id: string
    title: string
    description: string
    priority: 'high' | 'medium' | 'low'
    icon: 'document' | 'calendar' | 'payment' | 'alert'
    href: string
  }[] = []

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

  if (!company && trustScore) {
    actionItems.push({
      id: 'start-formation',
      title: 'Start LLC Formation',
      description: 'Begin your LLC formation process',
      priority: 'high',
      icon: 'alert',
      href: '/dashboard/formation',
    })
  }

  if (company && company.formation_status === 'formed' && !company.ein) {
    actionItems.push({
      id: 'get-ein',
      title: 'Obtain Your EIN',
      description: 'Your LLC is formed. Get your EIN from the IRS.',
      priority: 'high',
      icon: 'alert',
      href: '/dashboard/formation/ein',
    })
  }

  if (company?.ein && !bankApp) {
    actionItems.push({
      id: 'bank-app',
      title: 'Apply for Bank Account',
      description: 'Your LLC and EIN are ready. Start your bank application.',
      priority: 'high',
      icon: 'payment',
      href: '/dashboard/bank/application',
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

  return (
    <div>
      <PendingUploadBanner onUploadsComplete={refreshDocuments} />

      {showReOnboard ? (
        <Link href="/onboarding">
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4 cursor-pointer hover:bg-blue-500/15 transition-colors">
            <RefreshCw className="h-5 w-5 text-blue-400 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-300">Re-do Onboarding</p>
              <p className="text-xs text-blue-400/70">Update your identity, social profiles, and digital presence to recalculate your trust score.</p>
            </div>
          </div>
        </Link>
      ) : null}

      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Welcome back! Here&apos;s an overview of your account status.
        </p>
      </div>

      {/* Status Overview */}
      <div className="mb-6 sm:mb-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        <StatusCard
          title="Trust Score"
          icon={Shield}
          status={trustScore ? 'completed' : 'not_started'}
          statusText={trustScore ? `${trustScore.total_score} / 100` : 'Not calculated'}
          description={trustScore ? statusLabels[trustScore.status] : 'Complete onboarding first'}
        />
        <StatusCard
          title="Formation"
          icon={Landmark}
          status={
            formationStatus === 'formed' ? 'completed' :
            formationStatus === 'processing' || formationStatus === 'pending' ? 'in_progress' :
            'not_started'
          }
          statusText={formationText}
          description={company ? `${company.name}` : 'Start LLC formation'}
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
          status={
            bankStatus === 'approved' || bankStatus === 'completed' ? 'completed' :
            bankStatus === 'submitted' || bankStatus === 'under_review' ? 'in_progress' :
            bankStatus === 'draft' ? 'pending' :
            'not_started'
          }
          statusText={bankText}
          description={bankApp ? `${bankApp.bank_name || 'Bank'}` : 'Available after EIN'}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Trust Score */}
        <div className="lg:col-span-1 space-y-6">
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
              scoreBreakdown={trustScore.score_breakdown}
            />
          ) : (
            <div className="rounded-xl border border-border bg-card py-12 text-center">
              <Shield className="mx-auto mb-3 h-10 w-10 text-zinc-600" />
              <p className="font-medium text-white">No Trust Score Yet</p>
              <p className="mt-1 text-sm text-zinc-500">
                Complete the onboarding process to calculate your score.
              </p>
            </div>
          )}

          <EconomicActivityCard
            cryptoVerified={!!(trustScore?.score_breakdown && typeof trustScore.score_breakdown === 'object' && (trustScore.score_breakdown as Record<string, unknown>).economic_activity && ((trustScore.score_breakdown as Record<string, Record<string, unknown>>).economic_activity?.details as Record<string, unknown>)?.crypto_verified)}
            cryptoChain={trustScore?.score_breakdown ? String(((trustScore.score_breakdown as Record<string, Record<string, unknown>>).economic_activity?.details as Record<string, unknown>)?.crypto_chain || '') : undefined}
            cryptoScore={trustScore?.score_breakdown ? Number(((trustScore.score_breakdown as Record<string, Record<string, unknown>>).economic_activity?.details as Record<string, unknown>)?.crypto_subtotal || 0) : undefined}
            paymentVerified={!!(trustScore?.score_breakdown && typeof trustScore.score_breakdown === 'object' && ((trustScore.score_breakdown as Record<string, Record<string, unknown>>).economic_activity?.details as Record<string, unknown>)?.payment_verified)}
            stripeConnected={!!(trustScore?.score_breakdown && typeof trustScore.score_breakdown === 'object' && ((trustScore.score_breakdown as Record<string, Record<string, unknown>>).economic_activity?.details as Record<string, unknown>)?.stripe_connected)}
            stripeScore={trustScore?.score_breakdown ? Number(((trustScore.score_breakdown as Record<string, Record<string, unknown>>).economic_activity?.details as Record<string, unknown>)?.stripe_subtotal || 0) : undefined}
            hasBankApp={!!bankApp}
            onRefresh={() => window.location.reload()}
          />

        </div>

        {/* Action Items */}
        <div className="lg:col-span-2">
          <ActionItems items={actionItems} />
        </div>
      </div>
    </div>
  )
}
