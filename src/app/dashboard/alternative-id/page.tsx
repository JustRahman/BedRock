'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import {
  Loader2,
  CheckCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  MapPin,
  FileText,
  Building2,
  Shield,
} from 'lucide-react'
import { toast } from 'sonner'

// === Types ===

interface ServiceRequestData {
  id: string
  status: string
  notes: string | null
  admin_notes: string | null
  created_at: string
}

interface IntakeForm {
  fullName: string
  citizenship: string
  residence: string
  passportStatus: string
  documents: string[]
  hasLLC: string
  hasEIN: string
  rejectedBanks: string[]
  hasExistingAccount: string
  accountPurpose: string[]
  situation: string
  email: string
  contactHandle: string
}

const emptyForm: IntakeForm = {
  fullName: '',
  citizenship: '',
  residence: '',
  passportStatus: '',
  documents: [],
  hasLLC: '',
  hasEIN: '',
  rejectedBanks: [],
  hasExistingAccount: '',
  accountPurpose: [],
  situation: '',
  email: '',
  contactHandle: '',
}

// === Helpers ===

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  requested: { label: 'Submitted', color: 'bg-blue-500/15 text-blue-600', icon: Clock },
  in_progress: { label: 'In Progress', color: 'bg-yellow-500/15 text-yellow-600', icon: Clock },
  completed: { label: 'Completed', color: 'bg-green-500/15 text-green-600', icon: CheckCircle },
  rejected: { label: 'Not Available', color: 'bg-red-500/15 text-red-600', icon: AlertCircle },
}

function toggleArray(arr: string[], value: string): string[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
}

function serializeForm(form: IntakeForm): string {
  const lines = [
    `Name: ${form.fullName}`,
    `Citizenship: ${form.citizenship}`,
    `Residence: ${form.residence}`,
    `Passport: ${form.passportStatus}`,
    `Documents: ${form.documents.join(', ') || 'None selected'}`,
    `US LLC: ${form.hasLLC}`,
    `EIN: ${form.hasEIN}`,
    `Rejected by: ${form.rejectedBanks.join(', ') || 'None'}`,
    `Existing US account: ${form.hasExistingAccount}`,
    `Account purpose: ${form.accountPurpose.join(', ') || 'Not specified'}`,
    `Email: ${form.email}`,
    `Contact: ${form.contactHandle}`,
  ]
  if (form.situation.trim()) {
    lines.push(`\nSituation:\n${form.situation}`)
  }
  return lines.join('\n')
}

// === Scenario Cards ===

const scenarios = [
  {
    flag: '🇧🇾',
    title: 'Belarusian founder in Poland',
    situation: 'Passport expired — can\'t renew due to political situation. Has Delaware LLC, active GitHub, but every bank rejects.',
    outcome: 'We identified a Polish travel document (dokument podróży) pathway, matched with a neobank that accepts it, and opened the account in 3 weeks.',
  },
  {
    flag: '🇳🇬',
    title: 'Nigerian developer, Mercury rejected twice',
    situation: '3 years of GitHub commits, active Stripe account with $8k MRR, but auto-declined by Mercury and Relay.',
    outcome: 'Built a document package highlighting revenue history, applied to a fintech that weighs business activity. Approved on first try.',
  },
  {
    flag: '🇹🇲',
    title: 'CIS founder from restricted country',
    situation: 'Valid passport but from a country every neobank auto-declines. Has an LLC, EIN, and real customers.',
    outcome: 'Mapped which banks actually review applications from this country instead of auto-declining. Found two options, guided through the process.',
  },
]

// === Main Component ===

