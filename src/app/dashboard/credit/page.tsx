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
      description="You have an LLC, EIN, and bank account — but no US credit history means no business credit card and no financing. We guide you through building a US credit profile from scratch: secured cards, credit-builder programs, and the right sequence to establish history fast."
      bulletPoints={[
        'Secured card recommendations matched to your situation',
        'Step-by-step credit building roadmap',
        'Business credit monitoring and milestones',
        'Guidance on Dun & Bradstreet, Experian Business profiles',
        'Timeline to first unsecured business credit card',
      ]}
      ctaLabel="Start Building Credit"
      notesPlaceholder="Tell us about your situation: Do you have a US bank account? Any existing US credit history? What kind of credit limit are you looking for?"
    />
  )
}
