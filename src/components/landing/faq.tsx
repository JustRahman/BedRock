'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What countries do you support?',
    answer:
      'We support founders from over 100 countries. Our Digital Lineage verification works for anyone with a digital footprint. Countries on OFAC sanctions lists have limited options, but our tiered risk system means strong Digital Lineage can override country penalties.',
  },
  {
    question: 'How long does the process take?',
    answer:
      'Digital Lineage verification takes about 10 minutes. Trust Score is calculated instantly. LLC formation takes 3-7 days, EIN 4-14 days, and bank approval 7-14 days. Elite-scored founders often get approved within 3 days.',
  },
  {
    question: 'How is this different from Stripe Atlas?',
    answer:
      'Stripe Atlas forms your company but doesn\'t help you get approved by banks. They reject the same founders banks reject. Bedrock verifies your Digital Lineage — 5 years of GitHub commits, LinkedIn history, and revenue data — to prove who you are in a way deepfakes can\'t fake. Our 94% approval rate speaks for itself.',
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
      'Available on Premium plans, Anti-Freeze Shield monitors your transactions and alerts you before sending payments that might trigger a bank review. It helps you upload documentation proactively and drafts responses if your bank asks questions. Zero accounts frozen with Anti-Freeze active.',
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

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about Bedrock
          </p>
        </div>

        <div className="mt-12 divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={index} className="py-6">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-start justify-between text-left"
              >
                <span className="text-base font-medium text-gray-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`ml-6 h-5 w-5 shrink-0 text-gray-500 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <p className="mt-4 text-sm text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
