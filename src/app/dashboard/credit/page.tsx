'use client'

import { CreditCard } from 'lucide-react'
import { ServiceRequestPage } from '@/components/dashboard/service-request-page'

export default function CreditPage() {
  return (
    <ServiceRequestPage
      serviceType="credit_building"
      title="Business Credit"
      subtitle="Build your US credit history from scratch"
      icon={CreditCard}
      iconBg="bg-gradient-to-br from-indigo-500 to-violet-600"
      description="Once you have an LLC, EIN, and bank account, we'll guide you through building a US business credit profile — from secured cards to Dun & Bradstreet registration — so you can access financing and business credit cards."
      bulletPoints={[]}
      ctaLabel="Request Access"
      notesPlaceholder="Tell us about your current setup: Do you have a US bank account? Any existing credit history?"
      comingSoon
    />
  )
}
