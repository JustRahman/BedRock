import { Card, CardContent } from '@/components/ui/card'
import { CreditCard } from 'lucide-react'

export default function BillingPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your subscription and payment methods.
        </p>
      </div>

      <Card>
        <CardContent className="py-16 text-center">
          <CreditCard className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <h2 className="text-lg font-semibold text-gray-900">Coming Soon</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
            Stripe integration is currently being set up. You&apos;ll be able to manage your
            subscription, view invoices, and update payment methods here.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
