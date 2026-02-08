import { XCircle, AlertTriangle, Clock, Ban } from 'lucide-react'

const problems = [
  {
    icon: XCircle,
    title: 'Identity Failure',
    description:
      'Banks use passport + selfie verification. Deepfakes are up 300%. Documents prove nothing about who you really are.',
  },
  {
    icon: AlertTriangle,
    title: 'Automatic Rejection',
    description:
      'Banks blacklist 100+ countries. No data means auto-reject. 40% of legitimate founders from emerging markets get denied.',
  },
  {
    icon: Ban,
    title: 'Account Freezes',
    description:
      'Even approved founders get frozen. One unusual transaction and your account is shut down overnight.',
  },
  {
    icon: Clock,
    title: 'Compliance Chaos',
    description:
      'Tax filings are manual and confusing. Miss a deadline and face a $25,000 penalty. Most founders don\'t even know what\'s required.',
  },
]

export function Problem() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            40% of Founders From Emerging Markets Get Rejected
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            It&apos;s not because they&apos;re risky. It&apos;s because banks have no data.
            Traditional verification is broken.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="rounded-xl border border-red-100 bg-white p-6 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                <problem.icon className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {problem.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
