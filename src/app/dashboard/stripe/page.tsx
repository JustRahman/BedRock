'use client'

import { Zap } from 'lucide-react'
import { ServiceRequestPage } from '@/components/dashboard/service-request-page'

export default function StripePage() {
  return (
    <ServiceRequestPage
      serviceType="stripe_activation"
      title="Stripe Help"
      subtitle="Get your payment processing live"
      icon={Zap}
      iconBg="bg-gradient-to-br from-cyan-500 to-blue-600"
      description="We'll help you navigate Stripe, PayPal, and Wise verification. Using your Trust Score and LLC documents, we prepare your application package and handle any review issues so you can start accepting payments."
      bulletPoints={[]}
      ctaLabel="Request Help"
      notesPlaceholder="Which platform do you need help with? What issue are you facing?"
      comingSoon
    />
  )
}
