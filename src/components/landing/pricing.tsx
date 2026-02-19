'use client'

import { useState } from 'react'
import { Check, Sparkles, FlaskConical, Loader2, CheckCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ScrollReveal } from './scroll-reveal'

interface Plan {
  name: string
  price: number
  description: string
  features: string[]
  highlighted: boolean
  badge?: string
  note?: string
}

const plans: Plan[] = [
  {
    name: 'Research Partner',
    price: 0,
    description: 'For founders with unusual situations we want to solve',
    features: [
      'Everything in Basic',
      'Expired or alternative documents',
      'Restricted country support',
      'Multi-member LLC edge cases',
      'Anonymized case study consent',
    ],
    highlighted: false,
    badge: 'Limited spots',
    note: 'We decide who qualifies based on case complexity. Apply normally — we\'ll let you know.',
  },
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
  const [showApplyForm, setShowApplyForm] = useState(false)
  const [applyEmail, setApplyEmail] = useState('')
  const [applyDescription, setApplyDescription] = useState('')
  const [applySubmitting, setApplySubmitting] = useState(false)
  const [applySuccess, setApplySuccess] = useState(false)
  const [applyError, setApplyError] = useState('')

  const handleApply = async () => {
    if (!applyEmail || !applyDescription) {
      setApplyError('Please fill in both fields.')
      return
    }
    setApplyError('')
    setApplySubmitting(true)
    try {
      const res = await fetch('/api/research-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: applyEmail, description: applyDescription }),
      })
      if (res.ok) {
        setApplySuccess(true)
      } else {
        setApplyError('Something went wrong. Please try again.')
      }
    } catch {
      setApplyError('Something went wrong. Please try again.')
    } finally {
      setApplySubmitting(false)
    }
  }

  const closeForm = () => {
    setShowApplyForm(false)
    setApplyEmail('')
    setApplyDescription('')
    setApplyError('')
    setApplySuccess(false)
  }

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

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 150}>
              <div
                className={`group relative rounded-2xl transition-all duration-500 ${
                  plan.highlighted
                    ? 'border border-blue-500/40 bg-white/[0.05] shadow-[0_0_50px_rgba(59,130,246,0.1)]'
                    : plan.badge
                    ? 'border border-amber-500/25 bg-white/[0.03] hover:border-amber-500/40 hover:bg-white/[0.05]'
                    : 'border border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15] hover:bg-white/[0.05]'
                } p-8 h-full flex flex-col`}
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

                {plan.badge && !plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 px-4 py-1 text-xs font-medium text-white shadow-lg shadow-amber-500/20">
                      <FlaskConical className="h-3 w-3" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="relative">
                  <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{plan.description}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    {plan.price === 0 ? (
                      <div>
                        <span className="text-4xl font-bold text-white">Free</span>
                        <p className="mt-1.5 text-[11px] text-zinc-500">*You only cover third-party fees (state filing, registered agent, etc.)</p>
                      </div>
                    ) : (
                      <>
                        <span className="text-4xl font-bold text-white">
                          ${plan.price.toLocaleString()}
                        </span>
                        <span className="text-zinc-400 text-sm">/one-time</span>
                      </>
                    )}
                  </div>
                </div>

                <ul className="relative mt-8 space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`h-4 w-4 shrink-0 mt-0.5 ${plan.highlighted ? 'text-blue-400' : plan.badge ? 'text-amber-400' : 'text-zinc-400'}`} />
                      <span className="text-sm text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.note && (
                  <p className="relative mt-4 text-xs text-zinc-500 leading-relaxed">{plan.note}</p>
                )}

                <div className="relative mt-8">
                  {plan.badge ? (
                    <Button
                      onClick={() => setShowApplyForm(true)}
                      className="w-full rounded-xl py-5 font-medium transition-all duration-300 bg-white/[0.07] text-zinc-200 border border-white/[0.12] hover:bg-white/[0.12] hover:text-white"
                    >
                      Apply Now
                    </Button>
                  ) : (
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
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Research Partner Apply Modal */}
      {showApplyForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeForm} />
          <div className="relative w-full max-w-md rounded-2xl border border-white/[0.1] bg-[#0f0f11] p-6 sm:p-8 shadow-2xl">
            <button
              onClick={closeForm}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {applySuccess ? (
              <div className="text-center py-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                  <CheckCircle className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Application sent</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  We&apos;ll review your case and get back to you within a few days.
                </p>
                <Button onClick={closeForm} variant="outline" className="mt-6 border-white/[0.1] text-zinc-300 hover:bg-white/[0.05]">
                  Close
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 text-amber-400 mb-2">
                    <FlaskConical className="h-4 w-4" />
                    <span className="text-sm font-medium">Research Partner</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Tell us about your situation</h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    Describe what makes your case unusual — expired passport, restricted country, alternative documents, multi-member LLC, etc.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="apply-email" className="block text-sm font-medium text-zinc-300">
                      Email
                    </label>
                    <input
                      id="apply-email"
                      type="email"
                      value={applyEmail}
                      onChange={(e) => setApplyEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-white/[0.1] bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="apply-desc" className="block text-sm font-medium text-zinc-300">
                      Your situation
                    </label>
                    <textarea
                      id="apply-desc"
                      value={applyDescription}
                      onChange={(e) => setApplyDescription(e.target.value)}
                      placeholder="e.g. I'm from Belarus, my passport expired 2 years ago, I have a German residence permit and want to form an LLC with my co-founder..."
                      rows={4}
                      className="w-full rounded-xl border border-white/[0.1] bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 resize-none"
                    />
                  </div>

                  {applyError && (
                    <p className="text-sm text-red-400">{applyError}</p>
                  )}

                  <Button
                    onClick={handleApply}
                    disabled={applySubmitting}
                    className="w-full rounded-xl py-5 font-medium bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-500 hover:to-orange-500 transition-all duration-300"
                  >
                    {applySubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
