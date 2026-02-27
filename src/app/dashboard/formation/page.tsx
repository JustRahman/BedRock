'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Building2, Check, ArrowRight, ArrowLeft, Loader2, FileText, Clock, CheckCircle, Plus, FolderOpen, X } from 'lucide-react'
import { toast } from 'sonner'

const US_STATES = [
  { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' }, { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' }, { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' }, { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' }, { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' }, { value: 'MD', label: 'Maryland' }, { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' }, { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' },
]

interface ServiceRequestData {
  id: string
  service_type: string
  status: string
  admin_notes: string | null
  created_at: string
}

interface Company {
  id: string
  name: string
  legal_name: string | null
  state: string | null
  formation_status: string
  ein: string | null
  formation_date: string | null
  description: string | null
}

interface CompanyUpdateEntry {
  id: string
  status: string
  note: string | null
  created_at: string
}

export default function FormationPage() {
  const router = useRouter()
  const [company, setCompany] = useState<Company | null>(null)
  const [updates, setUpdates] = useState<CompanyUpdateEntry[]>([])
  const [bankApp, setBankApp] = useState<{ id: string; status: string; bank_name: string } | null>(null)
  const [itinRequest, setItinRequest] = useState<ServiceRequestData | null>(null)
  const [einRequest, setEinRequest] = useState<ServiceRequestData | null>(null)
  const [taxFormRequest, setTaxFormRequest] = useState<ServiceRequestData | null>(null)
  const [submittingItin, setSubmittingItin] = useState(false)
  const [submittingEin, setSubmittingEin] = useState(false)
  const [showTaxFormModal, setShowTaxFormModal] = useState(false)
  const [submittingTaxForm, setSubmittingTaxForm] = useState(false)
  const [selectedTaxForms, setSelectedTaxForms] = useState<string[]>([])
  const [customTaxForm, setCustomTaxForm] = useState('')
  const [taxFormNotes, setTaxFormNotes] = useState('')
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [showExistingLLCForm, setShowExistingLLCForm] = useState(false)
  const [existingLLCData, setExistingLLCData] = useState({
    name: '',
    state: '',
    ein: '',
    formationDate: '',
  })

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    nameFallback1: '',
    nameFallback2: '',
    state: 'DE',
    useRegisteredAgent: true,
    address: '',
    description: '',
  })

  useEffect(() => {
    Promise.all([
      fetch('/api/companies').then((r) => r.json()),
      fetch('/api/bank-applications').then((r) => r.json()),
      fetch('/api/service-requests?type=itin').then((r) => r.json()),
      fetch('/api/service-requests?type=ein_only').then((r) => r.json()),
      fetch('/api/service-requests?type=tax_form_help').then((r) => r.json()),
    ])
      .then(([companyData, bankData, itinData, einData, taxFormData]) => {
        if (companyData.company) setCompany(companyData.company)
        if (companyData.updates) setUpdates(companyData.updates)
        if (bankData.applications && bankData.applications.length > 0) {
          setBankApp(bankData.applications[0])
        }
        if (itinData.requests && itinData.requests.length > 0) {
          setItinRequest(itinData.requests[0])
        }
        if (einData.requests && einData.requests.length > 0) {
          setEinRequest(einData.requests[0])
        }
        if (taxFormData.requests && taxFormData.requests.length > 0) {
          setTaxFormRequest(taxFormData.requests[0])
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          legalName: `${formData.name} LLC`,
          state: formData.state,
          description: formData.description,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setCompany(data.company)
        toast.success('LLC formation request submitted!')
      } else {
        console.error('Formation error:', data)
        toast.error(data.error || 'Failed to submit formation request')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const handleExistingLLCSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: existingLLCData.name,
          legalName: `${existingLLCData.name} LLC`,
          state: existingLLCData.state,
          alreadyFormed: true,
          ein: existingLLCData.ein || undefined,
          formationDate: existingLLCData.formationDate || undefined,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setCompany(data.company)
        toast.success('LLC added successfully!')
      } else {
        toast.error(data.error || 'Failed to add LLC')
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
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">LLC Formation</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show status if company exists
  if (company) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">LLC Formation</h1>
          <p className="mt-1 text-sm text-muted-foreground">Track your LLC formation progress.</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {company.name}
            </CardTitle>
            <CardDescription>{company.legal_name || company.name} LLC</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              <div>
                <p className="text-sm text-muted-foreground">State</p>
                <p className="font-medium">{US_STATES.find(s => s.value === company.state)?.label || company.state}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Formation Status</p>
                <Badge className={getFormationStatusColor(company.formation_status)}>
                  {formatFormationStatus(company.formation_status)}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">EIN</p>
                <p className="font-medium">{company.ein || 'Not assigned'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Formation Date</p>
                <p className="font-medium">{company.formation_date || 'Pending'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Timeline */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Formation Progress</CardTitle>
          </CardHeader>
          <CardContent>
            {updates.length > 0 ? (
              <div className="space-y-4">
                {updates.map((update) => (
                  <div key={update.id} className="flex gap-3 border-l-2 border-border pl-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge className={getFormationStatusColor(update.status)}>
                          {formatFormationStatus(update.status)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(update.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
                        </span>
                      </div>
                      {update.note ? (
                        <p className="mt-1 text-sm text-muted-foreground">{update.note}</p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {formationSteps.map((s, i) => {
                  const isComplete = getStepComplete(company.formation_status, i)
                  const isCurrent = getStepCurrent(company.formation_status, i)

                  return (
                    <div key={s.id} className="flex items-center gap-4">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          isComplete
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : isCurrent
                            ? 'bg-blue-500/15 text-blue-400'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {isComplete ? <Check className="h-4 w-4" /> : <span className="text-sm font-medium">{i + 1}</span>}
                      </div>
                      <div>
                        <p className={`font-medium ${isComplete ? 'text-emerald-400' : isCurrent ? 'text-blue-400' : 'text-muted-foreground'}`}>
                          {s.title}
                        </p>
                        <p className="text-sm text-muted-foreground">{s.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Steps & Services */}
        <div className="space-y-4">
        {company.formation_status === 'formed' && !company.ein && !einRequest && (
          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Next: Obtain Your EIN</p>
                  <p className="text-sm text-muted-foreground">Your LLC is formed. Now get your Employer Identification Number.</p>
                </div>
                <Link href="/dashboard/formation/ein">
                  <Button className="gap-2">
                    Start EIN Process
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {company.ein && !bankApp && (
          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Next: Apply for Bank Account</p>
                  <p className="text-sm text-muted-foreground">Your LLC and EIN are ready. Start your bank application.</p>
                </div>
                <Link href="/dashboard/bank/application">
                  <Button className="gap-2">
                    Start Bank Application
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {company.ein && bankApp && (
          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">
                    Bank Application: <span className="capitalize">{bankApp.bank_name}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {bankApp.status === 'approved'
                      ? 'Your bank account has been approved!'
                      : bankApp.status === 'rejected'
                      ? 'Your bank application was not approved.'
                      : 'Your bank application is being reviewed.'}
                  </p>
                </div>
                <Link href="/dashboard/bank">
                  <Button variant="outline" className="gap-2">
                    View Status
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* EIN Request (for founders who need help with EIN) */}
        {company.formation_status === 'formed' && !company.ein && (
          <Card>
            <CardContent className="py-6">
              {einRequest ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {einRequest.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-blue-500" />
                    )}
                    <div>
                      <p className="font-medium text-foreground">EIN Application</p>
                      <p className="text-sm text-muted-foreground">
                        {einRequest.status === 'requested' && 'Your EIN request has been submitted. Our team will handle the SS-4 and IRS submission.'}
                        {einRequest.status === 'in_progress' && 'We\'re working on your EIN application with the IRS.'}
                        {einRequest.status === 'completed' && 'Your EIN has been assigned!'}
                      </p>
                      {einRequest.admin_notes ? (
                        <p className="mt-1 text-xs text-muted-foreground">Update: {einRequest.admin_notes}</p>
                      ) : null}
                    </div>
                  </div>
                  <Badge className={
                    einRequest.status === 'completed' ? 'bg-green-500/15 text-green-600' :
                    einRequest.status === 'in_progress' ? 'bg-yellow-500/15 text-yellow-600' :
                    'bg-blue-500/15 text-blue-600'
                  }>
                    {einRequest.status === 'requested' ? 'Submitted' :
                     einRequest.status === 'in_progress' ? 'In Progress' :
                     einRequest.status === 'completed' ? 'Completed' : einRequest.status}
                  </Badge>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">EIN keeps getting rejected?</p>
                    <p className="text-sm text-muted-foreground">
                      IRS SS-4 applications from international founders get rejected or stuck. We handle the SS-4 preparation, fax submission, and IRS follow-up.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="gap-2 shrink-0"
                    disabled={submittingEin}
                    onClick={async () => {
                      setSubmittingEin(true)
                      try {
                        const res = await fetch('/api/service-requests', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ serviceType: 'ein_only' }),
                        })
                        if (res.ok) {
                          const data = await res.json()
                          setEinRequest(data.request)
                          toast.success('EIN request submitted!')
                        } else {
                          const err = await res.json()
                          toast.error(err.error || 'Failed to submit')
                        }
                      } catch { toast.error('Something went wrong') }
                      finally { setSubmittingEin(false) }
                    }}
                  >
                    {submittingEin ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                      <>
                        <FileText className="h-4 w-4" />
                        Request EIN Help
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* ITIN Request */}
        {company.formation_status === 'formed' && (
          <Card>
            <CardContent className="py-6">
              {itinRequest ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {itinRequest.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-blue-500" />
                    )}
                    <div>
                      <p className="font-medium text-foreground">ITIN Application</p>
                      <p className="text-sm text-muted-foreground">
                        {itinRequest.status === 'requested' && 'Your ITIN request has been submitted. Our team will begin shortly.'}
                        {itinRequest.status === 'in_progress' && 'We\'re working on your ITIN application.'}
                        {itinRequest.status === 'completed' && 'Your ITIN has been obtained!'}
                      </p>
                      {itinRequest.admin_notes ? (
                        <p className="mt-1 text-xs text-muted-foreground">Update: {itinRequest.admin_notes}</p>
                      ) : null}
                    </div>
                  </div>
                  <Badge className={
                    itinRequest.status === 'completed' ? 'bg-green-500/15 text-green-600' :
                    itinRequest.status === 'in_progress' ? 'bg-yellow-500/15 text-yellow-600' :
                    'bg-blue-500/15 text-blue-600'
                  }>
                    {itinRequest.status === 'requested' ? 'Submitted' :
                     itinRequest.status === 'in_progress' ? 'In Progress' :
                     itinRequest.status === 'completed' ? 'Completed' : itinRequest.status}
                  </Badge>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Need an ITIN?</p>
                    <p className="text-sm text-muted-foreground">
                      Without an SSN, you need an ITIN to activate Stripe, file taxes, and keep your bank account open. We handle the W-7 preparation and IRS submission.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="gap-2 shrink-0"
                    disabled={submittingItin}
                    onClick={async () => {
                      setSubmittingItin(true)
                      try {
                        const res = await fetch('/api/service-requests', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ serviceType: 'itin' }),
                        })
                        if (res.ok) {
                          const data = await res.json()
                          setItinRequest(data.request)
                          toast.success('ITIN request submitted!')
                        } else {
                          const err = await res.json()
                          toast.error(err.error || 'Failed to submit')
                        }
                      } catch { toast.error('Something went wrong') }
                      finally { setSubmittingItin(false) }
                    }}
                  >
                    {submittingItin ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                      <>
                        <FileText className="h-4 w-4" />
                        Request ITIN
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Tax Form Help */}
        {company && (
          <Card>
            <CardContent className="py-6">
              {taxFormRequest ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {taxFormRequest.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-blue-500" />
                    )}
                    <div>
                      <p className="font-medium text-foreground">Tax Form Help</p>
                      <p className="text-sm text-muted-foreground">
                        {taxFormRequest.status === 'requested' && 'Your tax form help request has been submitted. Our team will reach out shortly.'}
                        {taxFormRequest.status === 'in_progress' && 'We\'re working on your tax form request.'}
                        {taxFormRequest.status === 'completed' && 'Your tax form request has been completed!'}
                      </p>
                      {taxFormRequest.admin_notes ? (
                        <p className="mt-1 text-xs text-muted-foreground">Update: {taxFormRequest.admin_notes}</p>
                      ) : null}
                    </div>
                  </div>
                  <Badge className={
                    taxFormRequest.status === 'completed' ? 'bg-green-500/15 text-green-600' :
                    taxFormRequest.status === 'in_progress' ? 'bg-yellow-500/15 text-yellow-600' :
                    'bg-blue-500/15 text-blue-600'
                  }>
                    {taxFormRequest.status === 'requested' ? 'Submitted' :
                     taxFormRequest.status === 'in_progress' ? 'In Progress' :
                     taxFormRequest.status === 'completed' ? 'Completed' : taxFormRequest.status}
                  </Badge>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Need Help with a Tax Form?</p>
                    <p className="text-sm text-muted-foreground">
                      Form 5472, BOI Report, Form 1120, and more — we help you prepare and file the required tax forms for your LLC.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="gap-2 shrink-0"
                    onClick={() => setShowTaxFormModal(true)}
                  >
                    <FileText className="h-4 w-4" />
                    Request Tax Form Help
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Tax Form Help Modal */}
        {showTaxFormModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setShowTaxFormModal(false)}>
            <div className="mx-4 w-full max-w-md rounded-xl border border-border bg-background p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-foreground">Request Tax Form Help</h3>
                <button onClick={() => setShowTaxFormModal(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-5">
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-foreground">Select tax forms you need help with</Label>
                  {[
                    { value: 'Form 5472', desc: 'Foreign-owned LLC reporting' },
                    { value: 'BOI Report', desc: 'Beneficial Ownership Information' },
                    { value: 'Form 1120', desc: 'US Corporation Income Tax' },
                    { value: 'Form 1065', desc: 'Partnership Return' },
                    { value: 'State Annual Report', desc: 'State compliance filing' },
                  ].map((form) => {
                    const isChecked = selectedTaxForms.includes(form.value)
                    return (
                      <label
                        key={form.value}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                          isChecked ? 'border-blue-500 bg-blue-500/10' : 'border-border hover:border-muted-foreground/30'
                        }`}
                      >
                        <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                          isChecked ? 'border-blue-500 bg-blue-500' : 'border-muted-foreground/40'
                        }`}>
                          {isChecked && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={isChecked}
                          onChange={() => {
                            setSelectedTaxForms(prev =>
                              prev.includes(form.value)
                                ? prev.filter(f => f !== form.value)
                                : [...prev, form.value]
                            )
                          }}
                        />
                        <div>
                          <p className="text-sm font-medium text-foreground">{form.value}</p>
                          <p className="text-xs text-zinc-400">{form.desc}</p>
                        </div>
                      </label>
                    )
                  })}
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                      selectedTaxForms.includes('other') ? 'border-blue-500 bg-blue-500/10' : 'border-border hover:border-muted-foreground/30'
                    }`}
                  >
                    <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                      selectedTaxForms.includes('other') ? 'border-blue-500 bg-blue-500' : 'border-muted-foreground/40'
                    }`}>
                      {selectedTaxForms.includes('other') && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={selectedTaxForms.includes('other')}
                      onChange={() => {
                        setSelectedTaxForms(prev =>
                          prev.includes('other')
                            ? prev.filter(f => f !== 'other')
                            : [...prev, 'other']
                        )
                        if (selectedTaxForms.includes('other')) setCustomTaxForm('')
                      }}
                    />
                    <span className="text-sm font-medium text-foreground">Other</span>
                  </label>
                  {selectedTaxForms.includes('other') && (
                    <Input
                      value={customTaxForm}
                      onChange={(e) => setCustomTaxForm(e.target.value)}
                      placeholder="Enter tax form name..."
                      className="mt-1"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Notes (optional)</Label>
                  <Textarea
                    value={taxFormNotes}
                    onChange={(e) => setTaxFormNotes(e.target.value)}
                    placeholder="Any details about your situation..."
                    rows={3}
                  />
                </div>

                <Button
                  className="w-full gap-2"
                  disabled={submittingTaxForm || selectedTaxForms.length === 0 || (selectedTaxForms.length === 1 && selectedTaxForms[0] === 'other' && !customTaxForm.trim())}
                  onClick={async () => {
                    setSubmittingTaxForm(true)
                    const forms = selectedTaxForms
                      .filter(f => f !== 'other')
                      .concat(selectedTaxForms.includes('other') && customTaxForm.trim() ? [customTaxForm.trim()] : [])
                    try {
                      const res = await fetch('/api/service-requests', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          serviceType: 'tax_form_help',
                          details: { formNames: forms, taxYear: new Date().getFullYear().toString() },
                          notes: taxFormNotes.trim() || undefined,
                        }),
                      })
                      if (res.ok) {
                        const data = await res.json()
                        setTaxFormRequest(data.request)
                        setShowTaxFormModal(false)
                        setSelectedTaxForms([])
                        setCustomTaxForm('')
                        setTaxFormNotes('')
                        toast.success('Tax form help request submitted!')
                      } else {
                        const err = await res.json()
                        toast.error(err.error || 'Failed to submit')
                      }
                    } catch { toast.error('Something went wrong') }
                    finally { setSubmittingTaxForm(false) }
                  }}
                >
                  {submittingTaxForm ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                    <>
                      <FileText className="h-4 w-4" />
                      Submit Request
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    )
  }

  // Existing LLC form
  if (showExistingLLCForm) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Add Your Existing LLC</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your LLC details to access EIN, ITIN, and banking services.
          </p>
        </div>

        <Card>
          <CardContent className="py-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>LLC Name <span className="text-red-500">*</span></Label>
                  <Input
                    value={existingLLCData.name}
                    onChange={(e) => setExistingLLCData({ ...existingLLCData, name: e.target.value })}
                    placeholder="My Company LLC"
                  />
                </div>
                <div className="space-y-2">
                  <Label>State of Formation <span className="text-red-500">*</span></Label>
                  <Select value={existingLLCData.state} onValueChange={(v) => setExistingLLCData({ ...existingLLCData, state: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {US_STATES.map((s) => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>EIN (Optional)</Label>
                  <Input
                    value={existingLLCData.ein}
                    onChange={(e) => setExistingLLCData({ ...existingLLCData, ein: e.target.value })}
                    placeholder="XX-XXXXXXX"
                  />
                  <p className="text-xs text-muted-foreground">If you already have an EIN, enter it here. Otherwise, we can help you get one.</p>
                </div>
                <div className="space-y-2">
                  <Label>Formation Date (Optional)</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Select
                      value={existingLLCData.formationDate ? existingLLCData.formationDate.split('-')[1] || '' : ''}
                      onValueChange={(month) => {
                        const parts = existingLLCData.formationDate ? existingLLCData.formationDate.split('-') : ['', '', '']
                        const year = parts[0] || ''
                        const day = parts[2] || '01'
                        setExistingLLCData({ ...existingLLCData, formationDate: year ? `${year}-${month}-${day}` : `--${month}` })
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {['01','02','03','04','05','06','07','08','09','10','11','12'].map((m, i) => (
                          <SelectItem key={m} value={m}>
                            {['January','February','March','April','May','June','July','August','September','October','November','December'][i]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={existingLLCData.formationDate ? existingLLCData.formationDate.split('-')[0] || '' : ''}
                      onValueChange={(year) => {
                        const parts = existingLLCData.formationDate ? existingLLCData.formationDate.split('-') : ['', '', '']
                        const month = parts[1] || '01'
                        setExistingLLCData({ ...existingLLCData, formationDate: `${year}-${month}-01` })
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 15 }, (_, i) => {
                          const yr = String(new Date().getFullYear() - i)
                          return <SelectItem key={yr} value={yr}>{yr}</SelectItem>
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setShowExistingLLCForm(false)} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleExistingLLCSubmit}
                  disabled={submitting || !existingLLCData.name || !existingLLCData.state}
                  className="gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      Add My LLC
                      <Check className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Multi-step formation form
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">LLC Formation</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {step === 0 ? 'Get started with your US LLC.' : `Set up your US LLC. Step ${step} of 4.`}
        </p>
      </div>

      {/* Progress - only show when in wizard */}
      {step >= 1 && (
        <div className="mb-8 flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full ${s <= step ? 'bg-blue-500' : 'bg-muted'}`}
            />
          ))}
        </div>
      )}

      {/* Step 0: Choice Screen */}
      {step === 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Card
            className="cursor-pointer transition-colors hover:border-blue-500/50"
            onClick={() => setStep(1)}
          >
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/15">
                <Plus className="h-6 w-6 text-blue-400" />
              </div>
              <CardTitle className="text-lg">Form a New LLC</CardTitle>
              <CardDescription>
                We&apos;ll handle the full formation process — state filing, registered agent, operating agreement, and EIN.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="cursor-pointer transition-colors hover:border-emerald-500/50"
            onClick={() => setShowExistingLLCForm(true)}
          >
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/15">
                <FolderOpen className="h-6 w-6 text-emerald-400" />
              </div>
              <CardTitle className="text-lg">I Already Have an LLC</CardTitle>
              <CardDescription>
                Add your existing US LLC and get help with EIN, ITIN, banking, and compliance.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      )}

      {step >= 1 && (
      <Card>
        <CardContent className="py-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold">Company Name & State</h2>
                <p className="text-sm text-muted-foreground">Choose your LLC name and state of formation.</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Company Name (1st Choice)</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="My Company"
                  />
                  <p className="text-xs text-muted-foreground">&quot;LLC&quot; will be appended automatically.</p>
                </div>
                <div className="space-y-2">
                  <Label>Backup Name (2nd Choice)</Label>
                  <Input
                    value={formData.nameFallback1}
                    onChange={(e) => setFormData({ ...formData, nameFallback1: e.target.value })}
                    placeholder="My Company Group"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Backup Name (3rd Choice)</Label>
                  <Input
                    value={formData.nameFallback2}
                    onChange={(e) => setFormData({ ...formData, nameFallback2: e.target.value })}
                    placeholder="My Company Holdings"
                  />
                </div>
                <div className="space-y-2">
                  <Label>State of Formation</Label>
                  <Select value={formData.state} onValueChange={(v) => setFormData({ ...formData, state: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DE">Delaware</SelectItem>
                      <SelectItem value="WY">Wyoming</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {formData.state === 'DE'
                      ? 'Delaware: Preferred by tech startups and VCs. Well-established corporate law. Annual franchise tax required.'
                      : 'Wyoming: No state income tax, strong privacy protections, lower annual fees. Great for small businesses.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold">Business Address</h2>
                <p className="text-sm text-muted-foreground">Your LLC needs a registered address in the state of formation.</p>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button
                    variant={formData.useRegisteredAgent ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => setFormData({ ...formData, useRegisteredAgent: true })}
                  >
                    Use Registered Agent (Recommended)
                  </Button>
                  <Button
                    variant={!formData.useRegisteredAgent ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => setFormData({ ...formData, useRegisteredAgent: false })}
                  >
                    Use My Own Address
                  </Button>
                </div>
                {formData.useRegisteredAgent ? (
                  <p className="text-sm text-muted-foreground">
                    We&apos;ll provide a registered agent address in {formData.state === 'DE' ? 'Delaware' : 'Wyoming'}.
                    This is included in Standard and Premium plans.
                  </p>
                ) : (
                  <div className="space-y-2">
                    <Label>Business Address</Label>
                    <Textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Enter your business address..."
                      rows={3}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold">Management Structure</h2>
                <p className="text-sm text-muted-foreground">Define how your LLC will be managed.</p>
              </div>
              <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-4">
                <p className="font-medium text-blue-300">Single-Member LLC</p>
                <p className="mt-1 text-sm text-blue-400">
                  Your LLC will be set up as a single-member LLC with you as the sole owner and manager.
                  This is the simplest structure and is ideal for most international founders.
                </p>
              </div>
              <div className="space-y-2">
                <Label>Business Description (Optional)</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Briefly describe what your business does..."
                  rows={3}
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold">Review & Submit</h2>
                <p className="text-sm text-muted-foreground">Review your LLC formation details before submitting.</p>
              </div>
              <div className="space-y-4 rounded-lg bg-muted/50 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Company Name</p>
                    <p className="font-medium">{formData.name} LLC</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">State</p>
                    <p className="font-medium">{formData.state === 'DE' ? 'Delaware' : 'Wyoming'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{formData.useRegisteredAgent ? 'Registered Agent (provided)' : formData.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Structure</p>
                    <p className="font-medium">Single-Member LLC</p>
                  </div>
                </div>
                {formData.description && (
                  <div>
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className="font-medium">{formData.description}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => setStep(step - 1)} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            {step < 4 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !formData.name}
                className="gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Formation Request
                    <Check className="h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      )}
    </div>
  )
}

const formationSteps = [
  { id: 'submitted', title: 'Formation Requested', description: 'Your LLC formation has been submitted.' },
  { id: 'processing', title: 'Processing', description: 'State filing in progress.' },
  { id: 'formed', title: 'LLC Formed', description: 'Articles of Organization filed and approved.' },
  { id: 'ein', title: 'EIN Obtained', description: 'Employer Identification Number assigned by IRS.' },
]

function getStepComplete(status: string, index: number): boolean {
  const statusOrder = ['pending', 'processing', 'formed']
  const currentIndex = statusOrder.indexOf(status)
  return currentIndex > index
}

function getStepCurrent(status: string, index: number): boolean {
  const statusOrder = ['pending', 'processing', 'formed']
  return statusOrder.indexOf(status) === index
}

function getFormationStatusColor(status: string): string {
  switch (status) {
    case 'formed': return 'bg-emerald-500/15 text-emerald-400'
    case 'processing': return 'bg-blue-500/15 text-blue-400'
    case 'pending': return 'bg-yellow-500/15 text-yellow-400'
    default: return 'bg-muted text-muted-foreground'
  }
}

function formatFormationStatus(status: string): string {
  switch (status) {
    case 'formed': return 'Formed'
    case 'processing': return 'Processing'
    case 'pending': return 'Pending'
    case 'not_started': return 'Not Started'
    default: return status
  }
}
