import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Shield } from 'lucide-react'

export function CTA() {
  return (
    <section className="bg-blue-600 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-blue-200" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Check Your Eligibility — Free, 2 Minutes
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Verify your Digital Lineage and get your Trust Score instantly.
            94% of founders who complete verification get approved.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/onboarding">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 bg-white text-blue-600 hover:bg-blue-50"
              >
                Check Your Eligibility
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#pricing">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-blue-700"
              >
                View Pricing
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-blue-200">
            No credit card required. Free eligibility check.
          </p>
        </div>
      </div>
    </section>
  )
}
