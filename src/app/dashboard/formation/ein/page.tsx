'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Download, Check, Loader2, FileText, Building2 } from 'lucide-react'
import { toast } from 'sonner'

interface Company {
  id: string
  name: string
  legal_name: string | null
  state: string | null
  formation_status: string
  ein: string | null
}

interface Founder {
  full_name: string
  address: string | null
  country_of_residence: string
  phone: string | null
}

export default function EINPage() {
  const router = useRouter()
  const [company, setCompany] = useState<Company | null>(null)
  const [founder, setFounder] = useState<Founder | null>(null)
  const [loading, setLoading] = useState(true)
  const [einInput, setEinInput] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch('/api/companies').then((r) => r.json()),
      fetch('/api/founders').then((r) => r.json()),
    ])
      .then(([companyData, founderData]) => {
        if (companyData.company) setCompany(companyData.company)
        if (founderData.founder) setFounder(founderData.founder)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSaveEIN = async () => {
    if (!einInput.match(/^\d{2}-\d{7}$/)) {
      toast.error('Please enter a valid EIN in format XX-XXXXXXX')
      return
    }

    setSaving(true)
    try {
      const res = await fetch('/api/companies', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ein: einInput }),
      })

      if (res.ok) {
        const data = await res.json()
        setCompany(data.company)
        toast.success('EIN saved successfully!')
      } else {
        toast.error('Failed to save EIN')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">EIN Application</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-gray-400" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!company) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">EIN Application</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <Building2 className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <p className="font-medium text-gray-900">LLC Formation Required</p>
            <p className="mt-1 text-sm text-gray-500">
              You need to form your LLC before applying for an EIN.
            </p>
            <Link href="/dashboard/formation">
              <Button className="mt-4">Start LLC Formation</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (company.ein) {
    return (
      <div>
        <div className="mb-8">
          <Link
            href="/dashboard/formation"
            className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Formation
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">EIN Application</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              EIN Obtained
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Company</p>
                <p className="font-medium">{company.legal_name || company.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">EIN</p>
                <p className="font-medium">{company.ein}</p>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/dashboard/bank/application">
                <Button className="gap-2">
                  Next: Apply for Bank Account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
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
          href="/dashboard/formation"
          className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Formation
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">EIN Application</h1>
        <p className="mt-1 text-sm text-gray-500">
          Obtain an Employer Identification Number (EIN) from the IRS for your LLC.
        </p>
      </div>

      {/* SS-4 Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            IRS Form SS-4 Information
          </CardTitle>
          <CardDescription>
            This information will be used to fill out Form SS-4 for your EIN application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 rounded-lg bg-gray-50 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Legal Name of Entity</p>
                <p className="font-medium">{company.legal_name || `${company.name} LLC`}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">State of Organization</p>
                <p className="font-medium">{company.state === 'DE' ? 'Delaware' : company.state === 'WY' ? 'Wyoming' : company.state}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Responsible Party</p>
                <p className="font-medium">{founder?.full_name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type of Entity</p>
                <p className="font-medium">LLC (Domestic)</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Country of Residence</p>
                <p className="font-medium">{founder?.country_of_residence || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{founder?.phone || 'N/A'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">How to Get Your EIN</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                1
              </div>
              <div>
                <p className="font-medium">Download Form SS-4</p>
                <p className="text-sm text-gray-500">
                  Download the pre-filled Form SS-4 with your LLC information.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                2
              </div>
              <div>
                <p className="font-medium">Submit to IRS</p>
                <p className="text-sm text-gray-500">
                  Fax the completed form to the IRS at (855) 641-6935. Processing takes 4-5 business days.
                  Non-US applicants cannot apply online.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                3
              </div>
              <div>
                <p className="font-medium">Enter Your EIN</p>
                <p className="text-sm text-gray-500">
                  Once you receive your EIN letter from the IRS, enter the number below.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* EIN Input */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Enter Your EIN</CardTitle>
          <CardDescription>
            Once you receive your EIN from the IRS, enter it here to proceed to the bank application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4">
            <div className="flex-1 space-y-2">
              <Label>EIN (XX-XXXXXXX)</Label>
              <Input
                value={einInput}
                onChange={(e) => setEinInput(e.target.value)}
                placeholder="XX-XXXXXXX"
                maxLength={10}
              />
            </div>
            <Button onClick={handleSaveEIN} disabled={saving || !einInput}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save EIN'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
