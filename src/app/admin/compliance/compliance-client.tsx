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
import { Search, AlertTriangle, Calendar, Bell, CheckCircle } from 'lucide-react'
import { format, differenceInDays, isPast } from 'date-fns'

interface ComplianceItem {
  id: string
  founderName: string
  founderId: string
  title: string
  dueDate: string
  completed: boolean
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
    try {
      await fetch('/api/compliance', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deadlineId: id, completed: true }),
      })
      router.refresh()
    } catch {
      // Silently fail
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Compliance Overview</h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitor compliance deadlines across all founders.
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
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    No compliance items found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => {
                  const status = statusConfig[item.status]
                  const daysUntil = differenceInDays(new Date(item.dueDate), new Date())
                  const isOverdue = isPast(new Date(item.dueDate)) && !item.completed

                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.founderName}</TableCell>
                      <TableCell>{item.title}</TableCell>
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
                      <TableCell className="text-right">
                        {!item.completed && (
                          <Button size="sm" onClick={() => handleMarkComplete(item.id)}>
                            Mark Complete
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
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
