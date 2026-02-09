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
import { Building2, Check, ArrowRight, ArrowLeft, Loader2, FileText } from 'lucide-react'
import { toast } from 'sonner'

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

export default function FormationPage() {
  const router = useRouter()
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)

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
    fetch('/api/companies')
      .then((r) => r.json())
      .then((data) => {
        if (data.company) setCompany(data.company)
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

      if (res.ok) {
        const data = await res.json()
        setCompany(data.company)
        toast.success('LLC formation request submitted!')
      } else {
        toast.error('Failed to submit formation request')
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
          <h1 className="text-2xl font-bold text-gray-900">LLC Formation</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-gray-400" />
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
          <h1 className="text-2xl font-bold text-gray-900">LLC Formation</h1>
          <p className="mt-1 text-sm text-gray-500">Track your LLC formation progress.</p>
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
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div>
                <p className="text-sm text-gray-500">State</p>
                <p className="font-medium">{company.state === 'DE' ? 'Delaware' : company.state === 'WY' ? 'Wyoming' : company.state}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Formation Status</p>
                <Badge className={getFormationStatusColor(company.formation_status)}>
                  {formatFormationStatus(company.formation_status)}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500">EIN</p>
                <p className="font-medium">{company.ein || 'Not assigned'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Formation Date</p>
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
            <div className="space-y-4">
              {formationSteps.map((s, i) => {
                const isComplete = getStepComplete(company.formation_status, i)
                const isCurrent = getStepCurrent(company.formation_status, i)

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

        {/* Next Steps */}
        {company.formation_status === 'formed' && !company.ein && (
          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Next: Obtain Your EIN</p>
                  <p className="text-sm text-gray-500">Your LLC is formed. Now get your Employer Identification Number.</p>
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

        {company.ein && (
          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Next: Apply for Bank Account</p>
                  <p className="text-sm text-gray-500">Your LLC and EIN are ready. Start your bank application.</p>
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
      </div>
    )
  }

  // Multi-step formation form
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">LLC Formation</h1>
        <p className="mt-1 text-sm text-gray-500">
          Set up your US LLC. Step {step} of 4.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8 flex gap-2">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`h-2 flex-1 rounded-full ${s <= step ? 'bg-blue-600' : 'bg-gray-200'}`}
          />
        ))}
      </div>

      <Card>
        <CardContent className="py-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold">Company Name & State</h2>
                <p className="text-sm text-gray-500">Choose your LLC name and state of formation.</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Company Name (1st Choice)</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="My Company"
                  />
                  <p className="text-xs text-gray-500">&quot;LLC&quot; will be appended automatically.</p>
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
                  <p className="text-xs text-gray-500">
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
                <p className="text-sm text-gray-500">Your LLC needs a registered address in the state of formation.</p>
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
                  <p className="text-sm text-gray-500">
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
                <p className="text-sm text-gray-500">Define how your LLC will be managed.</p>
              </div>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="font-medium text-blue-800">Single-Member LLC</p>
                <p className="mt-1 text-sm text-blue-700">
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
                <p className="text-sm text-gray-500">Review your LLC formation details before submitting.</p>
              </div>
              <div className="space-y-4 rounded-lg bg-gray-50 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Company Name</p>
                    <p className="font-medium">{formData.name} LLC</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">State</p>
                    <p className="font-medium">{formData.state === 'DE' ? 'Delaware' : 'Wyoming'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{formData.useRegisteredAgent ? 'Registered Agent (provided)' : formData.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Structure</p>
                    <p className="font-medium">Single-Member LLC</p>
                  </div>
                </div>
                {formData.description && (
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="font-medium">{formData.description}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            ) : (
              <div />
            )}
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
    case 'formed': return 'bg-green-100 text-green-700'
    case 'processing': return 'bg-blue-100 text-blue-700'
    case 'pending': return 'bg-yellow-100 text-yellow-700'
    default: return 'bg-gray-100 text-gray-700'
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
