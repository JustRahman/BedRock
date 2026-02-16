'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
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
import { CreditCard, Copy, Check, Loader2, Wallet } from 'lucide-react'

interface Payment {
  id: string
  amount: number
  currency: string
  status: string
  description: string | null
  created_at: string
}

interface Founder {
  tier: string | null
  status: string
}

export default function BillingPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [founder, setFounder] = useState<Founder | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const SOLANA_ADDRESS = '8etC2hdAgk3587oniSG8ia8yPq5ZGhbVBmWazbnecEjA'

  function copyAddress() {
    navigator.clipboard.writeText(SOLANA_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    Promise.all([
      fetch('/api/payments').then((r) => r.json()),
      fetch('/api/founders').then((r) => r.json()),
    ])
      .then(([payData, founderData]) => {
        setPayments(payData.payments || [])
        if (founderData.founder) setFounder(founderData.founder)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Billing</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
    )
  }

  const tierName = founder?.tier
    ? founder.tier.charAt(0).toUpperCase() + founder.tier.slice(1)
    : null

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Billing</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View your payment history and plan details.
        </p>
      </div>

      {/* Payment Method */}
      <Card className="mb-6 border-purple-500/20 bg-purple-500/5">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-purple-400" />
            <CardTitle className="text-base">Pay with Solana</CardTitle>
          </div>
          <CardDescription>
            Send payment to the Solana address below. Card payments coming soon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded-md border border-purple-500/20 bg-background px-3 py-2 text-xs sm:text-sm font-mono break-all">
              {SOLANA_ADDRESS}
            </code>
            <Button
              variant="outline"
              size="icon"
              onClick={copyAddress}
              className="shrink-0 border-purple-500/20 hover:bg-purple-500/10"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Plan */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          {tierName ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-foreground">BedRock {tierName}</p>
                <p className="text-sm text-muted-foreground">One-time setup fee paid</p>
              </div>
              <Badge className="bg-emerald-500/15 text-emerald-400">Active</Badge>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-foreground">No Plan Selected</p>
                <p className="text-sm text-muted-foreground">Choose a plan to get started</p>
              </div>
              <Link href="/onboarding/payment">
                <Button>Choose Plan</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>
            {payments.length > 0
              ? `${payments.length} payment${payments.length > 1 ? 's' : ''} found`
              : 'No payments yet'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {payments.length > 0 ? (
            <>
              {/* Mobile: card list */}
              <div className="space-y-3 md:hidden">
                {payments.map((payment) => (
                  <div key={payment.id} className="rounded-lg border border-border p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">${payment.amount.toFixed(2)} {payment.currency.toUpperCase()}</span>
                      <Badge className={getPaymentStatusColor(payment.status)}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{payment.description || 'Payment'}</p>
                    <p className="text-xs text-muted-foreground">{new Date(payment.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
              {/* Desktop: table */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          {new Date(payment.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{payment.description || 'Payment'}</TableCell>
                        <TableCell className="font-medium">
                          ${payment.amount.toFixed(2)} {payment.currency.toUpperCase()}
                        </TableCell>
                        <TableCell>
                          <Badge className={getPaymentStatusColor(payment.status)}>
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          ) : (
            <div className="py-8 text-center">
              <CreditCard className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No payments recorded yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function getPaymentStatusColor(status: string): string {
  switch (status) {
    case 'completed': return 'bg-emerald-500/15 text-emerald-400'
    case 'processing': return 'bg-blue-500/15 text-blue-400'
    case 'pending': return 'bg-yellow-500/15 text-yellow-400'
    case 'failed': return 'bg-red-500/15 text-red-400'
    case 'refunded': return 'bg-muted text-muted-foreground'
    default: return 'bg-muted text-muted-foreground'
  }
}
