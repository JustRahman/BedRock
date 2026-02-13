import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileText, Send, Search, CheckCircle, ArrowRight, AlertTriangle } from 'lucide-react'
import { ScrollReveal } from './scroll-reveal'

const steps = [
  {
    number: '01',
    icon: FileText,
    title: 'W-7 Preparation',
    description: 'We prepare your complete W-7 application with supporting documentation. No confusing IRS forms.',
    gradient: 'from-blue-500 to-cyan-400',
    glow: 'bg-blue-500/25',
  },
  {
    number: '02',
    icon: Send,
    title: 'Submit to IRS',
    description: 'We submit your application directly to the IRS with all required attachments. Nothing for you to mail.',
    gradient: 'from-violet-500 to-purple-400',
    glow: 'bg-violet-500/25',
  },
  {
    number: '03',
    icon: Search,
    title: 'Track Status',
    description: 'Monitor your ITIN application progress from your BedRock dashboard. We follow up with the IRS so you don\'t have to.',
    gradient: 'from-amber-500 to-orange-400',
    glow: 'bg-amber-500/25',
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'Receive ITIN',
    description: 'Your ITIN arrives and we update your records. Stripe, taxes, and banking all unlocked.',
    gradient: 'from-emerald-500 to-teal-400',
    glow: 'bg-emerald-500/25',
  },
]

const blockers = [
  { text: 'Can\'t activate Stripe without an SSN or ITIN', icon: AlertTriangle },
  { text: 'Can\'t file US taxes — risk penalties up to $25,000', icon: AlertTriangle },
  { text: 'Bank accounts frozen without valid tax ID', icon: AlertTriangle },
  { text: 'CPAs charge $500-1,000 for W-7 filing alone', icon: AlertTriangle },
]

export function ITINSection() {
  return (
    <section id="itin" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-15">
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-violet-600/40 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-blue-600/30 rounded-full blur-[128px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/[0.08] px-4 py-1.5 text-sm text-violet-300 mb-6">
              <FileText className="h-3.5 w-3.5" />
              ITIN Assistance
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              You formed your LLC.{' '}
              <span className="gradient-text">Now you need an ITIN.</span>
            </h2>
            <p className="mt-5 text-lg text-zinc-300 leading-relaxed">
              Without a Social Security Number, you can&apos;t activate Stripe, file taxes, or keep your bank account open.
              The IRS process takes 3-4 months and the paperwork is brutal. We handle all of it.
            </p>
          </div>
        </ScrollReveal>

        {/* Blockers */}
        <ScrollReveal delay={100}>
          <div className="mt-12 mx-auto max-w-3xl">
            <div className="rounded-2xl border border-red-500/15 bg-red-500/[0.04] p-6">
              <p className="text-sm font-medium text-red-300 mb-4">Without an ITIN, your US business is stuck:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {blockers.map((blocker) => (
                  <div key={blocker.text} className="flex items-start gap-2.5">
                    <blocker.icon className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-zinc-300">{blocker.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Steps */}
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-4">
          {steps.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 150}>
              <div className="group relative h-full">
                {index < steps.length - 1 && (
                  <div className="absolute top-10 left-[calc(50%+40px)] hidden h-px w-[calc(100%-80px)] lg:block">
                    <div className="h-full w-full bg-gradient-to-r from-white/[0.08] to-white/[0.03]" />
                  </div>
                )}

                <div className="relative flex flex-col items-center text-center rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.05] h-full">
                  <div className="relative">
                    <div className={`absolute inset-0 rounded-2xl ${step.glow} blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                    <div className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient}`}>
                      <step.icon className="h-7 w-7 text-white" />
                    </div>
                  </div>

                  <span className="mt-5 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                    Step {step.number}
                  </span>

                  <h3 className="mt-3 text-lg font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={200}>
          <div className="mt-16 text-center">
            <Link href="/onboarding">
              <Button
                size="lg"
                className="bg-gradient-to-r from-violet-500 to-blue-600 text-white hover:from-violet-400 hover:to-blue-500 rounded-xl px-8 py-6 text-base font-medium gap-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
              >
                Start ITIN Process
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-zinc-500">
              Included in Standard and Premium plans. Typically 8-12 weeks.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
