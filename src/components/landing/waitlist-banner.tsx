'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, X, Sparkles } from 'lucide-react'

export function WaitlistBanner() {
  const [dismissed, setDismissed] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (dismissed) return null

  return (
    <div
      className={`fixed right-0 top-1/3 z-50 transition-all duration-500 ease-out ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      {/* Dismiss button - floated above */}
      <button
        onClick={() => setDismissed(true)}
        className="absolute -left-3 -top-3 rounded-full border border-white/10 bg-zinc-900 p-1 text-zinc-500 hover:text-white hover:border-white/25 transition-colors shadow-lg"
      >
        <X className="h-3 w-3" />
      </button>

      <a
        href="#waitlist"
        className="group flex flex-col gap-1.5 rounded-l-2xl border border-r-0 border-white/[0.12] bg-gradient-to-br from-violet-600/20 via-blue-600/15 to-violet-600/20 backdrop-blur-xl px-5 py-4 shadow-[0_0_30px_rgba(139,92,246,0.15),inset_0_1px_0_rgba(255,255,255,0.08)] hover:shadow-[0_0_40px_rgba(139,92,246,0.25)] hover:border-white/[0.2] transition-all duration-300 cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-violet-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-300/80">
            Early Access
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white">
            Join the Waitlist
          </span>
          <ArrowRight className="h-3.5 w-3.5 text-violet-300 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </a>
    </div>
  )
}
