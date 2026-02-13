'use client'

import { Heart } from 'lucide-react'
import { ServiceRequestPage } from '@/components/dashboard/service-request-page'

export default function AlternativeIDPage() {
  return (
    <ServiceRequestPage
      serviceType="alternative_id"
      title="Alternative ID Verification"
      subtitle="For founders who can't pass traditional KYC"
      icon={Heart}
      iconBg="bg-gradient-to-br from-emerald-500 to-teal-600"
      description="You left your home country and can't renew your passport. Every bank rejects you because automated KYC can't handle your situation. Your digital footprint — GitHub, LinkedIn, Stripe, work history — proves who you are better than any document. BedRock's Trust Score uses 5+ years of digital activity as an alternative verification layer."
      bulletPoints={[
        'Works with expired, expiring, or unobtainable passports',
        'Digital footprint analysis: GitHub, LinkedIn, Stripe, work history',
        'Trust Score accepted by partner banks as alternative verification',
        'Built for immigrants and refugees locked out of the financial system',
        'No documents required upfront — your digital history speaks for you',
      ]}
      ctaLabel="Check My Eligibility"
      notesPlaceholder="Tell us about your situation: What country did you leave? Is your passport expired or unobtainable? What banks have rejected you? What digital platforms are you active on (GitHub, LinkedIn, etc.)?"
    />
  )
}
