import { Globe, Zap, ShieldCheck } from 'lucide-react'
import { ScrollReveal } from './scroll-reveal'

const highlights = [
  {
    icon: Globe,
    title: 'Built for 100+ Countries',
    description:
      'Our Digital Lineage verification works for founders from emerging markets who get auto-rejected by traditional banks.',
    gradient: 'from-blue-500 to-violet-500',
  },
  {
    icon: Zap,
    title: 'Verification in Minutes',
    description:
      'Connect GitHub, LinkedIn, and Stripe. We analyze 5 years of digital history — no paperwork, no office visits.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: ShieldCheck,
    title: 'Deepfake-Proof Identity',
    description:
      'Unlike passport selfies that can be faked, Digital Lineage creates an identity that\'s impossible to fabricate retroactively.',
    gradient: 'from-amber-500 to-orange-500',
  },
]

export function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/[0.08] px-4 py-1.5 text-sm text-emerald-300 mb-6">
              <Zap className="h-3.5 w-3.5" />
              Why BedRock
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              What makes us different
            </h2>
            <p className="mt-5 text-lg text-zinc-300">
              We don&apos;t just form your company. We get you actually approved.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {highlights.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 150}>
              <div className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.05] h-full">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} mb-5`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
