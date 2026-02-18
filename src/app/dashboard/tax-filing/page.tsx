'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Loader2,
  CheckCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  FileText,
  DollarSign,
} from 'lucide-react'
import { toast } from 'sonner'

interface ServiceRequestData {
  id: string
  status: string
  notes: string | null
  admin_notes: string | null
  details: Record<string, unknown> | null
  created_at: string
}

// Path A: Form 8843 only (no income)
interface Form8843Intake {
  fullName: string
  dateOfBirth: string
  citizenship: string
  visaType: string
  universityName: string
  usAddress: string
  foreignAddress: string
  taxYear: string
  daysInUS: string
  arrivalDate: string
  departureDate: string
}

// Path B: With income (8843 + 1040-NR)
interface Form1040NRIntake extends Form8843Intake {
  incomeTypes: string[]
  hasSSN: string
  stateOfResidence: string
  employerName: string
  employerEIN: string
}

const emptyForm8843: Form8843Intake = {
  fullName: '',
  dateOfBirth: '',
  citizenship: '',
  visaType: '',
  universityName: '',
  usAddress: '',
  foreignAddress: '',
  taxYear: (new Date().getFullYear() - 1).toString(),
  daysInUS: '',
  arrivalDate: '',
  departureDate: '',
}

const emptyForm1040NR: Form1040NRIntake = {
  ...emptyForm8843,
  incomeTypes: [],
  hasSSN: '',
  stateOfResidence: '',
  employerName: '',
  employerEIN: '',
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  requested: { label: 'Submitted', color: 'bg-blue-500/15 text-blue-600', icon: Clock },
  in_progress: { label: 'In Progress', color: 'bg-yellow-500/15 text-yellow-600', icon: Clock },
  completed: { label: 'Completed', color: 'bg-green-500/15 text-green-600', icon: CheckCircle },
  rejected: { label: 'Not Available', color: 'bg-red-500/15 text-red-600', icon: AlertCircle },
}

function toggleArray(arr: string[], value: string): string[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
}

