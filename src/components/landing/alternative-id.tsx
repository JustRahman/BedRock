import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Github, Linkedin, DollarSign, Briefcase, Globe, Heart } from 'lucide-react'
import { ScrollReveal } from './scroll-reveal'

const signals = [
  {
    icon: Github,
    label: '5 years of commits',
    detail: '2,400+ contributions across 30 repos',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Linkedin,
    label: 'Professional history',
    detail: '3 verified positions, 180+ connections',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
  },
  {
    icon: DollarSign,
    label: 'Transaction records',
    detail: '$48k processed through Stripe',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Briefcase,
    label: 'Work history',
    detail: 'Consistent employment since 2019',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    icon: Globe,
    label: 'Web presence',
    detail: 'Active accounts across 6 platforms',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
]

export function AlternativeID() {
  return (
    <section id="alternative-id" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] opacity-15">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/30 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-600/25 rounded-full blur-[128px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/[0.08] px-4 py-1.5 text-sm text-emerald-300 mb-6">
              <Heart className="h-3.5 w-3.5" />
              Beyond Documents
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Your passport expired.{' '}
              <br className="hidden sm:block" />
              <span className="gradient-text">Your legitimacy didn&apos;t.</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mt-8 mx-auto max-w-2xl text-center">
            <p className="text-lg text-zinc-300 leading-relaxed">
              You left Belarus, Russia, or another country where going back to renew
              your passport isn&apos;t an option. You&apos;ve been building real businesses for years.
              But every bank rejects you because their automated KYC can&apos;t handle an expired document.
            </p>
            <p className="mt-4 text-lg text-zinc-300 leading-relaxed">
              We built BedRock for you.
            </p>
          </div>
        </ScrollReveal>

        {/* Two column: story + trust signals */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left: the human story */}
          <ScrollReveal delay={150}>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 h-full">
              <h3 className="text-xl font-semibold text-white mb-6">
                The system wasn&apos;t built for this
              </h3>
              <div className="space-y-5">
                <p className="text-sm leading-relaxed text-zinc-400">
                  Thousands of legitimate founders across Europe and the CIS are locked out of
                  the financial system. Not because they&apos;re risky, but because they left their
                  home countries and can&apos;t renew a passport.
                </p>
                <p className="text-sm leading-relaxed text-zinc-400">
                  Belarusian developers in Warsaw. Russian founders in Tbilisi. Ukrainian
                  entrepreneurs in Berlin. They have real revenue, real customers, real track records.
                  But a piece of paper with an expiry date decides whether they can open a bank account.
                </p>
                <p className="text-sm leading-relaxed text-zinc-400">
                  Traditional KYC asks: <span className="text-white font-medium">&ldquo;Is this document valid?&rdquo;</span>
                </p>
                <p className="text-sm leading-relaxed text-zinc-400">
                  BedRock asks: <span className="text-emerald-300 font-medium">&ldquo;Is this person legitimate?&rdquo;</span>
                </p>
                <p className="text-sm leading-relaxed text-zinc-400">
                  Those are very different questions. And the answer is in the digital footprint
                  you&apos;ve been building for years.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Trust Score signals */}
          <ScrollReveal delay={250}>
            <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.03] p-8 h-full">
              <h3 className="text-xl font-semibold text-white mb-2">
                Your digital footprint speaks louder than any document
              </h3>
              <p className="text-sm text-zinc-400 mb-6">
                BedRock&apos;s Trust Score analyzes 5+ years of real activity that deepfakes can&apos;t replicate:
              </p>

              <div className="space-y-4">
                {signals.map((signal) => (
                  <div key={signal.label} className="flex items-start gap-3 group">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${signal.bg} transition-all group-hover:scale-110`}>
                      <signal.icon className={`h-4 w-4 ${signal.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{signal.label}</p>
                      <p className="text-xs text-zinc-500">{signal.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-zinc-500">Composite Trust Score</p>
                    <p className="text-2xl font-bold text-emerald-400">84</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="text-sm text-emerald-300">Bank-Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* CTA */}
        <ScrollReveal delay={300}>
          <div className="mt-16 mx-auto max-w-2xl text-center">
            <p className="text-lg text-zinc-300 leading-relaxed mb-8">
              This isn&apos;t just a product feature. It&apos;s access to the financial system
              for people who&apos;ve been locked out through no fault of their own.
            </p>
            <Link href="/onboarding/choose">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white hover:from-emerald-400 hover:to-blue-500 rounded-xl px-8 py-6 text-base font-medium gap-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
              >
                Check Your Eligibility
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-zinc-500">
              Free eligibility check. No documents required upfront.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
