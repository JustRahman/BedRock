import Stripe from 'stripe'
import { getAppUrl } from './utils'

export interface StripeProfileData {
  monthlyRevenue: number
  monthlyRevenueFormatted: string
  revenueRange: string
  accountAgeMonths: number
  accountCreated: string
  chargebackRate: number
  chargebackRateCategory: string
  totalCharges: number
  totalDisputes: number
}

function getStripeClient(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  return new Stripe(key)
}

export function getStripeConnectUrl(state: string): string {
  const clientId = process.env.STRIPE_CONNECT_CLIENT_ID
  if (!clientId) throw new Error('STRIPE_CONNECT_CLIENT_ID is not set')

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: 'read_only',
    state,
    redirect_uri: `${getAppUrl()}/api/oauth/stripe/callback`,
  })

  return `https://connect.stripe.com/oauth/authorize?${params.toString()}`
}

export async function exchangeStripeCode(code: string): Promise<string> {
  const stripe = getStripeClient()

  const response = await stripe.oauth.token({
    grant_type: 'authorization_code',
    code,
  })

  if (!response.stripe_user_id) {
    throw new Error('Stripe OAuth: no stripe_user_id returned')
  }

  return response.stripe_user_id
}

function categorizeRevenue(monthly: number): string {
  if (monthly === 0) return '0'
  if (monthly <= 1000) return '1-1000'
  if (monthly <= 5000) return '1000-5000'
  if (monthly <= 10000) return '5000-10000'
  if (monthly <= 50000) return '10000-50000'
  return '50000+'
}

function categorizeChargebackRate(rate: number): string {
  if (rate === 0) return 'none'
  if (rate < 1) return 'low'
  if (rate <= 3) return 'medium'
  return 'high'
}

export async function fetchStripeData(stripeUserId: string): Promise<StripeProfileData> {
  const stripe = getStripeClient()

  const [account, charges, disputes] = await Promise.all([
    stripe.accounts.retrieve(stripeUserId),
    stripe.charges.list({ limit: 100 }, { stripeAccount: stripeUserId }),
    stripe.disputes.list({ limit: 100 }, { stripeAccount: stripeUserId }),
  ])

  // Calculate monthly revenue from charges in the last 30 days
  const thirtyDaysAgo = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60
  const recentCharges = charges.data.filter(
    (c) => c.created >= thirtyDaysAgo && c.status === 'succeeded'
  )
  const monthlyRevenue = recentCharges.reduce((sum, c) => sum + c.amount, 0) / 100

  // Account age
  const accountCreatedTs = account.created ?? Math.floor(Date.now() / 1000)
  const accountCreated = new Date(accountCreatedTs * 1000).toISOString()
  const accountAgeMonths = Math.floor(
    (Date.now() - accountCreatedTs * 1000) / (30.44 * 24 * 60 * 60 * 1000)
  )

  // Chargeback rate
  const totalCharges = charges.data.length
  const totalDisputes = disputes.data.length
  const chargebackRate = totalCharges > 0 ? (totalDisputes / totalCharges) * 100 : 0

  return {
    monthlyRevenue,
    monthlyRevenueFormatted: `$${monthlyRevenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
    revenueRange: categorizeRevenue(monthlyRevenue),
    accountAgeMonths,
    accountCreated,
    chargebackRate: Math.round(chargebackRate * 100) / 100,
    chargebackRateCategory: categorizeChargebackRate(chargebackRate),
    totalCharges,
    totalDisputes,
  }
}
