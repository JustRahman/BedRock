import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient, createServiceClient } from '@/lib/supabase/server'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-01-28.clover',
  })
}

const TIER_PRICES: Record<string, { amount: number; name: string }> = {
  basic: { amount: 50000, name: 'BedRock Basic' },
  standard: { amount: 80000, name: 'BedRock Standard' },
  premium: { amount: 150000, name: 'BedRock Premium' },
}

export async function POST(request: Request) {
  try {
    const authClient = await createClient()
    const supabase = createServiceClient()
    const { data: { user }, error: userError } = await authClient.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: founder } = await supabase
      .from('founders')
      .select('id, email, full_name')
      .eq('user_id', user.id)
      .single()

    if (!founder) {
      return NextResponse.json({ error: 'Founder not found' }, { status: 404 })
    }

    const body = await request.json()
    const { tier } = body

    if (!tier || !TIER_PRICES[tier]) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    const tierInfo = TIER_PRICES[tier]
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const stripe = getStripe()

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: (founder as { email: string }).email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: tierInfo.name,
              description: `One-time setup fee for ${tierInfo.name} plan`,
            },
            unit_amount: tierInfo.amount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        founder_id: (founder as { id: string }).id,
        tier,
      },
      success_url: `${appUrl}/onboarding/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/onboarding/payment`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
