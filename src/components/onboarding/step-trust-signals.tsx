'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { trustSignalsSchema, TrustSignalsFormData } from '@/lib/validations/onboarding'
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react'

interface StepTrustSignalsProps {
  data: Partial<TrustSignalsFormData>
  onSubmit: (data: TrustSignalsFormData) => void
  onBack: () => void
  isSubmitting?: boolean
}

export function StepTrustSignals({ data, onSubmit, onBack, isSubmitting }: StepTrustSignalsProps) {
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
      hasUniversityEmail: data.hasUniversityEmail ?? false,
      universityEmail: data.universityEmail ?? '',
      hasAccelerator: data.hasAccelerator ?? false,
      acceleratorName: data.acceleratorName ?? '',
      hasEmployerVerification: data.hasEmployerVerification ?? false,
      employerName: data.employerName ?? '',
    },
  })

  const hasReferral = watch('hasReferral')
  const hasUniversityEmail = watch('hasUniversityEmail')
  const hasAccelerator = watch('hasAccelerator')
  const hasEmployerVerification = watch('hasEmployerVerification')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <p className="text-sm text-zinc-400">
        These optional signals can boost your Trust Score and improve your chances of
        approval. The more you provide, the better!
      </p>

      <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-4">
        <div className="flex items-start gap-4">
          <Checkbox
            id="hasReferral"
            checked={hasReferral}
            onCheckedChange={(checked) => setValue('hasReferral', !!checked)}
          />
          <div className="flex-1">
            <Label htmlFor="hasReferral" className="text-base font-medium text-zinc-200">
              Referral from Verified Founder
            </Label>
            <p className="mt-1 text-sm text-zinc-400">
              Were you referred by a verified BedRock founder?
            </p>
            {hasReferral && (
              <div className="mt-3">
                <Input
                  placeholder="Enter referral code"
                  {...register('referralCode')}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-4">
        <div className="flex items-start gap-4">
          <Checkbox
            id="hasUniversityEmail"
            checked={hasUniversityEmail}
            onCheckedChange={(checked) => setValue('hasUniversityEmail', !!checked)}
          />
          <div className="flex-1">
            <Label htmlFor="hasUniversityEmail" className="text-base font-medium text-zinc-200">
              University/Educational Email
            </Label>
            <p className="mt-1 text-sm text-zinc-400">
              Do you have access to a .edu or university email?
            </p>
            {hasUniversityEmail && (
              <div className="mt-3">
                <Input
                  type="email"
                  placeholder="your.name@university.edu"
                  {...register('universityEmail')}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-4">
        <div className="flex items-start gap-4">
          <Checkbox
            id="hasAccelerator"
            checked={hasAccelerator}
            onCheckedChange={(checked) => setValue('hasAccelerator', !!checked)}
          />
          <div className="flex-1">
            <Label htmlFor="hasAccelerator" className="text-base font-medium text-zinc-200">
              Startup Accelerator/Incubator
            </Label>
            <p className="mt-1 text-sm text-zinc-400">
              Are you part of or graduate of an accelerator program?
            </p>
            {hasAccelerator && (
              <div className="mt-3">
                <Input
                  placeholder="Y Combinator, Techstars, 500 Startups, etc."
                  {...register('acceleratorName')}
                />
              </div>
            )}
          </div>
        </div>
      </div>

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
              Can a current or previous employer verify your identity?
            </p>
            {hasEmployerVerification && (
              <div className="mt-3">
                <Input
                  placeholder="Company name"
                  {...register('employerName')}
                />
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
