'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  financialSchema,
  FinancialFormData,
  revenueOptions,
  geographyOptions,
  chargebackOptions,
} from '@/lib/validations/onboarding'
import { ArrowLeft, ArrowRight, CreditCard, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { StripeProfileData } from '@/lib/oauth/stripe'

interface StepFinancialProps {
  data: Partial<FinancialFormData>
  onNext: (data: FinancialFormData) => void
  onBack: () => void
}

export function StepFinancial({ data, onNext, onBack }: StepFinancialProps) {
  const [mockConnected, setMockConnected] = useState(data.hasStripeConnected ?? false)
  const [stripeData, setStripeData] = useState<StripeProfileData | null>(null)
  const [oauthAvailable, setOauthAvailable] = useState(true)

  const {
    handleSubmit,
    setValue,
    watch,
  } = useForm<FinancialFormData>({
    resolver: zodResolver(financialSchema),
    defaultValues: {
      hasStripeConnected: data.hasStripeConnected ?? false,
      monthlyRevenue: data.monthlyRevenue ?? '0',
      customerGeography: data.customerGeography ?? '',
      chargebackRate: data.chargebackRate ?? '',
      hasBankStatements: data.hasBankStatements ?? false,
    },
  })

  const monthlyRevenue = watch('monthlyRevenue')
  const customerGeography = watch('customerGeography')
  const chargebackRate = watch('chargebackRate')
  const hasBankStatements = watch('hasBankStatements')

  // Check for OAuth data in sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('oauth_stripe_data')
      if (stored) {
        const parsed = JSON.parse(stored) as StripeProfileData
        setStripeData(parsed)
        setMockConnected(true)
        setValue('hasStripeConnected', true)
        // Auto-fill form fields from real data
        if (parsed.revenueRange) setValue('monthlyRevenue', parsed.revenueRange)
        if (parsed.chargebackRateCategory) setValue('chargebackRate', parsed.chargebackRateCategory)
      }
    } catch {
      // Ignore parse errors
    }

    // Check if OAuth is configured
    fetch('/api/oauth/stripe/connect', { method: 'HEAD' })
      .then((res) => {
        if (res.status === 503) setOauthAvailable(false)
      })
      .catch(() => setOauthAvailable(false))
  }, [setValue])

  const handleOAuthConnect = () => {
    window.location.href = '/api/oauth/stripe/connect'
  }

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white">Financial Footprint</h3>
        <p className="mt-1 text-sm text-zinc-400">
          Revenue history and financial documentation strengthen your trust profile
          and demonstrate legitimate business activity.
        </p>
      </div>

      <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-6">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/[0.15]">
            <CreditCard className="h-6 w-6 text-violet-400" />
          </div>
          <h4 className="mt-3 font-medium text-white">Connect Stripe</h4>
          <p className="mt-1 text-sm text-zinc-400">
            Verify your revenue history, customer geography, and chargeback rate.
          </p>

          {mockConnected ? (
            <div className="mt-4 rounded-lg bg-emerald-500/[0.1] border border-emerald-500/20 p-4 text-sm text-emerald-400">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <p className="font-medium">Stripe Connected</p>
              </div>
              <div className="mt-2 space-y-1 text-left text-zinc-300">
                {stripeData ? (
                  <>
                    <p>Monthly revenue: {stripeData.monthlyRevenueFormatted}</p>
                    <p>Account age: {stripeData.accountAgeMonths} month{stripeData.accountAgeMonths !== 1 ? 's' : ''}</p>
                    <p>Chargeback rate: {stripeData.chargebackRate}%</p>
                  </>
                ) : (
                  <>
                    <p>Monthly revenue: $2,400</p>
                    <p>Active since: March 2024</p>
                    <p>Chargeback rate: 0.1%</p>
                  </>
                )}
              </div>
            </div>
          ) : oauthAvailable ? (
            <Button
              type="button"
              variant="ghost"
              className="mt-4 gap-2 border border-white/[0.1] text-zinc-300 hover:text-zinc-200 hover:bg-white/[0.05]"
              onClick={handleOAuthConnect}
            >
              <CreditCard className="h-4 w-4" />
              Connect with Stripe
            </Button>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-zinc-300">Monthly Revenue</Label>
        <Select
          value={monthlyRevenue}
          onValueChange={(value) => setValue('monthlyRevenue', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select revenue range" />
          </SelectTrigger>
          <SelectContent>
            {revenueOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-zinc-300">Customer Geography</Label>
        <Select
          value={customerGeography}
          onValueChange={(value) => setValue('customerGeography', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Where are your customers?" />
          </SelectTrigger>
          <SelectContent>
            {geographyOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-zinc-300">Chargeback Rate</Label>
        <Select
          value={chargebackRate}
          onValueChange={(value) => setValue('chargebackRate', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select chargeback rate" />
          </SelectTrigger>
          <SelectContent>
            {chargebackOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-4">
        <div className="flex items-start gap-4">
          <Checkbox
            id="hasBankStatements"
            checked={hasBankStatements}
            onCheckedChange={(checked) => setValue('hasBankStatements', !!checked)}
          />
          <div className="flex-1">
            <Label htmlFor="hasBankStatements" className="text-base font-medium text-zinc-200">
              Bank Statements Available
            </Label>
            <p className="mt-1 text-sm text-zinc-400">
              Can you provide 3+ months of business or personal bank statements?
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="ghost" onClick={onBack} className="gap-2 border border-white/[0.1] text-zinc-300 hover:text-zinc-200 hover:bg-white/[0.05]">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button type="submit" variant="ghost" className="gap-2 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 hover:text-white text-white border-0 shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-shadow">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}
