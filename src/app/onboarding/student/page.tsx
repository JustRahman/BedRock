'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Shield, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface StudentData {
  // Step 1 - Basic Info
  fullName: string
  email: string
  phone: string
  dateOfBirth: string
  citizenship: string
  // Step 2 - Student Info
  visaType: string
  universityName: string
  graduationYear: string
  arrivalDate: string
  // Step 3 - Tax Situation
  taxYear: string
  hadIncome: string
  incomeTypes: string[]
}

const emptyData: StudentData = {
  fullName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  citizenship: '',
  visaType: '',
  universityName: '',
  graduationYear: '',
  arrivalDate: '',
  taxYear: new Date().getFullYear().toString(),
  hadIncome: '',
  incomeTypes: [],
}

const steps = [
  { id: 1, name: 'Basic Info' },
  { id: 2, name: 'Student Info' },
  { id: 3, name: 'Tax Situation' },
]

function toggleArray(arr: string[], value: string): string[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
}

export default function StudentOnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [data, setData] = useState<StudentData>(emptyData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const update = (updates: Partial<StudentData>) => {
    setData((prev) => ({ ...prev, ...updates }))
  }

  const handleComplete = async () => {
    setIsSubmitting(true)
    try {
      // Store onboarding data for the ensure endpoint
      const onboardingData = {
        basicInfo: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          dateOfBirth: data.dateOfBirth,
          countryOfOrigin: data.citizenship,
          countryOfResidence: 'US',
        },
        studentInfo: {
          visaType: data.visaType,
          universityName: data.universityName,
          graduationYear: data.graduationYear,
          arrivalDate: data.arrivalDate,
        },
        taxSituation: {
          taxYear: data.taxYear,
          hadIncome: data.hadIncome,
          incomeTypes: data.incomeTypes,
        },
      }

      // Save all data for the ensure endpoint on dashboard
      localStorage.setItem('onboardingData', JSON.stringify(onboardingData))
      localStorage.setItem('student_role', 'student')

      // Go straight to register — trust score is optional, students can do it later
      router.push('/register')
    } catch {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090b] px-4 py-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-600/30 rounded-full blur-[128px]" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-blue-600/25 rounded-full blur-[128px]" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative w-full max-w-lg">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-flex items-center justify-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-blue-600 transition-transform duration-300 group-hover:scale-105">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-white">BedRock</span>
            </Link>
            <h1 className="mt-4 text-xl font-bold text-white">Student Onboarding</h1>
            <p className="mt-1 text-sm text-zinc-400">
              {step === 1 ? 'Tell us about yourself' : step === 2 ? 'Your student details' : 'Your tax situation'}
            </p>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-6">
            {steps.map((s) => (
              <div key={s.id} className="flex-1">
                <div className={`h-1 rounded-full transition-colors ${s.id <= step ? 'bg-teal-500' : 'bg-zinc-800'}`} />
                <p className={`mt-1 text-[10px] ${s.id <= step ? 'text-teal-400' : 'text-zinc-600'}`}>{s.name}</p>
              </div>
            ))}
          </div>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-zinc-300">Full Name *</Label>
                <Input
                  id="fullName"
                  value={data.fullName}
                  onChange={(e) => update({ fullName: e.target.value })}
                  placeholder="Your full legal name"
                  className="border-white/[0.1] bg-white/[0.05] text-white placeholder-zinc-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => update({ email: e.target.value })}
                  placeholder="your@university.edu"
                  className="border-white/[0.1] bg-white/[0.05] text-white placeholder-zinc-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-zinc-300">Phone</Label>
                  <Input
                    id="phone"
                    value={data.phone}
                    onChange={(e) => update({ phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="border-white/[0.1] bg-white/[0.05] text-white placeholder-zinc-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob" className="text-zinc-300">Date of Birth *</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={data.dateOfBirth}
                    onChange={(e) => update({ dateOfBirth: e.target.value })}
                    className="border-white/[0.1] bg-white/[0.05] text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="citizenship" className="text-zinc-300">Country of Citizenship *</Label>
                <Input
                  id="citizenship"
                  value={data.citizenship}
                  onChange={(e) => update({ citizenship: e.target.value })}
                  placeholder="e.g. India, China, South Korea"
                  className="border-white/[0.1] bg-white/[0.05] text-white placeholder-zinc-500"
                />
              </div>
              <div className="flex justify-end pt-2">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!data.fullName || !data.email || !data.dateOfBirth || !data.citizenship}
                  className="gap-2 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500"
                >
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Student Info */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-zinc-300">Visa Type *</Label>
                <div className="grid grid-cols-3 gap-2">
                  {['F-1', 'J-1', 'Other'].map((visa) => (
                    <label
                      key={visa}
                      className={`flex items-center justify-center gap-2 rounded-lg border p-3 cursor-pointer transition-colors text-sm ${
                        data.visaType === visa
                          ? 'border-teal-500 bg-teal-500/10 text-white'
                          : 'border-white/[0.1] text-zinc-400 hover:border-zinc-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="visaType"
                        value={visa}
                        checked={data.visaType === visa}
                        onChange={() => update({ visaType: visa })}
                        className="sr-only"
                      />
                      {visa}
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="university" className="text-zinc-300">University Name *</Label>
                <Input
                  id="university"
                  value={data.universityName}
                  onChange={(e) => update({ universityName: e.target.value })}
                  placeholder="e.g. MIT, Stanford, NYU"
                  className="border-white/[0.1] bg-white/[0.05] text-white placeholder-zinc-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="gradYear" className="text-zinc-300">Expected Graduation</Label>
                  <Input
                    id="gradYear"
                    value={data.graduationYear}
                    onChange={(e) => update({ graduationYear: e.target.value })}
                    placeholder="e.g. 2027"
                    className="border-white/[0.1] bg-white/[0.05] text-white placeholder-zinc-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="arrival" className="text-zinc-300">US Arrival Date *</Label>
                  <Input
                    id="arrival"
                    type="date"
                    value={data.arrivalDate}
                    onChange={(e) => update({ arrivalDate: e.target.value })}
                    className="border-white/[0.1] bg-white/[0.05] text-white"
                  />
                </div>
              </div>
              <div className="flex justify-between pt-2">
                <Button variant="outline" onClick={() => setStep(1)} className="gap-2 border-white/[0.1] text-zinc-300 hover:bg-white/[0.05]">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!data.visaType || !data.universityName || !data.arrivalDate}
                  className="gap-2 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500"
                >
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Tax Situation */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="taxYear" className="text-zinc-300">Tax Year *</Label>
                <Input
                  id="taxYear"
                  value={data.taxYear}
                  onChange={(e) => update({ taxYear: e.target.value })}
                  placeholder="2025"
                  className="border-white/[0.1] bg-white/[0.05] text-white placeholder-zinc-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-300">Did you have US income this tax year? *</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'no', label: 'No income' },
                    { value: 'yes', label: 'Yes, I had income' },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center justify-center gap-2 rounded-lg border p-3 cursor-pointer transition-colors text-sm ${
                        data.hadIncome === opt.value
                          ? 'border-teal-500 bg-teal-500/10 text-white'
                          : 'border-white/[0.1] text-zinc-400 hover:border-zinc-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="hadIncome"
                        value={opt.value}
                        checked={data.hadIncome === opt.value}
                        onChange={() => update({ hadIncome: opt.value, incomeTypes: opt.value === 'no' ? [] : data.incomeTypes })}
                        className="sr-only"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              {data.hadIncome === 'yes' && (
                <div className="space-y-2">
                  <Label className="text-zinc-300">What types of income?</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { value: 'w2', label: 'W-2 (employment / CPT / OPT)' },
                      { value: '1042s', label: '1042-S (scholarship / fellowship)' },
                      { value: 'scholarship', label: 'Scholarship / grant (taxable portion)' },
                      { value: 'other', label: 'Other income' },
                    ].map((type) => (
                      <label
                        key={type.value}
                        className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors text-sm ${
                          data.incomeTypes.includes(type.value)
                            ? 'border-teal-500 bg-teal-500/10 text-white'
                            : 'border-white/[0.1] text-zinc-400 hover:border-zinc-600'
                        }`}
                      >
                        <div className={`h-4 w-4 rounded border-2 flex items-center justify-center ${
                          data.incomeTypes.includes(type.value) ? 'border-teal-500 bg-teal-500' : 'border-zinc-600'
                        }`}>
                          {data.incomeTypes.includes(type.value) && (
                            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        {type.label}
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={data.incomeTypes.includes(type.value)}
                          onChange={() => update({ incomeTypes: toggleArray(data.incomeTypes, type.value) })}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-lg border border-teal-800/30 bg-teal-950/20 p-3 mt-2">
                <p className="text-xs text-teal-400/80 leading-relaxed">
                  {data.hadIncome === 'yes'
                    ? 'You\'ll need Form 8843 + 1040-NR (and possibly a state return). We\'ll handle it all.'
                    : 'Even with $0 income, you must file Form 8843. It\'s free and takes 5 minutes on our end.'}
                </p>
              </div>

              <div className="flex justify-between pt-2">
                <Button variant="outline" onClick={() => setStep(2)} className="gap-2 border-white/[0.1] text-zinc-300 hover:bg-white/[0.05]">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={isSubmitting || !data.hadIncome}
                  className="gap-2 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Setting up...
                    </>
                  ) : (
                    <>
                      Go to Dashboard <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
