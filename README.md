# BedRock

BedRock is a trust scoring and banking infrastructure platform for international founders. It enables non-US entrepreneurs to establish financial credibility, incorporate US LLCs, and access US banking — all driven by a composite trust score built from verified identity, digital lineage, and financial signals.

## Overview

International founders face a cold-start problem when entering the US financial system: no credit history, no SSN, no existing banking relationship. BedRock solves this by aggregating verifiable trust signals — government-issued documents, code contribution history, professional networks, revenue data, and digital presence — into a single score that banks can underwrite against.

### How It Works

1. **Trust Score Assessment** — A 7-step onboarding flow collects and verifies identity documents (with AI-powered data extraction), GitHub/LinkedIn/Stripe OAuth connections, revenue signals, and digital presence to compute a composite trust score.
2. **LLC Formation** — Guided workflow for US LLC incorporation with automated compliance deadline tracking (annual reports, franchise tax, registered agent renewals).
3. **EIN Acquisition** — SS-4 form preparation and EIN registration support.
4. **Bank Account Opening** — Curated bank matching based on trust score tier, with application prep and status tracking.

## Architecture

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Database | Supabase (Postgres + Auth + Storage) |
| Payments | Stripe (Checkout + Webhooks) |
| Email | Resend |
| AI | Anthropic Claude Vision (document extraction & verification) |
| Styling | Tailwind CSS v4 |

## Setup

### Prerequisites

- Node.js 18+
- Supabase project
- Stripe account
- Resend account
- Anthropic API key
- GitHub & LinkedIn OAuth apps

### Installation

```bash
npm install
npm run dev
```

### Environment Variables

Copy `.env.local.example` to `.env.local` and configure:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |
| `RESEND_API_KEY` | Resend API key for transactional email |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_CONNECT_CLIENT_ID` | Stripe Connect OAuth client ID |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth app credentials |
| `ANTHROPIC_API_KEY` | Anthropic API key for Claude Vision |
| `OAUTH_STATE_SECRET` | Secret for signing OAuth state parameters |

## License

Proprietary. All rights reserved.
