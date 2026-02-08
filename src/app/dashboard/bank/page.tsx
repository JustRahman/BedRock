import { Card, CardContent } from '@/components/ui/card'
import { Building2 } from 'lucide-react'

export default function BankPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bank Account</h1>
        <p className="mt-1 text-sm text-gray-500">
          Apply for and manage your US business bank account.
        </p>
      </div>

      <Card>
        <CardContent className="py-16 text-center">
          <Building2 className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <h2 className="text-lg font-semibold text-gray-900">Coming Soon</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
            Bank application tracking will be available once your trust score is approved.
            Complete your onboarding and upload required documents to get started.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
