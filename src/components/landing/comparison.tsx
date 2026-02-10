import { Check, X, Minus } from 'lucide-react'
import { ScrollReveal } from './scroll-reveal'

type CellValue = 'yes' | 'no' | 'partial' | string

const features: { label: string; bedrock: CellValue; doola: CellValue; atlas: CellValue; mercury: CellValue; diy: CellValue }[] = [
  { label: 'Restricted country founders', bedrock: 'yes', doola: 'partial', atlas: 'no', mercury: 'no', diy: 'partial' },
  { label: 'Digital Lineage verification', bedrock: 'yes', doola: 'no', atlas: 'no', mercury: 'no', diy: 'no' },
  { label: 'Deepfake-proof identity', bedrock: 'yes', doola: 'no', atlas: 'no', mercury: 'no', diy: 'no' },
  { label: 'LLC formation', bedrock: 'yes', doola: 'yes', atlas: 'yes', mercury: 'no', diy: 'partial' },
  { label: 'EIN acquisition', bedrock: 'yes', doola: 'yes', atlas: 'yes', mercury: 'no', diy: 'partial' },
  { label: 'Bank account opening', bedrock: 'yes', doola: 'partial', atlas: 'partial', mercury: 'partial', diy: 'partial' },
  { label: 'Multiple bank options', bedrock: 'yes', doola: 'no', atlas: 'no', mercury: 'no', diy: 'yes' },
  { label: 'Anti-Freeze Shield', bedrock: 'yes', doola: 'no', atlas: 'no', mercury: 'no', diy: 'no' },
  { label: 'Compliance automation', bedrock: 'yes', doola: 'partial', atlas: 'partial', mercury: 'no', diy: 'no' },
  { label: 'Approval guarantee', bedrock: 'yes', doola: 'no', atlas: 'no', mercury: 'no', diy: 'no' },
]

function CellIcon({ value }: { value: CellValue }) {
  if (value === 'yes') return <Check className="h-4 w-4 text-emerald-400" />
  if (value === 'no') return <X className="h-4 w-4 text-zinc-600" />
  if (value === 'partial') return <Minus className="h-4 w-4 text-amber-400" />
  return <span className="text-sm text-zinc-400">{value}</span>
}

export function Comparison() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/[0.08] px-4 py-1.5 text-sm text-violet-300 mb-6">
              Compare
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Why founders choose{' '}
              <span className="gradient-text">BedRock</span>
            </h2>
            <p className="mt-5 text-lg text-zinc-300">
              The only platform built specifically for restricted-country founders.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px]">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500 w-[220px]">Feature</th>
                  <th className="py-4 px-4 text-center">
                    <div className="rounded-xl bg-gradient-to-b from-blue-500/10 to-violet-500/10 border border-blue-500/20 px-4 py-3">
                      <span className="text-sm font-semibold text-white">BedRock</span>
                    </div>
                  </th>
                  <th className="py-4 px-4 text-center">
                    <span className="text-sm font-medium text-zinc-400">Doola</span>
                  </th>
                  <th className="py-4 px-4 text-center">
                    <span className="text-sm font-medium text-zinc-400">Stripe Atlas</span>
                  </th>
                  <th className="py-4 px-4 text-center">
                    <span className="text-sm font-medium text-zinc-400">Mercury</span>
                  </th>
                  <th className="py-4 px-4 text-center">
                    <span className="text-sm font-medium text-zinc-400">DIY</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, i) => (
                  <tr
                    key={feature.label}
                    className={`border-t border-white/[0.06] ${
                      i % 2 === 0 ? 'bg-white/[0.02]' : ''
                    }`}
                  >
                    <td className="py-4 px-4 text-sm text-zinc-300">{feature.label}</td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        <CellIcon value={feature.bedrock} />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        <CellIcon value={feature.doola} />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        <CellIcon value={feature.atlas} />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        <CellIcon value={feature.mercury} />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        <CellIcon value={feature.diy} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
