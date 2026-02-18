'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
  FileText,
  Zap,
  CreditCard,
  Heart,
  Clock,
  CheckCircle,
  XCircle,
  Briefcase,
} from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'

interface ServiceReq {
  id: string
  founderId: string
  founderName: string
  founderEmail: string
  companyName: string | null
  companyState: string | null
  serviceType: string
  status: string
  notes: string | null
  adminNotes: string | null
  createdAt: string
}

const serviceTypeConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  itin: { label: 'ITIN', icon: FileText, color: 'bg-violet-100 text-violet-700' },
  ein_only: { label: 'EIN Only', icon: FileText, color: 'bg-rose-100 text-rose-700' },
  stripe_activation: { label: 'Stripe Activation', icon: Zap, color: 'bg-cyan-100 text-cyan-700' },
  credit_building: { label: 'Business Credit', icon: CreditCard, color: 'bg-indigo-100 text-indigo-700' },
  alternative_id: { label: 'Alternative ID', icon: Heart, color: 'bg-emerald-100 text-emerald-700' },
  tax_8843: { label: 'Tax - Form 8843', icon: FileText, color: 'bg-teal-100 text-teal-700' },
  tax_1040nr: { label: 'Tax - 1040-NR', icon: FileText, color: 'bg-orange-100 text-orange-700' },
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  requested: { label: 'New', color: 'bg-blue-100 text-blue-700', icon: Clock },
  in_progress: { label: 'In Progress', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700', icon: XCircle },
}

export function ServicesClient({ requests }: { requests: ServiceReq[] }) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)
  const [adminNoteInputs, setAdminNoteInputs] = useState<Record<string, string>>({})

  const newCount = requests.filter((r) => r.status === 'requested').length
  const inProgressCount = requests.filter((r) => r.status === 'in_progress').length

  const filtered = requests.filter((r) => {
    const matchesSearch =
      r.founderName.toLowerCase().includes(search.toLowerCase()) ||
      r.founderEmail.toLowerCase().includes(search.toLowerCase()) ||
      (r.companyName || '').toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === 'all' || r.serviceType === typeFilter
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const handleUpdate = async (id: string, newStatus: string) => {
    setUpdating(id)
    try {
      const body: Record<string, unknown> = { requestId: id, status: newStatus }
      const noteText = adminNoteInputs[id]?.trim()
      if (noteText) body.adminNotes = noteText

      const res = await fetch('/api/service-requests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        toast.success(`Updated to ${statusConfig[newStatus]?.label || newStatus}`)
        setAdminNoteInputs((prev) => ({ ...prev, [id]: '' }))
        router.refresh()
      } else {
        toast.error('Failed to update')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setUpdating(null)
    }
  }

  const saveNotesOnly = async (id: string) => {
    setUpdating(id)
    try {
      const noteText = adminNoteInputs[id]?.trim()
      const res = await fetch('/api/service-requests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId: id, adminNotes: noteText }),
      })
      if (res.ok) {
        toast.success('Notes saved')
        setAdminNoteInputs((prev) => ({ ...prev, [id]: '' }))
        router.refresh()
      } else {
        toast.error('Failed to save notes')
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
        <h1 className="text-2xl font-bold text-gray-900">Service Requests</h1>
        <p className="mt-1 text-sm text-gray-500">
          ITIN, Stripe activation, credit building, alternative ID — all service requests in one place.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">{requests.length}</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">New</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{newCount}</p>
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
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">
              {requests.filter((r) => r.status === 'completed').length}
            </p>
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
                placeholder="Search by founder or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Service Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="itin">ITIN</SelectItem>
                <SelectItem value="ein_only">EIN Only</SelectItem>
                <SelectItem value="stripe_activation">Stripe Activation</SelectItem>
                <SelectItem value="credit_building">Business Credit</SelectItem>
                <SelectItem value="alternative_id">Alternative ID</SelectItem>
                <SelectItem value="tax_8843">Tax - Form 8843</SelectItem>
                <SelectItem value="tax_1040nr">Tax - 1040-NR</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="requested">New</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Requests list */}
      <div className="space-y-3">
        <p className="text-sm text-gray-500">{filtered.length} requests found</p>

        {filtered.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Briefcase className="mx-auto mb-3 h-10 w-10 text-gray-300" />
              <p className="font-medium text-gray-500">No service requests found</p>
            </CardContent>
          </Card>
        ) : (
          filtered.map((req) => {
            const sType = serviceTypeConfig[req.serviceType] || { label: req.serviceType, icon: Briefcase, color: 'bg-gray-100 text-gray-700' }
            const sStatus = statusConfig[req.status] || statusConfig.requested
            const isExpanded = expandedId === req.id
            const TypeIcon = sType.icon

            return (
              <Card
                key={req.id}
                className={req.status === 'requested' ? 'border-blue-200' : req.status === 'in_progress' ? 'border-yellow-200' : ''}
              >
                {/* Header row */}
                <div
                  className="flex cursor-pointer items-center justify-between p-4 hover:bg-gray-50"
                  onClick={() => setExpandedId(isExpanded ? null : req.id)}
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    )}
                    <TypeIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{req.founderName}</p>
                        <Badge className={sType.color}>{sType.label}</Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        {req.founderEmail}
                        {req.companyName ? ` · ${req.companyName}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge className={sStatus.color}>{sStatus.label}</Badge>
                    <span className="text-xs text-gray-400">
                      {format(new Date(req.createdAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <CardContent className="border-t pt-4">
                    <div className="space-y-4">
                      {/* Founder notes */}
                      {req.notes ? (
                        <div>
                          <p className="text-xs font-medium text-gray-500">Founder&apos;s notes</p>
                          <p className="mt-1 text-sm text-gray-700 rounded-md bg-gray-50 p-3">
                            {req.notes}
                          </p>
                        </div>
                      ) : null}

                      {/* Current admin notes */}
                      {req.adminNotes ? (
                        <div>
                          <p className="text-xs font-medium text-gray-500">Your notes (visible to founder)</p>
                          <p className="mt-1 text-sm text-gray-700 rounded-md bg-blue-50 p-3">
                            {req.adminNotes}
                          </p>
                        </div>
                      ) : null}

                      {/* Actions */}
                      {(req.status === 'requested' || req.status === 'in_progress') && (
                        <div className="space-y-3 border-t pt-4">
                          <Textarea
                            value={adminNoteInputs[req.id] || ''}
                            onChange={(e) =>
                              setAdminNoteInputs((prev) => ({ ...prev, [req.id]: e.target.value }))
                            }
                            placeholder="Add admin notes (visible to the founder)..."
                            rows={2}
                            className="text-sm"
                          />
                          <div className="flex items-center gap-2">
                            {req.status === 'requested' && (
                              <Button
                                size="sm"
                                onClick={() => handleUpdate(req.id, 'in_progress')}
                                disabled={updating === req.id}
                              >
                                {updating === req.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Start Working
                              </Button>
                            )}
                            {req.status === 'in_progress' && (
                              <Button
                                size="sm"
                                onClick={() => handleUpdate(req.id, 'completed')}
                                disabled={updating === req.id}
                              >
                                {updating === req.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Mark Completed
                              </Button>
                            )}
                            {req.status === 'in_progress' && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleUpdate(req.id, 'rejected')}
                                disabled={updating === req.id}
                              >
                                Reject
                              </Button>
                            )}
                            {adminNoteInputs[req.id]?.trim() && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => saveNotesOnly(req.id)}
                                disabled={updating === req.id}
                              >
                                Save Notes Only
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
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
