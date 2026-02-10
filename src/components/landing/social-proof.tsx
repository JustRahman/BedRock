'use client'

const countries = [
  { flag: '🇳🇬', name: 'Nigeria' },
  { flag: '🇮🇳', name: 'India' },
  { flag: '🇵🇰', name: 'Pakistan' },
  { flag: '🇧🇩', name: 'Bangladesh' },
  { flag: '🇰🇪', name: 'Kenya' },
  { flag: '🇬🇭', name: 'Ghana' },
  { flag: '🇺🇿', name: 'Uzbekistan' },
  { flag: '🇪🇬', name: 'Egypt' },
  { flag: '🇧🇷', name: 'Brazil' },
  { flag: '🇵🇭', name: 'Philippines' },
  { flag: '🇻🇳', name: 'Vietnam' },
  { flag: '🇺🇦', name: 'Ukraine' },
  { flag: '🇹🇷', name: 'Turkey' },
  { flag: '🇷🇴', name: 'Romania' },
  { flag: '🇦🇷', name: 'Argentina' },
  { flag: '🇨🇴', name: 'Colombia' },
  { flag: '🇲🇦', name: 'Morocco' },
  { flag: '🇹🇳', name: 'Tunisia' },
  { flag: '🇱🇰', name: 'Sri Lanka' },
  { flag: '🇪🇹', name: 'Ethiopia' },
]

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className={`flex shrink-0 gap-3 py-2 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {[...countries, ...countries].map((country, i) => (
          <div
            key={`${country.name}-${i}`}
            className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 backdrop-blur-sm"
          >
            <span className="text-lg">{country.flag}</span>
            <span className="text-sm text-zinc-400 whitespace-nowrap">{country.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SocialProof() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-sm font-medium uppercase tracking-widest text-zinc-500 mb-8">
          Founders verified from 100+ countries
        </p>
      </div>
      <div className="space-y-3">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>
    </section>
  )
}
