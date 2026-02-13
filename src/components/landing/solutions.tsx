'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Building2,
  FileText,
  Shield,
  Fingerprint,
  CheckCircle,
  Landmark,
  Calendar,
  Send,
  Search,
  Heart,
  Github,
  CreditCard,
  DollarSign,
  AlertTriangle,
  Zap,
  TrendingUp,
  FileCheck,
} from 'lucide-react'
import { ScrollReveal } from './scroll-reveal'

interface PathStep {
  icon: React.ElementType
  label: string
}

interface Solution {
  id: string
  badge: string
  badgeColor: string
  badgeBorder: string
  title: string
  subtitle: string
  description: string
  gradient: string
  glow: string
  icon: React.ElementType
  steps: PathStep[]
  cta: string
  ctaGradient: string
  ctaShadow: string
}

const solutions: Solution[] = [
  {
    id: 'llc',
    badge: 'Most Popular',
    badgeColor: 'text-blue-300',
    badgeBorder: 'border-blue-400/25 bg-blue-500/[0.08]',
    title: 'I need to form a US company',
    subtitle: 'Full-service LLC + EIN + banking + compliance',
    description:
      'The complete path from zero to a fully operational US business. We form your LLC, get your EIN, open your bank account, and handle ongoing compliance — all backed by your Trust Score.',
    gradient: 'from-blue-500 to-violet-500',
    glow: 'bg-blue-500/20',
    icon: Building2,
    steps: [
      { icon: Fingerprint, label: 'Trust Score' },
      { icon: Building2, label: 'LLC Formation' },
      { icon: FileText, label: 'EIN' },
      { icon: Landmark, label: 'Bank Account' },
      { icon: Calendar, label: 'Compliance' },
    ],
    cta: 'Start Formation',
    ctaGradient: 'from-blue-500 to-violet-600',
    ctaShadow: 'hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]',
  },
  {
    id: 'itin',
    badge: 'Tax ID',
    badgeColor: 'text-violet-300',
    badgeBorder: 'border-violet-400/25 bg-violet-500/[0.08]',
    title: 'I need an ITIN',
    subtitle: 'Have an LLC but stuck without a tax ID',
    description:
      'Without an ITIN, you can\'t activate Stripe, file US taxes, or keep your bank account open. CPAs charge $500–1,000 and the process takes months of confusing IRS paperwork. We handle the entire W-7 preparation and submission.',
    gradient: 'from-violet-500 to-purple-500',
    glow: 'bg-violet-500/20',
    icon: FileText,
    steps: [
      { icon: Fingerprint, label: 'Trust Score' },
      { icon: FileText, label: 'W-7 Prep' },
      { icon: Send, label: 'IRS Submit' },
      { icon: Search, label: 'Track Status' },
      { icon: CheckCircle, label: 'Receive ITIN' },
    ],
    cta: 'Start ITIN Process',
    ctaGradient: 'from-violet-500 to-purple-600',
    ctaShadow: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]',
  },
  {
    id: 'banking',
    badge: 'Alternative KYC',
    badgeColor: 'text-emerald-300',
    badgeBorder: 'border-emerald-400/25 bg-emerald-500/[0.08]',
    title: 'I keep getting rejected by banks',
    subtitle: 'Expired passport, no SSN, but a real business',
    description:
      'You left your home country and can\'t renew your passport. Every bank rejects you because automated KYC can\'t handle your situation. Your digital footprint — GitHub, LinkedIn, Stripe, work history — proves who you are better than any document.',
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'bg-emerald-500/20',
    icon: Heart,
    steps: [
      { icon: Fingerprint, label: 'Trust Score' },
      { icon: Github, label: 'Digital Lineage' },
      { icon: Shield, label: 'Alt. Verification' },
      { icon: Landmark, label: 'Bank Application' },
      { icon: CheckCircle, label: 'Banking Access' },
    ],
    cta: 'Check Eligibility',
    ctaGradient: 'from-emerald-500 to-teal-600',
    ctaShadow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]',
  },
  {
    id: 'stripe',
    badge: 'Payments',
    badgeColor: 'text-cyan-300',
    badgeBorder: 'border-cyan-400/25 bg-cyan-500/[0.08]',
    title: 'Stripe rejected my verification',
    subtitle: 'Have LLC + EIN but can\'t activate payments',
    description:
      'Stripe, PayPal, and Wise have their own verification layers beyond basic documents. International founders get stuck in endless review loops. We prepare the exact documentation package each platform needs and use your Trust Score to pre-verify your identity.',
    gradient: 'from-cyan-500 to-blue-500',
    glow: 'bg-cyan-500/20',
    icon: Zap,
    steps: [
      { icon: Fingerprint, label: 'Trust Score' },
      { icon: FileCheck, label: 'Doc Package' },
      { icon: Zap, label: 'Platform Submit' },
      { icon: Search, label: 'Verification' },
      { icon: CheckCircle, label: 'Payments Live' },
    ],
    cta: 'Fix My Activation',
    ctaGradient: 'from-cyan-500 to-blue-600',
    ctaShadow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]',
  },
  {
    id: 'compliance',
    badge: 'Compliance',
    badgeColor: 'text-amber-300',
    badgeBorder: 'border-amber-400/25 bg-amber-500/[0.08]',
    title: 'I\'m about to get fined',
    subtitle: 'Have an LLC but missed BOI, 5472, or annual reports',
    description:
      'BOI reporting, Form 5472, annual reports, franchise tax — international founders don\'t know these exist until the penalty letter arrives. Formed through Stripe Atlas or Doola with zero post-formation support? We catch you up and keep you compliant going forward.',
    gradient: 'from-amber-500 to-orange-500',
    glow: 'bg-amber-500/20',
    icon: AlertTriangle,
    steps: [
      { icon: Fingerprint, label: 'Trust Score' },
      { icon: Search, label: 'Compliance Audit' },
      { icon: FileText, label: 'File Overdue' },
      { icon: Calendar, label: 'Auto Deadlines' },
      { icon: Shield, label: 'Stay Compliant' },
    ],
    cta: 'Get Compliant',
    ctaGradient: 'from-amber-500 to-orange-600',
    ctaShadow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]',
  },
  {
    id: 'ein',
    badge: 'EIN Only',
    badgeColor: 'text-rose-300',
    badgeBorder: 'border-rose-400/25 bg-rose-500/[0.08]',
    title: 'My EIN application keeps getting rejected',
    subtitle: 'Have an LLC but can\'t get past the IRS',
    description:
      'IRS SS-4 applications from international founders get rejected or stuck in processing for months. Your LLC sits dormant because you can\'t get an EIN. We handle the SS-4 preparation, fax submission, and IRS follow-up until your EIN is assigned.',
    gradient: 'from-rose-500 to-pink-500',
    glow: 'bg-rose-500/20',
    icon: FileText,
    steps: [
      { icon: Fingerprint, label: 'Trust Score' },
      { icon: FileText, label: 'SS-4 Prep' },
      { icon: Send, label: 'IRS Submit' },
      { icon: Search, label: 'Track & Follow Up' },
      { icon: CheckCircle, label: 'EIN Assigned' },
    ],
    cta: 'Get My EIN',
    ctaGradient: 'from-rose-500 to-pink-600',
    ctaShadow: 'hover:shadow-[0_0_30px_rgba(244,63,94,0.3)]',
  },
  {
    id: 'credit',
    badge: 'Credit',
    badgeColor: 'text-indigo-300',
    badgeBorder: 'border-indigo-400/25 bg-indigo-500/[0.08]',
    title: 'I can\'t get a business credit card',
    subtitle: 'Banked but zero US credit history',
    description:
      'You have an LLC, EIN, and bank account — but no US credit history means no business credit card and no financing. We guide you through building a US credit profile from scratch: secured cards, credit-builder programs, and the right sequence to establish history fast.',
    gradient: 'from-indigo-500 to-violet-500',
    glow: 'bg-indigo-500/20',
    icon: CreditCard,
    steps: [
      { icon: Fingerprint, label: 'Trust Score' },
      { icon: CreditCard, label: 'Secured Card' },
      { icon: TrendingUp, label: 'Build History' },
      { icon: DollarSign, label: 'Credit Line' },
      { icon: CheckCircle, label: 'Business Credit' },
    ],
    cta: 'Build My Credit',
    ctaGradient: 'from-indigo-500 to-violet-600',
    ctaShadow: 'hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]',
  },
]

