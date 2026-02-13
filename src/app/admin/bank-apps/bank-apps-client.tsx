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
import { Search, Loader2, Landmark } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'

interface BankApp {
  id: string
  founderId: string
  founderName: string
  founderEmail: string
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

const statusConfig: Record<string, { label: string; color: string }> = {
  draft: { label: 'Draft', color: 'bg-gray-100 text-gray-700' },
  submitted: { label: 'Submitted', color: 'bg-blue-100 text-blue-700' },
  under_review: { label: 'Under Review', color: 'bg-yellow-100 text-yellow-700' },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-700' },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700' },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700' },
}

export function BankAppsClient({ applications }: { applications: BankApp[] }) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [updating, setUpdating] = useState<string | null>(null)

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.founderName.toLowerCase().includes(search.toLowerCase()) ||
      app.founderEmail.toLowerCase().includes(search.toLowerCase()) ||
      app.companyName.toLowerCase().includes(search.toLowerCase()) ||
      app.bankName.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const submittedCount = applications.filter((a) => a.status === 'submitted').length
  const underReviewCount = applications.filter((a) => a.status === 'under_review').length
  const approvedCount = applications.filter((a) => a.status === 'approved' || a.status === 'completed').length

  const handleStatusUpdate = async (appId: string, newStatus: string) => {
    setUpdating(appId)
    try {
      const res = await fetch('/api/bank-applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: appId,
          status: newStatus,
        }),
      })

      if (res.ok) {
        toast.success(`Status updated to ${statusConfig[newStatus]?.label || newStatus}`)
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
          Review and manage bank account applications from founders.
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
            <CardTitle className="text-sm font-medium text-blue-600">Submitted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{submittedCount}</p>
          </CardContent>
        </Card>
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-600">Under Review</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">{underReviewCount}</p>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Approved</CardTitle>
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
                placeholder="Search by founder, company, or bank..."
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
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Bank Applications</CardTitle>
          <CardDescription>{filteredApps.length} applications found</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredApps.length === 0 ? (
            <div className="py-12 text-center">
              <Landmark className="mx-auto mb-3 h-10 w-10 text-gray-300" />
              <p className="font-medium text-gray-500">No bank applications found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Founder</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Bank</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApps.map((app) => {
                  const status = statusConfig[app.status] || statusConfig.draft

                  return (
                    <TableRow key={app.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{app.founderName}</p>
                          <p className="text-sm text-gray-500">{app.founderEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{app.companyName}</p>
                          {app.companyState && (
                            <p className="text-sm text-gray-500">
                              {app.companyState === 'DE' ? 'Delaware' : app.companyState === 'WY' ? 'Wyoming' : app.companyState}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium capitalize">{app.bankName}</TableCell>
                      <TableCell>
                        {app.submittedAt
                          ? format(new Date(app.submittedAt), 'MMM d, yyyy')
                          : '—'}
                      </TableCell>
                      <TableCell>
                        <Badge className={status.color}>{status.label}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {app.status === 'submitted' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusUpdate(app.id, 'under_review')}
                              disabled={updating === app.id}
                            >
                              {updating === app.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                'Start Review'
                              )}
                            </Button>
                          )}
                          {app.status === 'under_review' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(app.id, 'approved')}
                                disabled={updating === app.id}
                              >
                                {updating === app.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  'Approve'
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleStatusUpdate(app.id, 'rejected')}
                                disabled={updating === app.id}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {(app.status === 'approved' || app.status === 'rejected') && (
                            <span className="text-sm text-gray-400">
                              {app.approvedAt ? `Approved ${format(new Date(app.approvedAt), 'MMM d')}` : ''}
                            </span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
