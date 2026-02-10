'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { identitySchema, IdentityFormData } from '@/lib/validations/onboarding'
import { ArrowLeft, ArrowRight, Upload, FileCheck, Loader2, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { storePendingUpload, type DocumentType } from '@/lib/pending-uploads'
import { FaceScan, type FaceMatchResult } from './face-scan'

const docTypeMap: Record<'passport' | 'localId' | 'addressProof', DocumentType> = {
  passport: 'passport',
  localId: 'local_id',
  addressProof: 'address_proof',
}

type DocField = 'passport' | 'localId' | 'addressProof'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExtractedData = Record<string, any>

interface ExtractionState {
  loading: boolean
  data: ExtractedData | null
  error: string | null
}

const STORAGE_KEY = 'identity_extraction'

const FIELD_LABELS: Record<string, string> = {
  fullName: 'Full Name',
  firstName: 'First Name',
  lastName: 'Last Name',
  middleName: 'Middle Name',
  dateOfBirth: 'Date of Birth',
  gender: 'Gender',
  placeOfBirth: 'Place of Birth',
  nationality: 'Nationality',
  passportNumber: 'Passport Number',
  expiryDate: 'Expiry Date',
  issuingCountry: 'Issuing Country',
  idNumber: 'ID Number',
  address: 'Address',
  issuingAuthority: 'Issuing Authority',
  city: 'City',
  state: 'State',
  postalCode: 'Postal Code',
  country: 'Country',
  documentDate: 'Document Date',
  issuingCompany: 'Issuing Company',
}

function loadSavedExtractions(): Record<DocField, ExtractedData | null> {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {
    // ignore
  }
  return { passport: null, localId: null, addressProof: null }
}

function saveExtractions(extractions: Record<DocField, ExtractedData | null>) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(extractions))
  } catch {
    // ignore
  }
}

function normalizeName(s: string): string[] {
  return s.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(Boolean).sort()
}

function namesMatch(extracted: string, expected: string): 'match' | 'mismatch' {
  const eParts = normalizeName(extracted)
  const xParts = normalizeName(expected)
  // Exact match (sorted parts)
  if (eParts.join(' ') === xParts.join(' ')) return 'match'
  // All parts of one contained in the other (handles middle names)
  const eSet = new Set(eParts)
  const xSet = new Set(xParts)
  if (xParts.every((p) => eSet.has(p)) || eParts.every((p) => xSet.has(p))) return 'match'
  // At least 2 parts overlap (first + last)
  if (xParts.filter((p) => eSet.has(p)).length >= 2) return 'match'
  return 'mismatch'
}

function datesMatch(extracted: string, expected: string): 'match' | 'mismatch' {
  const norm = (d: string) => {
    const date = new Date(d)
    if (isNaN(date.getTime())) return d.trim()
    return date.toISOString().split('T')[0]
  }
  return norm(extracted) === norm(expected) ? 'match' : 'mismatch'
}

interface BasicInfoForComparison {
  fullName?: string
  dateOfBirth?: string
}

function ExtractionResult({ state, onRetry, basicInfo }: { state: ExtractionState; onRetry: () => void; basicInfo?: BasicInfoForComparison }) {
  if (state.loading) {
    return (
      <div className="mt-3 flex items-center gap-2 rounded-md border border-blue-500/20 bg-blue-500/5 px-4 py-3 text-sm text-blue-300">
        <Loader2 className="h-4 w-4 animate-spin" />
        Analyzing document...
      </div>
    )
  }

  if (state.error) {
    return (
      <div className="mt-3 rounded-md border border-orange-500/20 bg-orange-500/5 p-4">
        <div className="flex items-center gap-2 text-sm text-orange-300">
          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
          {state.error}
        </div>
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 text-xs text-orange-400 underline hover:text-orange-300"
        >
          Try uploading a different image
        </button>
      </div>
    )
  }

  if (state.data) {
    const entries = Object.entries(state.data).filter(([, v]) => v != null && v !== '')
    if (entries.length === 0) return null

    return (
      <div className="mt-3 rounded-md border border-emerald-500/20 bg-emerald-500/5 p-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-emerald-400">
          Extracted Information
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {entries.map(([key, value]) => (
            <div key={key} className="min-w-0">
              <span className="text-[11px] text-zinc-500">{FIELD_LABELS[key] || key}</span>
              <p className="truncate text-sm text-zinc-200">{String(value)}</p>
            </div>
          ))}
        </div>
        {basicInfo?.fullName && (() => {
          const extractedName = state.data?.fullName || state.data?.firstName && state.data?.lastName
            ? [state.data?.firstName, state.data?.lastName].filter(Boolean).join(' ')
            : null
          const extractedDob = state.data?.dateOfBirth
          if (!extractedName && !extractedDob) return null
          return (
            <div className="mt-3 space-y-1.5 border-t border-white/[0.06] pt-3">
              {extractedName ? (
                namesMatch(String(extractedName), basicInfo.fullName!) === 'match' ? (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <CheckCircle className="h-3.5 w-3.5" />
                    Name matches your profile
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-orange-400">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Name does not match your profile
                  </div>
                )
              ) : null}
              {extractedDob && basicInfo.dateOfBirth ? (
                datesMatch(String(extractedDob), basicInfo.dateOfBirth) === 'match' ? (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <CheckCircle className="h-3.5 w-3.5" />
                    Date of birth matches
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-orange-400">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Date of birth does not match
                  </div>
                )
              ) : null}
            </div>
          )
        })()}
      </div>
    )
  }

  return null
}

