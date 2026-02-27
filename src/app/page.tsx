import {
  Navbar,
  Hero,
  SocialProof,
  Problem,
  HowItWorks,
  TrustScorePreview,
  Comparison,
  Testimonials,
  Solutions,
  AlternativeID,
  Pricing,
  FAQ,
  Waitlist,
  CTA,
  Footer,
} from '@/components/landing'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Problem />
        <HowItWorks />
        <TrustScorePreview />
        <Comparison />
        <Testimonials />
        <Solutions />
        <AlternativeID />
        <Pricing />
        <FAQ />
        <Waitlist />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
