'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar, Footer } from '@/components/landing'
import { Button } from '@/components/ui/button'
import { Mail, Clock, MessageSquare, CheckCircle } from 'lucide-react'

const subjects = [
  'General Inquiry',
  'Eligibility Question',
  'Account Support',
  'Partnership Opportunity',
  'Press & Media',
  'Other',
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="relative overflow-hidden pb-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-40">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[128px]" />
            <div className="absolute top-20 right-1/4 w-80 h-80 bg-violet-600/25 rounded-full blur-[128px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
                Get in <span className="gradient-text">Touch</span>
              </h1>
              <p className="mt-8 text-lg leading-relaxed text-zinc-300 max-w-2xl mx-auto">
                Have a question or need help? We&apos;re here for you.
              </p>
            </div>
          </div>
        </section>

        <section className="relative py-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-5xl grid grid-cols-1 gap-10 lg:grid-cols-5">
              {/* Contact info sidebar */}
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-white">Contact info</h3>
                  <div className="mt-6 space-y-5">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white">Email</p>
                        <a
                          href="mailto:support@bedrockhq.co"
                          className="text-sm text-zinc-400 hover:text-white transition-colors"
                        >
                          support@bedrockhq.co
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-violet-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white">Response time</p>
                        <p className="text-sm text-zinc-400">
                          Usually within 24 hours
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">Quick answers</h3>
                      <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                        Many common questions are already answered in our FAQ.
                      </p>
                      <Link
                        href="/#faq"
                        className="mt-3 inline-block text-sm text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Check our FAQ &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact form */}
              <div className="lg:col-span-3">
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 sm:p-10 backdrop-blur-sm">
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                        <CheckCircle className="h-7 w-7 text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        Message sent!
                      </h3>
                      <p className="mt-2 text-zinc-400 max-w-sm">
                        Thanks for reaching out. We&apos;ll get back to you within 24
                        hours.
                      </p>
                      <Button
                        variant="ghost"
                        className="mt-6 text-zinc-300 hover:text-white hover:bg-white/[0.06]"
                        onClick={() => {
                          setSubmitted(false)
                          setForm({ name: '', email: '', subject: '', message: '' })
                        }}
                      >
                        Send another message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-zinc-300 mb-2"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, name: e.target.value }))
                          }
                          className="w-full rounded-xl border border-white/[0.1] bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-zinc-300 mb-2"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, email: e.target.value }))
                          }
                          className="w-full rounded-xl border border-white/[0.1] bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
                          placeholder="you@example.com"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-zinc-300 mb-2"
                        >
                          Subject
                        </label>
                        <select
                          id="subject"
                          required
                          value={form.subject}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, subject: e.target.value }))
                          }
                          className="w-full rounded-xl border border-white/[0.1] bg-white/[0.05] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 [&>option]:bg-[#09090b]"
                        >
                          <option value="" disabled>
                            Select a subject
                          </option>
                          {subjects.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-zinc-300 mb-2"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={5}
                          value={form.message}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, message: e.target.value }))
                          }
                          className="w-full rounded-xl border border-white/[0.1] bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 resize-none"
                          placeholder="Tell us how we can help..."
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:from-blue-400 hover:to-violet-500 rounded-xl py-6 text-base font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                      >
                        Send Message
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