interface StepIdentityProps {
  data: Partial<IdentityFormData>
  basicInfo?: { fullName?: string; dateOfBirth?: string }
  onNext: (data: IdentityFormData) => void
  onBack: () => void
}

export function StepIdentity({ data, basicInfo, onNext, onBack }: StepIdentityProps) {
  const [files, setFiles] = useState<{
    passport?: File
    localId?: File
    addressProof?: File
  }>({})

  const [extractions, setExtractions] = useState<Record<DocField, ExtractionState>>({
    passport: { loading: false, data: null, error: null },
    localId: { loading: false, data: null, error: null },
    addressProof: { loading: false, data: null, error: null },
  })

  const [faceMatchResult, setFaceMatchResult] = useState<FaceMatchResult | null>(() => {
    try {
      const saved = sessionStorage.getItem('identity_face_match')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })

  // Restore saved extractions on mount
  useEffect(() => {
    const saved = loadSavedExtractions()
    setExtractions((prev) => ({
      passport: saved.passport ? { loading: false, data: saved.passport, error: null } : prev.passport,
      localId: saved.localId ? { loading: false, data: saved.localId, error: null } : prev.localId,
      addressProof: saved.addressProof ? { loading: false, data: saved.addressProof, error: null } : prev.addressProof,
    }))
  }, [])

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
      hasLivenessCheck: data.hasLivenessCheck ?? faceMatchResult?.matched ?? false,
    },
  })

  const hasPassport = watch('hasPassport')
  const hasLocalId = watch('hasLocalId')
  const hasAddressProof = watch('hasAddressProof')

  const extractDocument = useCallback(async (file: File, field: DocField) => {
    setExtractions((prev) => ({
      ...prev,
      [field]: { loading: true, data: null, error: null },
    }))

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('documentType', docTypeMap[field])

      const res = await fetch('/api/verify/document-extract', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error || 'Extraction failed')
      }

      const { extracted } = await res.json()

      setExtractions((prev) => {
        const updated = {
          ...prev,
          [field]: { loading: false, data: extracted, error: null },
        }
        // Persist to sessionStorage
        saveExtractions({
          passport: updated.passport.data,
          localId: updated.localId.data,
          addressProof: updated.addressProof.data,
        })
        return updated
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to analyze document'
      setExtractions((prev) => ({
        ...prev,
        [field]: { loading: false, data: null, error: message },
      }))
    }
  }, [])

  const handleFileChange = (field: DocField) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      setFiles((prev) => ({ ...prev, [field]: file }))
      setValue(`${field}File` as keyof IdentityFormData, file)
      storePendingUpload(docTypeMap[field], file)

      // Only extract from images, not PDFs
      if (file.type.startsWith('image/')) {
        extractDocument(file, field)
      }
    }
  }

  const handleRetry = (field: DocField) => {
    // Clear current extraction state and trigger file input click
    setExtractions((prev) => ({
      ...prev,
      [field]: { loading: false, data: null, error: null },
    }))
    setFiles((prev) => {
      const updated = { ...prev }
      delete updated[field]
      return updated
    })
    // Reset the file input
    const input = document.getElementById(`${field}File`) as HTMLInputElement
    if (input) {
      input.value = ''
      input.click()
    }
  }

  const handleFaceMatchResult = useCallback((result: FaceMatchResult) => {
    setFaceMatchResult(result)
    setValue('hasLivenessCheck', result.matched)
    try {
      sessionStorage.setItem('identity_face_match', JSON.stringify(result))
    } catch { /* ignore */ }
  }, [setValue])

  const onSubmit = (formData: IdentityFormData) => {
    onNext({
      ...formData,
      hasLivenessCheck: formData.hasLivenessCheck ?? faceMatchResult?.matched ?? false,
      passportFile: files.passport,
      localIdFile: files.localId,
      addressProofFile: files.addressProof,
      passportData: extractions.passport.data,
      localIdData: extractions.localId.data,
      addressProofData: extractions.addressProof.data,
    })
  }

  // Suppress unused-vars — errors object is required by react-hook-form but we display no field errors
  void errors

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
                <ExtractionResult
                  state={extractions.passport}
                  onRetry={() => handleRetry('passport')}
                  basicInfo={basicInfo}
                />
                {files.passport && files.passport.type.startsWith('image/') && extractions.passport.data && !faceMatchResult && (
                  <FaceScan
                    passportFile={files.passport}
                    onMatchResult={handleFaceMatchResult}
                  />
                )}
                {faceMatchResult?.matched && (
                  <div className="mt-3 flex items-center gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-400">
                    <CheckCircle className="h-4 w-4" />
                    Face verification complete (+4 trust points)
                  </div>
                )}
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
                <ExtractionResult
                  state={extractions.localId}
                  onRetry={() => handleRetry('localId')}
                  basicInfo={basicInfo}
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
                <ExtractionResult
                  state={extractions.addressProof}
                  onRetry={() => handleRetry('addressProof')}
                  basicInfo={basicInfo}
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
