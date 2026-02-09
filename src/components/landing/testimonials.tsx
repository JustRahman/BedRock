import { Quote, Users } from 'lucide-react'

const placeholderTestimonials = [
  {
    quote:
      "I was rejected by 3 US banks before finding Bedrock. They verified my Digital Lineage and I was approved in 3 days.",
    name: 'Coming soon',
    title: 'Founder, stealth startup',
    country: 'Nigeria',
    initials: 'AO',
    gradient: 'from-blue-500 to-violet-500',
  },
  {
    quote:
      "The trust score gave me a clear roadmap. I knew exactly what documents to prepare and what to improve before applying.",
    name: 'Coming soon',
    title: 'Founder, stealth startup',
    country: 'India',
    initials: 'RK',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    quote:
      "As a non-resident founder, opening a US bank account felt impossible. Bedrock made it straightforward.",
    name: 'Coming soon',
    title: 'Founder, stealth startup',
    country: 'Brazil',
    initials: 'MS',
    gradient: 'from-amber-500 to-orange-500',
  },
]

export function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-500/[0.08] px-4 py-1.5 text-sm text-amber-300 mb-6">
            <Users className="h-3.5 w-3.5" />
            From founders like you
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Built for international founders
          </h2>
          <p className="mt-5 text-lg text-zinc-300">
            We&apos;re onboarding our first cohort of founders. Here&apos;s what early
            users are telling us.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {placeholderTestimonials.map((testimonial) => (
            <div
              key={testimonial.initials}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.05]"
            >
              <Quote className="h-8 w-8 text-white/[0.08] mb-4" />
              <p className="text-zinc-300 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.gradient} text-sm font-bold text-white`}>
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-400">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {testimonial.title} &middot; {testimonial.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-zinc-500">
            Testimonials coming soon from our first cohort of founders.
          </p>
        </div>
      </div>
    </section>
  )
}
