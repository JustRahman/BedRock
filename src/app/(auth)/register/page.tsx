'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
            <CardDescription>
              We&apos;ve sent you a confirmation link. Please check your email to verify your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild variant="outline" className="w-full">
              <Link href="/login">Return to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <Link href="/" className="mx-auto flex items-center justify-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">Bedrock</span>
          </Link>
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Start your journey to a US bank account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                {...register('fullName')}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="founder@company.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
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
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-center text-xs text-gray-500">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
          </p>
          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
