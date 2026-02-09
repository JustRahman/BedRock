import { Fingerprint, Shield, Building2, CheckCircle } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Fingerprint,
    title: 'Verify Your Digital Lineage',
    description:
      'Connect GitHub, LinkedIn, and Stripe. We analyze 5 years of history that deepfakes can\'t fake.',
    gradient: 'from-blue-500 to-cyan-400',
    glow: 'bg-blue-500/25',
  },
  {
    number: '02',
    icon: Shield,
    title: 'Get Your Trust Score',
    description:
      'Our proprietary scoring system evaluates Digital Lineage, business signals, identity, and trust network.',
    gradient: 'from-emerald-500 to-teal-400',
    glow: 'bg-emerald-500/25',
  },
  {
    number: '03',
    icon: Building2,
    title: 'Formation + Banking',
    description:
      'We handle LLC formation, EIN acquisition, and bank application with your verified Trust Score package.',
    gradient: 'from-violet-500 to-purple-400',
    glow: 'bg-violet-500/25',
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'Stay Compliant',
    description:
      'Anti-Freeze Shield monitors transactions. Automated compliance handles BOI, Form 5472, and annual reports.',
    gradient: 'from-amber-500 to-orange-400',
    glow: 'bg-amber-500/25',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/[0.08] px-4 py-1.5 text-sm text-blue-300 mb-6">
            How It Works
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Four steps to{' '}
            <span className="gradient-text">US banking</span>
          </h2>
          <p className="mt-5 text-lg text-zinc-300">
            From verification to compliant US banking in days, not months.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="group relative">
              {/* Connecting line (desktop) */}
              {index < steps.length - 1 && (
                <div className="absolute top-10 left-[calc(50%+40px)] hidden h-px w-[calc(100%-80px)] lg:block">
                  <div className="h-full w-full bg-gradient-to-r from-white/[0.08] to-white/[0.03]" />
                </div>
              )}

              <div className="relative flex flex-col items-center text-center rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.05]">
                {/* Step number + icon */}
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
          ))}
        </div>
      </div>
    </section>
  )
}
