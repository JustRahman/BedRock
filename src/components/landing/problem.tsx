import { XCircle, AlertTriangle, Clock, Ban } from 'lucide-react'

const problems = [
  {
    icon: XCircle,
    title: 'Identity Failure',
    description:
      'Banks use passport + selfie verification. Deepfakes are up 300%. Documents prove nothing about who you really are.',
    gradient: 'from-red-500/10 to-orange-500/10',
    iconColor: 'text-red-400',
    iconBg: 'bg-red-500/10',
    borderColor: 'hover:border-red-500/25',
  },
  {
    icon: AlertTriangle,
    title: 'Automatic Rejection',
    description:
      'Banks blacklist 100+ countries. No data means auto-reject. 40% of legitimate founders from emerging markets get denied.',
    gradient: 'from-amber-500/10 to-yellow-500/10',
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10',
    borderColor: 'hover:border-amber-500/25',
  },
  {
    icon: Ban,
    title: 'Account Freezes',
    description:
      'Even approved founders get frozen. One unusual transaction and your account is shut down overnight.',
    gradient: 'from-rose-500/10 to-pink-500/10',
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-500/10',
    borderColor: 'hover:border-rose-500/25',
  },
  {
    icon: Clock,
    title: 'Compliance Chaos',
    description:
      'Tax filings are manual and confusing. Miss a deadline and face a $25,000 penalty. Most founders don\'t even know what\'s required.',
    gradient: 'from-orange-500/10 to-red-500/10',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-500/10',
    borderColor: 'hover:border-orange-500/25',
  },
]

export function Problem() {
  return (
    <section className="relative py-24 sm:py-32">
      {/* Subtle divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-400/25 bg-red-500/[0.08] px-4 py-1.5 text-sm text-red-300 mb-6">
            The Problem
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            17+ Countries Banned from Mercury in{' '}
            <span className="gradient-text-warm">2024</span>
          </h2>
          <p className="mt-5 text-lg text-zinc-300 leading-relaxed">
            100+ countries de-risked by major US banks. 0 options for founders
            from restricted countries — until now.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className={`group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-all duration-500 ${problem.borderColor} hover:bg-white/[0.05]`}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${problem.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
              <div className="relative">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${problem.iconBg}`}>
                  <problem.icon className={`h-5 w-5 ${problem.iconColor}`} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {problem.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
