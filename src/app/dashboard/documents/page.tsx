'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
import { Label } from '@/components/ui/label'
import { Upload, Download, Trash2, FileText, CheckCircle, Clock, Loader2, AlertTriangle, Eye } from 'lucide-react'
import { format } from 'date-fns'
import { createClient } from '@/lib/supabase/client'

interface Document {
  id: string
  file_name: string
  type: string
  file_path: string
  file_size: number
  mime_type: string
  verified: boolean
  verified_by: string | null
  created_at: string
}

interface Verification {
  id: string
  founder_id: string
  verification_type: string
  status: string
  metadata: {
    document_id?: string
    extracted_data?: {
      fullName: string | null
      dateOfBirth: string | null
      documentNumber: string | null
      expiryDate: string | null
      nationality: string | null
      documentTypeConfirmed: string | null
      confidence: number
    }
    match_results?: {
      name: string
      dateOfBirth: string
      country: string
    }
    confidence?: number
    reasoning?: string
  } | null
}

const documentTypes = [
  { value: 'passport', label: 'Passport' },
  { value: 'local_id', label: 'Local ID' },
  { value: 'address_proof', label: 'Address Proof' },
  { value: 'bank_statement', label: 'Bank Statement' },
  { value: 'business_license', label: 'Business License' },
  { value: 'other', label: 'Other' },
]

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

type VerificationStatus = 'verified' | 'review_needed' | 'pending'

