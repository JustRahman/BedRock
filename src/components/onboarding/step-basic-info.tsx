'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PhoneInput } from '@/components/ui/phone-input'
import { DatePicker } from '@/components/ui/date-picker'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  basicInfoSchema,
  BasicInfoFormData,
  countries,
} from '@/lib/validations/onboarding'
import { ArrowRight } from 'lucide-react'

interface StepBasicInfoProps {
  data: Partial<BasicInfoFormData>
  onNext: (data: BasicInfoFormData) => void
}

export function StepBasicInfo({ data, onNext }: StepBasicInfoProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BasicInfoFormData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: data,
  })

  const countryOfOrigin = watch('countryOfOrigin')
  const countryOfResidence = watch('countryOfResidence')

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-zinc-300">Full Legal Name</Label>
        <Input
          id="fullName"
          placeholder="As it appears on your passport"
          {...register('fullName')}
        />
        {errors.fullName && (
          <p className="text-sm text-red-400">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="founder@company.com"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-zinc-300">Phone Number</Label>
        <PhoneInput
          id="phone"
          value={watch('phone') || ''}
          onChange={(val) => setValue('phone', val, { shouldValidate: true })}
        />
        {errors.phone && (
          <p className="text-sm text-red-400">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-zinc-300">Country of Origin (Citizenship)</Label>
        <Select
          value={countryOfOrigin}
          onValueChange={(value) => setValue('countryOfOrigin', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your country of origin" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.countryOfOrigin && (
          <p className="text-sm text-red-400">{errors.countryOfOrigin.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-zinc-300">Country of Residence</Label>
        <Select
          value={countryOfResidence}
          onValueChange={(value) => setValue('countryOfResidence', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your current country of residence" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.countryOfResidence && (
          <p className="text-sm text-red-400">{errors.countryOfResidence.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth" className="text-zinc-300">Date of Birth</Label>
        <DatePicker
          id="dateOfBirth"
          value={watch('dateOfBirth') || ''}
          onChange={(val) => setValue('dateOfBirth', val, { shouldValidate: true })}
          placeholder="DD / MM / YYYY"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-zinc-300">Current Address</Label>
        <Input
          id="address"
          placeholder="Street address, city, country"
          {...register('address')}
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" variant="ghost" className="gap-2 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 hover:text-white text-white border-0 shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-shadow">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}