export function Solutions() {
  const [activeId, setActiveId] = useState<string>('llc')
  const active = solutions.find((s) => s.id === activeId) || solutions[0]

  return (
    <section id="solutions" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] opacity-15">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-600/30 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-violet-600/25 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-emerald-600/20 rounded-full blur-[128px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.05] px-4 py-1.5 text-sm text-zinc-300 mb-6">
              <Shield className="h-3.5 w-3.5" />
              One Trust Score. Every path.
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              What&apos;s blocking{' '}
              <span className="gradient-text">you?</span>
            </h2>
            <p className="mt-5 text-lg text-zinc-300 leading-relaxed">
              Every path starts with your Trust Score — your digital identity verified
              through years of real activity. Pick the problem you&apos;re facing.
            </p>
          </div>
        </ScrollReveal>

        {/* Solution selector grid */}
        <ScrollReveal delay={100}>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {solutions.map((solution) => (
              <button
                key={solution.id}
                onClick={() => setActiveId(solution.id)}
                className={`group relative flex flex-col items-center gap-2.5 rounded-xl px-4 py-4 text-center transition-all duration-300 border ${
                  activeId === solution.id
                    ? 'border-white/[0.2] bg-white/[0.08] text-white'
                    : 'border-white/[0.06] bg-white/[0.02] text-zinc-400 hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-zinc-200'
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${solution.gradient} transition-transform duration-300 ${activeId === solution.id ? 'scale-110' : 'group-hover:scale-105'}`}>
                  <solution.icon className="h-5 w-5 text-white" />
                </div>
                <p className="text-xs font-medium leading-tight">{solution.title}</p>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Active solution detail */}
        <div className="mt-8 mx-auto max-w-4xl">
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 sm:p-10 backdrop-blur-sm transition-all duration-300">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left: info */}
              <div className="flex-1">
                <div className={`inline-flex items-center gap-2 rounded-full border ${active.badgeBorder} px-3 py-1 text-xs font-medium ${active.badgeColor} mb-4`}>
                  {active.badge}
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {active.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-500">
                  {active.subtitle}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  {active.description}
                </p>

                <div className="mt-8">
                  <Link href="/onboarding">
                    <Button
                      size="lg"
                      className={`bg-gradient-to-r ${active.ctaGradient} text-white rounded-xl px-6 py-5 text-sm font-medium gap-2 transition-all duration-300 ${active.ctaShadow}`}
                    >
                      {active.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right: step flow */}
              <div className="lg:w-72 shrink-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
                  Your path
                </p>
                <div className="space-y-0">
                  {active.steps.map((step, i) => (
                    <div key={step.label} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                          i === 0
                            ? `bg-gradient-to-br ${active.gradient}`
                            : 'bg-white/[0.06]'
                        }`}>
                          <step.icon className={`h-4 w-4 ${i === 0 ? 'text-white' : 'text-zinc-400'}`} />
                        </div>
                        {i < active.steps.length - 1 && (
                          <div className="w-px h-6 bg-white/[0.08]" />
                        )}
                      </div>
                      <div className="pt-1.5">
                        <p className={`text-sm font-medium ${i === 0 ? 'text-white' : 'text-zinc-300'}`}>
                          {step.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Score callout */}
        <ScrollReveal delay={200}>
          <div className="mt-10 mx-auto max-w-2xl text-center">
            <p className="text-sm text-zinc-500">
              All paths start with Trust Score verification — your 5+ years of digital activity
              analyzed across GitHub, LinkedIn, Stripe, and more. No documents required upfront.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
