'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
    <div className="min-h-screen bg-[#09090b] py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[128px]" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-violet-600/25 rounded-full blur-[128px]" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative mx-auto max-w-5xl px-4">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 transition-transform duration-300 group-hover:scale-105">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">BedRock</span>
          </Link>
        </div>

        <div className="mb-4">
          <Link
            href="/onboarding/result"
            className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Results
          </Link>
        </div>

        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white">Choose Your Plan</h1>
          <p className="mt-2 text-zinc-400">
            Select the plan that best fits your needs. All plans include LLC formation and bank account setup.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiers.map((tier) => {
            const isPopular = 'popular' in tier && tier.popular
            return (
              <div
                key={tier.id}
                className={`relative flex flex-col rounded-2xl border p-px ${
                  isPopular
                    ? 'border-blue-500/50 bg-gradient-to-b from-blue-500/10 to-transparent'
                    : 'border-white/[0.08] bg-white/[0.03]'
                } backdrop-blur-sm`}
              >
                {isPopular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-violet-600 text-white border-0">
                    Most Popular
                  </Badge>
                )}
                <div className="p-6 pb-4">
                  <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{tier.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">${tier.price}</span>
                    <span className="ml-1 text-zinc-500">one-time</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col px-6 pb-6">
                  <ul className="mb-6 flex-1 space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <span className="text-sm text-zinc-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full rounded-xl py-5 text-sm font-medium transition-all duration-300 ${
                      isPopular
                        ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:from-blue-400 hover:to-violet-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]'
                        : 'border border-white/[0.15] bg-white/[0.05] text-zinc-200 hover:bg-white/[0.1] hover:border-white/[0.25] hover:text-white'
                    }`}
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
                </div>
              </div>
            )
          })}
        </div>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Secure payment powered by Stripe. All plans include a 30-day money-back guarantee.
        </p>
      </div>
    </div>
  )
}