export default function AlternativeIDPage() {
  const [request, setRequest] = useState<ServiceRequestData | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<IntakeForm>(emptyForm)
  const totalSteps = 3

  useEffect(() => {
    fetch('/api/service-requests?type=alternative_id')
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
  }, [])

  const handleSubmit = async () => {
    if (!form.fullName.trim() || !form.email.trim()) {
      toast.error('Please fill in your name and email')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/service-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType: 'alternative_id',
          details: `${form.fullName} — ${form.citizenship} — ${form.passportStatus} — rejected by: ${form.rejectedBanks.join(', ') || 'none'}`,
          notes: serializeForm(form),
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setRequest(data.request)
        toast.success('Intake form submitted!')
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

  const updateForm = (updates: Partial<IntakeForm>) => {
    setForm((prev) => ({ ...prev, ...updates }))
  }

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Banking Access Help</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
    )
  }

  // === Already submitted ===
  if (request) {
    const status = statusConfig[request.status] || statusConfig.requested
    const StatusIcon = status.icon

    return (
      <div>
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Banking Access Help</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your intake form has been submitted</p>
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
                  <p className="text-sm font-medium text-blue-300">We&apos;ve received your intake form</p>
                  <p className="mt-1 text-sm text-blue-400/70">
                    We&apos;ll review your situation and get back to you within 24 hours with your
                    personalized banking roadmap. Check your email and Telegram/WhatsApp.
                  </p>
                </div>
              ) : null}
              {request.status === 'in_progress' ? (
                <div className="rounded-lg border border-yellow-800/30 bg-yellow-950/20 p-4">
                  <p className="text-sm font-medium text-yellow-300">We&apos;re building your roadmap</p>
                  <p className="mt-1 text-sm text-yellow-400/70">
                    Our team is researching the best banking options for your specific situation.
                    We&apos;ll reach out shortly with your personalized plan.
                  </p>
                </div>
              ) : null}
              {request.status === 'completed' ? (
                <div className="rounded-lg border border-green-800/30 bg-green-950/20 p-4">
                  <p className="text-sm font-medium text-green-300">Your roadmap is ready</p>
                  <p className="mt-1 text-sm text-green-400/70">
                    Check the details below and your email for the full banking roadmap.
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

  // === New request — full page ===
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">
          Can&apos;t Get a US Bank Account?
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          We&apos;ll find your path.
        </p>
      </div>

      <div className="space-y-8">
        {/* Hero section */}
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              You&apos;ve been rejected by Mercury. Relay. Brex. Maybe all three. You have a real business,
              real customers, real revenue — but automated KYC systems don&apos;t understand your situation.
              Your passport is from the wrong country, or it&apos;s expired and you can&apos;t renew it.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              We&apos;ve mapped every neobank and fintech — what documents each one accepts, which countries
              they actually serve (vs. which they auto-decline), and what alternative pathways exist.
              We build a personalized action plan based on your specific situation.
            </p>
          </CardContent>
        </Card>

        {/* 3-step process */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 text-sm font-bold mb-3">1</div>
            <h3 className="text-sm font-semibold text-foreground">Fill out intake form</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Tell us about your documents, rejections, and what you need. Takes 3 minutes.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 text-sm font-bold mb-3">2</div>
            <h3 className="text-sm font-semibold text-foreground">Get your banking roadmap</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              We research your options and build a personalized plan within 24 hours.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 text-sm font-bold mb-3">3</div>
            <h3 className="text-sm font-semibold text-foreground">We walk you through it</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Step-by-step support through applications, documents, and follow-ups.
            </p>
          </div>
        </div>

        {/* Situations we help with */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              Situations We Help With
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Expired or unobtainable passports',
                'Polish/Lithuanian travel documents',
                'No SSN or ITIN',
                'Previously rejected bank applications',
                'Active LLC with no bank account',
                'Belarusian/CIS founders who can\'t renew passports',
                'Valid passport but from a restricted country',
                'Multiple rejections from neobanks',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* What We Actually Do */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              What We Actually Do
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                'Personalized banking roadmap based on your documents and situation',
                'We tell you exactly which banks to apply to, in what order, with what documents',
                'Guidance on getting alternative travel documents (Polish dokument podróży, Lithuanian foreigner\'s passport, etc.)',
                'ITIN application assistance',
                'LLC formation and EIN guidance if needed',
                'Step-by-step support through each application',
                'Ongoing support if you get rejected or stuck',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <p className="text-xs text-zinc-500">
                We&apos;re also building a Trust Score system that uses your digital footprint (GitHub, Stripe,
                LinkedIn) as an alternative verification layer. It&apos;s not ready for banks yet — but the
                guidance and roadmaps are available right now.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Scenario cards */}
        <div>
          <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Example Situations We&apos;ve Solved
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {scenarios.map((s) => (
              <Card key={s.title} className="overflow-hidden">
                <CardContent className="pt-5">
                  <div className="text-2xl mb-2">{s.flag}</div>
                  <h3 className="text-sm font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.situation}</p>
                  <div className="mt-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 p-3">
                    <p className="text-xs text-emerald-400 leading-relaxed">{s.outcome}</p>
                  </div>
                  <p className="mt-2 text-[10px] text-zinc-600 italic">Example scenario based on real situations</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* === INTAKE FORM === */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                Intake Form
              </CardTitle>
              {/* Progress indicator */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-6 rounded-full transition-colors ${
                      i + 1 <= step ? 'bg-blue-500' : 'bg-zinc-800'
                    }`}
                  />
                ))}
                <span className="ml-2 text-xs text-muted-foreground">{step}/{totalSteps}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {step === 1 ? 'About you' : step === 2 ? 'Your documents & business' : 'What you need'}
            </p>
          </CardHeader>
          <CardContent>
            {/* Step 1: Personal info */}
            {step === 1 ? (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full name *</Label>
                  <Input
                    id="fullName"
                    value={form.fullName}
                    onChange={(e) => updateForm({ fullName: e.target.value })}
                    placeholder="Your full legal name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="citizenship">Country of citizenship</Label>
                    <Input
                      id="citizenship"
                      value={form.citizenship}
                      onChange={(e) => updateForm({ citizenship: e.target.value })}
                      placeholder="e.g. Belarus"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="residence">Country of current residence</Label>
                    <Input
                      id="residence"
                      value={form.residence}
                      onChange={(e) => updateForm({ residence: e.target.value })}
                      placeholder="e.g. Poland"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Passport status</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { value: 'valid', label: 'Valid' },
                      { value: 'expiring', label: 'Expiring within 3 months' },
                      { value: 'expired', label: 'Expired' },
                      { value: 'cant_renew', label: 'Can\'t renew' },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-2 rounded-lg border p-3 cursor-pointer transition-colors text-sm ${
                          form.passportStatus === opt.value
                            ? 'border-blue-500 bg-blue-500/5'
                            : 'border-border hover:border-zinc-600'
                        }`}
                      >
                        <input
                          type="radio"
                          name="passportStatus"
                          value={opt.value}
                          checked={form.passportStatus === opt.value}
                          onChange={() => updateForm({ passportStatus: opt.value })}
                          className="sr-only"
                        />
                        <div className={`h-3 w-3 rounded-full border-2 ${
                          form.passportStatus === opt.value ? 'border-blue-500 bg-blue-500' : 'border-zinc-600'
                        }`} />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>What ID documents do you currently have?</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'Valid passport',
                      'Expired passport',
                      'Residence permit / card',
                      'Driver\'s license',
                      'Travel document',
                      'National ID',
                      'ITIN',
                      'SSN',
                      'None of these',
                    ].map((doc) => (
                      <label
                        key={doc}
                        className="flex items-center gap-2.5 rounded-lg border border-border p-3 cursor-pointer hover:border-zinc-600 transition-colors text-sm"
                      >
                        <Checkbox
                          checked={form.documents.includes(doc)}
                          onCheckedChange={() => updateForm({ documents: toggleArray(form.documents, doc) })}
                        />
                        {doc}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => setStep(2)} className="gap-2">
                    Next <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : null}

            {/* Step 2: Business & rejections */}
            {step === 2 ? (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label>Do you have a US LLC or corporation?</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' },
                      { value: 'lapsed', label: 'Had one but it lapsed' },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-2 rounded-lg border p-3 cursor-pointer transition-colors text-sm ${
                          form.hasLLC === opt.value
                            ? 'border-blue-500 bg-blue-500/5'
                            : 'border-border hover:border-zinc-600'
                        }`}
                      >
                        <input
                          type="radio"
                          name="hasLLC"
                          value={opt.value}
                          checked={form.hasLLC === opt.value}
                          onChange={() => updateForm({ hasLLC: opt.value })}
                          className="sr-only"
                        />
                        <div className={`h-3 w-3 rounded-full border-2 ${
                          form.hasLLC === opt.value ? 'border-blue-500 bg-blue-500' : 'border-zinc-600'
                        }`} />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Do you have an EIN?</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' },
                      { value: 'not_sure', label: 'Not sure' },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-2 rounded-lg border p-3 cursor-pointer transition-colors text-sm ${
                          form.hasEIN === opt.value
                            ? 'border-blue-500 bg-blue-500/5'
                            : 'border-border hover:border-zinc-600'
                        }`}
                      >
                        <input
                          type="radio"
                          name="hasEIN"
                          value={opt.value}
                          checked={form.hasEIN === opt.value}
                          onChange={() => updateForm({ hasEIN: opt.value })}
                          className="sr-only"
                        />
                        <div className={`h-3 w-3 rounded-full border-2 ${
                          form.hasEIN === opt.value ? 'border-blue-500 bg-blue-500' : 'border-zinc-600'
                        }`} />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Have you been rejected by any of these?</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['Mercury', 'Relay', 'Brex', 'Wise', 'Revolut', 'Traditional bank', 'Other'].map((bank) => (
                      <label
                        key={bank}
                        className="flex items-center gap-2.5 rounded-lg border border-border p-3 cursor-pointer hover:border-zinc-600 transition-colors text-sm"
                      >
                        <Checkbox
                          checked={form.rejectedBanks.includes(bank)}
                          onCheckedChange={() => updateForm({ rejectedBanks: toggleArray(form.rejectedBanks, bank) })}
                        />
                        {bank}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Do you have any existing US bank accounts still open?</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-2 rounded-lg border p-3 cursor-pointer transition-colors text-sm ${
                          form.hasExistingAccount === opt.value
                            ? 'border-blue-500 bg-blue-500/5'
                            : 'border-border hover:border-zinc-600'
                        }`}
                      >
                        <input
                          type="radio"
                          name="hasExistingAccount"
                          value={opt.value}
                          checked={form.hasExistingAccount === opt.value}
                          onChange={() => updateForm({ hasExistingAccount: opt.value })}
                          className="sr-only"
                        />
                        <div className={`h-3 w-3 rounded-full border-2 ${
                          form.hasExistingAccount === opt.value ? 'border-blue-500 bg-blue-500' : 'border-zinc-600'
                        }`} />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button onClick={() => setStep(3)} className="gap-2">
                    Next <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : null}

            {/* Step 3: Purpose, situation, contact */}
            {step === 3 ? (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label>What do you need the account for?</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'Receiving client payments',
                      'Holding USD',
                      'Paying US expenses',
                      'E-commerce payouts',
                      'Other',
                    ].map((purpose) => (
                      <label
                        key={purpose}
                        className="flex items-center gap-2.5 rounded-lg border border-border p-3 cursor-pointer hover:border-zinc-600 transition-colors text-sm"
                      >
                        <Checkbox
                          checked={form.accountPurpose.includes(purpose)}
                          onCheckedChange={() => updateForm({ accountPurpose: toggleArray(form.accountPurpose, purpose) })}
                        />
                        {purpose}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="situation">Brief description of your situation (optional)</Label>
                  <Textarea
                    id="situation"
                    value={form.situation}
                    onChange={(e) => updateForm({ situation: e.target.value })}
                    placeholder="Anything else we should know — how long you've been trying, specific problems you've hit, timeline, etc."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => updateForm({ email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Telegram or WhatsApp</Label>
                    <Input
                      id="contact"
                      value={form.contactHandle}
                      onChange={(e) => updateForm({ contactHandle: e.target.value })}
                      placeholder="@handle or phone number"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
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
                      <>
                        Submit Intake Form
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                  We&apos;ll review your situation and get back to you within 24 hours with your
                  personalized banking roadmap.
                </p>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
