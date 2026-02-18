'use client'

import { useState } from 'react'
import { Wallet, CreditCard, DollarSign, Check, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WalletConnectModal } from './wallet-connect-modal'

interface EconomicActivityCardProps {
  cryptoVerified: boolean
  cryptoChain?: string
  cryptoScore?: number
  paymentVerified: boolean
  stripeConnected: boolean
  stripeScore?: number
  hasBankApp: boolean
  onRefresh: () => void
}

export function EconomicActivityCard({
  cryptoVerified,
  cryptoChain,
  cryptoScore,
  paymentVerified,
  stripeConnected,
  stripeScore,
  hasBankApp,
  onRefresh,
}: EconomicActivityCardProps) {
  const [walletModalOpen, setWalletModalOpen] = useState(false)

  return (
    <>
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Economic Activity</h3>
        <p className="text-sm text-zinc-500 mb-4">Verify your economic history for up to 25 points</p>

        <div className="space-y-3">
          {/* Crypto Wallet */}
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-full ${cryptoVerified ? 'bg-emerald-500/10' : 'bg-muted'}`}>
                <Wallet className={`h-4 w-4 ${cryptoVerified ? 'text-emerald-400' : 'text-zinc-500'}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-200">Crypto Wallet</p>
                {cryptoVerified ? (
                  <p className="text-xs text-emerald-400">
                    {cryptoChain} verified &mdash; {cryptoScore}/15
                  </p>
                ) : (
                  <p className="text-xs text-zinc-500">Sign a message to verify</p>
                )}
              </div>
            </div>
            {cryptoVerified ? (
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10">
                <Check className="h-4 w-4 text-emerald-400" />
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setWalletModalOpen(true)}
                className="text-xs"
              >
                Connect
              </Button>
            )}
          </div>

          {/* Formation Payment */}
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-full ${paymentVerified ? 'bg-emerald-500/10' : 'bg-muted'}`}>
                <DollarSign className={`h-4 w-4 ${paymentVerified ? 'text-emerald-400' : 'text-zinc-500'}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-200">Formation Payment</p>
                {paymentVerified ? (
                  <p className="text-xs text-emerald-400">Verified &mdash; 5/5</p>
                ) : (
                  <p className="text-xs text-zinc-500">Pending &mdash; 0/5</p>
                )}
              </div>
            </div>
            {paymentVerified ? (
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10">
                <Check className="h-4 w-4 text-emerald-400" />
              </div>
            ) : (
              <span className="text-xs text-zinc-600">Admin verified</span>
            )}
          </div>

          {/* Stripe Connected */}
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-full ${stripeConnected ? 'bg-emerald-500/10' : hasBankApp ? 'bg-muted' : 'bg-muted opacity-50'}`}>
                <CreditCard className={`h-4 w-4 ${stripeConnected ? 'text-emerald-400' : 'text-zinc-500'}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-200">Stripe Connected</p>
                {stripeConnected ? (
                  <p className="text-xs text-emerald-400">Connected &mdash; {stripeScore}/15</p>
                ) : hasBankApp ? (
                  <p className="text-xs text-zinc-500">Connect your Stripe account</p>
                ) : (
                  <p className="text-xs text-zinc-600">Available after banking setup</p>
                )}
              </div>
            </div>
            {stripeConnected ? (
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10">
                <Check className="h-4 w-4 text-emerald-400" />
              </div>
            ) : hasBankApp ? (
              <a href="/api/oauth/stripe/connect" className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300">
                Connect <ExternalLink className="h-3 w-3" />
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <WalletConnectModal
        open={walletModalOpen}
        onOpenChange={setWalletModalOpen}
        onVerified={onRefresh}
      />
    </>
  )
}
