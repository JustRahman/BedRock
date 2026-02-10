'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { identitySchema, IdentityFormData } from '@/lib/validations/onboarding'
import { ArrowLeft, ArrowRight, Upload, FileCheck } from 'lucide-react'
import { useState } from 'react'
import { storePendingUpload, type DocumentType } from '@/lib/pending-uploads'

const docTypeMap: Record<'passport' | 'localId' | 'addressProof', DocumentType> = {
  passport: 'passport',
  localId: 'local_id',
  addressProof: 'address_proof',
}

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
      storePendingUpload(docTypeMap[field], file)
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
      <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-4">
        <div className="flex items-start gap-4">
          <Checkbox
            id="hasPassport"
            checked={hasPassport}
            onCheckedChange={(checked) => setValue('hasPassport', !!checked)}
          />
          <div className="flex-1">
            <Label htmlFor="hasPassport" className="text-base font-medium text-zinc-200">
              Valid Passport
            </Label>
            <p className="mt-1 text-sm text-zinc-400">
              Upload a clear photo of your passport&apos;s ID page
            </p>
            {hasPassport && (
              <div className="mt-3">
                <label
                  htmlFor="passportFile"
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-white/[0.1] bg-white/[0.05] px-4 py-3 text-sm hover:bg-white/[0.08] transition-colors"
                >
                  {files.passport ? (
                    <>
                      <FileCheck className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-400">{files.passport.name}</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 text-zinc-500" />
                      <span className="text-zinc-400">Upload passport</span>
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

      <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-4">
        <div className="flex items-start gap-4">
          <Checkbox
            id="hasLocalId"
            checked={hasLocalId}
            onCheckedChange={(checked) => setValue('hasLocalId', !!checked)}
          />
          <div className="flex-1">
            <Label htmlFor="hasLocalId" className="text-base font-medium text-zinc-200">
              Local Government ID
            </Label>
            <p className="mt-1 text-sm text-zinc-400">
              Driver&apos;s license, national ID card, or similar document
            </p>
            {hasLocalId && (
              <div className="mt-3">
                <label
                  htmlFor="localIdFile"
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-white/[0.1] bg-white/[0.05] px-4 py-3 text-sm hover:bg-white/[0.08] transition-colors"
                >
                  {files.localId ? (
                    <>
                      <FileCheck className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-400">{files.localId.name}</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 text-zinc-500" />
                      <span className="text-zinc-400">Upload ID</span>
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

      <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-4">
        <div className="flex items-start gap-4">
          <Checkbox
            id="hasAddressProof"
            checked={hasAddressProof}
            onCheckedChange={(checked) => setValue('hasAddressProof', !!checked)}
          />
          <div className="flex-1">
            <Label htmlFor="hasAddressProof" className="text-base font-medium text-zinc-200">
              Proof of Address
            </Label>
            <p className="mt-1 text-sm text-zinc-400">
              Utility bill, bank statement, or official document showing your address
            </p>
            {hasAddressProof && (
              <div className="mt-3">
                <label
                  htmlFor="addressProofFile"
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-white/[0.1] bg-white/[0.05] px-4 py-3 text-sm hover:bg-white/[0.08] transition-colors"
                >
                  {files.addressProof ? (
                    <>
                      <FileCheck className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-400">{files.addressProof.name}</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 text-zinc-500" />
                      <span className="text-zinc-400">Upload proof</span>
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

      <p className="text-sm text-zinc-500">
        Your documents are encrypted and stored securely. We only share them with
        banks you authorize.
      </p>

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
