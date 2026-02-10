'use client'

import { useEffect, useState, useCallback } from 'react'
import { getPendingUploads, clearPendingUploads, type DocumentType } from '@/lib/pending-uploads'
import { CheckCircle2, Loader2, AlertTriangle, Upload, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

const typeLabels: Record<DocumentType, string> = {
  passport: 'Passport',
  local_id: 'Local ID',
  address_proof: 'Address Proof',
}

interface UploadedDoc {
  label: string
  verificationStatus: string | null
}

interface PendingUploadBannerProps {
  onUploadsComplete?: () => void
}

export function PendingUploadBanner({ onUploadsComplete }: PendingUploadBannerProps) {
  const [status, setStatus] = useState<'checking' | 'uploading' | 'success' | 'error' | 'idle'>('checking')
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([])
  const [errorMsg, setErrorMsg] = useState('')

  const uploadFiles = useCallback(async () => {
    setStatus('uploading')
    setUploadedDocs([])
    setErrorMsg('')

    try {
      const uploads = await getPendingUploads()
      if (uploads.length === 0) {
        setStatus('idle')
        return
      }

      const results: UploadedDoc[] = []

      for (const upload of uploads) {
        const formData = new FormData()
        const file = new File([upload.blob], upload.fileName, { type: upload.mimeType })
        formData.append('file', file)
        formData.append('type', upload.type)

        const res = await fetch('/api/documents', { method: 'POST', body: formData })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || `Failed to upload ${typeLabels[upload.type]}`)
        }

        const data = await res.json()
        results.push({
          label: typeLabels[upload.type],
          verificationStatus: data.verification?.status ?? null,
        })
        setUploadedDocs([...results])
      }

      await clearPendingUploads()
      setStatus('success')
      onUploadsComplete?.()
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Upload failed')
      setStatus('error')
    }
  }, [onUploadsComplete])

  useEffect(() => {
    async function check() {
      try {
        const uploads = await getPendingUploads()
        if (uploads.length === 0) {
          setStatus('idle')
          return
        }
        uploadFiles()
      } catch {
        setStatus('idle')
      }
    }
    check()
  }, [uploadFiles])

  if (status === 'idle' || status === 'checking') return null

  return (
    <div className="mb-6 rounded-lg border p-4">
      {status === 'uploading' && (
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
          <div>
            <p className="font-medium text-gray-900">Uploading and verifying your documents...</p>
            {uploadedDocs.length > 0 && (
              <p className="text-sm text-gray-500">
                Uploaded: {uploadedDocs.map((d) => d.label).join(', ')}
              </p>
            )}
          </div>
        </div>
      )}

      {status === 'success' && (
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
          <div>
            <p className="font-medium text-gray-900">Documents uploaded successfully!</p>
            <div className="mt-1 space-y-1">
              {uploadedDocs.map((doc, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="text-gray-700">{doc.label}</span>
                  <span className="text-gray-400">—</span>
                  {doc.verificationStatus === 'verified' ? (
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  ) : doc.verificationStatus === 'review_needed' ? (
                    <span className="flex items-center gap-1 text-orange-600">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      Review needed
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-gray-500">
                      <Clock className="h-3.5 w-3.5" />
                      Pending review
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              View them on the{' '}
              <a href="/dashboard/documents" className="text-blue-600 underline">Documents page</a>.
            </p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <div>
              <p className="font-medium text-gray-900">Upload failed</p>
              <p className="text-sm text-gray-500">{errorMsg}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={uploadFiles} className="gap-2">
            <Upload className="h-4 w-4" />
            Retry
          </Button>
        </div>
      )}
    </div>
  )
}
