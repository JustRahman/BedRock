'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, Check, Loader2, ArrowLeft } from 'lucide-react'

const tiers = [
  {
    id: 'basic',
    name: 'Basic',
    price: 500,
    description: 'Essential LLC formation and bank account setup',
    features: [
      'LLC formation in Delaware or Wyoming',
      'EIN acquisition guidance',
      'Bank application preparation',
      'Basic compliance calendar',
      'Email support',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 800,
    description: 'Everything in Basic plus expedited processing',
    popular: true,
    features: [
      'Everything in Basic',
      'Expedited processing (5-7 days)',
      'Registered agent service (1 year)',
      'Priority bank matching',
      'Compliance monitoring',
      'Chat support',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 1500,
    description: 'White-glove service with dedicated support',
    features: [
      'Everything in Standard',
      'Rush processing (2-3 days)',
      'Registered agent service (2 years)',
      'Premium bank introductions',
      'Full compliance management',
      'Dedicated account manager',
      'Tax filing assistance',
    ],
  },
]

export default function PaymentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handleSelectTier = async (tierId: string) => {
    setLoading(tierId)
    try {
      const res = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: tierId }),
      })

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('No checkout URL returned')
        setLoading(null)
      }
    } catch {
      console.error('Failed to create checkout session')
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">Bedrock</span>
          </Link>
        </div>

        <div className="mb-4">
          <Link
            href="/onboarding/result"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Results
          </Link>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Choose Your Plan</h1>
          <p className="mt-2 text-gray-600">
            Select the plan that best fits your needs. All plans include LLC formation and bank account setup.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.id}
              className={`relative flex flex-col ${
                tier.popular ? 'border-blue-500 shadow-lg' : ''
              }`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">${tier.price}</span>
                  <span className="ml-1 text-gray-500">one-time</span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <ul className="mb-6 flex-1 space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={tier.popular ? 'default' : 'outline'}
                  onClick={() => handleSelectTier(tier.id)}
                  disabled={loading !== null}
                >
                  {loading === tier.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Redirecting...
                    </>
                  ) : (
                    `Select ${tier.name}`
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Secure payment powered by Stripe. All plans include a 30-day money-back guarantee.
        </p>
      </div>
    </div>
  )
}
