export type ChainId = 'ethereum' | 'base' | 'polygon' | 'solana' | 'tron'

export interface WalletVerificationRequest {
  chain: ChainId
  address: string
  signature: string
  message: string
}

export interface OnChainData {
  chain: ChainId
  address: string
  firstTxTimestamp: number | null
  lastTxTimestamp: number | null
  txCount: number
  stablecoinBalanceUsd: number
}

export interface CryptoWalletProfileData {
  chain: ChainId
  address: string
  onChainData: OnChainData
  score: CryptoWalletScoreBreakdown
  verifiedAt: string
}

export interface CryptoWalletScoreBreakdown {
  walletAge: number
  txCount: number
  holdings: number
  activitySpread: number
  total: number
}
