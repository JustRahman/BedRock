'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Search,
  ChevronDown,
  ChevronRight,
  Loader2,
  Building2,
  Landmark,
  ExternalLink,
  Clock,
  FileText,
  Send,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'

interface BankApp {
  id: string
  founderId: string
  founderName: string
  founderEmail: string
  companyId: string
  companyName: string
  companyState: string
  bankName: string
  status: string
  submittedAt: string | null
  approvedAt: string | null
  rejectionReason: string | null
  notes: string | null
  createdAt: string
}

const statusSteps = [
  { key: 'submitted', label: 'New Request', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
  { key: 'under_review', label: 'In Progress', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  { key: 'approved', label: 'Account Opened', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
  { key: 'rejected', label: 'Rejected', icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
]

function getStatusConfig(status: string) {
  return statusSteps.find((s) => s.key === status) || statusSteps[0]
}

function getNextStatus(current: string): string | null {
  if (current === 'submitted') return 'under_review'
  if (current === 'under_review') return 'approved'
  return null
}

function getNextLabel(current: string): string | null {
  if (current === 'submitted') return 'Start Working'
  if (current === 'under_review') return 'Mark Account Opened'
  return null
}

interface CompanyGroup {
  companyId: string
  companyName: string
  companyState: string
  founderName: string
  founderEmail: string
  founderId: string
  apps: BankApp[]
}

export function BankAppsClient({ applications }: { applications: BankApp[] }) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [expandedCompanies, setExpandedCompanies] = useState<Set<string>>(new Set())
  const [updating, setUpdating] = useState<string | null>(null)
  const [noteInputs, setNoteInputs] = useState<Record<string, string>>({})

  const submittedCount = applications.filter((a) => a.status === 'submitted').length
  const inProgressCount = applications.filter((a) => a.status === 'under_review').length
  const approvedCount = applications.filter((a) => a.status === 'approved').length

  // Group by company
  const groups = useMemo(() => {
    const map = new Map<string, CompanyGroup>()

    for (const app of applications) {
      const matchesSearch =
        app.founderName.toLowerCase().includes(search.toLowerCase()) ||
        app.companyName.toLowerCase().includes(search.toLowerCase()) ||
        app.bankName.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter
      if (!matchesSearch || !matchesStatus) continue

      if (!map.has(app.companyId)) {
        map.set(app.companyId, {
          companyId: app.companyId,
          companyName: app.companyName,
          companyState: app.companyState,
          founderName: app.founderName,
          founderEmail: app.founderEmail,
          founderId: app.founderId,
          apps: [],
        })
      }
      map.get(app.companyId)!.apps.push(app)
    }

    // Sort: new requests first, then in progress, then rest
    return Array.from(map.values()).sort((a, b) => {
      const aHasNew = a.apps.some((app) => app.status === 'submitted')
      const bHasNew = b.apps.some((app) => app.status === 'submitted')
      if (aHasNew !== bHasNew) return aHasNew ? -1 : 1
      const aInProgress = a.apps.some((app) => app.status === 'under_review')
      const bInProgress = b.apps.some((app) => app.status === 'under_review')
      if (aInProgress !== bInProgress) return aInProgress ? -1 : 1
      return a.companyName.localeCompare(b.companyName)
    })
  }, [applications, search, statusFilter])

  const toggleCompany = (companyId: string) => {
    setExpandedCompanies((prev) => {
      const next = new Set(prev)
      if (next.has(companyId)) next.delete(companyId)
      else next.add(companyId)
      return next
    })
  }

  const handleStatusUpdate = async (appId: string, newStatus: string) => {
    setUpdating(appId)
    try {
      const body: Record<string, unknown> = {
        applicationId: appId,
        status: newStatus,
      }
      const noteText = noteInputs[appId]?.trim()
      if (noteText) body.notes = noteText

      const res = await fetch('/api/bank-applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        toast.success(`Status updated to ${getStatusConfig(newStatus).label}`)
        setNoteInputs((prev) => ({ ...prev, [appId]: '' }))
        router.refresh()
      } else {
        toast.error('Failed to update status')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setUpdating(null)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bank Applications</h1>
        <p className="mt-1 text-sm text-gray-500">
          Founder submits bank preference. You prepare docs and apply on their behalf.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">{applications.length}</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">New Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{submittedCount}</p>
          </CardContent>
        </Card>
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-600">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">{inProgressCount}</p>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Accounts Opened</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by company, founder, or bank..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="submitted">New Requests</SelectItem>
                <SelectItem value="under_review">In Progress</SelectItem>
                <SelectItem value="approved">Account Opened</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Grouped list */}
      <div className="space-y-3">
        <p className="text-sm text-gray-500">
          {groups.reduce((sum, g) => sum + g.apps.length, 0)} applications across {groups.length} companies
        </p>

        {groups.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Landmark className="mx-auto mb-3 h-10 w-10 text-gray-300" />
              <p className="font-medium text-gray-500">No bank applications found</p>
            </CardContent>
          </Card>
        ) : (
          groups.map((group) => {
            const isExpanded = expandedCompanies.has(group.companyId)
            const hasNew = group.apps.some((a) => a.status === 'submitted')
            const hasInProgress = group.apps.some((a) => a.status === 'under_review')

            return (
              <Card
                key={group.companyId}
                className={hasNew ? 'border-blue-200' : hasInProgress ? 'border-yellow-200' : ''}
              >
                {/* Company header */}
                <div
                  className="flex cursor-pointer items-center justify-between p-4 hover:bg-gray-50"
                  onClick={() => toggleCompany(group.companyId)}
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                    <Building2 className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{group.companyName}</p>
                        {group.companyState && (
                          <span className="text-xs text-gray-400">
                            ({group.companyState === 'DE' ? 'Delaware' : group.companyState === 'WY' ? 'Wyoming' : group.companyState})
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{group.founderName} &middot; {group.founderEmail}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {group.apps.map((app) => {
                      const cfg = getStatusConfig(app.status)
                      return (
                        <Badge key={app.id} className={`${cfg.bg} ${cfg.color}`}>
                          {cfg.label}
                        </Badge>
                      )
                    })}
                    <Link
                      href={`/admin/formations/${group.companyId}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-blue-600 hover:text-blue-800"
                      title="View formation"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Expanded: bank app details */}
                {isExpanded && (
                  <CardContent className="border-t pt-4">
                    <div className="space-y-4">
                      {group.apps.map((app) => {
                        const cfg = getStatusConfig(app.status)
                        const nextStatus = getNextStatus(app.status)
                        const nextLabel = getNextLabel(app.status)
                        const StatusIcon = cfg.icon

                        return (
                          <div
                            key={app.id}
                            className="rounded-lg border border-gray-200 p-4"
                          >
                            {/* Header */}
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${cfg.bg}`}>
                                  <Landmark className={`h-5 w-5 ${cfg.color}`} />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900 capitalize">{app.bankName}</p>
                                  <div className="mt-1 flex items-center gap-2">
                                    <Badge className={`${cfg.bg} ${cfg.color}`}>
                                      <StatusIcon className="mr-1 h-3 w-3" />
                                      {cfg.label}
                                    </Badge>
                                    {app.submittedAt && (
                                      <span className="text-xs text-gray-400">
                                        Submitted {format(new Date(app.submittedAt), 'MMM d, yyyy')}
                                      </span>
                                    )}
                                    {app.approvedAt && (
                                      <span className="text-xs text-green-600">
                                        Opened {format(new Date(app.approvedAt), 'MMM d, yyyy')}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Status progression */}
                            <div className="mt-4 flex items-center gap-1">
                              {statusSteps.filter((s) => s.key !== 'rejected').map((step, i) => {
                                const stepIndex = statusSteps.filter((s) => s.key !== 'rejected').findIndex((s) => s.key === step.key)
                                const currentIndex = statusSteps.filter((s) => s.key !== 'rejected').findIndex((s) => s.key === app.status)
                                const isActive = stepIndex <= currentIndex && app.status !== 'rejected'
                                const StepIcon = step.icon

                                return (
                                  <div key={step.key} className="flex items-center gap-1">
                                    <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                                      isActive ? `${step.bg} ${step.color}` : 'bg-gray-50 text-gray-400'
                                    }`}>
                                      <StepIcon className="h-3 w-3" />
                                      {step.label}
                                    </div>
                                    {i < statusSteps.filter((s) => s.key !== 'rejected').length - 1 && (
                                      <div className={`h-px w-4 ${isActive && stepIndex < currentIndex ? 'bg-gray-300' : 'bg-gray-200'}`} />
                                    )}
                                  </div>
                                )
                              })}
                            </div>

                            {/* Notes */}
                            {app.notes ? (
                              <div className="mt-3 rounded-md bg-gray-50 p-3">
                                <p className="text-xs font-medium text-gray-500">Notes</p>
                                <p className="mt-1 text-sm text-gray-700">{app.notes}</p>
                              </div>
                            ) : null}

                            {app.status === 'rejected' && app.rejectionReason ? (
                              <div className="mt-3 rounded-md bg-red-50 p-3">
                                <p className="text-xs font-medium text-red-600">Rejection Reason</p>
                                <p className="mt-1 text-sm text-red-700">{app.rejectionReason}</p>
                              </div>
                            ) : null}

                            {/* Actions — only if not final state */}
                            {(app.status === 'submitted' || app.status === 'under_review') && (
                              <div className="mt-4 space-y-3 border-t pt-4">
                                <Textarea
                                  value={noteInputs[app.id] || ''}
                                  onChange={(e) =>
                                    setNoteInputs((prev) => ({ ...prev, [app.id]: e.target.value }))
                                  }
                                  placeholder="Add notes (e.g. docs prepared, application submitted to bank, waiting on bank response...)"
                                  rows={2}
                                  className="text-sm"
                                />
                                <div className="flex items-center gap-2">
                                  {nextStatus && nextLabel && (
                                    <Button
                                      size="sm"
                                      onClick={() => handleStatusUpdate(app.id, nextStatus)}
                                      disabled={updating === app.id}
                                    >
                                      {updating === app.id ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      ) : null}
                                      {nextLabel}
                                    </Button>
                                  )}
                                  {app.status === 'under_review' && (
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => handleStatusUpdate(app.id, 'rejected')}
                                      disabled={updating === app.id}
                                    >
                                      Reject
                                    </Button>
                                  )}
                                  {noteInputs[app.id]?.trim() && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleStatusUpdate(app.id, app.status)}
                                      disabled={updating === app.id}
                                    >
                                      Save Notes Only
                                    </Button>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
