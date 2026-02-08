import { Quote, Users } from 'lucide-react'

const placeholderTestimonials = [
  {
    quote:
      "I was rejected by 3 US banks before finding Bedrock. They verified my Digital Lineage and I was approved in 3 days.",
    name: 'Coming soon',
    title: 'Founder, stealth startup',
    country: 'Nigeria',
    initials: 'AO',
  },
  {
    quote:
      "The trust score gave me a clear roadmap. I knew exactly what documents to prepare and what to improve before applying.",
    name: 'Coming soon',
    title: 'Founder, stealth startup',
    country: 'India',
    initials: 'RK',
  },
  {
    quote:
      "As a non-resident founder, opening a US bank account felt impossible. Bedrock made it straightforward.",
    name: 'Coming soon',
    title: 'Founder, stealth startup',
    country: 'Brazil',
    initials: 'MS',
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
              <Users className="h-4 w-4" />
              From founders like you
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Built for international founders
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We&apos;re onboarding our first cohort of founders. Here&apos;s what early
            users are telling us.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {placeholderTestimonials.map((testimonial) => (
            <div
              key={testimonial.initials}
              className="relative rounded-2xl border border-gray-100 bg-gray-50 p-8"
            >
              <Quote className="h-8 w-8 text-blue-200 mb-4" />
              <p className="text-gray-700 leading-relaxed italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {testimonial.title} &middot; {testimonial.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-400">
            Testimonials coming soon from our first cohort of founders.
          </p>
        </div>
      </div>
    </section>
  )
}
