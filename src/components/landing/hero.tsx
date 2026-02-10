'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, Users, ShieldCheck } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[128px]" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-violet-600/25 rounded-full blur-[128px]" />
        <div className="absolute -top-10 left-1/2 w-72 h-72 bg-indigo-500/20 rounded-full blur-[128px]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Status badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-4 py-2 text-sm backdrop-blur-sm animate-fade-in-up">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-300/90">
              Accepting applications — check your eligibility
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl animate-fade-in-up animation-delay-200">
            <span className="text-white">US Banking Access</span>
            <br />
            <span className="text-white">for Founders </span>
            <span className="gradient-text">Banks Ignore</span>
          </h1>

          <p className="mt-8 text-lg leading-relaxed text-zinc-300 max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
            Deepfake-proof verification. Automated compliance.
            We verify your Digital Lineage — not just documents.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up animation-delay-600">
            <Link href="/onboarding">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:from-blue-400 hover:to-violet-500 rounded-xl px-8 py-6 text-base font-medium gap-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
              >
                Check Your Eligibility
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button
                variant="ghost"
                size="lg"
                className="border border-white/[0.15] text-zinc-200 hover:bg-white/[0.08] hover:border-white/[0.25] hover:text-white rounded-xl px-8 py-6 text-base backdrop-blur-sm"
              >
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-3 animate-fade-in-up animation-delay-800">
            {[
              { icon: ShieldCheck, value: '17+', label: 'Countries banned from Mercury in 2024', color: 'text-red-400' },
              { icon: Users, value: '100+', label: 'Countries de-risked by major US banks', color: 'text-amber-400' },
              { icon: CheckCircle, value: '0', label: 'Options for restricted founders — until now', color: 'text-emerald-400' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06]"
              >
                <stat.icon className={`h-5 w-5 ${stat.color} mb-3`} />
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
