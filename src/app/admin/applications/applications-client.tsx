'use client'

import { useState } from 'react'
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Search, Eye, CheckCircle, XCircle, Clock } from 'lucide-react'
import { format } from 'date-fns'

interface Application {
  id: string
  founderName: string
  email: string
  country: string
  trustScore: number
  status: string
  submittedAt: string
  companyName: string
}

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'bg-gray-100 text-gray-700' },
  under_review: { label: 'Under Review', color: 'bg-yellow-100 text-yellow-700' },
  review_needed: { label: 'Review Needed', color: 'bg-yellow-100 text-yellow-700' },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-700' },
  elite: { label: 'Elite', color: 'bg-green-100 text-green-700' },
  conditional: { label: 'Conditional', color: 'bg-orange-100 text-orange-700' },
  not_eligible: { label: 'Not Eligible', color: 'bg-red-100 text-red-700' },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700' },
}

export function ApplicationsClient({
  applications,
  total,
}: {
  applications: Application[]
  total: number
}) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [scoreFilter, setScoreFilter] = useState<string>('all')

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.founderName.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase()) ||
      app.companyName.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter

    const matchesScore =
      scoreFilter === 'all' ||
      (scoreFilter === 'high' && app.trustScore >= 80) ||
      (scoreFilter === 'medium' && app.trustScore >= 50 && app.trustScore < 80) ||
      (scoreFilter === 'low' && app.trustScore < 50)

    return matchesSearch && matchesStatus && matchesScore
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
        <p className="mt-1 text-sm text-gray-500">
          Review and manage founder applications. {total} total.
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by name, email, or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="review_needed">Review Needed</SelectItem>
                  <SelectItem value="elite">Elite</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="conditional">Conditional</SelectItem>
                  <SelectItem value="not_eligible">Not Eligible</SelectItem>
                </SelectContent>
              </Select>
              <Select value={scoreFilter} onValueChange={setScoreFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Trust Score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Scores</SelectItem>
                  <SelectItem value="high">High (80+)</SelectItem>
                  <SelectItem value="medium">Medium (50-79)</SelectItem>
                  <SelectItem value="low">Low (&lt;50)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Applications</CardTitle>
          <CardDescription>
            {filteredApplications.length} applications found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Founder</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Trust Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500">
                    No applications found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications.map((app) => {
                  const status = statusConfig[app.status] || statusConfig.pending
                  return (
                    <TableRow key={app.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{app.founderName}</p>
                          <p className="text-sm text-gray-500">{app.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{app.companyName}</TableCell>
                      <TableCell>{app.country}</TableCell>
                      <TableCell>
                        <Badge className={getScoreBadgeColor(app.trustScore)}>
                          {app.trustScore}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={status.color}>{status.label}</Badge>
                      </TableCell>
                      <TableCell>{format(new Date(app.submittedAt), 'MMM d, yyyy')}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/admin/founders/${app.id}`}>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                        </Link>
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

function getScoreBadgeColor(score: number): string {
  if (score >= 80) return 'bg-green-100 text-green-700'
  if (score >= 70) return 'bg-blue-100 text-blue-700'
  if (score >= 50) return 'bg-yellow-100 text-yellow-700'
  return 'bg-red-100 text-red-700'
}
