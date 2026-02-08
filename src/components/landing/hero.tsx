'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Shield, Users, CheckCircle } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Accepting applications — check your eligibility
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            US Banking Access for Founders{' '}
            <span className="text-blue-600">Banks Ignore</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            94% approval rate. Deepfake-proof verification. Automated compliance.
            We verify your Digital Lineage — not just documents.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/onboarding">
              <Button size="lg" className="gap-2">
                Check Your Eligibility
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" size="lg">
                See How It Works
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <p className="mt-4 text-2xl font-bold text-gray-900">94%</p>
              <p className="text-sm text-gray-600">Approval Rate</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <p className="mt-4 text-2xl font-bold text-gray-900">500+</p>
              <p className="text-sm text-gray-600">Founders Verified</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <p className="mt-4 text-2xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-600">Accounts Frozen</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
