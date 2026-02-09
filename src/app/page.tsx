import {
  Navbar,
  Hero,
  Problem,
  HowItWorks,
  Testimonials,
  Pricing,
  FAQ,
  CTA,
  Footer,
} from '@/components/landing'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
