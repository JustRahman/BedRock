'use client'

import { useState, useRef } from 'react'
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
  DollarSign,
  Upload,
  Loader2,
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

const adminDocumentTypes = [
  { value: 'articles_of_organization', label: 'Articles of Organization' },
  { value: 'ein_letter', label: 'EIN Letter' },
  { value: 'operating_agreement', label: 'Operating Agreement' },
  { value: 'registered_agent', label: 'Registered Agent' },
  { value: 'passport', label: 'Passport' },
  { value: 'local_id', label: 'Local ID' },
  { value: 'address_proof', label: 'Address Proof' },
  { value: 'bank_statement', label: 'Bank Statement' },
  { value: 'business_license', label: 'Business License' },
  { value: 'other', label: 'Other' },
]

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
  const [paymentVerified, setPaymentVerified] = useState(
    verifications.some(
      (v) => (v.verification_type as string) === 'payment_verified' && v.status === 'verified'
    )
  )
  const [paymentToggling, setPaymentToggling] = useState(false)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [uploadType, setUploadType] = useState('')
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadDocument = async () => {
    if (!uploadFile || !uploadType) {
      setUploadError('Please select a document type and file.')
      return
    }
    setUploadError('')
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', uploadFile)
      formData.append('type', uploadType)
      formData.append('founderId', founder.id as string)

      const res = await fetch('/api/documents', { method: 'POST', body: formData })
      if (!res.ok) {
        const data = await res.json()
        setUploadError(data.error || 'Upload failed')
        return
      }
      toast.success('Document uploaded successfully')
      setIsUploadOpen(false)
      setUploadFile(null)
      setUploadType('')
      router.refresh()
    } catch {
      setUploadError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleDownloadDoc = async (docId: string) => {
    try {
      const res = await fetch(`/api/documents/download?id=${docId}`)
      if (!res.ok) return
      const data = await res.json()
      if (data.url) window.open(data.url, '_blank')
    } catch {
      toast.error('Failed to download document')
    }
  }

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

  const handlePaymentToggle = async () => {
    setPaymentToggling(true)
    const newValue = !paymentVerified
    try {
      const res = await fetch('/api/admin/payment-verified', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          founderId: founder.id,
          verified: newValue,
        }),
      })
      if (res.ok) {
        setPaymentVerified(newValue)
        toast.success(newValue ? 'Payment marked as verified' : 'Payment verification removed')
        router.refresh()
      } else {
        toast.error('Failed to update payment verification')
      }
    } catch {
      toast.error('Failed to update payment verification')
    } finally {
      setPaymentToggling(false)
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
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Uploaded Documents</CardTitle>
                    <CardDescription>
                      Review and verify submitted documents.
                    </CardDescription>
                  </div>
                  <Dialog open={isUploadOpen} onOpenChange={(open) => {
                    setIsUploadOpen(open)
                    if (!open) { setUploadError(''); setUploadFile(null); setUploadType('') }
                  }}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Document
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload Document for Founder</DialogTitle>
                        <DialogDescription>
                          Select the document type and upload a file. Admin uploads are automatically marked as verified.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Document Type</Label>
                          <Select value={uploadType} onValueChange={setUploadType}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select document type" />
                            </SelectTrigger>
                            <SelectContent>
                              {adminDocumentTypes.map((t) => (
                                <SelectItem key={t.value} value={t.value}>
                                  {t.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>File</Label>
                          <div
                            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 hover:bg-gray-50"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Upload className="mb-2 h-8 w-8 text-gray-400" />
                            {uploadFile ? (
                              <p className="text-sm font-medium">{uploadFile.name}</p>
                            ) : (
                              <>
                                <p className="text-sm text-gray-500">Click to upload</p>
                                <p className="mt-1 text-xs text-gray-400">PDF, PNG, JPG up to 10MB</p>
                              </>
                            )}
                            <input
                              ref={fileInputRef}
                              type="file"
                              className="hidden"
                              accept=".pdf,.png,.jpg,.jpeg"
                              onChange={(e) => setUploadFile(e.target.files?.[0] ?? null)}
                            />
                          </div>
                        </div>
                        {uploadError && <p className="text-sm text-red-500">{uploadError}</p>}
                        <Button onClick={handleUploadDocument} className="w-full" disabled={uploading}>
                          {uploading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            'Upload'
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
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
                                {(doc.type as string).replace(/_/g, ' ')} &bull; Uploaded{' '}
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
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownloadDoc(doc.id as string)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
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
                    <ScoreBar label="Digital Lineage" value={(trustScore.digital_lineage_score as number) || 0} max={35} />
                    <ScoreBar label="Economic Activity" value={(trustScore.business_score as number) || 0} max={25} />
                    <ScoreBar label="Identity" value={(trustScore.identity_score as number) || 0} max={20} />
                    <ScoreBar label="Network" value={(trustScore.network_score as number) || 0} max={10} />
                  </div>
                </>
              ) : (
                <p className="text-center text-sm text-gray-500">No trust score calculated</p>
              )}
            </CardContent>
          </Card>

          {/* Payment Verified Toggle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <DollarSign className="h-5 w-5" />
                Payment Verification
              </CardTitle>
              <CardDescription>
                Toggle whether this founder&apos;s formation payment has been verified.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">
                    {paymentVerified ? 'Verified' : 'Not Verified'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {paymentVerified ? '+5 trust score points' : '0 trust score points'}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant={paymentVerified ? 'default' : 'outline'}
                  onClick={handlePaymentToggle}
                  disabled={paymentToggling}
                  className={paymentVerified ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  {paymentToggling ? 'Updating...' : paymentVerified ? 'Verified' : 'Mark Verified'}
                </Button>
              </div>
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
