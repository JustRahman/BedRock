'use client'

import { useState, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

const countryCodes = [
  { code: '+1', country: 'US', flag: '🇺🇸', label: 'United States' },
  { code: '+1', country: 'CA', flag: '🇨🇦', label: 'Canada' },
  { code: '+44', country: 'GB', flag: '🇬🇧', label: 'United Kingdom' },
  { code: '+49', country: 'DE', flag: '🇩🇪', label: 'Germany' },
  { code: '+33', country: 'FR', flag: '🇫🇷', label: 'France' },
  { code: '+91', country: 'IN', flag: '🇮🇳', label: 'India' },
  { code: '+86', country: 'CN', flag: '🇨🇳', label: 'China' },
  { code: '+81', country: 'JP', flag: '🇯🇵', label: 'Japan' },
  { code: '+82', country: 'KR', flag: '🇰🇷', label: 'South Korea' },
  { code: '+61', country: 'AU', flag: '🇦🇺', label: 'Australia' },
  { code: '+55', country: 'BR', flag: '🇧🇷', label: 'Brazil' },
  { code: '+52', country: 'MX', flag: '🇲🇽', label: 'Mexico' },
  { code: '+34', country: 'ES', flag: '🇪🇸', label: 'Spain' },
  { code: '+39', country: 'IT', flag: '🇮🇹', label: 'Italy' },
  { code: '+31', country: 'NL', flag: '🇳🇱', label: 'Netherlands' },
  { code: '+46', country: 'SE', flag: '🇸🇪', label: 'Sweden' },
  { code: '+47', country: 'NO', flag: '🇳🇴', label: 'Norway' },
  { code: '+45', country: 'DK', flag: '🇩🇰', label: 'Denmark' },
  { code: '+41', country: 'CH', flag: '🇨🇭', label: 'Switzerland' },
  { code: '+43', country: 'AT', flag: '🇦🇹', label: 'Austria' },
  { code: '+48', country: 'PL', flag: '🇵🇱', label: 'Poland' },
  { code: '+351', country: 'PT', flag: '🇵🇹', label: 'Portugal' },
  { code: '+353', country: 'IE', flag: '🇮🇪', label: 'Ireland' },
  { code: '+358', country: 'FI', flag: '🇫🇮', label: 'Finland' },
  { code: '+7', country: 'RU', flag: '🇷🇺', label: 'Russia' },
  { code: '+7', country: 'KZ', flag: '🇰🇿', label: 'Kazakhstan' },
  { code: '+380', country: 'UA', flag: '🇺🇦', label: 'Ukraine' },
  { code: '+90', country: 'TR', flag: '🇹🇷', label: 'Turkey' },
  { code: '+972', country: 'IL', flag: '🇮🇱', label: 'Israel' },
  { code: '+971', country: 'AE', flag: '🇦🇪', label: 'UAE' },
  { code: '+966', country: 'SA', flag: '🇸🇦', label: 'Saudi Arabia' },
  { code: '+20', country: 'EG', flag: '🇪🇬', label: 'Egypt' },
  { code: '+27', country: 'ZA', flag: '🇿🇦', label: 'South Africa' },
  { code: '+234', country: 'NG', flag: '🇳🇬', label: 'Nigeria' },
  { code: '+254', country: 'KE', flag: '🇰🇪', label: 'Kenya' },
  { code: '+62', country: 'ID', flag: '🇮🇩', label: 'Indonesia' },
  { code: '+63', country: 'PH', flag: '🇵🇭', label: 'Philippines' },
  { code: '+65', country: 'SG', flag: '🇸🇬', label: 'Singapore' },
  { code: '+66', country: 'TH', flag: '🇹🇭', label: 'Thailand' },
  { code: '+60', country: 'MY', flag: '🇲🇾', label: 'Malaysia' },
  { code: '+84', country: 'VN', flag: '🇻🇳', label: 'Vietnam' },
  { code: '+92', country: 'PK', flag: '🇵🇰', label: 'Pakistan' },
  { code: '+880', country: 'BD', flag: '🇧🇩', label: 'Bangladesh' },
  { code: '+94', country: 'LK', flag: '🇱🇰', label: 'Sri Lanka' },
  { code: '+993', country: 'TM', flag: '🇹🇲', label: 'Turkmenistan' },
  { code: '+998', country: 'UZ', flag: '🇺🇿', label: 'Uzbekistan' },
  { code: '+995', country: 'GE', flag: '🇬🇪', label: 'Georgia' },
  { code: '+994', country: 'AZ', flag: '🇦🇿', label: 'Azerbaijan' },
  { code: '+374', country: 'AM', flag: '🇦🇲', label: 'Armenia' },
  { code: '+996', country: 'KG', flag: '🇰🇬', label: 'Kyrgyzstan' },
  { code: '+992', country: 'TJ', flag: '🇹🇯', label: 'Tajikistan' },
  { code: '+57', country: 'CO', flag: '🇨🇴', label: 'Colombia' },
  { code: '+56', country: 'CL', flag: '🇨🇱', label: 'Chile' },
  { code: '+54', country: 'AR', flag: '🇦🇷', label: 'Argentina' },
  { code: '+51', country: 'PE', flag: '🇵🇪', label: 'Peru' },
]

// Format local number digits into groups: (XXX)-XXX-XXXX or XXX-XXX-XXXX
function formatLocal(digits: string, dialCode: string): string {
  if (!digits) return ''

  // US/Canada/NANP (+1): (XXX)-XXX-XXXX
  if (dialCode === '+1') {
    if (digits.length <= 3) return `(${digits}`
    if (digits.length <= 6) return `(${digits.slice(0, 3)})-${digits.slice(3)}`
    return `(${digits.slice(0, 3)})-${digits.slice(3, 6)}-${digits.slice(6, 10)}`
  }

  // Russia/KZ (+7): (XXX)-XXX-XX-XX
  if (dialCode === '+7') {
    if (digits.length <= 3) return `(${digits}`
    if (digits.length <= 6) return `(${digits.slice(0, 3)})-${digits.slice(3)}`
    if (digits.length <= 8) return `(${digits.slice(0, 3)})-${digits.slice(3, 6)}-${digits.slice(6)}`
    return `(${digits.slice(0, 3)})-${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8, 10)}`
  }

  // Generic: XXX-XXX-XXXX
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`
}

interface PhoneInputProps {
  value?: string
  onChange?: (value: string) => void
  id?: string
  className?: string
}

export function PhoneInput({ value = '', onChange, id, className }: PhoneInputProps) {
  // Parse initial value: try to extract country code and local number
  const parseInitial = (v: string) => {
    const digits = v.replace(/\D/g, '')
    // Try to find matching country code
    for (const cc of countryCodes) {
      const codeDigits = cc.code.replace('+', '')
      if (digits.startsWith(codeDigits)) {
        return { selected: cc, local: digits.slice(codeDigits.length) }
      }
    }
    return { selected: countryCodes[0], local: digits }
  }

  const initial = parseInitial(value)
  const [selected, setSelected] = useState(initial.selected)
  const [localDigits, setLocalDigits] = useState(initial.local)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [search, setSearch] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const emitChange = useCallback((code: string, local: string) => {
    const full = local ? `${code}${local}` : ''
    onChange?.(full)
  }, [onChange])

  const handleLocalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 10)
    setLocalDigits(raw)
    emitChange(selected.code, raw)
  }

  const handleSelectCode = (cc: typeof countryCodes[0]) => {
    setSelected(cc)
    setDropdownOpen(false)
    setSearch('')
    emitChange(cc.code, localDigits)
    inputRef.current?.focus()
  }

  const filtered = search
    ? countryCodes.filter(
        (cc) =>
          cc.label.toLowerCase().includes(search.toLowerCase()) ||
          cc.code.includes(search) ||
          cc.country.toLowerCase().includes(search.toLowerCase())
      )
    : countryCodes

  return (
    <div className={cn('relative flex', className)}>
      {/* Country code selector */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex h-9 items-center gap-1 rounded-l-md border border-r-0 border-white/[0.1] bg-white/[0.05] px-2.5 text-sm text-zinc-300 hover:bg-white/[0.08] transition-colors"
        >
          <span className="text-base leading-none">{selected.flag}</span>
          <span className="text-zinc-400">{selected.code}</span>
          <ChevronDown className="h-3 w-3 text-zinc-500" />
        </button>

        {dropdownOpen && (
          <>
            {/* Backdrop to close dropdown */}
            <div className="fixed inset-0 z-40" onClick={() => { setDropdownOpen(false); setSearch('') }} />
            <div
              ref={dropdownRef}
              className="absolute left-0 top-full z-50 mt-1 w-64 rounded-lg border border-white/[0.1] bg-[#1a1a1f] shadow-xl overflow-hidden"
            >
              <div className="p-2">
                <input
                  type="text"
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search country..."
                  className="w-full rounded-md border border-white/[0.1] bg-white/[0.05] px-3 py-1.5 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-blue-500/50"
                />
              </div>
              <div className="max-h-52 overflow-y-auto">
                {filtered.map((cc) => (
                  <button
                    key={`${cc.country}-${cc.code}`}
                    type="button"
                    onClick={() => handleSelectCode(cc)}
                    className={cn(
                      'flex w-full items-center gap-2.5 px-3 py-2 text-sm hover:bg-white/[0.06] transition-colors',
                      selected.country === cc.country && selected.code === cc.code
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'text-zinc-300'
                    )}
                  >
                    <span className="text-base leading-none">{cc.flag}</span>
                    <span className="flex-1 text-left">{cc.label}</span>
                    <span className="text-zinc-500">{cc.code}</span>
                  </button>
                ))}
                {filtered.length === 0 && (
                  <p className="px-3 py-4 text-center text-sm text-zinc-500">No results</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Local number input */}
      <input
        ref={inputRef}
        id={id}
        type="tel"
        inputMode="numeric"
        value={formatLocal(localDigits, selected.code)}
        onChange={handleLocalChange}
        placeholder={selected.code === '+1' ? '(602)-999-4220' : '000-000-0000'}
        className={cn(
          'h-9 w-full min-w-0 rounded-r-md border border-white/[0.1] bg-white/[0.05] px-3 py-1 text-sm text-white shadow-xs outline-none transition-[color,box-shadow] placeholder:text-zinc-500',
          'focus-visible:border-blue-500/50 focus-visible:ring-blue-500/20 focus-visible:ring-[3px]'
        )}
      />
    </div>
  )
}
