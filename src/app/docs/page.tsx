'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface ProviderBreakdown {
  score: number
  max: number
  details: Record<string, string | number | boolean>
}

interface TrustScoreResponse {
  score: number
  breakdown: {
    github: ProviderBreakdown
    stripe: ProviderBreakdown
    linkedin: ProviderBreakdown
    identity: ProviderBreakdown
    digital_presence: ProviderBreakdown
    network: ProviderBreakdown
  }
  risk_level: string
  recommendation: string
  signals_connected: string[]
  improvements: string[]
  country_adjustment: number
}

// #8: Animated number that counts up from 0
function AnimatedScore({ value, className }: { value: number; className: string }) {
  const [display, setDisplay] = useState(0)
  const animating = useRef(false)

  useEffect(() => {
    if (animating.current) return
    animating.current = true
    setDisplay(0)
    const duration = 600
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress)
      setDisplay(Math.round(eased * value))
      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        animating.current = false
      }
    }

    requestAnimationFrame(tick)
  }, [value])

  return <span className={className}>{display}</span>
}

function getRiskColor(level: string) {
  switch (level) {
    case 'low': return 'text-emerald-400'
    case 'medium': return 'text-yellow-400'
    case 'high': return 'text-orange-400'
    case 'critical': return 'text-red-400'
    default: return 'text-zinc-400'
  }
}

function getRiskBorder(level: string) {
  switch (level) {
    case 'low': return 'border-emerald-700 bg-emerald-950/50 text-emerald-400'
    case 'medium': return 'border-yellow-700 bg-yellow-950/50 text-yellow-400'
    case 'high': return 'border-orange-700 bg-orange-950/50 text-orange-400'
    case 'critical': return 'border-red-700 bg-red-950/50 text-red-400'
    default: return 'border-zinc-700 bg-zinc-950/50 text-zinc-400'
  }
}

