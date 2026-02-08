'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { digitalPresenceSchema, DigitalPresenceFormData } from '@/lib/validations/onboarding'
import { ArrowLeft, ArrowRight, Globe, Twitter } from 'lucide-react'

interface StepDigitalPresenceProps {
  data: Partial<DigitalPresenceFormData>
  onNext: (data: DigitalPresenceFormData) => void
  onBack: () => void
}

export function StepDigitalPresence({ data, onNext, onBack }: StepDigitalPresenceProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DigitalPresenceFormData>({
    resolver: zodResolver(digitalPresenceSchema),
    defaultValues: {
      website: data.website ?? '',
      twitterHandle: data.twitterHandle ?? '',
      otherSocialProfiles: data.otherSocialProfiles ?? '',
      appStoreUrl: data.appStoreUrl ?? '',
    },
  })

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Digital Presence</h3>
        <p className="mt-1 text-sm text-gray-600">
          Your online presence across websites and social platforms helps verify your
          identity through domain age and account history.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="website" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          Website URL
        </Label>
        <Input
          id="website"
          placeholder="https://yourcompany.com"
          {...register('website')}
        />
        {errors.website && (
          <p className="text-sm text-red-500">{errors.website.message}</p>
        )}
        <p className="text-xs text-gray-400">
          We check domain age and website history via WHOIS and Wayback Machine.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="twitterHandle" className="flex items-center gap-2">
          <Twitter className="h-4 w-4" />
          Twitter/X Handle
        </Label>
        <Input
          id="twitterHandle"
          placeholder="@yourhandle"
          {...register('twitterHandle')}
        />
        <p className="text-xs text-gray-400">
          We check account age and follower authenticity.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="otherSocialProfiles">Other Social Profiles</Label>
        <Input
          id="otherSocialProfiles"
          placeholder="Instagram, YouTube, personal blog, etc."
          {...register('otherSocialProfiles')}
        />
        <p className="text-xs text-gray-400">
          Any additional social profiles that demonstrate your digital presence.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="appStoreUrl">App Store URL (if applicable)</Label>
        <Input
          id="appStoreUrl"
          placeholder="https://apps.apple.com/app/..."
          {...register('appStoreUrl')}
        />
        {errors.appStoreUrl && (
          <p className="text-sm text-red-500">{errors.appStoreUrl.message}</p>
        )}
      </div>

      <p className="text-sm text-gray-500">
        All fields are optional. More digital presence data improves your score (up to 10 points).
      </p>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button type="submit" className="gap-2">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}
