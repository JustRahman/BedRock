'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Shield, GraduationCap, Building2 } from 'lucide-react'

export default function ChooseRolePage() {
  const router = useRouter()

  const handleSelect = (role: 'student' | 'founder') => {
    sessionStorage.setItem('chosen_role', role)
    if (role === 'student') {
      router.push('/onboarding/student')
    } else {
      router.push('/onboarding')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090b] px-4 py-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[128px]" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-violet-600/25 rounded-full blur-[128px]" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 transition-transform duration-300 group-hover:scale-105">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">BedRock</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-white">How can we help you?</h1>
          <p className="mt-2 text-sm text-zinc-400">Choose the path that fits your situation</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Student Card */}
          <button
            onClick={() => handleSelect('student')}
            className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm text-left hover:border-teal-500/30 hover:bg-teal-500/[0.03] transition-all duration-300 cursor-pointer"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 border border-teal-500/20 mb-4 group-hover:scale-105 transition-transform">
              <GraduationCap className="h-6 w-6 text-teal-400" />
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">International Student</h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              F-1 or J-1 visa holder? We&apos;ll file your Form 8843 and tax returns, building your financial history in the US.
            </p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <div className="h-1 w-1 rounded-full bg-teal-500" />
                Form 8843 filing (even with $0 income)
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <div className="h-1 w-1 rounded-full bg-teal-500" />
                1040-NR + state returns if needed
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <div className="h-1 w-1 rounded-full bg-teal-500" />
                Build trust score history
              </div>
            </div>
          </button>

          {/* Founder Card */}
          <button
            onClick={() => handleSelect('founder')}
            className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm text-left hover:border-violet-500/30 hover:bg-violet-500/[0.03] transition-all duration-300 cursor-pointer"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 mb-4 group-hover:scale-105 transition-transform">
              <Building2 className="h-6 w-6 text-violet-400" />
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">Founder</h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Start a US business. We&apos;ll help you form an LLC, get an EIN, open a bank account, and more.
            </p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <div className="h-1 w-1 rounded-full bg-violet-500" />
                LLC formation in any state
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <div className="h-1 w-1 rounded-full bg-violet-500" />
                EIN + US bank account
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <div className="h-1 w-1 rounded-full bg-violet-500" />
                Stripe, credit building, compliance
              </div>
            </div>
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-600">
          You can always switch later. Students can upgrade to founder at any time.
        </p>
      </div>
    </div>
  )
}
