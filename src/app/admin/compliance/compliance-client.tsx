'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, ChevronDown, ChevronRight, RefreshCw, Loader2 } from 'lucide-react'
import { format, differenceInDays, isPast } from 'date-fns'
import { toast } from 'sonner'

interface ComplianceItem {
  id: string
  founderName: string
  founderId: string
  title: string
  description: string | null
  dueDate: string
  completed: boolean
  isRecurring: boolean
  recurringType: string | null
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
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [completing, setCompleting] = useState<string | null>(null)

  const itemsWithStatus = items.map((item) => ({
    ...item,
    status: getStatus(item),
  }))

  const filteredItems = itemsWithStatus.filter((item) => {
    const matchesSearch =
      item.founderName.toLowerCase().includes(search.toLowerCase()) ||
      item.title.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const overdueCount = itemsWithStatus.filter((i) => i.status === 'overdue').length
  const atRiskCount = itemsWithStatus.filter((i) => i.status === 'at_risk').length
  const pendingCount = itemsWithStatus.filter((i) => i.status === 'pending').length

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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Compliance Overview</h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitor and manage compliance deadlines across all founders.
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
                placeholder="Search by founder or deadline..."
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
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Deadlines</CardTitle>
          <CardDescription>{filteredItems.length} items found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8"></TableHead>
                <TableHead>Founder</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500">
                    No compliance items found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => {
                  const status = statusConfig[item.status]
                  const daysUntil = differenceInDays(new Date(item.dueDate), new Date())
                  const isOverdue = isPast(new Date(item.dueDate)) && !item.completed
                  const isExpanded = expandedId === item.id

                  return (
                    <>
                      <TableRow
                        key={item.id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      >
                        <TableCell>
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{item.founderName}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {item.title}
                            {item.isRecurring && (
                              <span title="Recurring">
                                <RefreshCw className="h-3.5 w-3.5 text-blue-500" />
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{format(new Date(item.dueDate), 'MMM d, yyyy')}</TableCell>
                        <TableCell>
                          <span
                            className={
                              isOverdue
                                ? 'font-medium text-red-600'
                                : daysUntil <= 14
                                ? 'font-medium text-yellow-600'
                                : 'text-gray-600'
                            }
                          >
                            {item.completed
                              ? 'Done'
                              : isOverdue
                              ? `${Math.abs(daysUntil)} overdue`
                              : daysUntil === 0
                              ? 'Today'
                              : `${daysUntil} days`}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge className={status.color}>{status.label}</Badge>
                        </TableCell>
                        <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                          {!item.completed && (
                            <Button
                              size="sm"
                              onClick={() => handleMarkComplete(item.id)}
                              disabled={completing === item.id}
                            >
                              {completing === item.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                'Mark Complete'
                              )}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                      {isExpanded && (
                        <TableRow key={`${item.id}-detail`}>
                          <TableCell></TableCell>
                          <TableCell colSpan={6} className="bg-gray-50">
                            <div className="py-2 space-y-2">
                              <div>
                                <span className="text-sm font-medium text-gray-500">Description: </span>
                                <span className="text-sm text-gray-700">
                                  {item.description || 'No description'}
                                </span>
                              </div>
                              {item.isRecurring && (
                                <div>
                                  <span className="text-sm font-medium text-gray-500">Type: </span>
                                  <Badge variant="outline" className="text-xs">
                                    {item.recurringType === 'llc_annual_report' && 'LLC Annual Report'}
                                    {item.recurringType === 'ra_renewal' && 'RA Renewal'}
                                    {item.recurringType === 'tax_filing' && 'Tax Filing'}
                                    {item.recurringType === 'boi_report' && 'BOI Report'}
                                    {!item.recurringType && 'Custom'}
                                  </Badge>
                                  <span className="ml-2 text-xs text-blue-600">
                                    Auto-renews when completed
                                  </span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
