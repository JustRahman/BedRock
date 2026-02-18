import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { verifyWalletSignature } from '@/lib/crypto/verify-signature'
import { fetchOnChainData } from '@/lib/crypto/on-chain-data'
import { scoreWallet } from '@/lib/crypto/score-wallet'
import { validateChallenge } from '@/lib/crypto/challenge-cache'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import type { ChainId, CryptoWalletProfileData } from '@/lib/crypto/types'

export async function POST(request: Request) {
  const ip = getClientIp(request)
  const { allowed, resetIn } = checkRateLimit(`crypto-verify:${ip}`, 5, 60_000)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(resetIn / 1000)) } }
    )
  }

  try {
    const authClient = await createClient()
    const supabase = createServiceClient()

    const { data: { user }, error: userError } = await authClient.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: founderData } = await supabase
      .from('founders')
      .select('id')
      .eq('user_id', user.id)
      .single()

    const founder = founderData as { id: string } | null
    if (!founder) {
      return NextResponse.json({ error: 'Founder not found' }, { status: 404 })
    }

    const body = await request.json()
    const { chain, address, signature, message } = body as {
      chain: ChainId; address: string; signature: string; message: string
    }

    if (!chain || !address || !signature || !message) {
      return NextResponse.json({ error: 'chain, address, signature, and message are required' }, { status: 400 })
    }

    // Validate the challenge message HMAC and expiry (stateless — no server lookup needed)
    const challengeCheck = validateChallenge(message)
    if (!challengeCheck.valid) {
      return NextResponse.json({ error: 'Challenge expired or invalid. Request a new one.' }, { status: 400 })
    }

    // Verify wallet signature against the challenge message
    const verification = verifyWalletSignature({
      chain,
      address,
      signature,
      message,
    })

    if (!verification.valid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Fetch on-chain data
    const onChainData = await fetchOnChainData(chain, address)

    console.log('\n=== WALLET VERIFICATION ===')
    console.log(`Chain: ${chain}`)
    console.log(`Address: ${address}`)
    console.log('--- On-Chain Data ---')
    console.log(`  First tx: ${onChainData.firstTxTimestamp ? new Date(onChainData.firstTxTimestamp).toISOString() : 'none'}`)
    console.log(`  Last tx:  ${onChainData.lastTxTimestamp ? new Date(onChainData.lastTxTimestamp).toISOString() : 'none'}`)
    console.log(`  Tx count: ${onChainData.txCount}`)
    console.log(`  Stablecoin balance: $${onChainData.stablecoinBalanceUsd}`)
    if (onChainData.firstTxTimestamp) {
      const ageYears = (Date.now() - onChainData.firstTxTimestamp) / (365.25 * 24 * 60 * 60 * 1000)
      console.log(`  Wallet age: ${ageYears.toFixed(2)} years`)
    }
    if (onChainData.firstTxTimestamp && onChainData.lastTxTimestamp) {
      const spreadMonths = (onChainData.lastTxTimestamp - onChainData.firstTxTimestamp) / (30 * 24 * 60 * 60 * 1000)
      console.log(`  Activity spread: ${spreadMonths.toFixed(1)} months`)
    }

    // Score the wallet
    const walletScore = scoreWallet(onChainData)

    console.log('--- Score Breakdown ---')
    console.log(`  Wallet age:       ${walletScore.walletAge}/4`)
    console.log(`  Tx count:         ${walletScore.txCount}/4`)
    console.log(`  Holdings:         ${walletScore.holdings}/4`)
    console.log(`  Activity spread:  ${walletScore.activitySpread}/3`)
    console.log(`  TOTAL:            ${walletScore.total}/15`)
    console.log('========================\n')

    const profileData: CryptoWalletProfileData = {
      chain,
      address,
      onChainData,
      score: walletScore,
      verifiedAt: new Date().toISOString(),
    }

    // Save to founder_verifications
    await (supabase.from('founder_verifications') as ReturnType<typeof supabase.from>)
      .upsert({
        founder_id: founder.id,
        verification_type: 'crypto_wallet',
        status: 'verified',
        verified_at: new Date().toISOString(),
        metadata: profileData as unknown as Record<string, unknown>,
      }, { onConflict: 'founder_id,verification_type' })

    // Recalculate trust score
    try {
      await fetch(new URL('/api/trust-score/calculate', request.url).toString(), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          cookie: request.headers.get('cookie') || '',
        },
        body: JSON.stringify({}),
      })
    } catch {
      // Non-critical — score will be recalculated on next page load
    }

    return NextResponse.json({
      verified: true,
      chain,
      address,
      score: walletScore,
      onChainData,
    })
  } catch {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
