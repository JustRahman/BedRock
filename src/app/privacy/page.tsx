import { Navbar, Footer } from '@/components/landing'

const lastUpdated = 'February 8, 2026'

const sections = [
  {
    title: '1. Information We Collect',
    content: [
      'We collect information you provide directly when you create an account, complete onboarding, or contact us. This includes your name, email address, country of origin, and business information.',
      'When you connect third-party accounts (LinkedIn, GitHub, etc.) for Digital Lineage verification, we access only the data necessary to calculate your Trust Score. We do not store your third-party credentials.',
      'We automatically collect certain technical information when you use our services, including IP address, browser type, device information, and usage patterns.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    content: [
      'We use your information to provide and improve our services, including: calculating your Trust Score, facilitating LLC formation and bank applications, processing payments, and sending service-related communications.',
      'We may use aggregated, anonymized data for analytics and to improve our verification algorithms. This data cannot be used to identify you.',
      'We will never sell your personal information to third parties.',
    ],
  },
  {
    title: '3. Information Sharing',
    content: [
      'We share your information only in the following circumstances:',
      'With banking partners — only when you explicitly authorize us to submit a bank application on your behalf. You will always be informed before any data is shared with a bank.',
      'With service providers who help us operate our platform (payment processing, email delivery, cloud hosting). These providers are contractually bound to protect your data.',
      'When required by law, such as in response to a valid subpoena, court order, or government request.',
    ],
  },
  {
    title: '4. Data Security',
    content: [
      'We implement industry-standard security measures to protect your data, including encryption in transit (TLS) and at rest, secure authentication, and regular security audits.',
      'Your verification data is processed using deepfake-proof methods and stored with bank-grade encryption. Access is strictly limited to authorized personnel on a need-to-know basis.',
    ],
  },
  {
    title: '5. Data Retention',
    content: [
      'We retain your account data for as long as your account is active or as needed to provide services. If you close your account, we will delete your personal data within 30 days, except where retention is required by law or for legitimate business purposes (e.g., fraud prevention).',
      'Verification records may be retained for up to 7 years to comply with banking regulations and anti-money laundering requirements.',
    ],
  },
  {
    title: '6. Your Rights',
    content: [
      'You have the right to access, correct, or delete your personal data at any time. You can do this through your account settings or by contacting us at support@bedrockhq.co.',
      'You have the right to withdraw consent for data processing. Note that withdrawing consent may limit our ability to provide certain services.',
      'You have the right to request a portable copy of your data in a machine-readable format.',
    ],
  },
  {
    title: '7. Cookies & Tracking',
    content: [
      'We use essential cookies to keep you logged in and remember your preferences. We use analytics cookies to understand how our service is used and to improve it.',
      'We do not use advertising cookies or trackers. We do not sell or share cookie data with third parties for advertising purposes.',
    ],
  },
  {
    title: '8. International Data Transfers',
    content: [
      'Our services are hosted in the United States. If you are accessing our services from outside the US, your data will be transferred to and processed in the US. We take appropriate safeguards to ensure your data is protected in accordance with this policy.',
    ],
  },
  {
    title: '9. Changes to This Policy',
    content: [
      'We may update this privacy policy from time to time. We will notify you of any material changes by email or through a prominent notice on our website. Your continued use of our services after such changes constitutes acceptance of the updated policy.',
    ],
  },
  {
    title: '10. Contact Us',
    content: [
      'If you have questions about this privacy policy or our data practices, contact us at support@bedrockhq.co.',
    ],
  },
]

export default function PrivacyPage() {
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
                Privacy <span className="gradient-text">Policy</span>
              </h1>
              <p className="mt-6 text-lg text-zinc-400">
                Last updated: {lastUpdated}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-zinc-300 max-w-2xl mx-auto">
                Your privacy matters. Here&apos;s exactly how we collect, use, and
                protect your data.
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
