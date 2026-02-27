'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'

export function Waitlist() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'exists' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: name || undefined }),
      })

      if (res.status === 409) {
        setStatus('exists')
        return
      }

      if (!res.ok) throw new Error('Failed')

      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="waitlist" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-white/[0.1] bg-white/[0.04] p-10 sm:p-14 text-center backdrop-blur-sm">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Join the Waitlist
            </h2>
            <p className="mt-4 text-lg text-zinc-300 leading-relaxed max-w-lg mx-auto">
              Be the first to know when BedRock launches. Get early access and exclusive updates.
            </p>

            {status === 'success' ? (
              <div className="mt-8 flex flex-col items-center gap-3">
                <CheckCircle2 className="h-10 w-10 text-green-400" />
                <p className="text-lg font-medium text-white">You&apos;re on the list!</p>
                <p className="text-sm text-zinc-400">We&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    placeholder="Name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 rounded-xl border border-white/[0.1] bg-white/[0.06] px-4 py-3 text-white placeholder:text-zinc-500 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 backdrop-blur-sm"
                  />
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-[2] rounded-xl border border-white/[0.1] bg-white/[0.06] px-4 py-3 text-white placeholder:text-zinc-500 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 backdrop-blur-sm"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:from-blue-400 hover:to-violet-500 rounded-xl px-8 py-6 text-base font-medium gap-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>

                {status === 'exists' && (
                  <p className="text-sm text-amber-400">You&apos;re already on the waitlist!</p>
                )}
                {status === 'error' && (
                  <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
