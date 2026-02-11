'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Building2, ArrowRight, Check, Loader2 } from 'lucide-react'

interface BankApplication {
  id: string
  bank_name: string | null
  status: string
  submitted_at: string | null
  approved_at: string | null
  notes: string | null
}

interface Company {
  id: string
  name: string
  ein: string | null
  formation_status: string
}

export default function BankPage() {
  const [applications, setApplications] = useState<BankApplication[]>([])
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/bank-applications').then((r) => r.json()),
      fetch('/api/companies').then((r) => r.json()),
    ])
      .then(([appData, companyData]) => {
        setApplications(appData.applications || [])
        if (companyData.company) setCompany(companyData.company)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Bank Account</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
    )
  }

  const canApply = company?.ein && company?.formation_status === 'formed'

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Bank Account</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Apply for and manage your US business bank account.
        </p>
      </div>

      {applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {app.bank_name || 'Bank Application'}
                  </CardTitle>
                  <Badge className={getStatusColor(app.status)}>
                    {formatStatus(app.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-medium">{formatStatus(app.status)}</p>
                  </div>
                  {app.submitted_at && (
                    <div>
                      <p className="text-sm text-muted-foreground">Submitted</p>
                      <p className="font-medium">{new Date(app.submitted_at).toLocaleDateString()}</p>
                    </div>
                  )}
                  {app.approved_at && (
                    <div>
                      <p className="text-sm text-muted-foreground">Approved</p>
                      <p className="font-medium">{new Date(app.approved_at).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
                {app.status === 'draft' && (
                  <div className="mt-4">
                    <Link href="/dashboard/bank/application">
                      <Button className="gap-2">
                        Continue Application
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-16 text-center">
            <Building2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            {canApply ? (
              <>
                <h2 className="text-lg font-semibold text-foreground">Ready to Apply</h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  Your LLC is formed and EIN is ready. You can now apply for a US business bank account.
                </p>
                <Link href="/dashboard/bank/application">
                  <Button className="mt-4 gap-2">
                    Start Application
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-foreground">
                  {!company ? 'LLC Formation Required' : !company.ein ? 'EIN Required' : 'Complete Prerequisites'}
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  {!company
                    ? 'Complete your LLC formation before applying for a bank account.'
                    : !company.ein
                    ? 'Obtain your EIN before applying for a bank account.'
                    : 'Complete your LLC formation to proceed.'}
                </p>
                <Link href={!company ? '/dashboard/formation' : '/dashboard/formation/ein'}>
                  <Button variant="outline" className="mt-4">
                    {!company ? 'Start Formation' : 'Get EIN'}
                  </Button>
                </Link>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'approved': case 'completed': return 'bg-emerald-500/15 text-emerald-400'
    case 'under_review': return 'bg-yellow-500/15 text-yellow-400'
    case 'submitted': return 'bg-blue-500/15 text-blue-400'
    case 'rejected': return 'bg-red-500/15 text-red-400'
    default: return 'bg-muted text-muted-foreground'
  }
}

function formatStatus(status: string): string {
  return status
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
