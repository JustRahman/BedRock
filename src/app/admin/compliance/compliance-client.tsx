'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
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
  RefreshCw,
  Loader2,
  Building2,
  CheckCircle,
  AlertCircle,
  Clock,
  ExternalLink,
} from 'lucide-react'
import { format, differenceInDays, isPast } from 'date-fns'
import { toast } from 'sonner'

interface ComplianceItem {
  id: string
  founderName: string
  founderId: string
  companyId: string
  companyName: string
  companyState: string | null
  formationStatus: string
  title: string
  description: string | null
  dueDate: string
  completed: boolean
  isRecurring: boolean
  recurringType: string | null
}

interface CompanyGroup {
  companyId: string
  companyName: string
  companyState: string | null
  formationStatus: string
  founderName: string
  founderId: string
  items: (ComplianceItem & { status: string })[]
  overdueCount: number
  atRiskCount: number
  pendingCount: number
  completedCount: number
}

function getStatus(item: ComplianceItem): 'completed' | 'overdue' | 'at_risk' | 'pending' {
  if (item.completed) return 'completed'
  const daysUntil = differenceInDays(new Date(item.dueDate), new Date())
  if (isPast(new Date(item.dueDate))) return 'overdue'
  if (daysUntil <= 14) return 'at_risk'
  return 'pending'
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-gray-100 text-gray-700' },
  at_risk: { label: 'At Risk', color: 'bg-yellow-100 text-yellow-700' },
  overdue: { label: 'Overdue', color: 'bg-red-100 text-red-700' },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700' },
}

