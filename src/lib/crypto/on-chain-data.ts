import type { ChainId, OnChainData } from './types'

// Etherscan API V2 — single endpoint, chain ID differentiates networks
const ETHERSCAN_V2_URL = 'https://api.etherscan.io/v2/api'

const EVM_CHAIN_IDS: Record<string, number> = {
  ethereum: 1,
  base: 8453,
  polygon: 137,
}

// Stablecoin contract addresses (USDT, USDC, DAI) per EVM chain
const STABLECOINS: Record<string, { address: string; decimals: number }[]> = {
  ethereum: [
    { address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', decimals: 6 }, // USDT
    { address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', decimals: 6 }, // USDC
    { address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', decimals: 18 }, // DAI
  ],
  base: [
    { address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', decimals: 6 }, // USDC
  ],
  polygon: [
    { address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', decimals: 6 }, // USDT
    { address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', decimals: 6 }, // USDC
    { address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', decimals: 18 }, // DAI
  ],
}

export async function fetchOnChainData(chain: ChainId, address: string): Promise<OnChainData> {
  if (chain === 'solana') {
    return fetchSolanaData(address)
  }
  if (chain === 'tron') {
    return fetchTronData(address)
  }
  return fetchEvmData(chain, address)
}

async function fetchEvmData(chain: ChainId, address: string): Promise<OnChainData> {
  const chainId = EVM_CHAIN_IDS[chain]
  if (!chainId) {
    return emptyData(chain, address)
  }

  const apiKey = process.env.ETHERSCAN_API_KEY || ''

  try {
    // Etherscan V2: include chainid parameter
    const txUrl = `${ETHERSCAN_V2_URL}?chainid=${chainId}&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=${apiKey}`
    const txRes = await fetch(txUrl, { next: { revalidate: 3600 } })
    const txData = await txRes.json()

    let firstTxTimestamp: number | null = null
    let lastTxTimestamp: number | null = null
    let txCount = 0

    if (txData.status === '1' && Array.isArray(txData.result)) {
      txCount = txData.result.length
      if (txData.result.length > 0) {
        firstTxTimestamp = parseInt(txData.result[0].timeStamp) * 1000
        lastTxTimestamp = parseInt(txData.result[txData.result.length - 1].timeStamp) * 1000
      }
    }

    // Fetch stablecoin balances
    let stablecoinBalanceUsd = 0
    const stablecoins = STABLECOINS[chain] || []
    for (const coin of stablecoins) {
      try {
        const balUrl = `${ETHERSCAN_V2_URL}?chainid=${chainId}&module=account&action=tokenbalance&contractaddress=${coin.address}&address=${address}&tag=latest&apikey=${apiKey}`
        const balRes = await fetch(balUrl, { next: { revalidate: 3600 } })
        const balData = await balRes.json()
        if (balData.status === '1' && balData.result) {
          const raw = BigInt(balData.result)
          const divisor = BigInt(10 ** coin.decimals)
          stablecoinBalanceUsd += Number(raw / divisor)
        }
      } catch {
        // Skip individual token errors
      }
    }

    return {
      chain,
      address,
      firstTxTimestamp,
      lastTxTimestamp,
      txCount,
      stablecoinBalanceUsd,
    }
  } catch {
    return emptyData(chain, address)
  }
}

async function fetchSolanaData(address: string): Promise<OnChainData> {
  const RPC_URL = 'https://api.mainnet-beta.solana.com'

  try {
    // Fetch transaction signatures via native Solana RPC (free, no API key)
    const txRes = await fetch(RPC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0', id: 1,
        method: 'getSignaturesForAddress',
        params: [address, { limit: 100 }],
      }),
    })
    const txData = await txRes.json()

    let firstTxTimestamp: number | null = null
    let lastTxTimestamp: number | null = null
    let txCount = 0

    if (Array.isArray(txData.result)) {
      txCount = txData.result.length
      if (txData.result.length > 0) {
        // Sorted newest-first by default
        lastTxTimestamp = txData.result[0].blockTime * 1000
        firstTxTimestamp = txData.result[txData.result.length - 1].blockTime * 1000
      }
    }

    // Fetch token balances via native Solana RPC
    let stablecoinBalanceUsd = 0
    try {
      const tokenRes = await fetch(RPC_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0', id: 2,
          method: 'getTokenAccountsByOwner',
          params: [
            address,
            { programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' },
            { encoding: 'jsonParsed' },
          ],
        }),
      })
      const tokenData = await tokenRes.json()

      // Solana stablecoin mints
      const stableMints = new Set([
        'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
        'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', // USDT
      ])

      if (Array.isArray(tokenData.result?.value)) {
        for (const account of tokenData.result.value) {
          const info = account.account?.data?.parsed?.info
          if (info && stableMints.has(info.mint)) {
            stablecoinBalanceUsd += info.tokenAmount?.uiAmount || 0
          }
        }
      }
    } catch {
      // Skip token fetch errors
    }

    console.log(`[Solana] ${address}: ${txCount} txs, first=${firstTxTimestamp}, last=${lastTxTimestamp}, stables=$${stablecoinBalanceUsd}`)

    return { chain: 'solana', address, firstTxTimestamp, lastTxTimestamp, txCount, stablecoinBalanceUsd }
  } catch (err) {
    console.log(`[Solana] Error:`, err)
    return emptyData('solana', address)
  }
}

async function fetchTronData(address: string): Promise<OnChainData> {
  const apiKey = process.env.TRONSCAN_API_KEY || ''

  try {
    const headers: Record<string, string> = { accept: 'application/json' }
    if (apiKey) headers['TRON-PRO-API-KEY'] = apiKey

    // Fetch account info
    const accountUrl = `https://apilist.tronscanapi.com/api/accountv2?address=${address}`
    const accountRes = await fetch(accountUrl, { headers, next: { revalidate: 3600 } })
    const accountData = await accountRes.json()

    const firstTxTimestamp = accountData.date_created ? accountData.date_created : null
    const txCount = accountData.totalTransactionCount || 0

    // Fetch recent transactions for last tx timestamp
    let lastTxTimestamp: number | null = null
    try {
      const txUrl = `https://apilist.tronscanapi.com/api/transaction?sort=-timestamp&count=true&limit=1&address=${address}`
      const txRes = await fetch(txUrl, { headers, next: { revalidate: 3600 } })
      const txData = await txRes.json()
      if (txData.data && txData.data.length > 0) {
        lastTxTimestamp = txData.data[0].timestamp
      }
    } catch {
      // Skip
    }

    // Check USDT balance on Tron (TRC-20)
    let stablecoinBalanceUsd = 0
    try {
      const tokenUrl = `https://apilist.tronscanapi.com/api/account/tokens?address=${address}&token=trc20`
      const tokenRes = await fetch(tokenUrl, { headers, next: { revalidate: 3600 } })
      const tokenData = await tokenRes.json()

      const stableIds = new Set([
        'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', // USDT
        'TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8', // USDC
      ])

      if (Array.isArray(tokenData.data)) {
        for (const token of tokenData.data) {
          if (stableIds.has(token.tokenId)) {
            const amount = Number(token.balance) / (10 ** (token.tokenDecimal || 6))
            stablecoinBalanceUsd += amount
          }
        }
      }
    } catch {
      // Skip
    }

    return { chain: 'tron', address, firstTxTimestamp, lastTxTimestamp, txCount, stablecoinBalanceUsd }
  } catch {
    return emptyData('tron', address)
  }
}

function emptyData(chain: ChainId, address: string): OnChainData {
  return {
    chain,
    address,
    firstTxTimestamp: null,
    lastTxTimestamp: null,
    txCount: 0,
    stablecoinBalanceUsd: 0,
  }
}
