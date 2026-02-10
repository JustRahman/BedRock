'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Check, Loader2, Building2, FileText, Download, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

interface Company {
  id: string
  name: string
  legal_name: string | null
  state: string | null
  ein: string | null
  formation_status: string
}

interface BankApplication {
  id: string
  bank_name: string | null
  status: string
  submitted_at: string | null
}

const banks = [
  {
    id: 'mercury',
    name: 'Mercury',
    description: 'Best for startups and tech companies. Fast online application.',
    recommended: true,
    features: ['No monthly fees', 'API access', 'Treasury management', 'Virtual cards'],
  },
  {
    id: 'relay',
    name: 'Relay',
    description: 'Simple business banking with profit-first features.',
    recommended: false,
    features: ['No monthly fees', 'Automatic savings', 'Up to 20 checking accounts', 'Simple interface'],
  },
]

export default function BankApplicationPage() {
  const router = useRouter()
  const [company, setCompany] = useState<Company | null>(null)
  const [application, setApplication] = useState<BankApplication | null>(null)
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(1)
  const [selectedBank, setSelectedBank] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch('/api/companies').then((r) => r.json()),
      fetch('/api/bank-applications').then((r) => r.json()),
    ])
      .then(([companyData, appData]) => {
        if (companyData.company) setCompany(companyData.company)
        if (appData.applications && appData.applications.length > 0) {
          setApplication(appData.applications[0])
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleCreateApplication = async () => {
    if (!selectedBank) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/bank-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bankName: selectedBank, status: 'draft' }),
      })

      if (res.ok) {
        const data = await res.json()
        setApplication(data.application)
        setStep(2)
        toast.success('Bank application created!')
      } else {
        const err = await res.json()
        toast.error(err.error || 'Failed to create application')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const handleMarkSubmitted = async () => {
    if (!application) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/bank-applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: application.id, status: 'submitted' }),
      })

      if (res.ok) {
        const data = await res.json()
        setApplication(data.application)
        toast.success('Application marked as submitted!')
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
          <h1 className="text-2xl font-bold text-gray-900">Bank Application</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-gray-400" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!company || !company.ein) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Bank Application</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <Building2 className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <p className="font-medium text-gray-900">
              {!company ? 'LLC Formation Required' : 'EIN Required'}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {!company
                ? 'You need to form your LLC before applying for a bank account.'
                : 'You need to obtain your EIN before applying for a bank account.'}
            </p>
            <Link href={!company ? '/dashboard/formation' : '/dashboard/formation/ein'}>
              <Button className="mt-4">
                {!company ? 'Start LLC Formation' : 'Get EIN'}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show existing application status
  if (application && application.status !== 'draft') {
    return (
      <div>
        <div className="mb-8">
          <Link
            href="/dashboard/bank"
            className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Bank Account
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Bank Application</h1>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Bank</p>
                <p className="font-medium">{application.bank_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <Badge className={getAppStatusColor(application.status)}>
                  {formatAppStatus(application.status)}
                </Badge>
              </div>
              {application.submitted_at && (
                <div>
                  <p className="text-sm text-gray-500">Submitted</p>
                  <p className="font-medium">
                    {new Date(application.submitted_at).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Status Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Application Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applicationSteps.map((s, i) => {
                const isComplete = isStepComplete(application.status, i)
                const isCurrent = isStepCurrent(application.status, i)

                return (
                  <div key={s.id} className="flex items-center gap-4">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        isComplete
                          ? 'bg-green-100 text-green-600'
                          : isCurrent
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {isComplete ? <Check className="h-4 w-4" /> : <span className="text-sm font-medium">{i + 1}</span>}
                    </div>
                    <div>
                      <p className={`font-medium ${isComplete ? 'text-green-700' : isCurrent ? 'text-blue-700' : 'text-gray-500'}`}>
                        {s.title}
                      </p>
                      <p className="text-sm text-gray-500">{s.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/dashboard/bank"
          className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Bank Account
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Bank Application</h1>
        <p className="mt-1 text-sm text-gray-500">
          Apply for a US business bank account.
        </p>
      </div>

      {step === 1 && !application && (
        <>
          {/* Bank Selection */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {banks.map((bank) => (
              <Card
                key={bank.id}
                className={`cursor-pointer transition-colors ${
                  selectedBank === bank.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                }`}
                onClick={() => setSelectedBank(bank.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{bank.name}</CardTitle>
                    {bank.recommended && (
                      <Badge className="bg-blue-100 text-blue-700">Recommended</Badge>
                    )}
                  </div>
                  <CardDescription>{bank.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {bank.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            onClick={handleCreateApplication}
            disabled={!selectedBank || submitting}
            className="gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                Continue with {selectedBank ? banks.find((b) => b.id === selectedBank)?.name : '...'}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </>
      )}

      {(step === 2 || (application && application.status === 'draft')) && (
        <>
          {/* Application Package Review */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Application Package</CardTitle>
              <CardDescription>
                Review the documents that will be included in your bank application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Articles of Organization', type: 'LLC formation document' },
                  { name: 'EIN Confirmation Letter', type: 'IRS assignment' },
                  { name: 'Trust Score Report', type: 'BedRock verification' },
                  { name: 'Passport Copy', type: 'Identity document' },
                ].map((doc) => (
                  <div key={doc.name} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.type}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Ready</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Company Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Auto-Filled Application Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4">
                <div>
                  <p className="text-sm text-gray-500">Company Name</p>
                  <p className="font-medium">{company.legal_name || company.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">EIN</p>
                  <p className="font-medium">{company.ein}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">State</p>
                  <p className="font-medium">{company.state === 'DE' ? 'Delaware' : company.state === 'WY' ? 'Wyoming' : company.state}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bank</p>
                  <p className="font-medium">{application?.bank_name || selectedBank}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button onClick={handleMarkSubmitted} disabled={submitting} className="gap-2">
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Mark as Submitted
                </>
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

const applicationSteps = [
  { id: 'draft', title: 'Application Created', description: 'Application package prepared.' },
  { id: 'submitted', title: 'Submitted to Bank', description: 'Application submitted for review.' },
  { id: 'under_review', title: 'Under Review', description: 'Bank is reviewing your application.' },
  { id: 'approved', title: 'Approved', description: 'Bank account approved and ready to use.' },
]

function isStepComplete(status: string, index: number): boolean {
  const order = ['draft', 'submitted', 'under_review', 'approved']
  return order.indexOf(status) > index
}

function isStepCurrent(status: string, index: number): boolean {
  const order = ['draft', 'submitted', 'under_review', 'approved']
  return order.indexOf(status) === index
}

function getAppStatusColor(status: string): string {
  switch (status) {
    case 'approved': return 'bg-green-100 text-green-700'
    case 'under_review': return 'bg-yellow-100 text-yellow-700'
    case 'submitted': return 'bg-blue-100 text-blue-700'
    case 'rejected': return 'bg-red-100 text-red-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

function formatAppStatus(status: string): string {
  return status
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