export default function TaxFilingPage() {
  const [request, setRequest] = useState<ServiceRequestData | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [selectedPath, setSelectedPath] = useState<'8843' | '1040nr' | null>(null)
  const [step, setStep] = useState(1)
  const [form8843, setForm8843] = useState<Form8843Intake>(emptyForm8843)
  const [form1040nr, setForm1040nr] = useState<Form1040NRIntake>(emptyForm1040NR)

  useEffect(() => {
    Promise.all([
      fetch('/api/service-requests?type=tax_8843').then((r) => r.json()),
      fetch('/api/service-requests?type=tax_1040nr').then((r) => r.json()),
    ])
      .then(([data8843, data1040nr]) => {
        const allRequests = [...(data8843.requests || []), ...(data1040nr.requests || [])]
        const active = allRequests.find(
          (r: ServiceRequestData) => r.status === 'requested' || r.status === 'in_progress'
        )
        const completed = allRequests.find(
          (r: ServiceRequestData) => r.status === 'completed'
        )
        setRequest(active || completed || null)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async () => {
    const is1040nr = selectedPath === '1040nr'
    const formData = is1040nr ? form1040nr : form8843

    if (!formData.fullName.trim() || !formData.taxYear.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/service-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType: is1040nr ? 'tax_1040nr' : 'tax_8843',
          details: is1040nr ? form1040nr : form8843,
          notes: `Tax filing request for ${formData.taxYear} — ${is1040nr ? '1040-NR + 8843' : '8843 only'} — ${formData.fullName} (${formData.visaType}, ${formData.universityName})`,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setRequest(data.request)
        toast.success('Tax filing request submitted!')
      } else {
        const err = await res.json()
        toast.error(err.error || 'Failed to submit')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const update8843 = (updates: Partial<Form8843Intake>) => {
    setForm8843((prev) => ({ ...prev, ...updates }))
  }

  const update1040nr = (updates: Partial<Form1040NRIntake>) => {
    setForm1040nr((prev) => ({ ...prev, ...updates }))
  }

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Tax Filing</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
    )
  }

  // === Existing request status view ===
  if (request) {
    const status = statusConfig[request.status] || statusConfig.requested
    const StatusIcon = status.icon

    return (
      <div>
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Tax Filing</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your tax filing request has been submitted</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Your Request</CardTitle>
              <Badge className={status.color}>
                <StatusIcon className="mr-1 h-3 w-3" />
                {status.label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {request.status === 'requested' ? (
                <div className="rounded-lg border border-blue-800/30 bg-blue-950/20 p-4">
                  <p className="text-sm font-medium text-blue-300">We&apos;ve received your tax filing request</p>
                  <p className="mt-1 text-sm text-blue-400/70">
                    Our team will review your information and begin preparing your forms.
                    We&apos;ll reach out if we need any additional documents or information.
                  </p>
                </div>
              ) : null}
              {request.status === 'in_progress' ? (
                <div className="rounded-lg border border-yellow-800/30 bg-yellow-950/20 p-4">
                  <p className="text-sm font-medium text-yellow-300">We&apos;re preparing your tax forms</p>
                  <p className="mt-1 text-sm text-yellow-400/70">
                    Your forms are being prepared. Once complete, we&apos;ll upload the filed
                    documents to your Document Vault.
                  </p>
                </div>
              ) : null}
              {request.status === 'completed' ? (
                <div className="rounded-lg border border-green-800/30 bg-green-950/20 p-4">
                  <p className="text-sm font-medium text-green-300">Your tax forms have been filed</p>
                  <p className="mt-1 text-sm text-green-400/70">
                    Check your Document Vault to download the filed forms. Keep them for your records.
                  </p>
                </div>
              ) : null}

              {request.admin_notes ? (
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm font-medium text-muted-foreground">Update from BedRock</p>
                  <p className="mt-1 text-sm whitespace-pre-wrap">{request.admin_notes}</p>
                </div>
              ) : null}

              <p className="text-xs text-muted-foreground">
                Submitted on {new Date(request.created_at).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // === Path selection (no request yet) ===
  if (!selectedPath) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Tax Filing</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            International students must file Form 8843 every year — even with zero income.
          </p>
        </div>

        <div className="space-y-6">
          {/* Info card */}
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                If you were in the US on an F-1 or J-1 visa at any point during the tax year,
                you&apos;re required to file Form 8843. This is true even if you had no income at all.
                If you also earned income (from a job, scholarship, or fellowship), you&apos;ll need to
                file a 1040-NR return as well.
              </p>
            </CardContent>
          </Card>

          {/* Path selection cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setSelectedPath('8843')}
              className="text-left rounded-xl border border-border bg-card p-6 hover:border-teal-500/30 hover:bg-teal-500/5 transition-all cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/10 mb-3">
                <FileText className="h-5 w-5 text-teal-400" />
              </div>
              <h3 className="text-base font-semibold text-foreground">No US Income</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Form 8843 only. Required for all F-1/J-1 students, even with $0 income.
              </p>
              <div className="mt-3 flex items-center gap-1.5">
                <Badge className="bg-teal-500/15 text-teal-400">Free</Badge>
              </div>
            </button>

            <button
              onClick={() => setSelectedPath('1040nr')}
              className="text-left rounded-xl border border-border bg-card p-6 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 mb-3">
                <DollarSign className="h-5 w-5 text-orange-400" />
              </div>
              <h3 className="text-base font-semibold text-foreground">Had US Income</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Form 8843 + 1040-NR + state return. For students with W-2, 1042-S, or scholarship income.
              </p>
              <div className="mt-3 flex items-center gap-1.5">
                <Badge className="bg-orange-500/15 text-orange-400">Paid</Badge>
              </div>
            </button>
          </div>

          {/* What we do */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">How it works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 text-sm font-bold mb-2">1</div>
                  <h4 className="text-sm font-semibold text-foreground">Fill intake form</h4>
                  <p className="mt-1 text-xs text-muted-foreground">Provide your personal info and tax situation. Takes 5 minutes.</p>
                </div>
                <div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 text-sm font-bold mb-2">2</div>
                  <h4 className="text-sm font-semibold text-foreground">We prepare your forms</h4>
                  <p className="mt-1 text-xs text-muted-foreground">Our team prepares and files your tax forms with the IRS.</p>
                </div>
                <div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 text-sm font-bold mb-2">3</div>
                  <h4 className="text-sm font-semibold text-foreground">Get filed docs</h4>
                  <p className="mt-1 text-xs text-muted-foreground">Download your filed forms from Documents. Keep for your records.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // === Intake form ===
  const is1040nr = selectedPath === '1040nr'
  const totalSteps = is1040nr ? 3 : 2
  const currentForm = is1040nr ? form1040nr : form8843

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Tax Filing</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {is1040nr ? 'Form 8843 + 1040-NR + State Return' : 'Form 8843 Only'}
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Intake Form</CardTitle>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-6 rounded-full transition-colors ${
                    i + 1 <= step ? 'bg-teal-500' : 'bg-zinc-800'
                  }`}
                />
              ))}
              <span className="ml-2 text-xs text-muted-foreground">{step}/{totalSteps}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {step === 1 ? 'Personal information' : step === 2 && is1040nr ? 'US presence & address' : 'Income details'}
          </p>
        </CardHeader>
        <CardContent>
          {/* Step 1: Personal info (shared) */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Full Legal Name *</Label>
                <Input
                  value={currentForm.fullName}
                  onChange={(e) => is1040nr ? update1040nr({ fullName: e.target.value }) : update8843({ fullName: e.target.value })}
                  placeholder="As shown on your passport"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Date of Birth *</Label>
                  <Input
                    type="date"
                    value={currentForm.dateOfBirth}
                    onChange={(e) => is1040nr ? update1040nr({ dateOfBirth: e.target.value }) : update8843({ dateOfBirth: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Country of Citizenship *</Label>
                  <Input
                    value={currentForm.citizenship}
                    onChange={(e) => is1040nr ? update1040nr({ citizenship: e.target.value }) : update8843({ citizenship: e.target.value })}
                    placeholder="e.g. India"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Visa Type *</Label>
                <div className="grid grid-cols-3 gap-2">
                  {['F-1', 'J-1', 'Other'].map((visa) => (
                    <label
                      key={visa}
                      className={`flex items-center justify-center rounded-lg border p-2.5 cursor-pointer transition-colors text-sm ${
                        currentForm.visaType === visa
                          ? 'border-teal-500 bg-teal-500/10'
                          : 'border-border hover:border-zinc-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="visaType"
                        value={visa}
                        checked={currentForm.visaType === visa}
                        onChange={() => is1040nr ? update1040nr({ visaType: visa }) : update8843({ visaType: visa })}
                        className="sr-only"
                      />
                      {visa}
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>University Name *</Label>
                  <Input
                    value={currentForm.universityName}
                    onChange={(e) => is1040nr ? update1040nr({ universityName: e.target.value }) : update8843({ universityName: e.target.value })}
                    placeholder="e.g. MIT"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tax Year *</Label>
                  <Input
                    value={currentForm.taxYear}
                    onChange={(e) => is1040nr ? update1040nr({ taxYear: e.target.value }) : update8843({ taxYear: e.target.value })}
                    placeholder="2025"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <Button variant="outline" onClick={() => setSelectedPath(null)} className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Change Path
                </Button>
                <Button onClick={() => setStep(2)} className="gap-2">
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: US presence & address */}
          {step === 2 && (!is1040nr || is1040nr) && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Days in US this tax year *</Label>
                  <Input
                    value={currentForm.daysInUS}
                    onChange={(e) => is1040nr ? update1040nr({ daysInUS: e.target.value }) : update8843({ daysInUS: e.target.value })}
                    placeholder="e.g. 365"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Arrival Date *</Label>
                  <Input
                    type="date"
                    value={currentForm.arrivalDate}
                    onChange={(e) => is1040nr ? update1040nr({ arrivalDate: e.target.value }) : update8843({ arrivalDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Departure Date (if left US during tax year)</Label>
                <Input
                  type="date"
                  value={currentForm.departureDate}
                  onChange={(e) => is1040nr ? update1040nr({ departureDate: e.target.value }) : update8843({ departureDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>US Address *</Label>
                <Input
                  value={currentForm.usAddress}
                  onChange={(e) => is1040nr ? update1040nr({ usAddress: e.target.value }) : update8843({ usAddress: e.target.value })}
                  placeholder="Full US address (street, city, state, zip)"
                />
              </div>
              <div className="space-y-2">
                <Label>Foreign Address *</Label>
                <Input
                  value={currentForm.foreignAddress}
                  onChange={(e) => is1040nr ? update1040nr({ foreignAddress: e.target.value }) : update8843({ foreignAddress: e.target.value })}
                  placeholder="Home country address"
                />
              </div>

              <div className="flex justify-between pt-2">
                <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                {is1040nr ? (
                  <Button onClick={() => setStep(3)} className="gap-2">
                    Next <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={submitting} className="gap-2">
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>Submit Request <ArrowRight className="h-4 w-4" /></>
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Income details (1040-NR only) */}
          {step === 3 && is1040nr && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Income Types *</Label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { value: 'w2', label: 'W-2 (employment / CPT / OPT)' },
                    { value: '1042s', label: '1042-S (scholarship / fellowship)' },
                    { value: 'scholarship', label: 'Taxable scholarship / grant' },
                    { value: 'self_employment', label: 'Self-employment / freelance' },
                    { value: 'other', label: 'Other income' },
                  ].map((type) => (
                    <label
                      key={type.value}
                      className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors text-sm ${
                        form1040nr.incomeTypes.includes(type.value)
                          ? 'border-teal-500 bg-teal-500/10'
                          : 'border-border hover:border-zinc-600'
                      }`}
                    >
                      <div className={`h-4 w-4 rounded border-2 flex items-center justify-center ${
                        form1040nr.incomeTypes.includes(type.value) ? 'border-teal-500 bg-teal-500' : 'border-zinc-600'
                      }`}>
                        {form1040nr.incomeTypes.includes(type.value) && (
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      {type.label}
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={form1040nr.incomeTypes.includes(type.value)}
                        onChange={() => update1040nr({ incomeTypes: toggleArray(form1040nr.incomeTypes, type.value) })}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>SSN / ITIN Status *</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'ssn', label: 'Have SSN' },
                    { value: 'itin', label: 'Have ITIN' },
                    { value: 'none', label: 'Neither' },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center justify-center rounded-lg border p-2.5 cursor-pointer transition-colors text-sm ${
                        form1040nr.hasSSN === opt.value
                          ? 'border-teal-500 bg-teal-500/10'
                          : 'border-border hover:border-zinc-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="hasSSN"
                        value={opt.value}
                        checked={form1040nr.hasSSN === opt.value}
                        onChange={() => update1040nr({ hasSSN: opt.value })}
                        className="sr-only"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>State of Residence</Label>
                  <Input
                    value={form1040nr.stateOfResidence}
                    onChange={(e) => update1040nr({ stateOfResidence: e.target.value })}
                    placeholder="e.g. Massachusetts"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Employer Name</Label>
                  <Input
                    value={form1040nr.employerName}
                    onChange={(e) => update1040nr({ employerName: e.target.value })}
                    placeholder="If applicable"
                  />
                </div>
              </div>

              {form1040nr.hasSSN === 'none' && (
                <div className="rounded-lg border border-orange-800/30 bg-orange-950/20 p-3">
                  <p className="text-xs text-orange-400/80 leading-relaxed">
                    You&apos;ll need an ITIN to file a 1040-NR. We can help you apply for one as part of the filing process.
                  </p>
                </div>
              )}

              <div className="flex justify-between pt-2">
                <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button onClick={handleSubmit} disabled={submitting} className="gap-2">
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>Submit Request <ArrowRight className="h-4 w-4" /></>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
