'use client'

import { useState } from 'react'
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
  dueDate: Date
  type: 'federal' | 'state' | 'corporate'
  status: 'pending' | 'overdue' | 'completed' | 'at_risk'
}

const mockComplianceItems: ComplianceItem[] = [
  {
    id: '1',
    founderName: 'Sarah Chen',
    founderId: '1',
    title: 'Delaware Annual Report',
    dueDate: new Date('2024-02-15'),
    type: 'state',
    status: 'at_risk',
  },
  {
    id: '2',
    founderName: 'Marcus Weber',
    founderId: '2',
    title: 'Federal Tax Return',
    dueDate: new Date('2024-04-15'),
    type: 'federal',
    status: 'pending',
  },
  {
    id: '3',
    founderName: 'Priya Sharma',
    founderId: '3',
    title: 'Registered Agent Renewal',
    dueDate: new Date('2024-01-10'),
    type: 'corporate',
    status: 'overdue',
  },
  {
    id: '4',
    founderName: 'João Silva',
    founderId: '4',
    title: 'FinCEN BOI Report',
    dueDate: new Date('2024-12-31'),
    type: 'federal',
    status: 'pending',
  },
  {
    id: '5',
    founderName: 'Emma Johnson',
    founderId: '5',
    title: 'Delaware Franchise Tax',
    dueDate: new Date('2024-03-01'),
    type: 'state',
    status: 'at_risk',
  },
  {
    id: '6',
    founderName: 'Kenji Tanaka',
    founderId: '6',
    title: 'Q1 Estimated Tax Payment',
    dueDate: new Date('2024-01-05'),
    type: 'federal',
    status: 'completed',
  },
]

const typeConfig = {
  federal: { label: 'Federal', color: 'bg-blue-100 text-blue-700' },
  state: { label: 'State', color: 'bg-purple-100 text-purple-700' },
  corporate: { label: 'Corporate', color: 'bg-green-100 text-green-700' },
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-gray-100 text-gray-700', icon: Calendar },
  at_risk: { label: 'At Risk', color: 'bg-yellow-100 text-yellow-700', icon: AlertTriangle },
  overdue: { label: 'Overdue', color: 'bg-red-100 text-red-700', icon: AlertTriangle },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700', icon: CheckCircle },
}

export default function AdminCompliancePage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  const filteredItems = mockComplianceItems.filter((item) => {
    const matchesSearch =
      item.founderName.toLowerCase().includes(search.toLowerCase()) ||
      item.title.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    const matchesType = typeFilter === 'all' || item.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const overdueCount = mockComplianceItems.filter((i) => i.status === 'overdue').length
  const atRiskCount = mockComplianceItems.filter((i) => i.status === 'at_risk').length
  const pendingCount = mockComplianceItems.filter((i) => i.status === 'pending').length

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
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">{mockComplianceItems.length}</p>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-600">
              Overdue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">{overdueCount}</p>
          </CardContent>
        </Card>
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-600">
              At Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">{atRiskCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Pending
            </CardTitle>
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
            <div className="flex gap-4">
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
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="federal">Federal</SelectItem>
                  <SelectItem value="state">State</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Bell className="h-4 w-4" />
                Send Reminders
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Deadlines</CardTitle>
          <CardDescription>
            {filteredItems.length} items found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Founder</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => {
                const type = typeConfig[item.type]
                const status = statusConfig[item.status]
                const daysUntil = differenceInDays(item.dueDate, new Date())
                const isOverdue = isPast(item.dueDate) && item.status !== 'completed'

                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.founderName}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>
                      <Badge className={type.color}>{type.label}</Badge>
                    </TableCell>
                    <TableCell>{format(item.dueDate, 'MMM d, yyyy')}</TableCell>
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
                        {isOverdue
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
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Bell className="h-4 w-4" />
                        </Button>
                        {item.status !== 'completed' && (
                          <Button size="sm">Mark Complete</Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
