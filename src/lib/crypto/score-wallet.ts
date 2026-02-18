import type { OnChainData, CryptoWalletScoreBreakdown } from './types'

const MAX_CRYPTO_SCORE = 15

export function scoreWallet(data: OnChainData): CryptoWalletScoreBreakdown {
  const walletAge = scoreWalletAge(data.firstTxTimestamp)
  const txCount = scoreTxCount(data.txCount)
  const holdings = scoreHoldings(data.stablecoinBalanceUsd)
  const activitySpread = scoreActivitySpread(data.firstTxTimestamp, data.lastTxTimestamp)

  const total = Math.min(MAX_CRYPTO_SCORE, walletAge + txCount + holdings + activitySpread)

  return { walletAge, txCount, holdings, activitySpread, total }
}

function scoreWalletAge(firstTxTimestamp: number | null): number {
  if (!firstTxTimestamp) return 0
  const ageMs = Date.now() - firstTxTimestamp
  const ageYears = ageMs / (365.25 * 24 * 60 * 60 * 1000)

  if (ageYears >= 2) return 4
  if (ageYears >= 1) return 2
  return 0
}

function scoreTxCount(count: number): number {
  if (count >= 50) return 4
  if (count >= 10) return 2
  return 0
}

function scoreHoldings(usdBalance: number): number {
  if (usdBalance >= 500) return 4
  if (usdBalance >= 100) return 2
  return 0
}

function scoreActivitySpread(firstTxTimestamp: number | null, lastTxTimestamp: number | null): number {
  if (!firstTxTimestamp || !lastTxTimestamp) return 0
  const spreadMs = lastTxTimestamp - firstTxTimestamp
  const spreadMonths = spreadMs / (30 * 24 * 60 * 60 * 1000)

  if (spreadMonths >= 6) return 3
  if (spreadMonths >= 3) return 1
  return 0
}
