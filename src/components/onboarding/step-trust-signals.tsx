'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { trustSignalsSchema, TrustSignalsFormData } from '@/lib/validations/onboarding'
import { searchAccelerators } from '@/lib/accelerators'
import { ArrowLeft, CheckCircle, Loader2, AlertTriangle, Send, RefreshCw } from 'lucide-react'

const STORAGE_KEY = 'trust_signals_verification'

interface VerificationState {
  referral?: { verified: boolean; referrerName: string; code: string }
  university?: { verified: boolean; email: string }
  accelerator?: { verified: boolean; name: string }
}

function loadVerification(): VerificationState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return {}
}

function saveVerification(state: VerificationState) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

interface StepTrustSignalsProps {
  data: Partial<TrustSignalsFormData>
  onSubmit: (data: TrustSignalsFormData) => void
  onBack: () => void
  isSubmitting?: boolean
}

export function StepTrustSignals({ data, onSubmit, onBack, isSubmitting }: StepTrustSignalsProps) {
  const [verification, setVerification] = useState<VerificationState>({})
  const [referralLoading, setReferralLoading] = useState(false)
  const [referralError, setReferralError] = useState('')
  const [uniSendLoading, setUniSendLoading] = useState(false)
  const [uniCodeSent, setUniCodeSent] = useState(false)
  const [uniVerifyLoading, setUniVerifyLoading] = useState(false)
  const [uniError, setUniError] = useState('')
  const [uniCode, setUniCode] = useState('')
  const [uniToken, setUniToken] = useState('')
  const [uniExpiresAt, setUniExpiresAt] = useState('')
  const [accelQuery, setAccelQuery] = useState(data.acceleratorName ?? '')
  const [accelSuggestions, setAccelSuggestions] = useState<string[]>([])
  const [showAccelDropdown, setShowAccelDropdown] = useState(false)
  const accelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setVerification(loadVerification())
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (accelRef.current && !accelRef.current.contains(e.target as Node)) {
        setShowAccelDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm<TrustSignalsFormData>({
    resolver: zodResolver(trustSignalsSchema),
    defaultValues: {
      hasReferral: data.hasReferral ?? false,
      referralCode: data.referralCode ?? '',
      referralVerified: data.referralVerified ?? false,
      referrerName: data.referrerName ?? '',
      hasUniversityEmail: data.hasUniversityEmail ?? false,
      universityEmail: data.universityEmail ?? '',
      universityEmailVerified: data.universityEmailVerified ?? false,
      hasAccelerator: data.hasAccelerator ?? false,
      acceleratorName: data.acceleratorName ?? '',
      acceleratorVerified: data.acceleratorVerified ?? false,
      hasEmployerVerification: data.hasEmployerVerification ?? false,
      employerName: data.employerName ?? '',
    },
  })

  const hasReferral = watch('hasReferral')
  const referralCode = watch('referralCode')
  const hasUniversityEmail = watch('hasUniversityEmail')
  const universityEmail = watch('universityEmail')
  const hasAccelerator = watch('hasAccelerator')
  const hasEmployerVerification = watch('hasEmployerVerification')

  // Sync verification state with form on load
  useEffect(() => {
    if (verification.referral?.verified) {
      setValue('hasReferral', true)
      setValue('referralVerified', true)
      setValue('referrerName', verification.referral.referrerName)
      setValue('referralCode', verification.referral.code)
    }
    if (verification.university?.verified) {
      setValue('hasUniversityEmail', true)
      setValue('universityEmailVerified', true)
      setValue('universityEmail', verification.university.email)
    }
    if (verification.accelerator) {
      setValue('hasAccelerator', true)
      setValue('acceleratorVerified', verification.accelerator.verified)
      setValue('acceleratorName', verification.accelerator.name)
      setAccelQuery(verification.accelerator.name)
    }
  }, [verification, setValue])

  const updateVerification = useCallback((update: Partial<VerificationState>) => {
    setVerification(prev => {
      const next = { ...prev, ...update }
      saveVerification(next)
      return next
    })
  }, [])

  // === REFERRAL ===
  const verifyReferral = async () => {
    if (!referralCode?.trim()) return
    setReferralLoading(true)
    setReferralError('')
    try {
      const res = await fetch('/api/verify/trust-signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'referral', code: referralCode.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setReferralError(data.error)
        return
      }
      setValue('referralVerified', true)
      setValue('referrerName', data.referrerName)
      updateVerification({ referral: { verified: true, referrerName: data.referrerName, code: data.code } })
    } catch {
      setReferralError('Failed to verify. Please try again.')
    } finally {
      setReferralLoading(false)
    }
  }

  // === UNIVERSITY ===
  const sendUniCode = async () => {
    if (!universityEmail?.trim()) return
    setUniSendLoading(true)
    setUniError('')
    try {
      const res = await fetch('/api/verify/trust-signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'university-send', email: universityEmail.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setUniError(data.error)
        return
      }
      setUniToken(data.token)
      setUniExpiresAt(data.expiresAt)
      setUniCodeSent(true)
    } catch {
      setUniError('Failed to send code. Please try again.')
    } finally {
      setUniSendLoading(false)
    }
  }

  const verifyUniCode = async () => {
    if (!uniCode.trim() || !universityEmail) return
    setUniVerifyLoading(true)
    setUniError('')
    try {
      const res = await fetch('/api/verify/trust-signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'university-verify', email: universityEmail.trim(), code: uniCode.trim(), token: uniToken, expiresAt: uniExpiresAt }),
      })
      const data = await res.json()
      if (!res.ok) {
        setUniError(data.error)
        return
      }
      setValue('universityEmailVerified', true)
      updateVerification({ university: { verified: true, email: universityEmail.trim() } })
    } catch {
      setUniError('Failed to verify. Please try again.')
    } finally {
      setUniVerifyLoading(false)
    }
  }

  // === ACCELERATOR ===
  const handleAccelInput = (value: string) => {
    setAccelQuery(value)
    setValue('acceleratorName', value)
    if (value.length >= 2) {
      setAccelSuggestions(searchAccelerators(value))
      setShowAccelDropdown(true)
    } else {
      setAccelSuggestions([])
      setShowAccelDropdown(false)
    }
    // Clear verified if user changes input
    if (verification.accelerator) {
      setValue('acceleratorVerified', false)
      updateVerification({ accelerator: undefined })
    }
  }

  const selectAccelerator = async (name: string) => {
    setAccelQuery(name)
    setValue('acceleratorName', name)
    setValue('hasAccelerator', true)
    setShowAccelDropdown(false)

    try {
      const res = await fetch('/api/verify/trust-signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'accelerator', name }),
      })
      const data = await res.json()
      if (res.ok) {
        setValue('acceleratorVerified', data.isKnown)
        updateVerification({ accelerator: { verified: data.isKnown, name } })
      }
    } catch {
      // Silently fail — form still works
    }
  }

  const checkCustomAccelerator = async () => {
    if (!accelQuery.trim()) return
    try {
      const res = await fetch('/api/verify/trust-signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'accelerator', name: accelQuery.trim() }),
      })
      const data = await res.json()
      if (res.ok) {
        setValue('acceleratorVerified', data.isKnown)
        updateVerification({ accelerator: { verified: data.isKnown, name: accelQuery.trim() } })
      }
    } catch {}
  }

  // On submit, merge verification state
  const onFormSubmit = (formData: TrustSignalsFormData) => {
    const merged: TrustSignalsFormData = {
      ...formData,
      referralVerified: verification.referral?.verified ?? formData.referralVerified ?? false,
      referrerName: verification.referral?.referrerName ?? formData.referrerName ?? '',
      universityEmailVerified: verification.university?.verified ?? formData.universityEmailVerified ?? false,
      acceleratorVerified: verification.accelerator?.verified ?? formData.acceleratorVerified ?? false,
    }
    onSubmit(merged)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <p className="text-sm text-zinc-400">
        These optional signals can boost your Trust Score. Verified signals earn significantly more points.
      </p>

      {/* REFERRAL */}
      <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-4">
        <div className="flex items-start gap-4">
          <Checkbox
            id="hasReferral"
            checked={hasReferral}
            onCheckedChange={(checked) => {
              setValue('hasReferral', !!checked)
              if (!checked) {
                setValue('referralVerified', false)
                setValue('referrerName', '')
                updateVerification({ referral: undefined })
              }
            }}
          />
          <div className="flex-1">
            <Label htmlFor="hasReferral" className="text-base font-medium text-zinc-200">
              Referral from Verified Founder
            </Label>
            <p className="mt-1 text-sm text-zinc-400">
              Were you referred by a verified BedRock founder? (+10 pts verified, +3 pts unverified)
            </p>
            {hasReferral && (
              <div className="mt-3">
                {verification.referral?.verified ? (
                  <div className="rounded-md border border-green-500/30 bg-green-500/10 p-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                    <span className="text-sm text-green-300">
                      Referred by <strong>{verification.referral.referrerName}</strong>
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter referral code"
                      {...register('referralCode')}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={verifyReferral}
                      disabled={referralLoading || !referralCode?.trim()}
                      className="border border-white/[0.1] text-zinc-300 hover:text-zinc-200 hover:bg-white/[0.05] shrink-0"
                    >
                      {referralLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Verify'}
                    </Button>
                  </div>
                )}
                {referralError && (
                  <p className="mt-2 text-sm text-red-400">{referralError}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* UNIVERSITY EMAIL */}
      <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-4">
        <div className="flex items-start gap-4">
          <Checkbox
            id="hasUniversityEmail"
            checked={hasUniversityEmail}
            onCheckedChange={(checked) => {
              setValue('hasUniversityEmail', !!checked)
              if (!checked) {
                setValue('universityEmailVerified', false)
                setUniCodeSent(false)
                setUniCode('')
                setUniError('')
                updateVerification({ university: undefined })
              }
            }}
          />
          <div className="flex-1">
            <Label htmlFor="hasUniversityEmail" className="text-base font-medium text-zinc-200">
              Secondary Email Verification
            </Label>
            <p className="mt-1 text-sm text-zinc-400">
              Verify a secondary email you own (+3 pts verified, +1 pt unverified)
            </p>
            {hasUniversityEmail && (
              <div className="mt-3 space-y-3">
                {verification.university?.verified ? (
                  <div className="rounded-md border border-green-500/30 bg-green-500/10 p-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                    <span className="text-sm text-green-300">
                      Email verified: <strong>{verification.university.email}</strong>
                    </span>
                  </div>
                ) : !uniCodeSent ? (
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="your.name@example.com"
                      {...register('universityEmail')}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={sendUniCode}
                      disabled={uniSendLoading || !universityEmail?.trim()}
                      className="border border-white/[0.1] text-zinc-300 hover:text-zinc-200 hover:bg-white/[0.05] shrink-0 gap-1"
                    >
                      {uniSendLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Send className="h-3 w-3" /> Send Code</>}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs text-zinc-400">
                      A 6-digit code has been sent to <strong className="text-zinc-300">{universityEmail}</strong>
                    </p>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter 6-digit code"
                        value={uniCode}
                        onChange={(e) => setUniCode(e.target.value)}
                        maxLength={6}
                        className="flex-1 font-mono tracking-widest"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={verifyUniCode}
                        disabled={uniVerifyLoading || uniCode.length < 6}
                        className="border border-white/[0.1] text-zinc-300 hover:text-zinc-200 hover:bg-white/[0.05] shrink-0"
                      >
                        {uniVerifyLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Verify'}
                      </Button>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setUniCodeSent(false); setUniCode(''); setUniError('') }}
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      <RefreshCw className="h-3 w-3" /> Resend code
                    </button>
                  </div>
                )}
                {uniError && (
                  <p className="text-sm text-red-400">{uniError}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ACCELERATOR */}
      <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-4">
        <div className="flex items-start gap-4">
          <Checkbox
            id="hasAccelerator"
            checked={hasAccelerator}
            onCheckedChange={(checked) => {
              setValue('hasAccelerator', !!checked)
              if (!checked) {
                setValue('acceleratorVerified', false)
                setValue('acceleratorName', '')
                setAccelQuery('')
                setAccelSuggestions([])
                updateVerification({ accelerator: undefined })
              }
            }}
          />
          <div className="flex-1">
            <Label htmlFor="hasAccelerator" className="text-base font-medium text-zinc-200">
              Startup Accelerator/Incubator
            </Label>
            <p className="mt-1 text-sm text-zinc-400">
              Select from known accelerators (+5 pts verified, +2 pts unverified)
            </p>
            {hasAccelerator && (
              <div className="mt-3">
                {verification.accelerator?.verified ? (
                  <div className="rounded-md border border-green-500/30 bg-green-500/10 p-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                    <span className="text-sm text-green-300">
                      Verified accelerator: <strong>{verification.accelerator.name}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        updateVerification({ accelerator: undefined })
                        setValue('acceleratorVerified', false)
                        setAccelQuery('')
                        setValue('acceleratorName', '')
                      }}
                      className="ml-auto text-xs text-zinc-500 hover:text-zinc-300"
                    >
                      Change
                    </button>
                  </div>
                ) : verification.accelerator && !verification.accelerator.verified ? (
                  <div className="space-y-2">
                    <div className="rounded-md border border-orange-500/30 bg-orange-500/10 p-3 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-400 shrink-0" />
                      <span className="text-sm text-orange-300">
                        &ldquo;{verification.accelerator.name}&rdquo; is not in our database. Reduced points will apply.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        updateVerification({ accelerator: undefined })
                        setValue('acceleratorVerified', false)
                        setAccelQuery('')
                        setValue('acceleratorName', '')
                      }}
                      className="text-xs text-blue-400 hover:text-blue-300"
                    >
                      Try a different name
                    </button>
                  </div>
                ) : (
                  <div className="relative" ref={accelRef}>
                    <Input
                      placeholder="Start typing accelerator name..."
                      value={accelQuery}
                      onChange={(e) => handleAccelInput(e.target.value)}
                      onBlur={() => {
                        // Delay to allow click on dropdown item
                        setTimeout(() => {
                          if (accelQuery.trim() && !verification.accelerator) {
                            checkCustomAccelerator()
                          }
                        }, 200)
                      }}
                    />
                    {showAccelDropdown && accelSuggestions.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full rounded-md border border-white/[0.1] bg-zinc-900 shadow-lg max-h-48 overflow-y-auto">
                        {accelSuggestions.map((name) => (
                          <button
                            key={name}
                            type="button"
                            className="w-full text-left px-3 py-2 text-sm text-zinc-200 hover:bg-white/[0.05] transition-colors"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => selectAccelerator(name)}
                          >
                            {name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* EMPLOYER */}
      <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-4">
        <div className="flex items-start gap-4">
          <Checkbox
            id="hasEmployerVerification"
            checked={hasEmployerVerification}
            onCheckedChange={(checked) => setValue('hasEmployerVerification', !!checked)}
          />
          <div className="flex-1">
            <Label htmlFor="hasEmployerVerification" className="text-base font-medium text-zinc-200">
              Employer Verification
            </Label>
            <p className="mt-1 text-sm text-zinc-400">
              Current or previous employer (+2 pts, self-reported)
            </p>
            {hasEmployerVerification && (
              <div className="mt-3">
                <Input
                  placeholder="Company name"
                  {...register('employerName')}
                />
                <p className="mt-1 text-xs text-zinc-500">Self-reported. No verification required.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="ghost" onClick={onBack} className="gap-2 border border-white/[0.1] text-zinc-300 hover:text-zinc-200 hover:bg-white/[0.05]" disabled={isSubmitting}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button type="submit" variant="ghost" className="gap-2 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 hover:text-white text-white border-0 shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-shadow" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4" />
              See My Trust Score
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
