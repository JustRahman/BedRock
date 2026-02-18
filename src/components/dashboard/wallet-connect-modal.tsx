'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Loader2, AlertCircle } from 'lucide-react'
import type { ChainId } from '@/lib/crypto/types'

interface WalletConnectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onVerified: () => void
}

// EVM chain IDs to our chain names
const EVM_CHAIN_MAP: Record<number, ChainId> = {
  1: 'ethereum',
  8453: 'base',
  137: 'polygon',
}

const EVM_CHAIN_NAMES: Record<number, string> = {
  1: 'Ethereum',
  8453: 'Base',
  137: 'Polygon',
}

const SUPPORTED_EVM_IDS = [1, 8453, 137]

interface DetectedWallet {
  id: 'metamask' | 'phantom' | 'tronlink'
  name: string
  description: string
}

// When multiple wallets are installed, they all fight over window.ethereum.
// Phantom sets isMetaMask=true on its ethereum provider, so we can't trust that flag alone.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getMetaMaskProvider(): any | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any
  const ethereum = win.ethereum

  if (!ethereum) return null

  // If providers array exists (multiple wallets installed), find the real MetaMask
  if (Array.isArray(ethereum.providers)) {
    const mm = ethereum.providers.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (p: any) => p.isMetaMask && !p.isPhantom
    )
    return mm || null
  }

  // No providers array = single wallet. If Phantom is installed, then
  // window.ethereum is Phantom's provider (it fakes isMetaMask=true).
  if (win.phantom) return null

  // No Phantom — trust isMetaMask
  if (ethereum.isMetaMask) return ethereum

  return null
}

function detectWallets(): DetectedWallet[] {
  const wallets: DetectedWallet[] = []
  if (typeof window === 'undefined') return wallets

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any

  // MetaMask: use providers array to find the real one
  if (getMetaMaskProvider()) {
    wallets.push({ id: 'metamask', name: 'MetaMask', description: 'Ethereum, Base, Polygon' })
  }

  // Phantom: always use phantom.solana — never window.ethereum
  if (win.phantom?.solana?.isPhantom || win.solana?.isPhantom) {
    wallets.push({ id: 'phantom', name: 'Phantom', description: 'Solana' })
  }

  // TronLink: check window.tronWeb with a ready address
  if (win.tronWeb?.defaultAddress?.base58) {
    wallets.push({ id: 'tronlink', name: 'TronLink', description: 'Tron' })
  }

  return wallets
}

