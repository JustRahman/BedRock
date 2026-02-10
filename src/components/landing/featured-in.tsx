import { ScrollReveal } from './scroll-reveal'

const logos = [
  { name: 'TechCrunch', width: 'w-28' },
  { name: 'Forbes', width: 'w-20' },
  { name: 'Y Combinator', width: 'w-28' },
  { name: 'Product Hunt', width: 'w-28' },
  { name: 'Hacker News', width: 'w-28' },
]

export function FeaturedIn() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-zinc-600 mb-10">
              As seen in
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {logos.map((logo) => (
                <div
                  key={logo.name}
                  className={`${logo.width} h-8 flex items-center justify-center text-zinc-600 font-semibold text-lg tracking-tight opacity-40 hover:opacity-70 transition-opacity duration-300`}
                >
                  {logo.name}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
