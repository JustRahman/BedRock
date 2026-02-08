import { Fingerprint, Shield, Building2, CheckCircle, ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Fingerprint,
    title: 'Verify Your Digital Lineage',
    description:
      'Connect GitHub, LinkedIn, and Stripe. We analyze 5 years of history that deepfakes can\'t fake.',
    color: 'blue',
  },
  {
    number: '02',
    icon: Shield,
    title: 'Get Your Trust Score',
    description:
      'Our proprietary scoring system evaluates Digital Lineage, business signals, identity, and trust network.',
    color: 'green',
  },
  {
    number: '03',
    icon: Building2,
    title: 'Formation + Banking',
    description:
      'We handle LLC formation, EIN acquisition, and bank application with your verified Trust Score package.',
    color: 'purple',
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'Stay Compliant',
    description:
      'Anti-Freeze Shield monitors transactions. Automated compliance handles BOI, Form 5472, and annual reports.',
    color: 'orange',
  },
]

const colorMap = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    border: 'border-blue-200',
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    border: 'border-green-200',
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
    border: 'border-purple-200',
  },
  orange: {
    bg: 'bg-orange-100',
    text: 'text-orange-600',
    border: 'border-orange-200',
  },
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How Bedrock Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Four steps from verification to compliant US banking
          </p>
        </div>

        <div className="mt-16">
          <div className="relative">
            <div className="absolute left-1/2 top-8 hidden h-0.5 w-3/4 -translate-x-1/2 bg-gray-200 lg:block" />

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
              {steps.map((step, index) => {
                const colors = colorMap[step.color as keyof typeof colorMap]
                return (
                  <div key={step.title} className="relative">
                    <div className="flex flex-col items-center text-center">
                      <div
                        className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full ${colors.bg} ${colors.border} border-4 bg-white`}
                      >
                        <step.icon className={`h-7 w-7 ${colors.text}`} />
                      </div>

                      <span
                        className={`mt-4 text-sm font-semibold ${colors.text}`}
                      >
                        Step {step.number}
                      </span>

                      <h3 className="mt-2 text-xl font-bold text-gray-900">
                        {step.title}
                      </h3>

                      <p className="mt-3 text-gray-600">{step.description}</p>
                    </div>

                    {index < steps.length - 1 && (
                      <div className="mt-8 flex justify-center lg:hidden">
                        <ArrowRight className="h-6 w-6 rotate-90 text-gray-300" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
