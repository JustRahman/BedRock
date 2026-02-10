import Link from 'next/link'
import { Navbar, Footer } from '@/components/landing'
import { Button } from '@/components/ui/button'
import { Heart, Laptop, Wrench, ArrowRight } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Mission-Driven',
    description:
      'We\'re not building another fintech toy. We\'re solving a real problem that affects millions of founders worldwide.',
    color: 'text-rose-400',
  },
  {
    icon: Laptop,
    title: 'Remote-First',
    description:
      'Work from anywhere. We\'re a distributed team that communicates asynchronously and values output over hours.',
    color: 'text-blue-400',
  },
  {
    icon: Wrench,
    title: 'Builder Mindset',
    description:
      'We ship fast, learn faster, and aren\'t afraid to throw things away and start over. Ownership is the default.',
    color: 'text-amber-400',
  },
]

export default function CareersPage() {
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
                Join the <span className="gradient-text">Team</span>
              </h1>
              <p className="mt-8 text-lg leading-relaxed text-zinc-300 max-w-2xl mx-auto">
                We&apos;re building the future of banking access for founders the system
                was designed to exclude.
              </p>
            </div>
          </div>
        </section>

        {/* Current status */}
        <section className="relative py-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-10 sm:p-14 backdrop-blur-sm text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/[0.07] px-4 py-2 text-sm mb-6">
                  <div className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="text-amber-300/90">Not actively hiring</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  We&apos;re a small team right now
                </h2>
                <p className="mt-4 text-zinc-300 leading-relaxed max-w-xl mx-auto">
                  We&apos;re not actively hiring for specific roles, but we&apos;re always
                  looking for exceptional people who care deeply about this problem. If
                  that&apos;s you, we want to hear from you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What we value */}
        <section className="relative py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                What we value
              </h2>
              <p className="mt-4 text-lg text-zinc-400">
                The kind of people we want to work with.
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

        {/* Open application CTA */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-30">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-600/40 rounded-full blur-[128px]" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-600/30 rounded-full blur-[128px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Send us your story
              </h2>
              <p className="mt-4 text-lg text-zinc-300 leading-relaxed">
                Tell us who you are, what you&apos;ve built, and why this mission matters
                to you. No formal resume needed.
              </p>
              <div className="mt-8">
                <a href="mailto:careers@bedrockhq.co?subject=Open Application">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:from-blue-400 hover:to-violet-500 rounded-xl px-8 py-6 text-base font-medium gap-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                  >
                    careers@bedrockhq.co
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
