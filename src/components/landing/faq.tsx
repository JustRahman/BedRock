'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { ScrollReveal } from './scroll-reveal'

const faqs = [
  {
    question: 'What countries do you support?',
    answer:
      'We support founders from over 100 countries. Our Digital Lineage verification works for anyone with a digital footprint. Countries on OFAC sanctions lists have limited options, but our tiered risk system means strong Digital Lineage can override country penalties.',
  },
  {
    question: 'How long does the process take?',
    answer:
      'Digital Lineage verification takes about 10 minutes. Trust Score is calculated instantly. LLC formation takes 3-7 days, EIN 4-14 days, and bank approval 7-14 days.',
  },
  {
    question: 'How is this different from Stripe Atlas?',
    answer:
      'Stripe Atlas forms your company but doesn\'t help you get approved by banks. They reject the same founders banks reject. BedRock verifies your Digital Lineage — 5 years of GitHub commits, LinkedIn history, and revenue data — to prove who you are in a way deepfakes can\'t fake.',
  },
  {
    question: 'What if I get rejected by a bank?',
    answer:
      'We work with multiple partner banks. If one bank rejects your application, we help you apply to alternatives. Standard and Premium plans include multiple bank applications. Our AI drafts appeal letters with your documentation.',
  },
  {
    question: 'What is Digital Lineage?',
    answer:
      'Digital Lineage is our core innovation. Instead of just checking documents (which deepfakes can fake), we verify 5 years of your digital history: GitHub commits, LinkedIn connections and endorsements, Stripe revenue, domain age, and social media timeline. This creates an identity that\'s impossible to fabricate retroactively.',
  },
  {
    question: 'What is the Anti-Freeze Shield?',
    answer:
      'Available on Premium plans, Anti-Freeze Shield monitors your transactions and alerts you before sending payments that might trigger a bank review. It helps you upload documentation proactively and drafts responses if your bank asks questions.',
  },
  {
    question: 'Do I need to be physically present in the US?',
    answer:
      'No! Our entire process is designed for remote founders. You can complete verification and get approved without visiting the US. We handle LLC formation and bank applications remotely.',
  },
  {
    question: 'Can I cancel and get a refund?',
    answer:
      'We offer a full refund if you cancel within 7 days of purchase and before we submit any bank applications on your behalf. After that, refunds are handled on a case-by-case basis.',
  },
]

function FaqItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [isOpen])

  return (
    <div
      className={`rounded-xl border transition-all duration-300 ${
        isOpen
          ? 'border-white/[0.15] bg-white/[0.06]'
          : 'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.12]'
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-sm font-medium text-zinc-100 pr-4">
          {faq.question}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? `${height}px` : '0px' }}
      >
        <div ref={contentRef} className="px-6 pb-5">
          <p className="text-sm leading-relaxed text-zinc-400">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-1.5 text-sm text-zinc-300 mb-6">
              <HelpCircle className="h-3.5 w-3.5" />
              FAQ
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Frequently asked questions
            </h2>
            <p className="mt-5 text-lg text-zinc-300">
              Everything you need to know about BedRock
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-14 space-y-2">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 50}>
              <FaqItem
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
