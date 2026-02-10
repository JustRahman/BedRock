# BedRock

Trust scoring and banking platform for international founders. BedRock helps non-US entrepreneurs establish financial credibility, form US LLCs, and open bank accounts through a data-driven trust score.

## Features

- **Onboarding & Trust Score** — 7-step eligibility flow collecting identity, code history, professional network, financial signals, digital presence, and trust signals to compute a composite trust score
- **Document Verification** — Upload passport, government ID, or proof of address and get instant AI-powered data extraction (name, DOB, passport number, address) via Claude Vision during onboarding
- **OAuth Integrations** — Connect GitHub, LinkedIn, and Stripe accounts to verify digital lineage
- **Digital Presence Verification** — Verify website ownership, Twitter, Instagram, and App Store presence
- **LLC Formation** — Multi-step guided workflow to form a US LLC, with auto-generated compliance deadlines
- **EIN Acquisition** — SS-4 information collection and manual EIN entry
- **Bank Application Prep** — Bank selection, package review, and application status tracking
- **Payments** — Stripe Checkout for service packages with webhook-driven status updates
- **Email Notifications** — Welcome, payment confirmation, trust score, and compliance reminder emails via Resend
- **Admin Dashboard** — Manage founders, applications, documents, and compliance with real Supabase data
- **Dashboard** — Formation status, bank status, billing history, compliance deadlines, and dynamic action items

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (Postgres + Auth + Storage)
- **Payments**: Stripe
- **Email**: Resend
- **AI**: Claude Vision (document extraction & verification)
- **Styling**: Tailwind CSS v4

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your keys:

- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `STRIPE_SECRET_KEY` / `STRIPE_CONNECT_CLIENT_ID`
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`
- `ANTHROPIC_API_KEY`
- `OAUTH_STATE_SECRET`
