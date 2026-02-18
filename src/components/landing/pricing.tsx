import { Check, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ScrollReveal } from './scroll-reveal'

const plans = [
  {
    name: 'Basic',
    price: 500,
    description: 'Formation + Banking for verified founders',
    features: [
      'Digital Lineage verification',
      'Trust Score calculation',
      'LLC formation (DE or WY)',
      'EIN acquisition',
      'Bank application prep',
      '1 bank application',
      'Email support',
    ],
    highlighted: false,
  },
  {
    name: 'Standard',
    price: 800,
    description: 'Everything you need to get banked and stay compliant',
    features: [
      'Everything in Basic',
      'Priority bank matching',
      '3 bank applications',
      '1 year compliance calendar',
      'BOI Report filing',
      'Form 5472 preparation',
      'Deadline reminders',
      'Priority support',
    ],
    highlighted: true,
  },
  {
    name: 'Premium',
    price: 1500,
    description: 'Full service with Anti-Freeze protection',
    features: [
      'Everything in Standard',
      'Anti-Freeze Shield',
      'Transaction monitoring',
      'Bank inquiry response AI',
      'Unlimited bank applications',
      'Dedicated account manager',
      'Approval guarantee',
    ],
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background glow for pricing section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-25">
        <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-[128px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/[0.08] px-4 py-1.5 text-sm text-violet-300 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Pricing
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Simple, transparent{' '}
              <span className="gradient-text">pricing</span>
            </h2>
            <p className="mt-5 text-lg text-zinc-300">
              Choose the plan that fits your needs. No hidden fees.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 150}>
              <div
                className={`group relative rounded-2xl transition-all duration-500 ${
                  plan.highlighted
                    ? 'border border-blue-500/40 bg-white/[0.05] shadow-[0_0_50px_rgba(59,130,246,0.1)]'
                    : 'border border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15] hover:bg-white/[0.05]'
                } p-8 h-full`}
              >
                {/* Animated shimmer border for highlighted card */}
                {plan.highlighted && (
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-shimmer" />
                  </div>
                )}

                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span className="rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-1 text-xs font-medium text-white shadow-lg shadow-blue-500/20">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="relative">
                  <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{plan.description}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">
                      ${plan.price.toLocaleString()}
                    </span>
                    <span className="text-zinc-400 text-sm">/one-time</span>
                  </div>
                </div>

                <ul className="relative mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`h-4 w-4 shrink-0 mt-0.5 ${plan.highlighted ? 'text-blue-400' : 'text-zinc-400'}`} />
                      <span className="text-sm text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-8">
                  <Link href="/onboarding/choose">
                    <Button
                      className={`w-full rounded-xl py-5 font-medium transition-all duration-300 ${
                        plan.highlighted
                          ? 'bg-white text-black hover:bg-zinc-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]'
                          : 'bg-white/[0.07] text-zinc-200 border border-white/[0.12] hover:bg-white/[0.12] hover:text-white'
                      }`}
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
