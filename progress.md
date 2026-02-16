# BedRock Progress Log

## Trust Score API — Data-Driven Overhaul

### New Scoring Engine (`src/lib/trust-score-v2.ts`)
Replaced the old binary scoring (connected = points, not connected = 0) with a granular engine that scores real OAuth data. The thesis: digital residue replaces document-based KYC.

**Scoring weights (100 pts total):**
- **GitHub (30 pts)** — account age, repos, stars, followers, language diversity, activity
- **Stripe/Financial (35 pts)** — account age, monthly revenue, chargebacks, transaction volume
- **LinkedIn (15 pts)** — OAuth connection, profile picture, email verification
- **Digital Presence (10 pts)** — website, Twitter, Instagram, App Store
- **Trust Network (10 pts)** — referrals, university email, accelerator, employer

### Public API Endpoint (`/api/v1/trust-score`)
Two modes:
1. **GitHub username only** — paste any username, get instant score from public GitHub data (killer demo feature)
2. **Full OAuth tokens** — GitHub + Stripe + LinkedIn tokens for complete breakdown

Includes in-memory rate limiting (10 req/min per IP).

### Interactive Docs & Demo Page (`/docs`)
Not static docs — a live demo page where you can paste any GitHub username and see an instant Trust Score. Features:
- Auto-loads with DHH's score on page visit
- GitHub-only scores framed correctly (X/30, not X/100)
- Side-by-side KYC vs BedRock comparison
- "What banks see" vs "What BedRock sees" table
- Famous founders section (Torvalds, DHH, Rauch, Evan You) — clickable
- Animated score count-up with response time indicator
- 87% rejection stat from real data

### Dashboard Trust Score Card Update
Updated the dashboard card to always show 5-provider breakdown bars (GitHub, Stripe, LinkedIn, Digital Presence, Trust Network) derived from existing DB columns. Works for both old and new scores.

### Internal Calculate Endpoint Update (`/api/trust-score/calculate`)
- PUT now reads OAuth data from `founder_verifications` metadata and feeds into v2 engine
- Fixed column mapping bugs (financial_score, social_score were swapped)
- Stores full v2 breakdown in `score_breakdown` JSON column

---

## Alternative ID Verification Page Rewrite (`/dashboard/alternative-id`)

Complete rewrite from a generic 26-line wrapper to a ~760-line standalone page. The old version overpromised ("Get Alternative Government-Issued ID"). The new version is honest and service-focused.

### What changed:
- **Empathetic copy** — no jargon, no overpromising, acknowledges that the system is unfair
- **3-step intake form** with progress indicator:
  - Step 1: Personal info (name, citizenship, residence, passport status, available documents)
  - Step 2: Business info (LLC status, EIN status, bank rejections, existing accounts)
  - Step 3: Goals & contact (account purpose, situation description, email, Telegram/WhatsApp)
- **Scenario cards** — 3 real situations with country flags (Belarus developer, Nigerian founder, Turkmenistan freelancer)
- **"What We Actually Do" section** — 7 specific services listed honestly
- **"Situations We Help With" checklist** — 8 common scenarios
- **Trust Score** mentioned only as future vision in small muted text, not as a selling point
- Form data serialized to existing service-request API (no DB changes needed)

---

## Files Created
| File | Description |
|------|-------------|
| `src/lib/trust-score-v2.ts` | New granular scoring engine |
| `src/app/api/v1/trust-score/route.ts` | Public API endpoint |
| `src/app/docs/page.tsx` | Interactive docs + live demo |

## Files Modified
| File | Description |
|------|-------------|
| `src/app/api/trust-score/calculate/route.ts` | Uses v2 engine with OAuth data |
| `src/components/dashboard/trust-score-card.tsx` | 5-provider breakdown bars |
| `src/app/dashboard/page.tsx` | Minor interface cleanup |
| `src/app/dashboard/alternative-id/page.tsx` | Complete rewrite |

## Build Status
All changes compile cleanly with `npm run build`. Nothing pushed to remote yet.