export function WalletConnectModal({ open, onOpenChange, onVerified }: WalletConnectModalProps) {
  const [wallets, setWallets] = useState<DetectedWallet[]>([])
  const [status, setStatus] = useState<'idle' | 'connecting' | 'chain_select' | 'signing' | 'verifying' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [evmChains, setEvmChains] = useState<{ chainId: number; name: string }[]>([])

  // Detect installed wallets when modal opens
  useEffect(() => {
    if (open) {
      // Small delay to let extensions inject
      const timer = setTimeout(() => setWallets(detectWallets()), 200)
      return () => clearTimeout(timer)
    }
  }, [open])

  async function connectMetaMask(targetChainId?: number) {
    setError(null)
    setStatus('connecting')

    try {
      const ethereum = getMetaMaskProvider()
      if (!ethereum) {
        throw new Error('MetaMask not found.')
      }

      // Connect
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' }) as string[]
      const address = accounts[0]

      // Get current chain
      const rawChainId = await ethereum.request({ method: 'eth_chainId' }) as string
      let currentChainId = parseInt(rawChainId, 16)

      // If a target chain was specified, switch to it
      if (targetChainId && currentChainId !== targetChainId) {
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${targetChainId.toString(16)}` }],
          })
          currentChainId = targetChainId
        } catch {
          throw new Error(`Please switch to ${EVM_CHAIN_NAMES[targetChainId] || 'a supported chain'} in MetaMask.`)
        }
      }

      // Check if current chain is supported
      const chain = EVM_CHAIN_MAP[currentChainId]
      if (!chain && !targetChainId) {
        // Show chain picker — user is on an unsupported chain
        const available = SUPPORTED_EVM_IDS.map(id => ({ chainId: id, name: EVM_CHAIN_NAMES[id] }))
        setEvmChains(available)
        setStatus('chain_select')
        return
      }

      if (!chain) {
        throw new Error('Unsupported network. Please switch to Ethereum, Base, or Polygon.')
      }

      await signAndVerify(chain, address, ethereum)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect MetaMask')
      setStatus('error')
    }
  }

  async function connectPhantom() {
    setError(null)
    setStatus('connecting')

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const phantom = (window as any).phantom?.solana || (window as any).solana
      if (!phantom?.isPhantom) {
        throw new Error('Phantom wallet not found.')
      }

      const resp = await phantom.connect()
      const address = resp.publicKey.toString()

      // Get challenge
      setStatus('signing')
      const challengeRes = await fetch('/api/crypto/challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      })
      const { message } = await challengeRes.json()

      // Sign
      const encoded = new TextEncoder().encode(message)
      const signResult = await phantom.signMessage(encoded, 'utf8')
      const bs58Module = await import('bs58')
      const signature = bs58Module.default.encode(signResult.signature)

      // Verify
      setStatus('verifying')
      const verifyRes = await fetch('/api/crypto/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chain: 'solana', address, signature, message }),
      })

      if (!verifyRes.ok) {
        const data = await verifyRes.json()
        throw new Error(data.error || 'Verification failed')
      }

      // Trust score is recalculated server-side in the verify endpoint

      onVerified()
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect Phantom')
      setStatus('error')
    }
  }

  async function connectTronLink() {
    setError(null)
    setStatus('connecting')

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tronWeb = (window as any).tronWeb
      if (!tronWeb?.defaultAddress?.base58) {
        throw new Error('TronLink wallet not found or not logged in.')
      }

      const address = tronWeb.defaultAddress.base58

      // Get challenge
      setStatus('signing')
      const challengeRes = await fetch('/api/crypto/challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      })
      const { message } = await challengeRes.json()

      // Sign
      const signature = await tronWeb.trx.signMessageV2(message)

      // Verify
      setStatus('verifying')
      const verifyRes = await fetch('/api/crypto/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chain: 'tron', address, signature, message }),
      })

      if (!verifyRes.ok) {
        const data = await verifyRes.json()
        throw new Error(data.error || 'Verification failed')
      }

      // Recalculate trust score from client
      await fetch('/api/trust-score/calculate', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) }).catch(() => {})

      onVerified()
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect TronLink')
      setStatus('error')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function signAndVerify(chain: ChainId, address: string, ethereum: any) {
    // Get challenge
    setStatus('signing')
    const challengeRes = await fetch('/api/crypto/challenge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address }),
    })
    const { message } = await challengeRes.json()

    // Sign
    const signature = await ethereum.request({
      method: 'personal_sign',
      params: [message, address],
    }) as string

    // Verify
    setStatus('verifying')
    const verifyRes = await fetch('/api/crypto/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chain, address, signature, message }),
    })

    if (!verifyRes.ok) {
      const data = await verifyRes.json()
      throw new Error(data.error || 'Verification failed')
    }

    // Recalculate trust score from client
    await fetch('/api/trust-score/calculate', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) }).catch(() => {})

    onVerified()
    onOpenChange(false)
  }

  const reset = () => {
    setStatus('idle')
    setError(null)
    setEvmChains([])
  }

  const handleWalletClick = (wallet: DetectedWallet) => {
    if (wallet.id === 'metamask') connectMetaMask()
    else if (wallet.id === 'phantom') connectPhantom()
    else if (wallet.id === 'tronlink') connectTronLink()
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) reset() }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Crypto Wallet</DialogTitle>
          <DialogDescription>
            Choose your wallet to sign a message and verify ownership.
          </DialogDescription>
        </DialogHeader>

        {/* Wallet selection */}
        {status === 'idle' && (
          <div className="py-4 space-y-3">
            {wallets.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <AlertCircle className="h-8 w-8 text-zinc-500" />
                <div>
                  <p className="text-sm font-medium text-zinc-300">No wallets detected</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Install <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">MetaMask</a>,{' '}
                    <a href="https://phantom.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Phantom</a>, or{' '}
                    <a href="https://www.tronlink.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">TronLink</a> and reload.
                  </p>
                </div>
              </div>
            ) : (
              wallets.map((wallet) => (
                <button
                  key={wallet.id}
                  type="button"
                  onClick={() => handleWalletClick(wallet)}
                  className="flex w-full items-center gap-3 rounded-lg border border-border p-4 text-left hover:bg-muted transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-bold text-xs shrink-0">
                    {wallet.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{wallet.name}</p>
                    <p className="text-xs text-muted-foreground">{wallet.description}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        )}

        {/* EVM chain selection (when MetaMask is on an unsupported chain) */}
        {status === 'chain_select' && (
          <div className="py-4 space-y-3">
            <p className="text-sm text-zinc-400">
              Your wallet is on an unsupported network. Pick one to switch to:
            </p>
            {evmChains.map((c) => (
              <button
                key={c.chainId}
                type="button"
                onClick={() => connectMetaMask(c.chainId)}
                className="flex w-full items-center gap-3 rounded-lg border border-border p-3 text-left hover:bg-muted transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-bold text-xs">
                  {c.chainId === 1 ? 'ETH' : c.chainId === 8453 ? 'BASE' : 'POL'}
                </div>
                <p className="font-medium text-sm">{c.name}</p>
              </button>
            ))}
            <Button onClick={reset} variant="ghost" size="sm" className="w-full text-zinc-500">
              Back
            </Button>
          </div>
        )}

        {/* Loading states */}
        {(status === 'connecting' || status === 'signing' || status === 'verifying') && (
          <div className="flex flex-col items-center gap-3 py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <p className="text-sm text-muted-foreground">
              {status === 'connecting' && 'Connecting wallet...'}
              {status === 'signing' && 'Please sign the message in your wallet...'}
              {status === 'verifying' && 'Verifying signature & fetching on-chain data...'}
            </p>
          </div>
        )}

        {/* Error state */}
        {status === 'error' && (
          <div className="py-4 space-y-4">
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
            <Button onClick={reset} variant="outline" className="w-full">
              Try Again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
