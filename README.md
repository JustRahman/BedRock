# BedRock

Trust scoring and banking platform for international founders.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (Postgres + Auth + Storage)
- **Payments**: Stripe
- **Email**: Resend
- **AI**: Claude Vision (document verification)
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