function getDocVerificationStatus(doc: Document, verificationMap: Record<string, Verification>): VerificationStatus {
  if (doc.verified) return 'verified'
  const v = verificationMap[doc.id]
  if (v && v.status === 'pending' && v.metadata?.match_results) return 'review_needed'
  return 'pending'
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [verifications, setVerifications] = useState<Verification[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [selectedType, setSelectedType] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [uploadResult, setUploadResult] = useState<{ status: string; reasoning: string } | null>(null)
  const [detailsDoc, setDetailsDoc] = useState<Document | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function fetchData() {
    try {
      const [docsRes, verifRes] = await Promise.all([
        fetch('/api/documents'),
        fetch('/api/verifications'),
      ])
      if (docsRes.ok) {
        const data = await docsRes.json()
        setDocuments(data.documents ?? [])
      }
      if (verifRes.ok) {
        const data = await verifRes.json()
        setVerifications(data.verifications ?? [])
      }
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Index verifications by document_id from metadata
  const verificationMap: Record<string, Verification> = {}
  for (const v of verifications) {
    const docId = v.metadata?.document_id
    if (docId) {
      verificationMap[docId] = v
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !selectedType) {
      setError('Please select a document type and file.')
      return
    }

    setError('')
    setUploading(true)
    setUploadResult(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('type', selectedType)

      const res = await fetch('/api/documents', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Upload failed')
        return
      }

      const data = await res.json()

      // Show verification result inline
      if (data.verification) {
        setUploadResult({
          status: data.verification.status,
          reasoning: data.verification.reasoning,
        })
      }

      setSelectedFile(null)
      setSelectedType('')
      if (fileInputRef.current) fileInputRef.current.value = ''
      await fetchData()

      // Auto-close dialog after a short delay if no verification result to show
      if (!data.verification) {
        setIsUploadOpen(false)
      }
    } catch {
      setError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeleting(id)
    try {
      const res = await fetch(`/api/documents?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setDocuments((prev) => prev.filter((doc) => doc.id !== id))
      }
    } catch {
      // ignore
    } finally {
      setDeleting(null)
    }
  }

  const handleDownload = async (doc: Document) => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase.storage
        .from('documents')
        .createSignedUrl(doc.file_path, 60)

      if (error || !data?.signedUrl) return

      window.open(data.signedUrl, '_blank')
    } catch {
      // ignore
    }
  }

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-4 w-72 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-16 animate-pulse rounded bg-gray-100" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="h-48 animate-pulse rounded bg-gray-100" />
          </CardContent>
        </Card>
      </div>
    )
  }

  const verifiedCount = documents.filter((d) => d.verified).length
  const reviewNeededCount = documents.filter((d) => getDocVerificationStatus(d, verificationMap) === 'review_needed').length
  const pendingCount = documents.filter((d) => getDocVerificationStatus(d, verificationMap) === 'pending').length

  const detailsVerification = detailsDoc ? verificationMap[detailsDoc.id] : null

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Vault</h1>
          <p className="mt-1 text-sm text-gray-500">
            Securely store and manage your verification documents.
          </p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={(open) => {
          setIsUploadOpen(open)
          if (!open) {
            setError('')
            setSelectedFile(null)
            setSelectedType('')
            setUploadResult(null)
          }
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>
                Select the document type and upload your file. Identity documents are automatically verified.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {uploadResult ? (
                <div className={`rounded-lg border p-4 ${
                  uploadResult.status === 'verified'
                    ? 'border-green-200 bg-green-50'
                    : uploadResult.status === 'review_needed'
                    ? 'border-orange-200 bg-orange-50'
                    : 'border-yellow-200 bg-yellow-50'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {uploadResult.status === 'verified' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                    )}
                    <span className="font-medium">
                      {uploadResult.status === 'verified'
                        ? 'Document Verified'
                        : uploadResult.status === 'review_needed'
                        ? 'Review Needed'
                        : 'Verification Failed'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{uploadResult.reasoning}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => {
                      setIsUploadOpen(false)
                      setUploadResult(null)
                    }}
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label>Document Type</Label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        {documentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>File</Label>
                    <div
                      className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 hover:bg-gray-100"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="mb-2 h-8 w-8 text-gray-400" />
                      {selectedFile ? (
                        <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                      ) : (
                        <>
                          <p className="text-sm text-gray-600">
                            Click to upload or drag and drop
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            PDF, PNG, JPG up to 10MB
                          </p>
                        </>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                      />
                    </div>
                  </div>
                  {error && (
                    <p className="text-sm text-red-600">{error}</p>
                  )}
                  <Button onClick={handleUpload} className="w-full" disabled={uploading}>
                    {uploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Upload'
                    )}
                  </Button>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">{documents.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Verified
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{verifiedCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Review Needed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">{reviewNeededCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Documents</CardTitle>
          <CardDescription>
            All documents are encrypted and stored securely.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {documents.length === 0 ? (
            <div className="py-12 text-center">
              <FileText className="mx-auto mb-3 h-10 w-10 text-gray-300" />
              <p className="font-medium text-gray-900">No documents yet</p>
              <p className="mt-1 text-sm text-gray-500">
                Upload your first document to get started.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => {
                  const status = getDocVerificationStatus(doc, verificationMap)
                  return (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <span className="font-medium">{doc.file_name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">
                        {doc.type.replace('_', ' ')}
                      </TableCell>
                      <TableCell>
                        {format(new Date(doc.created_at), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell>{formatFileSize(doc.file_size)}</TableCell>
                      <TableCell>
                        {status === 'verified' ? (
                          <Badge className="bg-green-100 text-green-600">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Verified
                          </Badge>
                        ) : status === 'review_needed' ? (
                          <Badge className="bg-orange-100 text-orange-600">
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            Review Needed
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-600">
                            <Clock className="mr-1 h-3 w-3" />
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {verificationMap[doc.id] && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDetailsDoc(doc)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownload(doc)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(doc.id)}
                            disabled={deleting === doc.id}
                          >
                            {deleting === doc.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4 text-red-500" />
                            )}
                          </Button>
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

      {/* Verification Details Dialog */}
      <Dialog open={!!detailsDoc} onOpenChange={(open) => { if (!open) setDetailsDoc(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verification Details</DialogTitle>
            <DialogDescription>
              {detailsDoc ? `${detailsDoc.file_name} — ${detailsDoc.type.replace('_', ' ')}` : ''}
            </DialogDescription>
          </DialogHeader>
          {detailsVerification?.metadata ? (
            <div className="space-y-4 py-2">
              <div className="rounded-lg border p-4 space-y-3">
                <h4 className="font-medium text-sm text-gray-500">Match Results</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Name:</span>
                    <MatchBadge result={detailsVerification.metadata.match_results?.name} />
                  </div>
                  <div>
                    <span className="text-gray-500">Extracted:</span>{' '}
                    <span className="font-medium">{detailsVerification.metadata.extracted_data?.fullName ?? 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Date of Birth:</span>
                    <MatchBadge result={detailsVerification.metadata.match_results?.dateOfBirth} />
                  </div>
                  <div>
                    <span className="text-gray-500">Extracted:</span>{' '}
                    <span className="font-medium">{detailsVerification.metadata.extracted_data?.dateOfBirth ?? 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Country:</span>
                    <MatchBadge result={detailsVerification.metadata.match_results?.country} />
                  </div>
                  <div>
                    <span className="text-gray-500">Extracted:</span>{' '}
                    <span className="font-medium">{detailsVerification.metadata.extracted_data?.nationality ?? 'N/A'}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4 space-y-2">
                <h4 className="font-medium text-sm text-gray-500">Confidence</h4>
                <div className="flex items-center gap-3">
                  <div className="h-2 flex-1 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${detailsVerification.metadata.confidence ?? 0}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{detailsVerification.metadata.confidence ?? 0}%</span>
                </div>
              </div>
              {detailsVerification.metadata.extracted_data?.documentNumber ? (
                <div className="rounded-lg border p-4 space-y-2">
                  <h4 className="font-medium text-sm text-gray-500">Document Details</h4>
                  <div className="text-sm space-y-1">
                    <p><span className="text-gray-500">Document #:</span> {detailsVerification.metadata.extracted_data.documentNumber}</p>
                    {detailsVerification.metadata.extracted_data.expiryDate ? (
                      <p><span className="text-gray-500">Expiry:</span> {detailsVerification.metadata.extracted_data.expiryDate}</p>
                    ) : null}
                    {detailsVerification.metadata.extracted_data.documentTypeConfirmed ? (
                      <p><span className="text-gray-500">Type confirmed:</span> {detailsVerification.metadata.extracted_data.documentTypeConfirmed}</p>
                    ) : null}
                  </div>
                </div>
              ) : null}
              {detailsVerification.metadata.reasoning ? (
                <p className="text-xs text-gray-500">{detailsVerification.metadata.reasoning}</p>
              ) : null}
            </div>
          ) : (
            <p className="py-4 text-sm text-gray-500">No verification data available for this document.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function MatchBadge({ result }: { result?: string }) {
  if (!result) return null
  const styles: Record<string, string> = {
    exact: 'bg-green-100 text-green-700',
    partial: 'bg-blue-100 text-blue-700',
    mismatch: 'bg-red-100 text-red-700',
    unavailable: 'bg-gray-100 text-gray-500',
  }
  return (
    <Badge className={`ml-2 text-xs ${styles[result] ?? 'bg-gray-100 text-gray-500'}`}>
      {result}
    </Badge>
  )
}
