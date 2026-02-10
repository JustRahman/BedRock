import { Navbar, Footer } from '@/components/landing'

const lastUpdated = 'February 8, 2026'

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: [
      'By accessing or using BedRock\'s services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, you may not use our services.',
      'You must be at least 18 years old and legally capable of entering into contracts to use our services. By creating an account, you represent that you meet these requirements.',
    ],
  },
  {
    title: '2. Description of Services',
    content: [
      'BedRock provides Digital Lineage verification, Trust Score calculation, LLC formation assistance, EIN acquisition guidance, and bank application preparation services for international founders seeking US banking access.',
      'We act as a verification and preparation platform. We are not a bank, law firm, or registered agent. Our services facilitate the process but do not guarantee approval by any banking institution.',
    ],
  },
  {
    title: '3. Account Registration',
    content: [
      'You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.',
      'You agree to notify us immediately of any unauthorized use of your account. We are not liable for losses arising from unauthorized use that occurs before you notify us.',
    ],
  },
  {
    title: '4. Verification & Trust Score',
    content: [
      'Our Digital Lineage verification process analyzes your online presence, business history, and other trust signals to generate a Trust Score. This score is our proprietary assessment and is used to evaluate eligibility for banking services.',
      'You agree to provide truthful information during the verification process. Providing false, misleading, or fraudulent information is grounds for immediate account termination and may be reported to relevant authorities.',
      'Trust Scores are informational and do not constitute a guarantee of banking approval. Banks make independent decisions based on their own criteria.',
    ],
  },
  {
    title: '5. LLC Formation Services',
    content: [
      'BedRock facilitates LLC formation through third-party registered agents. While we guide you through the process, the legal formation is handled by our partners.',
      'You are responsible for ensuring your business activities comply with all applicable federal, state, and local laws. BedRock does not provide legal advice.',
      'Formation timelines and costs may vary by state. We will provide estimates but cannot guarantee exact timelines.',
    ],
  },
  {
    title: '6. Payments & Refunds',
    content: [
      'Payments are processed through Stripe. By making a payment, you agree to Stripe\'s terms of service in addition to ours.',
      'Fees for our services are displayed at the time of purchase. We reserve the right to change pricing with 30 days\' notice to existing customers.',
      'Refunds are handled on a case-by-case basis. If we are unable to deliver the services you paid for due to our fault, you are entitled to a full refund. Government filing fees and third-party costs are generally non-refundable.',
    ],
  },
  {
    title: '7. Prohibited Uses',
    content: [
      'You may not use our services for any unlawful purpose, including but not limited to: money laundering, terrorist financing, fraud, sanctions evasion, or any activity that violates US or international law.',
      'You may not attempt to circumvent our verification processes, provide false documentation, or impersonate another person or entity.',
      'We reserve the right to refuse service, terminate accounts, and report suspicious activity to relevant authorities at our sole discretion.',
    ],
  },
  {
    title: '8. Intellectual Property',
    content: [
      'All content, features, and functionality of the BedRock platform — including our verification algorithms, Trust Score methodology, branding, and user interface — are owned by BedRock and protected by intellectual property laws.',
      'You may not copy, modify, distribute, or create derivative works from any part of our platform without written permission.',
    ],
  },
  {
    title: '9. Limitation of Liability',
    content: [
      'BedRock is provided "as is" without warranties of any kind, express or implied. We do not warrant that our services will be uninterrupted, error-free, or that any specific outcome (including banking approval) will be achieved.',
      'To the maximum extent permitted by law, BedRock\'s total liability for any claims arising from your use of our services shall not exceed the total amount you have paid us in the 12 months preceding the claim.',
      'We are not liable for indirect, incidental, consequential, or punitive damages, including lost profits or data.',
    ],
  },
  {
    title: '10. Dispute Resolution',
    content: [
      'Any disputes arising from these terms or your use of our services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, conducted in the State of Delaware.',
      'You agree to waive any right to a jury trial or to participate in a class action lawsuit against BedRock.',
    ],
  },
  {
    title: '11. Termination',
    content: [
      'You may close your account at any time by contacting us. We may suspend or terminate your account if you violate these terms or engage in prohibited activities.',
      'Upon termination, your right to use our services ceases immediately. Provisions that by their nature should survive termination (including limitation of liability, dispute resolution, and intellectual property) will remain in effect.',
    ],
  },
  {
    title: '12. Changes to Terms',
    content: [
      'We may modify these terms at any time. Material changes will be communicated via email or a prominent notice on our platform at least 30 days before taking effect.',
      'Your continued use of our services after changes take effect constitutes acceptance of the revised terms.',
    ],
  },
  {
    title: '13. Contact',
    content: [
      'For questions about these terms, contact us at support@bedrockhq.co.',
    ],
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="relative overflow-hidden pb-16">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-40">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[128px]" />
            <div className="absolute top-20 right-1/4 w-80 h-80 bg-violet-600/25 rounded-full blur-[128px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
                Terms of <span className="gradient-text">Service</span>
              </h1>
              <p className="mt-6 text-lg text-zinc-400">
                Last updated: {lastUpdated}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-zinc-300 max-w-2xl mx-auto">
                Please read these terms carefully before using BedRock&apos;s services.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="relative py-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 sm:p-12 backdrop-blur-sm">
                <div className="space-y-10">
                  {sections.map((section) => (
                    <div key={section.title}>
                      <h2 className="text-xl font-semibold text-white">
                        {section.title}
                      </h2>
                      <div className="mt-4 space-y-3">
                        {section.content.map((paragraph, i) => (
                          <p
                            key={i}
                            className="text-sm text-zinc-300 leading-relaxed"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
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