export function ComplianceClient({ items }: { items: ComplianceItem[] }) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [expandedCompanies, setExpandedCompanies] = useState<Set<string>>(new Set())
  const [completing, setCompleting] = useState<string | null>(null)

  const itemsWithStatus = items.map((item) => ({
    ...item,
    status: getStatus(item),
  }))

  const overdueCount = itemsWithStatus.filter((i) => i.status === 'overdue').length
  const atRiskCount = itemsWithStatus.filter((i) => i.status === 'at_risk').length
  const pendingCount = itemsWithStatus.filter((i) => i.status === 'pending').length

  // Group by company
  const groups = useMemo(() => {
    const map = new Map<string, CompanyGroup>()

    for (const item of itemsWithStatus) {
      // Apply filters
      const matchesSearch =
        item.founderName.toLowerCase().includes(search.toLowerCase()) ||
        item.companyName.toLowerCase().includes(search.toLowerCase()) ||
        item.title.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter
      if (!matchesSearch || !matchesStatus) continue

      if (!map.has(item.companyId)) {
        map.set(item.companyId, {
          companyId: item.companyId,
          companyName: item.companyName,
          companyState: item.companyState,
          formationStatus: item.formationStatus,
          founderName: item.founderName,
          founderId: item.founderId,
          items: [],
          overdueCount: 0,
          atRiskCount: 0,
          pendingCount: 0,
          completedCount: 0,
        })
      }
      const group = map.get(item.companyId)!
      group.items.push(item)
      if (item.status === 'overdue') group.overdueCount++
      else if (item.status === 'at_risk') group.atRiskCount++
      else if (item.status === 'pending') group.pendingCount++
      else if (item.status === 'completed') group.completedCount++
    }

    // Sort: companies with overdue first, then at_risk, then by name
    return Array.from(map.values()).sort((a, b) => {
      if (a.overdueCount !== b.overdueCount) return b.overdueCount - a.overdueCount
      if (a.atRiskCount !== b.atRiskCount) return b.atRiskCount - a.atRiskCount
      return a.companyName.localeCompare(b.companyName)
    })
  }, [itemsWithStatus, search, statusFilter])

  const toggleCompany = (companyId: string) => {
    setExpandedCompanies((prev) => {
      const next = new Set(prev)
      if (next.has(companyId)) next.delete(companyId)
      else next.add(companyId)
      return next
    })
  }

  const expandAll = () => {
    setExpandedCompanies(new Set(groups.map((g) => g.companyId)))
  }

  const collapseAll = () => {
    setExpandedCompanies(new Set())
  }

  const handleMarkComplete = async (id: string) => {
    setCompleting(id)
    try {
      const res = await fetch('/api/compliance', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deadlineId: id, completed: true }),
      })
      if (res.ok) {
        toast.success('Deadline marked complete')
        router.refresh()
      } else {
        toast.error('Failed to mark complete')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setCompleting(null)
    }
  }

  const totalFiltered = groups.reduce((sum, g) => sum + g.items.length, 0)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Compliance Overview</h1>
        <p className="mt-1 text-sm text-gray-500">
          Deadlines grouped by company. Click a company to see its items.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">{items.length}</p>
            <p className="text-xs text-gray-400">{groups.length} companies</p>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-600">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">{overdueCount}</p>
          </CardContent>
        </Card>
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-600">At Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">{atRiskCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">{pendingCount}</p>
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
                placeholder="Search by company, founder, or deadline..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="at_risk">At Risk</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={expandAll}>
                Expand All
              </Button>
              <Button variant="outline" size="sm" onClick={collapseAll}>
                Collapse All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grouped list */}
      <div className="space-y-3">
        <p className="text-sm text-gray-500">{totalFiltered} items across {groups.length} companies</p>

        {groups.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              No compliance items found.
            </CardContent>
          </Card>
        ) : (
          groups.map((group) => {
            const isExpanded = expandedCompanies.has(group.companyId)

            return (
              <Card key={group.companyId} className={group.overdueCount > 0 ? 'border-red-200' : group.atRiskCount > 0 ? 'border-yellow-200' : ''}>
                {/* Company header - clickable */}
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
                      <p className="text-xs text-gray-500">{group.founderName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {group.overdueCount > 0 && (
                      <Badge className="bg-red-100 text-red-700">{group.overdueCount} overdue</Badge>
                    )}
                    {group.atRiskCount > 0 && (
                      <Badge className="bg-yellow-100 text-yellow-700">{group.atRiskCount} at risk</Badge>
                    )}
                    <span className="text-sm text-gray-400">
                      {group.completedCount}/{group.items.length} done
                    </span>
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

                {/* Expanded deadline items */}
                {isExpanded && (
                  <CardContent className="border-t pt-4">
                    <div className="space-y-3">
                      {group.items.map((item) => {
                        const dueDate = new Date(item.dueDate)
                        const daysUntil = differenceInDays(dueDate, new Date())
                        const isOverdue = item.status === 'overdue'
                        const status = statusConfig[item.status as keyof typeof statusConfig]

                        return (
                          <div
                            key={item.id}
                            className={`flex items-start justify-between rounded-lg border p-3 ${
                              item.completed
                                ? 'border-green-200 bg-green-50'
                                : isOverdue
                                ? 'border-red-200 bg-red-50'
                                : item.status === 'at_risk'
                                ? 'border-yellow-200 bg-yellow-50'
                                : 'border-gray-100'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {item.completed ? (
                                <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                              ) : isOverdue ? (
                                <AlertCircle className="mt-0.5 h-4 w-4 text-red-600" />
                              ) : (
                                <Clock className="mt-0.5 h-4 w-4 text-gray-400" />
                              )}
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                                  {item.isRecurring && (
                                    <span title="Auto-renews when completed">
                                      <RefreshCw className="h-3 w-3 text-blue-500" />
                                    </span>
                                  )}
                                  <Badge className={`text-xs ${status.color}`}>{status.label}</Badge>
                                </div>
                                {item.description ? (
                                  <p className="mt-1 text-xs text-gray-500">{item.description}</p>
                                ) : null}
                                <p className="mt-1 text-xs text-gray-400">
                                  Due: {format(dueDate, 'MMM d, yyyy')}
                                  {!item.completed && (
                                    <span className={isOverdue ? ' text-red-600 font-medium' : daysUntil <= 14 ? ' text-yellow-600 font-medium' : ''}>
                                      {' '}({isOverdue ? `${Math.abs(daysUntil)} days overdue` : daysUntil === 0 ? 'Today' : `${daysUntil} days`})
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                            {!item.completed && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleMarkComplete(item.id)}
                                disabled={completing === item.id}
                                className="shrink-0"
                              >
                                {completing === item.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  'Complete'
                                )}
                              </Button>
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
