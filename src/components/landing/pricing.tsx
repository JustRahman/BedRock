import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const plans = [
  {
    name: 'Basic',
    price: 500,
    description: 'Formation + Banking for verified founders',
    features: [
      'Digital Lineage verification',
      'Trust Score calculation',
      'LLC formation (DE or WY)',
      'EIN acquisition',
      'Bank application prep',
      '1 bank application',
      'Email support',
    ],
    highlighted: false,
  },
  {
    name: 'Standard',
    price: 800,
    description: 'Everything you need to get banked and stay compliant',
    features: [
      'Everything in Basic',
      'Priority bank matching',
      '3 bank applications',
      '1 year compliance calendar',
      'BOI Report filing',
      'Form 5472 preparation',
      'Deadline reminders',
      'Priority support',
    ],
    highlighted: true,
  },
  {
    name: 'Premium',
    price: 1500,
    description: 'Full service with Anti-Freeze protection',
    features: [
      'Everything in Standard',
      'Anti-Freeze Shield',
      'Transaction monitoring',
      'Bank inquiry response AI',
      'Unlimited bank applications',
      'Dedicated account manager',
      'Approval guarantee',
    ],
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that fits your needs. No hidden fees.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl ${
                plan.highlighted
                  ? 'border-2 border-blue-600 bg-white shadow-xl'
                  : 'border border-gray-200 bg-white shadow-sm'
              } p-8`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-blue-600 px-4 py-1 text-sm font-medium text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price.toLocaleString()}
                  </span>
                  <span className="text-gray-600">/one-time</span>
                </div>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-500" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href="/onboarding">
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? 'default' : 'outline'}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
