import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { verifyWalletSignature } from '@/lib/crypto/verify-signature'
import { fetchOnChainData } from '@/lib/crypto/on-chain-data'
import { scoreWallet } from '@/lib/crypto/score-wallet'
import { validateChallenge } from '@/lib/crypto/challenge-cache'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { getStatusFromScore } from '@/lib/trust-score-v2'
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
      .select('id, country_of_origin, country_of_residence')
      .eq('user_id', user.id)
      .single()

    const founder = founderData as { id: string; country_of_origin?: string; country_of_residence?: string } | null
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

    // Patch crypto score into existing trust score (don't recalculate everything)
    try {
      const { data: currentScore } = await (supabase
        .from('trust_scores') as ReturnType<typeof supabase.from>)
        .select('*')
        .eq('founder_id', founder.id)
        .single()

      if (currentScore) {
        const cs = currentScore as Record<string, unknown>
        const breakdown = (cs.score_breakdown || {}) as Record<string, Record<string, unknown>>
        const ea = breakdown.economic_activity || { score: 0, max: 25, details: {} }
        const eaDetails = (ea.details || {}) as Record<string, unknown>

        // Calculate old crypto contribution (in case re-connecting)
        const oldCryptoScore = Number(eaDetails.crypto_subtotal || 0)

        // Update economic_activity breakdown with crypto data
        eaDetails.crypto_verified = true
        eaDetails.crypto_subtotal = walletScore.total
        eaDetails.crypto_wallet_age = walletScore.walletAge
        eaDetails.crypto_tx_count = walletScore.txCount
        eaDetails.crypto_holdings = walletScore.holdings
        eaDetails.crypto_activity_spread = walletScore.activitySpread
        eaDetails.crypto_chain = chain
        ea.details = eaDetails
        ea.score = Math.min(25, Number(ea.score || 0) - oldCryptoScore + walletScore.total)
        breakdown.economic_activity = ea

        const newTotal = Number(cs.total_score || 0) - oldCryptoScore + walletScore.total
        const { status } = getStatusFromScore(newTotal)

        await (supabase.from('trust_scores') as ReturnType<typeof supabase.from>)
          .update({
            total_score: newTotal,
            business_score: Number(cs.business_score || 0) - oldCryptoScore + walletScore.total,
            financial_score: Number(cs.financial_score || 0) - oldCryptoScore + walletScore.total,
            score_breakdown: breakdown,
            status,
            calculated_at: new Date().toISOString(),
          })
          .eq('founder_id', founder.id)
      }
    } catch (e) {
      console.error('[verify] Trust score patch failed:', e)
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
