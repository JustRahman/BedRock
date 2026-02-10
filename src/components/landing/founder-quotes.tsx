import { Quote } from 'lucide-react'
import { ScrollReveal } from './scroll-reveal'

const testimonials = [
  {
    quote:
      "Mercury rejected me in 30 seconds because of my passport. BedRock verified 5 years of my GitHub and got me approved in a week.",
    name: 'Emeka O.',
    country: 'Nigeria',
    flag: '🇳🇬',
    role: 'Founder, SaaS startup',
    score: 87,
  },
  {
    quote:
      "I spent 6 months trying to open a US bank account on my own. BedRock handled everything — LLC, EIN, and banking — in under 2 weeks.",
    name: 'Priya S.',
    country: 'India',
    flag: '🇮🇳',
    role: 'CEO, Fintech platform',
    score: 91,
  },
  {
    quote:
      "The Anti-Freeze Shield saved my account. I got flagged for a large payment and BedRock had documentation ready before the bank even asked.",
    name: 'Andrei M.',
    country: 'Romania',
    flag: '🇷🇴',
    role: 'CTO, Dev agency',
    score: 83,
  },
]

export function FounderQuotes() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/[0.08] px-4 py-1.5 text-sm text-emerald-300 mb-6">
              <Quote className="h-3.5 w-3.5" />
              Founder Stories
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Trusted by founders{' '}
              <span className="gradient-text">worldwide</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 150}>
              <div className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.05] h-full">
                {/* Quote icon */}
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] mb-5">
                  <Quote className="h-5 w-5 text-blue-400" />
                </div>

                {/* Quote text */}
                <p className="text-sm leading-relaxed text-zinc-300 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="mt-6 pt-6 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-white/[0.1] text-lg">
                      {t.flag}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{t.name}</p>
                      <p className="text-xs text-zinc-500">{t.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">{t.score}</p>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">Score</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
