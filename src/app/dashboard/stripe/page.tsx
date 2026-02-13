'use client'

import { Zap } from 'lucide-react'
import { ServiceRequestPage } from '@/components/dashboard/service-request-page'

export default function StripePage() {
  return (
    <ServiceRequestPage
      serviceType="stripe_activation"
      title="Stripe Activation"
      subtitle="Get your payment processing live"
      icon={Zap}
      iconBg="bg-gradient-to-br from-cyan-500 to-blue-600"
      description="Stripe, PayPal, and Wise have their own verification layers beyond basic documents. International founders get stuck in endless review loops. We prepare the exact documentation package each platform needs and use your Trust Score to pre-verify your identity."
      bulletPoints={[
        'We prepare the exact documentation package Stripe requires',
        'Trust Score pre-verification speeds up the review process',
        'Works for Stripe, PayPal, Wise, and other payment processors',
        'We handle the back-and-forth with the platform\'s review team',
        'Most activations completed within 1-2 weeks',
      ]}
      ctaLabel="Fix My Activation"
      notesPlaceholder="Tell us about your situation: Which platform? What error or rejection did you receive? Do you have an LLC and EIN already?"
    />
  )
}
