'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ArrowLeft,
  User,
  Building2,
  FileText,
  Shield,
  Check,
  X,
  Edit,
  Mail,
  Calendar,
  Download,
} from 'lucide-react'
import { format } from 'date-fns'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'

interface FounderDetailClientProps {
  founder: Record<string, unknown>
  trustScore: Record<string, unknown> | null
  documents: Record<string, unknown>[]
  verifications: Record<string, unknown>[]
  company: Record<string, unknown> | null
  bankApplication: Record<string, unknown> | null
}

const statusOptions = [
  { value: 'elite', label: 'Elite' },
  { value: 'approved', label: 'Approved' },
  { value: 'review_needed', label: 'Review Needed' },
  { value: 'conditional', label: 'Conditional' },
  { value: 'not_eligible', label: 'Not Eligible' },
]

export function FounderDetailClient({
  founder,
  trustScore,
  documents,
  verifications,
  company,
  bankApplication,
}: FounderDetailClientProps) {
  const router = useRouter()
  const [isOverrideOpen, setIsOverrideOpen] = useState(false)
  const [overrideScore, setOverrideScore] = useState(
    trustScore ? String(trustScore.total_score) : '0'
  )
  const [overrideStatus, setOverrideStatus] = useState(
    (trustScore?.status as string) || 'review_needed'
  )
  const [overrideReason, setOverrideReason] = useState('')
  const [saving, setSaving] = useState(false)

  const handleOverride = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/trust-score', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          founderId: founder.id,
          totalScore: parseInt(overrideScore),
          status: overrideStatus,
          reason: overrideReason,
        }),
      })
      if (res.ok) {
        toast.success('Trust score overridden successfully')
        setIsOverrideOpen(false)
        router.refresh()
      } else {
        toast.error('Failed to override trust score')
      }
    } catch {
      toast.error('Failed to override trust score')
    } finally {
      setSaving(false)
    }
  }

  const handleApprove = async () => {
    try {
      const res = await fetch('/api/founders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          founderId: founder.id,
          status: 'active',
        }),
      })
      if (res.ok) {
        toast.success('Founder approved')
        router.refresh()
      }
    } catch {
      toast.error('Failed to approve founder')
    }
  }

  const handleReject = async () => {
    try {
      const res = await fetch('/api/founders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          founderId: founder.id,
          status: 'churned',
        }),
      })
      if (res.ok) {
        toast.success('Founder rejected')
        router.refresh()
      }
    } catch {
      toast.error('Failed to reject founder')
    }
  }

  const score = trustScore?.total_score as number | undefined
  const scoreStatus = trustScore?.status as string | undefined

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/applications"
          className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Applications
        </Link>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
              {(founder.full_name as string).charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{founder.full_name as string}</h1>
              <p className="text-gray-500">{company ? (company.name as string) : 'No company'}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog open={isOverrideOpen} onOpenChange={setIsOverrideOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Override Score
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Override Trust Score</DialogTitle>
                  <DialogDescription>
                    Manually adjust the trust score and status for this founder.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>New Score (0-100)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={overrideScore}
                      onChange={(e) => setOverrideScore(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>New Status</Label>
                    <Select value={overrideStatus} onValueChange={setOverrideStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Reason for Override</Label>
                    <Textarea
                      value={overrideReason}
                      onChange={(e) => setOverrideReason(e.target.value)}
                      placeholder="Explain why you're overriding the score..."
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleOverride} className="w-full" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Override'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button className="gap-2 bg-green-600 hover:bg-green-700" onClick={handleApprove}>
              <Check className="h-4 w-4" />
              Approve
            </Button>
            <Button variant="destructive" className="gap-2" onClick={handleReject}>
              <X className="h-4 w-4" />
              Reject
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="verifications">Verifications</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              {/* Personal Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{founder.full_name as string}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{founder.email as string}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{(founder.phone as string) || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Country of Origin</p>
                    <p className="font-medium">{(founder.country_of_origin as string) || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Country of Residence</p>
                    <p className="font-medium">{(founder.country_of_residence as string) || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium">
                      {format(new Date(founder.created_at as string), 'MMM d, yyyy')}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Company Info */}
              {company && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Building2 className="h-5 w-5" />
                      Company Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Company Name</p>
                      <p className="font-medium">{company.name as string}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">State</p>
                      <p className="font-medium">{(company.state as string) || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Formation Status</p>
                      <Badge>{(company.formation_status as string) || 'N/A'}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">EIN</p>
                      <p className="font-medium">{(company.ein as string) || 'Not assigned'}</p>
                    </div>
                    {company.website ? (
                      <div>
                        <p className="text-sm text-gray-500">Website</p>
                        <p className="font-medium text-blue-600">{company.website as string}</p>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              )}

              {/* Bank Application */}
              {bankApplication && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Building2 className="h-5 w-5" />
                      Bank Application
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Bank</p>
                      <p className="font-medium">{(bankApplication.bank_name as string) || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <Badge>{(bankApplication.status as string) || 'N/A'}</Badge>
                    </div>
                    {bankApplication.submitted_at ? (
                      <div>
                        <p className="text-sm text-gray-500">Submitted</p>
                        <p className="font-medium">
                          {format(new Date(bankApplication.submitted_at as string), 'MMM d, yyyy')}
                        </p>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="verifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Verification Status</CardTitle>
                  <CardDescription>
                    Track the verification progress for this founder.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {verifications.length === 0 ? (
                      <p className="text-sm text-gray-500">No verifications yet.</p>
                    ) : (
                      verifications.map((v) => (
                        <div
                          key={v.id as string}
                          className="flex items-center justify-between rounded-lg border p-4"
                        >
                          <div className="flex items-center gap-3">
                            {v.status === 'verified' ? (
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                <Check className="h-4 w-4 text-green-600" />
                              </div>
                            ) : v.status === 'pending' ? (
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                                <Calendar className="h-4 w-4 text-yellow-600" />
                              </div>
                            ) : (
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                                <X className="h-4 w-4 text-gray-400" />
                              </div>
                            )}
                            <div>
                              <p className="font-medium">{v.verification_type as string}</p>
                              {v.verified_at ? (
                                <p className="text-sm text-gray-500">
                                  Verified {format(new Date(v.verified_at as string), 'MMM d, yyyy')}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <Badge
                            className={
                              v.status === 'verified'
                                ? 'bg-green-100 text-green-700'
                                : v.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-700'
                            }
                          >
                            {v.status === 'verified' ? 'Verified' : v.status === 'pending' ? 'Pending' : (v.status as string)}
                          </Badge>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Uploaded Documents</CardTitle>
                  <CardDescription>
                    Review and verify submitted documents.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {documents.length === 0 ? (
                      <p className="text-sm text-gray-500">No documents uploaded yet.</p>
                    ) : (
                      documents.map((doc) => (
                        <div
                          key={doc.id as string}
                          className="flex items-center justify-between rounded-lg border p-4"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-8 w-8 text-gray-400" />
                            <div>
                              <p className="font-medium">{doc.file_name as string}</p>
                              <p className="text-sm text-gray-500">
                                {doc.type as string} &bull; Uploaded{' '}
                                {format(new Date(doc.created_at as string), 'MMM d, yyyy')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={
                                doc.verified
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }
                            >
                              {doc.verified ? 'Verified' : 'Pending'}
                            </Badge>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trust Score Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="h-5 w-5" />
                Trust Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              {trustScore ? (
                <>
                  <div className="text-center">
                    <div className={`text-5xl font-bold ${getScoreColor(score || 0)}`}>
                      {score}
                    </div>
                    <Badge className={`mt-2 ${getStatusBadgeColor(scoreStatus || '')}`}>
                      {formatStatus(scoreStatus || 'pending')}
                    </Badge>
                    {trustScore.manual_override ? (
                      <p className="mt-2 text-xs text-orange-600">
                        * Manually overridden
                      </p>
                    ) : null}
                  </div>
                  <div className="mt-6 space-y-3">
                    <ScoreBar label="Digital Lineage" value={(trustScore.digital_lineage_score as number) || 0} max={40} />
                    <ScoreBar label="Business" value={(trustScore.business_score as number) || 0} max={25} />
                    <ScoreBar label="Identity" value={(trustScore.identity_score as number) || 0} max={20} />
                    <ScoreBar label="Network" value={(trustScore.network_score as number) || 0} max={15} />
                  </div>
                </>
              ) : (
                <p className="text-center text-sm text-gray-500">No trust score calculated</p>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Documents</span>
                <span className="font-medium">
                  {documents.filter((d) => d.verified).length}/{documents.length} verified
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Verifications</span>
                <span className="font-medium">
                  {verifications.filter((v) => v.status === 'verified').length}/{verifications.length} complete
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <Badge>{(founder.status as string) || 'N/A'}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Tier</span>
                <span className="font-medium capitalize">{(founder.tier as string) || 'N/A'}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ScoreBar({ label, value, max }: { label: string; value: number; max: number }) {
  const percentage = max > 0 ? (value / max) * 100 : 0

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">{label}</span>
        <span className="font-medium text-gray-700">
          {value}/{max}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  )
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600'
  if (score >= 70) return 'text-blue-600'
  if (score >= 50) return 'text-yellow-600'
  return 'text-red-600'
}

function getStatusBadgeColor(status: string): string {
  switch (status) {
    case 'elite': return 'bg-green-100 text-green-700'
    case 'approved': return 'bg-blue-100 text-blue-700'
    case 'review_needed': return 'bg-yellow-100 text-yellow-700'
    case 'conditional': return 'bg-orange-100 text-orange-700'
    case 'not_eligible': return 'bg-red-100 text-red-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

function formatStatus(status: string): string {
  return status
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
