'use client'

import { useEffect, useRef, useState } from 'react'
import { Shield, Github, Linkedin, DollarSign, Globe, Users } from 'lucide-react'
import { ScrollReveal } from './scroll-reveal'

const categories = [
  { name: 'Digital Lineage', score: 92, icon: Github, color: 'text-blue-400', bg: 'bg-blue-400' },
  { name: 'Professional', score: 88, icon: Linkedin, color: 'text-violet-400', bg: 'bg-violet-400' },
  { name: 'Financial', score: 76, icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-400' },
  { name: 'Identity', score: 95, icon: Shield, color: 'text-amber-400', bg: 'bg-amber-400' },
  { name: 'Network', score: 84, icon: Users, color: 'text-rose-400', bg: 'bg-rose-400' },
  { name: 'Web Presence', score: 70, icon: Globe, color: 'text-cyan-400', bg: 'bg-cyan-400' },
]

function AnimatedScore({ target }: { target: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 1500
          const start = performance.now()
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}</span>
}

function ScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 58
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative h-40 w-40">
      <svg className="h-40 w-40 -rotate-90" viewBox="0 0 128 128">
        <circle
          cx="64" cy="64" r="58"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="8"
        />
        <circle
          cx="64" cy="64" r="58"
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-[1.5s] ease-out"
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-white">
          <AnimatedScore target={score} />
        </span>
        <span className="text-xs text-zinc-400 mt-1">Trust Score</span>
      </div>
    </div>
  )
}

export function TrustScorePreview() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-20">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-600/40 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-600/30 rounded-full blur-[128px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/[0.08] px-4 py-1.5 text-sm text-blue-300 mb-6">
              <Shield className="h-3.5 w-3.5" />
              Trust Score
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              See your score{' '}
              <span className="gradient-text">instantly</span>
            </h2>
            <p className="mt-5 text-lg text-zinc-300">
              Our proprietary algorithm analyzes 6 dimensions of your digital identity.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mx-auto max-w-3xl">
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 sm:p-10 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-center gap-10">
                {/* Score ring */}
                <div className="shrink-0">
                  <ScoreRing score={85} />
                </div>

                {/* Category breakdown */}
                <div className="flex-1 w-full space-y-4">
                  {categories.map((cat) => (
                    <div key={cat.name} className="flex items-center gap-3">
                      <cat.icon className={`h-4 w-4 ${cat.color} shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-zinc-400">{cat.name}</span>
                          <span className="text-xs font-medium text-zinc-300">{cat.score}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                          <div
                            className={`h-full rounded-full ${cat.bg} opacity-80 transition-all duration-[1.5s] ease-out`}
                            style={{ width: `${cat.score}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status badge */}
              <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-sm text-emerald-300">Bank-Ready</span>
                </div>
                <span className="text-xs text-zinc-500">Sample score — yours may vary</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
