'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, Building2, Loader2, Save, Clock, User } from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'

interface Props {
  company: Record<string, unknown>
  founder: Record<string, unknown> | null
  updates: Record<string, unknown>[]
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  formed: 'bg-green-100 text-green-700',
}

export function FormationDetailClient({ company, founder, updates }: Props) {
  const router = useRouter()
  const [newStatus, setNewStatus] = useState(company.formation_status as string)
  const [note, setNote] = useState('')
  const [ein, setEin] = useState((company.ein as string) || '')
  const [submittingStatus, setSubmittingStatus] = useState(false)
  const [submittingEin, setSubmittingEin] = useState(false)
  const [raName, setRaName] = useState((company.registered_agent_name as string) || '')
  const [raNotes, setRaNotes] = useState((company.registered_agent_notes as string) || '')
  const [submittingRA, setSubmittingRA] = useState(false)

  const handleStatusUpdate = async () => {
    setSubmittingStatus(true)
    try {
      const body: Record<string, unknown> = {
        companyId: company.id,
        formationStatus: newStatus,
      }
      if (note.trim()) body.note = note.trim()
      if (newStatus === 'formed') body.formationDate = new Date().toISOString().split('T')[0]

      const res = await fetch('/api/companies', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        toast.success('Formation status updated')
        setNote('')
        router.refresh()
      } else {
        toast.error('Failed to update status')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSubmittingStatus(false)
    }
  }

  const handleEinUpdate = async () => {
    setSubmittingEin(true)
    try {
      const res = await fetch('/api/companies', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyId: company.id,
          ein: ein.trim(),
        }),
      })

      if (res.ok) {
        toast.success('EIN updated')
        router.refresh()
      } else {
        toast.error('Failed to update EIN')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSubmittingEin(false)
    }
  }

  const handleRAUpdate = async () => {
    setSubmittingRA(true)
    try {
      const res = await fetch('/api/companies', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyId: company.id,
          registeredAgentName: raName.trim(),
          registeredAgentNotes: raNotes.trim(),
        }),
      })

      if (res.ok) {
        toast.success('Registered agent info saved')
        router.refresh()
      } else {
        toast.error('Failed to save registered agent info')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSubmittingRA(false)
    }
  }

  const statusLabel = (s: string) => {
    switch (s) {
      case 'pending': return 'Pending'
      case 'processing': return 'Processing'
      case 'formed': return 'Formed'
      default: return s
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link href="/admin/formations" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-4 w-4" />
          Back to Formations
        </Link>
        <div className="flex items-center gap-3">
          <Building2 className="h-6 w-6 text-gray-400" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{company.name as string}</h1>
            <p className="text-sm text-gray-500">{company.legal_name as string || company.name as string}</p>
          </div>
          <Badge className={statusColors[(company.formation_status as string)] || 'bg-gray-100 text-gray-700'}>
            {statusLabel(company.formation_status as string)}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Company Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Company Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Company Name</p>
                <p className="font-medium">{company.name as string}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Legal Name</p>
                <p className="font-medium">{(company.legal_name as string) || '—'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">State</p>
                <p className="font-medium">
                  {company.state === 'DE' ? 'Delaware' : company.state === 'WY' ? 'Wyoming' : (company.state as string) || '—'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Formation Date</p>
                <p className="font-medium">{(company.formation_date as string) || 'Not yet formed'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">EIN</p>
                <p className="font-medium">{(company.ein as string) || 'Not assigned'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Registered Agent</p>
                <p className="font-medium">{(company.registered_agent_name as string) || 'Not assigned'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="font-medium">{format(new Date(company.created_at as string), 'MMM d, yyyy')}</p>
              </div>
            </div>
            {(company.description as string) ? (
              <div className="mt-4">
                <p className="text-sm text-gray-500">Description</p>
                <p className="font-medium">{company.description as string}</p>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Founder Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Founder</CardTitle>
          </CardHeader>
          <CardContent>
            {founder ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{founder.full_name as string}</p>
                    <p className="text-sm text-gray-500">{founder.email as string}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Country of Origin</p>
                  <p className="font-medium">{(founder.country_of_origin as string) || '—'}</p>
                </div>
                <Link href={`/admin/founders/${founder.id as string}`}>
                  <Button variant="outline" size="sm" className="mt-2">
                    View Founder Profile
                  </Button>
                </Link>
              </div>
            ) : (
              <p className="text-gray-500">Founder not found</p>
            )}
          </CardContent>
        </Card>

        {/* Status Update */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Update Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Formation Status</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="formed">Formed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Note (optional)</Label>
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note about this status change..."
                  rows={3}
                />
              </div>
              <Button onClick={handleStatusUpdate} disabled={submittingStatus} className="gap-2">
                {submittingStatus ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Update Status
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* EIN Update */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">EIN</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Employer Identification Number</Label>
                <Input
                  value={ein}
                  onChange={(e) => setEin(e.target.value)}
                  placeholder="XX-XXXXXXX"
                />
              </div>
              <Button onClick={handleEinUpdate} disabled={submittingEin} variant="outline" className="gap-2">
                {submittingEin ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save EIN
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Registered Agent */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Registered Agent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Provider Name</Label>
                <Input
                  value={raName}
                  onChange={(e) => setRaName(e.target.value)}
                  placeholder="e.g. Northwest Registered Agent"
                />
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  value={raNotes}
                  onChange={(e) => setRaNotes(e.target.value)}
                  placeholder="Account number, renewal date, etc."
                  rows={3}
                />
              </div>
              <Button onClick={handleRAUpdate} disabled={submittingRA} variant="outline" className="gap-2">
                {submittingRA ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save RA Info
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          {updates.length === 0 ? (
            <p className="text-sm text-gray-500">No activity yet. Update the status to create the first entry.</p>
          ) : (
            <div className="space-y-4">
              {updates.map((update) => (
                <div key={update.id as string} className="flex gap-3 border-l-2 border-gray-200 pl-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge className={statusColors[(update.status as string)] || 'bg-gray-100 text-gray-700'}>
                        {statusLabel(update.status as string)}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="h-3 w-3" />
                        {format(new Date(update.created_at as string), 'MMM d, yyyy h:mm a')}
                      </span>
                    </div>
                    {(update.note as string) ? (
                      <p className="mt-1 text-sm text-gray-600">{update.note as string}</p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
