import Link from 'next/link'
import { Navbar, Footer } from '@/components/landing'
import { Button } from '@/components/ui/button'
import { ArrowRight, Eye, Globe, ShieldCheck } from 'lucide-react'

const values = [
  {
    icon: Eye,
    title: 'Transparency',
    description:
      'No black-box decisions. We show you exactly how your Trust Score is calculated and what you can do to improve it.',
    color: 'text-blue-400',
  },
  {
    icon: Globe,
    title: 'Inclusion',
    description:
      'Your country of birth shouldn\'t determine your access to banking. We verify people, not passports.',
    color: 'text-violet-400',
  },
  {
    icon: ShieldCheck,
    title: 'Security',
    description:
      'Deepfake-proof verification and bank-grade encryption. Your data is yours — we never sell it or share it without consent.',
    color: 'text-emerald-400',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="relative overflow-hidden pb-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-40">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[128px]" />
            <div className="absolute top-20 right-1/4 w-80 h-80 bg-violet-600/25 rounded-full blur-[128px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
                About <span className="gradient-text">BedRock</span>
              </h1>
              <p className="mt-8 text-lg leading-relaxed text-zinc-300 max-w-2xl mx-auto">
                We&apos;re building the infrastructure that gives every legitimate founder
                a fair shot at US banking — regardless of where they were born.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="relative py-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-10 sm:p-14 backdrop-blur-sm">
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Why we exist
                </h2>
                <div className="mt-6 space-y-4 text-zinc-300 leading-relaxed">
                  <p>
                    Millions of founders from restricted countries are building real businesses,
                    generating real revenue, and creating real jobs. But the US banking system
                    shuts them out — not because of who they are, but because of where
                    they&apos;re from.
                  </p>
                  <p>
                    Banks rely on blunt country-level risk filters that treat entire populations
                    as threats. Mercury banned 17+ countries in 2024. Major banks de-risk 100+
                    nations. The result? Legitimate founders with clean records, real customers,
                    and growing businesses have zero options.
                  </p>
                  <p>
                    We built BedRock to change that. By verifying a founder&apos;s Digital
                    Lineage — their real online footprint, business history, and trust
                    signals — we give banks the confidence to say yes to people they&apos;d
                    otherwise reject on autopilot.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="relative py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Our values
              </h2>
              <p className="mt-4 text-lg text-zinc-400">
                The principles that guide every decision we make.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 mx-auto max-w-5xl">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06]"
                >
                  <value.icon className={`h-6 w-6 ${value.color} mb-4`} />
                  <h3 className="text-lg font-semibold text-white">{value.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="relative py-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Built by founders who&apos;ve lived this problem
              </h2>
              <p className="mt-6 text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto">
                We&apos;ve personally experienced what it&apos;s like to be rejected by banks
                for no reason other than our country of origin. BedRock exists because we
                refused to accept that as the final answer.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-30">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-600/40 rounded-full blur-[128px]" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-600/30 rounded-full blur-[128px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="mt-4 text-lg text-zinc-300">
                Check your eligibility in 2 minutes. No credit card required.
              </p>
              <div className="mt-8">
                <Link href="/onboarding/choose">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:from-blue-400 hover:to-violet-500 rounded-xl px-8 py-6 text-base font-medium gap-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                  >
                    Check Your Eligibility
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
