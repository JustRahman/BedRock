'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, CheckCircle, Clock, ArrowRight, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

interface ServiceRequestPageProps {
  serviceType: string
  title: string
  subtitle: string
  icon: React.ElementType
  iconBg: string
  description: string
  bulletPoints: string[]
  ctaLabel: string
  notesPlaceholder: string
  comingSoon?: boolean
}

interface ServiceRequestData {
  id: string
  status: string
  notes: string | null
  admin_notes: string | null
  created_at: string
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  requested: { label: 'Requested', color: 'bg-blue-500/15 text-blue-600', icon: Clock },
  in_progress: { label: 'In Progress', color: 'bg-yellow-500/15 text-yellow-600', icon: Clock },
  completed: { label: 'Completed', color: 'bg-green-500/15 text-green-600', icon: CheckCircle },
  rejected: { label: 'Not Available', color: 'bg-red-500/15 text-red-600', icon: AlertCircle },
}

export function ServiceRequestPage({
  serviceType,
  title,
  subtitle,
  icon: Icon,
  iconBg,
  description,
  bulletPoints,
  ctaLabel,
  notesPlaceholder,
  comingSoon,
}: ServiceRequestPageProps) {
  const [request, setRequest] = useState<ServiceRequestData | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [notes, setNotes] = useState('')

  useEffect(() => {
    fetch(`/api/service-requests?type=${serviceType}`)
      .then((r) => r.json())
      .then((data) => {
        const active = (data.requests || []).find(
          (r: ServiceRequestData) => r.status === 'requested' || r.status === 'in_progress'
        )
        const completed = (data.requests || []).find(
          (r: ServiceRequestData) => r.status === 'completed'
        )
        setRequest(active || completed || null)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [serviceType])

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/service-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType,
          notes: notes.trim() || null,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setRequest(data.request)
        toast.success('Service requested! Our team will review and get started.')
      } else {
        const err = await res.json()
        toast.error(err.error || 'Failed to submit request')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">{title}</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
    )
  }

  // Already has an active or completed request
  if (request) {
    const status = statusConfig[request.status] || statusConfig.requested
    const StatusIcon = status.icon

    return (
      <div>
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <CardTitle>{title}</CardTitle>
              </div>
              <Badge className={status.color}>
                <StatusIcon className="mr-1 h-3 w-3" />
                {status.label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {request.status === 'requested' && (
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm font-medium text-blue-800">Your request has been submitted</p>
                  <p className="mt-1 text-sm text-blue-600">
                    Our team will review your request and begin working on it shortly. You&apos;ll see status updates here.
                  </p>
                </div>
              )}
              {request.status === 'in_progress' && (
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <p className="text-sm font-medium text-yellow-800">We&apos;re working on this</p>
                  <p className="mt-1 text-sm text-yellow-600">
                    Our team is actively processing your request. We&apos;ll update you as we make progress.
                  </p>
                </div>
              )}
              {request.status === 'completed' && (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <p className="text-sm font-medium text-green-800">Completed</p>
                  <p className="mt-1 text-sm text-green-600">
                    This service has been completed. Check the details below.
                  </p>
                </div>
              )}

              {request.notes ? (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Your notes</p>
                  <p className="mt-1 text-sm">{request.notes}</p>
                </div>
              ) : null}

              {request.admin_notes ? (
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm font-medium text-muted-foreground">Update from BedRock</p>
                  <p className="mt-1 text-sm">{request.admin_notes}</p>
                </div>
              ) : null}

              <p className="text-xs text-muted-foreground">
                Requested on {new Date(request.created_at).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // No request yet — show service info + request form
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="space-y-6">
        {/* Service description */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <CardTitle>{title}</CardTitle>
              </div>
              {comingSoon ? (
                <Badge className="bg-amber-500/15 text-amber-500 border-amber-500/20">
                  <Clock className="mr-1 h-3 w-3" />
                  Coming Soon
                </Badge>
              ) : null}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

            {bulletPoints.length > 0 ? (
              <div className="mt-6 space-y-3">
                {bulletPoints.map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    <span className="text-sm">{point}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Request form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{comingSoon ? 'Request Early Access' : 'Request This Service'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={notesPlaceholder}
                rows={4}
              />
              <Button onClick={handleSubmit} disabled={submitting} className="gap-2">
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    {ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground">
                {comingSoon
                  ? 'Submit your request and we\u2019ll notify you as soon as this service is available.'
                  : 'After submitting, our team will review your request and begin working on it. You\u2019ll see updates on this page.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
