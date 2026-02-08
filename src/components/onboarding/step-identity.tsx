'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { identitySchema, IdentityFormData } from '@/lib/validations/onboarding'
import { ArrowLeft, ArrowRight, Upload, FileCheck } from 'lucide-react'
import { useState } from 'react'

interface StepIdentityProps {
  data: Partial<IdentityFormData>
  onNext: (data: IdentityFormData) => void
  onBack: () => void
}

export function StepIdentity({ data, onNext, onBack }: StepIdentityProps) {
  const [files, setFiles] = useState<{
    passport?: File
    localId?: File
    addressProof?: File
  }>({})

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IdentityFormData>({
    resolver: zodResolver(identitySchema),
    defaultValues: {
      hasPassport: data.hasPassport ?? false,
      hasLocalId: data.hasLocalId ?? false,
      hasAddressProof: data.hasAddressProof ?? false,
    },
  })

  const hasPassport = watch('hasPassport')
  const hasLocalId = watch('hasLocalId')
  const hasAddressProof = watch('hasAddressProof')

  const handleFileChange = (field: 'passport' | 'localId' | 'addressProof') => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      setFiles((prev) => ({ ...prev, [field]: file }))
      setValue(`${field}File` as keyof IdentityFormData, file)
    }
  }

  const onSubmit = (formData: IdentityFormData) => {
    onNext({
      ...formData,
      passportFile: files.passport,
      localIdFile: files.localId,
      addressProofFile: files.addressProof,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="rounded-lg border border-gray-200 p-4">
        <div className="flex items-start gap-4">
          <Checkbox
            id="hasPassport"
            checked={hasPassport}
            onCheckedChange={(checked) => setValue('hasPassport', !!checked)}
          />
          <div className="flex-1">
            <Label htmlFor="hasPassport" className="text-base font-medium">
              Valid Passport
            </Label>
            <p className="mt-1 text-sm text-gray-500">
              Upload a clear photo of your passport&apos;s ID page
            </p>
            {hasPassport && (
              <div className="mt-3">
                <label
                  htmlFor="passportFile"
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm hover:bg-gray-100"
                >
                  {files.passport ? (
                    <>
                      <FileCheck className="h-4 w-4 text-green-600" />
                      <span className="text-green-600">{files.passport.name}</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Upload passport</span>
                    </>
                  )}
                </label>
                <input
                  id="passportFile"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange('passport')}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 p-4">
        <div className="flex items-start gap-4">
          <Checkbox
            id="hasLocalId"
            checked={hasLocalId}
            onCheckedChange={(checked) => setValue('hasLocalId', !!checked)}
          />
          <div className="flex-1">
            <Label htmlFor="hasLocalId" className="text-base font-medium">
              Local Government ID
            </Label>
            <p className="mt-1 text-sm text-gray-500">
              Driver&apos;s license, national ID card, or similar document
            </p>
            {hasLocalId && (
              <div className="mt-3">
                <label
                  htmlFor="localIdFile"
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm hover:bg-gray-100"
                >
                  {files.localId ? (
                    <>
                      <FileCheck className="h-4 w-4 text-green-600" />
                      <span className="text-green-600">{files.localId.name}</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Upload ID</span>
                    </>
                  )}
                </label>
                <input
                  id="localIdFile"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange('localId')}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 p-4">
        <div className="flex items-start gap-4">
          <Checkbox
            id="hasAddressProof"
            checked={hasAddressProof}
            onCheckedChange={(checked) => setValue('hasAddressProof', !!checked)}
          />
          <div className="flex-1">
            <Label htmlFor="hasAddressProof" className="text-base font-medium">
              Proof of Address
            </Label>
            <p className="mt-1 text-sm text-gray-500">
              Utility bill, bank statement, or official document showing your address
            </p>
            {hasAddressProof && (
              <div className="mt-3">
                <label
                  htmlFor="addressProofFile"
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm hover:bg-gray-100"
                >
                  {files.addressProof ? (
                    <>
                      <FileCheck className="h-4 w-4 text-green-600" />
                      <span className="text-green-600">{files.addressProof.name}</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Upload proof</span>
                    </>
                  )}
                </label>
                <input
                  id="addressProofFile"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange('addressProof')}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        Your documents are encrypted and stored securely. We only share them with
        banks you authorize.
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
