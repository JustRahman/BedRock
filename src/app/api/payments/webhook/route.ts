import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServiceClient } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/email'
import { paymentConfirmationEmail } from '@/lib/email-templates'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-01-28.clover',
  })
}

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  const stripe = getStripe()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const founderId = session.metadata?.founder_id
    const tier = session.metadata?.tier

    if (!founderId || !tier) {
      console.error('Missing metadata in checkout session')
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
    }

    const supabase = createServiceClient()

    // Create payment record
    await (supabase.from('payments') as ReturnType<typeof supabase.from>).insert({
      founder_id: founderId,
      amount: session.amount_total! / 100,
      currency: session.currency || 'usd',
      status: 'completed',
      stripe_payment_id: session.payment_intent as string,
      description: `${tier.charAt(0).toUpperCase() + tier.slice(1)} plan setup fee`,
    })

    // Update founder tier and status
    await (supabase.from('founders') as ReturnType<typeof supabase.from>)
      .update({ tier, status: 'active' })
      .eq('id', founderId)

    // Send payment confirmation email
    const { data: founder } = await supabase
      .from('founders')
      .select('email, full_name')
      .eq('id', founderId)
      .single()

    if (founder) {
      const f = founder as { email: string; full_name: string }
      const amount = session.amount_total! / 100
      try {
        await sendEmail(
          f.email,
          'Payment Confirmed - BedRock',
          paymentConfirmationEmail(f.full_name, tier, amount)
        )
      } catch (emailErr) {
        console.error('Failed to send payment confirmation email:', emailErr)
      }
    }
  }

  return NextResponse.json({ received: true })
}