function BreakdownBar({ label, score, max }: { label: string; score: number; max: number }) {
  const pct = max > 0 ? Math.round((score / max) * 100) : 0
  const barColor = pct >= 75 ? 'bg-emerald-500' : pct >= 50 ? 'bg-blue-500' : pct >= 25 ? 'bg-yellow-500' : 'bg-zinc-600'

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-zinc-400">{label}</span>
        <span className="font-mono text-zinc-300">{score}/{max}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
        <div className={`h-full rounded-full transition-all duration-700 ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

// Pre-computed famous founder scores for #6
const famousFounders = [
  { name: 'Linus Torvalds', username: 'torvalds', github: '25/25', note: 'Creator of Linux & Git' },
  { name: 'DHH', username: 'dhh', github: '22/25', note: 'Creator of Ruby on Rails' },
  { name: 'Guillermo Rauch', username: 'rauchg', github: '21/25', note: 'CEO of Vercel' },
  { name: 'Evan You', username: 'yyx990803', github: '23/25', note: 'Creator of Vue.js' },
]

export default function DocsPage() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TrustScoreResponse | null>(null)
  const [error, setError] = useState('')
  const [showRaw, setShowRaw] = useState(false)
  const [responseTime, setResponseTime] = useState<number | null>(null)
  const [isGithubOnly, setIsGithubOnly] = useState(false)

  // #1: Pre-load with DHH scored on mount
  const hasAutoLoaded = useRef(false)
  useEffect(() => {
    if (hasAutoLoaded.current) return
    hasAutoLoaded.current = true
    fetchScore('dhh')
  }, [])

  async function fetchScore(user: string) {
    const target = user.trim()
    if (!target) return
    setUsername(target)
    setLoading(true)
    setError('')
    setResult(null)
    setResponseTime(null)
    setIsGithubOnly(true)

    const startTime = performance.now()

    try {
      const res = await fetch('/api/v1/trust-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ github_username: target }),
      })

      // #9: Response time
      setResponseTime(Math.round(performance.now() - startTime))

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || `Error ${res.status}`)
        return
      }

      setResult(await res.json())
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleLookup() {
    fetchScore(username)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold">BedRock</Link>
          <nav className="flex gap-6 text-sm text-zinc-400">
            <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
            <span className="text-white font-medium">Trust Score API</span>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        {/* #10: Stat above the fold */}
        <div className="mb-8 rounded-lg border border-zinc-800 bg-zinc-900/30 px-5 py-3 inline-flex items-center gap-3">
          <span className="text-2xl font-bold text-red-400">87%</span>
          <span className="text-sm text-zinc-400">of legitimate international founders are rejected by traditional bank KYC</span>
        </div>

        {/* Hero — #3: "Score a founder" framing */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Trust Score API</h1>
          <p className="text-lg text-zinc-400 max-w-2xl">
            Digital residue replaces document-based KYC. Enter any founder&apos;s GitHub username to see
            how traditional KYC misses real signal.
          </p>
        </div>

        {/* Live Demo — #1: Pre-loaded, #3: Founder framing */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-2">Score a Founder</h2>
          <p className="text-zinc-500 mb-4 text-sm">
            Public GitHub data only. No auth required. Full score uses 6 signals via OAuth.
          </p>

          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
              placeholder="GitHub username (e.g. torvalds, dhh)"
              className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleLookup}
              disabled={loading || !username.trim()}
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Scoring...
                </span>
              ) : 'Score'}
            </button>
          </div>

          {error ? (
            <div className="rounded-lg border border-red-800 bg-red-950/50 p-4 text-red-400">
              {error}
            </div>
          ) : null}

          {result ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
              {/* Score header — #2: GitHub-only framing */}
              <div className="border-b border-zinc-800 p-6">
                {isGithubOnly ? (
                  <>
                    <div className="flex items-center gap-6">
                      <div className="text-5xl font-bold tabular-nums">
                        <AnimatedScore value={result.breakdown.github.score} className={getRiskColor(result.breakdown.github.score >= 18 ? 'low' : result.breakdown.github.score >= 12 ? 'medium' : 'high')} />
                        <span className="text-zinc-600 text-2xl">/25</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-zinc-300">GitHub Signal Score</div>
                        <p className="mt-1 text-sm text-zinc-500">
                          1 of 6 verification signals
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 rounded-lg border border-blue-800/50 bg-blue-950/20 px-4 py-3 text-sm text-blue-300">
                      Partial score using public GitHub data only. Full assessment with Stripe, LinkedIn,
                      and more available via OAuth connection.
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-6">
                    <div className="text-5xl font-bold tabular-nums">
                      <AnimatedScore value={result.score} className={getRiskColor(result.risk_level)} />
                      <span className="text-zinc-600 text-2xl">/100</span>
                    </div>
                    <div>
                      <div className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium capitalize ${getRiskBorder(result.risk_level)}`}>
                        {result.risk_level} risk
                      </div>
                      <p className="mt-1 text-sm text-zinc-500">
                        Recommendation: <span className="text-zinc-300 capitalize">{result.recommendation}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Breakdown bars */}
              <div className="p-6 space-y-4">
                <BreakdownBar label="GitHub" score={result.breakdown.github.score} max={result.breakdown.github.max} />
                <BreakdownBar label="Stripe / Financial" score={result.breakdown.stripe.score} max={result.breakdown.stripe.max} />
                <BreakdownBar label="LinkedIn" score={result.breakdown.linkedin.score} max={result.breakdown.linkedin.max} />
                <BreakdownBar label="Identity" score={result.breakdown.identity.score} max={result.breakdown.identity.max} />
                <BreakdownBar label="Digital Presence" score={result.breakdown.digital_presence.score} max={result.breakdown.digital_presence.max} />
                <BreakdownBar label="Trust Network" score={result.breakdown.network.score} max={result.breakdown.network.max} />
              </div>

              {/* GitHub details if available */}
              {result.breakdown.github.details && result.breakdown.github.score > 0 ? (
                <div className="border-t border-zinc-800 p-6">
                  <h4 className="text-sm font-medium text-zinc-400 mb-3">GitHub Details</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {result.breakdown.github.details.account_age_years !== undefined ? (
                      <div>
                        <div className="text-lg font-bold text-zinc-200">{String(result.breakdown.github.details.account_age_years)}yr</div>
                        <div className="text-xs text-zinc-500">Account age</div>
                      </div>
                    ) : null}
                    {result.breakdown.github.details.repos !== undefined ? (
                      <div>
                        <div className="text-lg font-bold text-zinc-200">{String(result.breakdown.github.details.repos)}</div>
                        <div className="text-xs text-zinc-500">Public repos</div>
                      </div>
                    ) : null}
                    {result.breakdown.github.details.stars !== undefined ? (
                      <div>
                        <div className="text-lg font-bold text-zinc-200">{String(result.breakdown.github.details.stars)}</div>
                        <div className="text-xs text-zinc-500">Stars</div>
                      </div>
                    ) : null}
                    {result.breakdown.github.details.followers !== undefined ? (
                      <div>
                        <div className="text-lg font-bold text-zinc-200">{String(result.breakdown.github.details.followers)}</div>
                        <div className="text-xs text-zinc-500">Followers</div>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {/* Improvements */}
              {result.improvements.length > 0 ? (
                <div className="border-t border-zinc-800 p-6">
                  <h4 className="text-sm font-medium text-zinc-400 mb-2">Unlock full score</h4>
                  <ul className="space-y-1">
                    {result.improvements.map((tip, i) => (
                      <li key={i} className="text-sm text-zinc-500 flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">+</span> {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* #9: Response time + Raw JSON */}
              <div className="border-t border-zinc-800 p-6 flex items-center justify-between">
                <button
                  onClick={() => setShowRaw(!showRaw)}
                  className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showRaw ? 'Hide' : 'Show'} raw JSON response
                </button>
                {responseTime ? (
                  <span className="text-xs text-zinc-600 font-mono">
                    Scored in {responseTime}ms
                  </span>
                ) : null}
              </div>
              {showRaw ? (
                <div className="border-t border-zinc-800 p-6">
                  <pre className="overflow-x-auto rounded-lg bg-zinc-950 border border-zinc-800 p-4 text-xs text-zinc-400 font-mono">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              ) : null}
            </div>
          ) : null}
        </section>

        {/* #5: Side-by-side — Traditional KYC vs BedRock */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Traditional KYC vs BedRock</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional KYC */}
            <div className="rounded-xl border border-red-900/50 bg-red-950/10 p-6">
              <h3 className="text-sm font-semibold text-red-400 mb-4 uppercase tracking-wider">Traditional KYC</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-red-500">&#10005;</span>
                  <span className="text-zinc-400">Passport: Turkmenistan — <span className="text-red-400">Auto-denied</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-red-500">&#10005;</span>
                  <span className="text-zinc-400">No US credit history — <span className="text-red-400">No FICO score</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-red-500">&#10005;</span>
                  <span className="text-zinc-400">No US address proof — <span className="text-red-400">Cannot verify</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-red-500">&#10005;</span>
                  <span className="text-zinc-400">Self-employed — <span className="text-red-400">No employer letter</span></span>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-red-900/30">
                <span className="text-lg font-bold text-red-400">Result: Denied</span>
                <p className="text-xs text-zinc-600 mt-1">Average processing: 2-3 weeks</p>
              </div>
            </div>

            {/* BedRock */}
            <div className="rounded-xl border border-emerald-900/50 bg-emerald-950/10 p-6">
              <h3 className="text-sm font-semibold text-emerald-400 mb-4 uppercase tracking-wider">BedRock Trust Score</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-emerald-500">&#10003;</span>
                  <span className="text-zinc-400">GitHub: 8 years active — <span className="text-emerald-400">23/25</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-500">&#10003;</span>
                  <span className="text-zinc-400">Stripe: $12k/mo revenue — <span className="text-emerald-400">22/25</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-500">&#10003;</span>
                  <span className="text-zinc-400">LinkedIn: 5yr profile — <span className="text-emerald-400">9/10</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-500">&#10003;</span>
                  <span className="text-zinc-400">Passport + face scan — <span className="text-emerald-400">16/20</span></span>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-emerald-900/30">
                <span className="text-lg font-bold text-emerald-400">Score: 83/100 — Approve</span>
                <p className="text-xs text-zinc-600 mt-1">Score calculated in &lt;1 second</p>
              </div>
            </div>
          </div>
        </section>

        {/* #7: What banks see today vs what BedRock sees */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">What Banks See vs What BedRock Sees</h2>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-left">
                  <th className="p-4 text-zinc-400 font-medium">Founder Profile</th>
                  <th className="p-4 text-zinc-400 font-medium">Traditional KYC</th>
                  <th className="p-4 text-zinc-400 font-medium">BedRock Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr>
                  <td className="p-4 text-zinc-300">Developer from Turkmenistan, 8yr GitHub, passport verified</td>
                  <td className="p-4"><span className="text-red-400 font-medium">Auto-denied</span></td>
                  <td className="p-4"><span className="text-emerald-400 font-medium">85/100 — Approve</span></td>
                </tr>
                <tr>
                  <td className="p-4 text-zinc-300">Belarus founder, expiring passport, $15k MRR</td>
                  <td className="p-4"><span className="text-red-400 font-medium">Cannot verify</span></td>
                  <td className="p-4"><span className="text-yellow-400 font-medium">68/100 — Approve</span></td>
                </tr>
                <tr>
                  <td className="p-4 text-zinc-300">Nigerian YC founder, 200+ GitHub stars, verified ID</td>
                  <td className="p-4"><span className="text-red-400 font-medium">High-risk country</span></td>
                  <td className="p-4"><span className="text-emerald-400 font-medium">86/100 — Approve</span></td>
                </tr>
                <tr>
                  <td className="p-4 text-zinc-300">Fresh US graduate, no credit history, no repos</td>
                  <td className="p-4"><span className="text-red-400 font-medium">Insufficient history</span></td>
                  <td className="p-4"><span className="text-orange-400 font-medium">32/100 — Enhanced Review</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* #6: Famous founders comparison */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-2">GitHub Scores of Known Founders</h2>
          <p className="text-zinc-500 text-sm mb-6">Click any name to score them live.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {famousFounders.map((f) => (
              <button
                key={f.username}
                onClick={() => fetchScore(f.username)}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-left hover:border-zinc-600 transition-colors"
              >
                <div className="text-lg font-bold text-emerald-400">{f.github}</div>
                <div className="text-sm font-medium text-zinc-300 mt-1">{f.name}</div>
                <div className="text-xs text-zinc-600 mt-0.5">{f.note}</div>
              </button>
            ))}
          </div>
        </section>

        {/* API Reference — #4: Real domain */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">API Reference</h2>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <div className="border-b border-zinc-800 p-4 flex items-center gap-3">
              <span className="rounded bg-blue-600 px-2 py-0.5 text-xs font-bold">POST</span>
              <code className="text-sm text-zinc-300">/api/v1/trust-score</code>
            </div>

            <div className="p-6 space-y-8">
              {/* Mode 1 */}
              <div>
                <h4 className="text-sm font-semibold text-zinc-300 mb-2">Mode 1: GitHub Username (Public Lookup)</h4>
                <p className="text-sm text-zinc-500 mb-3">
                  Score any GitHub user using public data. No auth required. Returns GitHub breakdown only.
                </p>
                <pre className="rounded-lg bg-zinc-950 border border-zinc-800 p-4 text-sm text-zinc-400 font-mono overflow-x-auto">
{`curl -X POST https://bedrockhq.co/api/v1/trust-score \\
  -H "Content-Type: application/json" \\
  -d '{"github_username": "torvalds"}'`}
                </pre>
              </div>

              {/* Mode 2 */}
              <div>
                <h4 className="text-sm font-semibold text-zinc-300 mb-2">Mode 2: Full Score with Tokens</h4>
                <p className="text-sm text-zinc-500 mb-3">
                  Pass OAuth tokens for a complete multi-provider score.
                </p>
                <pre className="rounded-lg bg-zinc-950 border border-zinc-800 p-4 text-sm text-zinc-400 font-mono overflow-x-auto">
{`curl -X POST https://bedrockhq.co/api/v1/trust-score \\
  -H "Content-Type: application/json" \\
  -d '{
    "github_token": "gho_...",
    "stripe_account_id": "acct_...",
    "linkedin_token": "..."
  }'`}
                </pre>
              </div>

              {/* Response */}
              <div>
                <h4 className="text-sm font-semibold text-zinc-300 mb-2">Response</h4>
                <pre className="rounded-lg bg-zinc-950 border border-zinc-800 p-4 text-sm text-zinc-400 font-mono overflow-x-auto">
{`{
  "score": 85,
  "breakdown": {
    "github":   { "score": 23, "max": 25, "details": { ... } },
    "stripe":   { "score": 22, "max": 25, "details": { ... } },
    "linkedin": { "score": 9, "max": 10, "details": { ... } },
    "identity": { "score": 14, "max": 20, "details": { ... } },
    "digital_presence": { "score": 7, "max": 10, "details": { ... } },
    "network":  { "score": 6, "max": 10, "details": { ... } }
  },
  "status": "elite",
  "risk_level": "low",
  "recommendation": "approve",
  "signals_connected": ["github", "stripe", "linkedin", "identity"],
  "improvements": ["Complete identity verification for up to +6 more points"]
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Score Guide */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Score Interpretation</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { range: '85-100', level: 'Elite / Low Risk', rec: 'Approve', color: 'border-emerald-700 bg-emerald-950/30', text: 'text-emerald-400' },
              { range: '65-84', level: 'Approved / Low Risk', rec: 'Approve', color: 'border-blue-700 bg-blue-950/30', text: 'text-blue-400' },
              { range: '45-64', level: 'Medium Risk', rec: 'Review', color: 'border-yellow-700 bg-yellow-950/30', text: 'text-yellow-400' },
              { range: '25-44', level: 'High Risk', rec: 'Enhanced Review', color: 'border-orange-700 bg-orange-950/30', text: 'text-orange-400' },
              { range: '0-24', level: 'Critical Risk', rec: 'Deny', color: 'border-red-700 bg-red-950/30', text: 'text-red-400' },
            ].map((tier) => (
              <div key={tier.range} className={`rounded-lg border p-4 ${tier.color}`}>
                <div className={`text-lg font-bold ${tier.text}`}>{tier.range}</div>
                <div className="text-sm text-zinc-300 mt-1">{tier.level}</div>
                <div className="text-xs text-zinc-500 mt-0.5">Recommendation: {tier.rec}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Scoring weights */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Scoring Weights</h2>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-left">
                  <th className="p-4 text-zinc-400 font-medium">Signal</th>
                  <th className="p-4 text-zinc-400 font-medium">Max Points</th>
                  <th className="p-4 text-zinc-400 font-medium">What we look at</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr>
                  <td className="p-4 text-zinc-300">GitHub</td>
                  <td className="p-4 font-mono text-zinc-300">25</td>
                  <td className="p-4 text-zinc-500">Account age, repos, stars, followers, language diversity</td>
                </tr>
                <tr>
                  <td className="p-4 text-zinc-300">Stripe / Financial</td>
                  <td className="p-4 font-mono text-zinc-300">25</td>
                  <td className="p-4 text-zinc-500">Revenue, account age, chargeback rate, transaction volume</td>
                </tr>
                <tr>
                  <td className="p-4 text-zinc-300">LinkedIn</td>
                  <td className="p-4 font-mono text-zinc-300">10</td>
                  <td className="p-4 text-zinc-500">OAuth connection, profile picture, verified email</td>
                </tr>
                <tr>
                  <td className="p-4 text-zinc-300">Identity</td>
                  <td className="p-4 font-mono text-zinc-300">20</td>
                  <td className="p-4 text-zinc-500">Passport, local ID, face verification, address proof</td>
                </tr>
                <tr>
                  <td className="p-4 text-zinc-300">Digital Presence</td>
                  <td className="p-4 font-mono text-zinc-300">10</td>
                  <td className="p-4 text-zinc-500">Website, Twitter/X, Instagram, App Store</td>
                </tr>
                <tr>
                  <td className="p-4 text-zinc-300">Trust Network</td>
                  <td className="p-4 font-mono text-zinc-300">10</td>
                  <td className="p-4 text-zinc-500">Referrals, university email, accelerator, employer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Note */}
        <section className="mb-16">
          <div className="rounded-lg border border-zinc-700 bg-zinc-900/50 p-6">
            <h3 className="text-sm font-semibold text-zinc-300 mb-2">Production API</h3>
            <p className="text-sm text-zinc-500">
              This is the MVP endpoint. The production API uses redirect-based OAuth flows for secure
              token exchange. Contact us for API keys and integration support.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
