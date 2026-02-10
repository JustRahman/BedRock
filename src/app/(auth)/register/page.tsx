'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Shield, Loader2, CheckCircle } from 'lucide-react'

const registerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Pre-fill from onboarding data if available
  const getDefaults = () => {
    if (typeof window === 'undefined') return {}
    try {
      const raw = sessionStorage.getItem('onboardingData')
      if (raw) {
        const data = JSON.parse(raw)
        return {
          fullName: data.basicInfo?.fullName || '',
          email: data.basicInfo?.email || '',
        }
      }
    } catch { /* ignore */ }
    return {}
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: getDefaults(),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setError(null)

    if (!isSupabaseConfigured()) {
      setError('Database not configured. Please add your Supabase credentials to .env.local and restart the server.')
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          },
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        setIsLoading(false)
        return
      }

      // Save onboarding data if available (from eligibility check flow)
      const onboardingRaw = sessionStorage.getItem('onboardingData')
      const trustScoreRaw = sessionStorage.getItem('trustScoreResult')

      if (signUpData.user && onboardingRaw) {
        try {
          const onboardingData = JSON.parse(onboardingRaw)
          const basicInfo = onboardingData.basicInfo || {}

          // Create founder row
          await (supabase.from('founders') as ReturnType<typeof supabase.from>).insert({
            user_id: signUpData.user.id,
            email: data.email,
            full_name: data.fullName,
            phone: basicInfo.phone || null,
            country_of_origin: basicInfo.countryOfOrigin || '',
            country_of_residence: basicInfo.countryOfResidence || '',
            onboarding_completed: true,
          })

          // Save trust score if calculated
          if (trustScoreRaw) {
            const trustScore = JSON.parse(trustScoreRaw)
            const { data: founder } = await (supabase
              .from('founders') as ReturnType<typeof supabase.from>)
              .select('id')
              .eq('user_id', signUpData.user.id)
              .single()

            if (founder) {
              await (supabase.from('trust_scores') as ReturnType<typeof supabase.from>).insert({
                founder_id: (founder as { id: string }).id,
                total_score: trustScore.totalScore || 0,
                identity_score: trustScore.identityScore || 0,
                business_score: trustScore.businessScore || 0,
                digital_lineage_score: trustScore.digitalLineageScore || 0,
                network_score: trustScore.networkScore || 0,
                country_adjustment: trustScore.countryAdjustment || 0,
                status: trustScore.status || 'review_needed',
                score_breakdown: trustScore.breakdown || {},
                version: 2,
              })
            }
          }

          // Clean up session storage
          sessionStorage.removeItem('onboardingData')
          sessionStorage.removeItem('trustScoreResult')
        } catch {
          // Non-critical — account was still created
          console.error('Failed to save onboarding data')
        }
      }

      // Send welcome email (non-blocking)
      try {
        await fetch('/api/email/welcome', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: data.fullName, email: data.email }),
        })
      } catch {
        // Non-critical — account was still created
      }

      setIsSuccess(true)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      if (message === 'Load failed' || message.includes('fetch')) {
        setError('Cannot connect to the server. Please check that Supabase is configured in .env.local and restart the dev server.')
      } else {
        setError(message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090b] px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-40">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[128px]" />
          <div className="absolute top-20 right-1/4 w-80 h-80 bg-violet-600/25 rounded-full blur-[128px]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="relative w-full max-w-md">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 sm:p-10 backdrop-blur-sm text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <CheckCircle className="h-7 w-7 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Check your email</h1>
            <p className="mt-2 text-zinc-400">
              We&apos;ve sent you a confirmation link. Please check your email to verify your account.
            </p>
            <Link href="/login">
              <Button
                variant="ghost"
                className="mt-6 w-full border border-white/[0.15] text-zinc-200 hover:bg-white/[0.08] hover:border-white/[0.25] hover:text-white rounded-xl py-6 text-base backdrop-blur-sm"
              >
                Return to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090b] px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[128px]" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-violet-600/25 rounded-full blur-[128px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 sm:p-10 backdrop-blur-sm">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center justify-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 transition-transform duration-300 group-hover:scale-105">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-white">
                BedRock
              </span>
            </Link>
            <h1 className="mt-6 text-2xl font-bold text-white">Create an account</h1>
            <p className="mt-2 text-sm text-zinc-400">
              Start your journey to a US bank account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {error && (
              <Alert variant="destructive" className="border-red-500/20 bg-red-500/10 text-red-300">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-zinc-300">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="John Doe"
                {...register('fullName')}
                className="w-full rounded-xl border border-white/[0.1] bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
              />
              {errors.fullName && (
                <p className="text-sm text-red-400">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="founder@company.com"
                {...register('email')}
                className="w-full rounded-xl border border-white/[0.1] bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
              />
              {errors.email && (
                <p className="text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                className="w-full rounded-xl border border-white/[0.1] bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
              />
              {errors.password && (
                <p className="text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-300">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register('confirmPassword')}
                className="w-full rounded-xl border border-white/[0.1] bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-400">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:from-blue-400 hover:to-violet-500 rounded-xl py-6 text-base font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-zinc-500">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="text-zinc-400 underline hover:text-white transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-zinc-400 underline hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </p>

          <p className="mt-4 text-center text-sm text-zinc-400">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
