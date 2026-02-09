import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Large gradient glow behind CTA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/40 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/30 rounded-full blur-[128px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-white/[0.1] bg-white/[0.04] p-12 sm:p-16 text-center backdrop-blur-sm">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Check Your Eligibility
              <br />
              <span className="gradient-text">Free, 2 Minutes</span>
            </h2>
            <p className="mt-6 text-lg text-zinc-300 leading-relaxed max-w-xl mx-auto">
              Verify your Digital Lineage and get your Trust Score instantly.
              Finally, a path to US banking for founders from restricted countries.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/onboarding">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-zinc-100 rounded-xl px-8 py-6 text-base font-medium gap-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                  Check Your Eligibility
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#pricing">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/[0.12] text-zinc-200 hover:bg-white/[0.07] hover:text-white rounded-xl px-8 py-6 text-base backdrop-blur-sm"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-zinc-500">
              No credit card required. Free eligibility check.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
