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
import { CreditCard, Loader2 } from 'lucide-react'

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
          <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-gray-400" />
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
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="mt-1 text-sm text-gray-500">
          View your payment history and plan details.
        </p>
      </div>

      {/* Current Plan */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          {tierName ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-900">Bedrock {tierName}</p>
                <p className="text-sm text-gray-500">One-time setup fee paid</p>
              </div>
              <Badge className="bg-green-100 text-green-700">Active</Badge>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-900">No Plan Selected</p>
                <p className="text-sm text-gray-500">Choose a plan to get started</p>
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
          ) : (
            <div className="py-8 text-center">
              <CreditCard className="mx-auto mb-3 h-10 w-10 text-gray-300" />
              <p className="text-sm text-gray-500">No payments recorded yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function getPaymentStatusColor(status: string): string {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-700'
    case 'processing': return 'bg-blue-100 text-blue-700'
    case 'pending': return 'bg-yellow-100 text-yellow-700'
    case 'failed': return 'bg-red-100 text-red-700'
    case 'refunded': return 'bg-gray-100 text-gray-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}
