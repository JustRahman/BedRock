'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
        <Label htmlFor="fullName">Full Legal Name</Label>
        <Input
          id="fullName"
          placeholder="As it appears on your passport"
          {...register('fullName')}
        />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
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
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+1 234 567 8900"
          {...register('phone')}
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Country of Origin (Citizenship)</Label>
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
          <p className="text-sm text-red-500">{errors.countryOfOrigin.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Country of Residence</Label>
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
          <p className="text-sm text-red-500">{errors.countryOfResidence.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input
          id="dateOfBirth"
          type="date"
          {...register('dateOfBirth')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Current Address</Label>
        <Input
          id="address"
          placeholder="Street address, city, country"
          {...register('address')}
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" className="gap-2">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}
