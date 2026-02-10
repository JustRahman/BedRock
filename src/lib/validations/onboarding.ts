import * as z from 'zod'

// Step 1: Basic Info
export const basicInfoSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(6, 'Please enter a valid phone number'),
  countryOfOrigin: z.string().min(1, 'Please select your country of origin'),
  countryOfResidence: z.string().min(1, 'Please select your country of residence'),
  dateOfBirth: z.string().optional(),
  address: z.string().optional(),
})

export type BasicInfoFormData = z.infer<typeof basicInfoSchema>

// Step 2: Identity Verification
export const identitySchema = z.object({
  hasPassport: z.boolean(),
  hasLocalId: z.boolean(),
  hasAddressProof: z.boolean(),
  hasLivenessCheck: z.boolean().optional(),
  passportFile: z.any().optional(),
  localIdFile: z.any().optional(),
  addressProofFile: z.any().optional(),
  passportData: z.any().optional(),
  localIdData: z.any().optional(),
  addressProofData: z.any().optional(),
})

export type IdentityFormData = z.infer<typeof identitySchema>

// Step 3: Code History (Digital Lineage)
export const codeHistorySchema = z.object({
  hasGithub: z.boolean(),
  githubUsername: z.string().optional(),
  githubConnected: z.boolean().optional(),
})

export type CodeHistoryFormData = z.infer<typeof codeHistorySchema>

// Step 4: Professional (Digital Lineage)
export const professionalSchema = z.object({
  hasLinkedin: z.boolean(),
  linkedinUrl: z.string().url('Please enter a valid URL').or(z.string().length(0)).optional(),
  linkedinConnected: z.boolean().optional(),
})

export type ProfessionalFormData = z.infer<typeof professionalSchema>

// Step 5: Financial (Digital Lineage)
export const financialSchema = z.object({
  hasStripeConnected: z.boolean(),
  monthlyRevenue: z.string().optional(),
  customerGeography: z.string().optional(),
  chargebackRate: z.string().optional(),
  hasBankStatements: z.boolean(),
})

export type FinancialFormData = z.infer<typeof financialSchema>

// Step 6: Digital Presence
export const digitalPresenceSchema = z.object({
  website: z.string().url('Please enter a valid URL').or(z.string().length(0)).optional(),
  twitterHandle: z.string().optional(),
  instagramHandle: z.string().optional(),
  appStoreUrl: z.string().url('Please enter a valid URL').or(z.string().length(0)).optional(),
  websiteVerified: z.boolean().optional(),
  twitterVerified: z.boolean().optional(),
  instagramVerified: z.boolean().optional(),
  appStoreVerified: z.boolean().optional(),
})

export type DigitalPresenceFormData = z.infer<typeof digitalPresenceSchema>

// Step 7: Trust Signals
export const trustSignalsSchema = z.object({
  hasReferral: z.boolean(),
  referralCode: z.string().optional(),
  referralVerified: z.boolean().optional(),
  referrerName: z.string().optional(),
  hasUniversityEmail: z.boolean(),
  universityEmail: z.string().email().optional().or(z.string().length(0)),
  universityEmailVerified: z.boolean().optional(),
  hasAccelerator: z.boolean(),
  acceleratorName: z.string().optional(),
  acceleratorVerified: z.boolean().optional(),
  hasEmployerVerification: z.boolean(),
  employerName: z.string().optional(),
})

export type TrustSignalsFormData = z.infer<typeof trustSignalsSchema>

// Combined onboarding data
export const onboardingSchema = z.object({
  basicInfo: basicInfoSchema,
  identity: identitySchema,
  codeHistory: codeHistorySchema,
  professional: professionalSchema,
  financial: financialSchema,
  digitalPresence: digitalPresenceSchema,
  trustSignals: trustSignalsSchema,
})

export type OnboardingFormData = z.infer<typeof onboardingSchema>

// Country risk tiers (replaces highRiskCountries)
export const countryRiskTiers: Record<string, number> = {
  // Tier 1: No adjustment (0)
  CA: 0, GB: 0, DE: 0, FR: 0, AU: 0, SG: 0, IE: 0, NL: 0, SE: 0, DK: 0,
  NO: 0, FI: 0, AT: 0, BE: 0, CH: 0, NZ: 0, JP: 0, KR: 0, IT: 0, ES: 0,
  PT: 0, CZ: 0, PL: 0, US: 0,
  // Tier 2: -5 points
  IN: -5, BR: -5, MX: -5, PH: -5, ID: -5, TH: -5, MY: -5, AR: -5,
  CO: -5, CL: -5, PE: -5, EG: -5, ZA: -5, TR: -5,
  // Tier 3: -10 points
  PK: -10, NG: -10, KE: -10, VN: -10, GH: -10, TZ: -10, UG: -10,
  ET: -10, CM: -10, SN: -10, RW: -10, MM: -10, KH: -10, LA: -10,
  // Tier 4: -15 points
  TM: -15, UZ: -15, BD: -15, VE: -15, AF: -15, IQ: -15, LY: -15,
  SD: -15, SS: -15, YE: -15, SO: -15, ER: -15, CF: -15, TJ: -15,
  KG: -15,
}

// OFAC sanctioned countries (still blocked)
export const highRiskCountries = [
  'CU', // Cuba
  'IR', // Iran
  'KP', // North Korea
  'SY', // Syria
  'RU', // Russia
  'BY', // Belarus
]

export function getCountryPenalty(countryCode: string): number {
  if (highRiskCountries.includes(countryCode)) return -20
  return countryRiskTiers[countryCode] ?? -5
}

// Complete list of all countries (ISO 3166-1)
export const countries = [
  { code: 'AF', name: 'Afghanistan' },
  { code: 'AL', name: 'Albania' },
  { code: 'DZ', name: 'Algeria' },
  { code: 'AS', name: 'American Samoa' },
  { code: 'AD', name: 'Andorra' },
  { code: 'AO', name: 'Angola' },
  { code: 'AI', name: 'Anguilla' },
  { code: 'AQ', name: 'Antarctica' },
  { code: 'AG', name: 'Antigua and Barbuda' },
  { code: 'AR', name: 'Argentina' },
  { code: 'AM', name: 'Armenia' },
  { code: 'AW', name: 'Aruba' },
  { code: 'AU', name: 'Australia' },
  { code: 'AT', name: 'Austria' },
  { code: 'AZ', name: 'Azerbaijan' },
  { code: 'BS', name: 'Bahamas' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'BB', name: 'Barbados' },
  { code: 'BY', name: 'Belarus' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BZ', name: 'Belize' },
  { code: 'BJ', name: 'Benin' },
  { code: 'BM', name: 'Bermuda' },
  { code: 'BT', name: 'Bhutan' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BA', name: 'Bosnia and Herzegovina' },
  { code: 'BW', name: 'Botswana' },
  { code: 'BR', name: 'Brazil' },
  { code: 'IO', name: 'British Indian Ocean Territory' },
  { code: 'BN', name: 'Brunei' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'BI', name: 'Burundi' },
  { code: 'CV', name: 'Cabo Verde' },
  { code: 'KH', name: 'Cambodia' },
  { code: 'CM', name: 'Cameroon' },
  { code: 'CA', name: 'Canada' },
  { code: 'KY', name: 'Cayman Islands' },
  { code: 'CF', name: 'Central African Republic' },
  { code: 'TD', name: 'Chad' },
  { code: 'CL', name: 'Chile' },
  { code: 'CN', name: 'China' },
  { code: 'CX', name: 'Christmas Island' },
  { code: 'CC', name: 'Cocos (Keeling) Islands' },
  { code: 'CO', name: 'Colombia' },
  { code: 'KM', name: 'Comoros' },
  { code: 'CG', name: 'Congo' },
  { code: 'CD', name: 'Congo (Democratic Republic)' },
  { code: 'CK', name: 'Cook Islands' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'HR', name: 'Croatia' },
  { code: 'CU', name: 'Cuba' },
  { code: 'CW', name: 'Curacao' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'CI', name: "Cote d'Ivoire" },
  { code: 'DK', name: 'Denmark' },
  { code: 'DJ', name: 'Djibouti' },
  { code: 'DM', name: 'Dominica' },
  { code: 'DO', name: 'Dominican Republic' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'EG', name: 'Egypt' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'GQ', name: 'Equatorial Guinea' },
  { code: 'ER', name: 'Eritrea' },
  { code: 'EE', name: 'Estonia' },
  { code: 'SZ', name: 'Eswatini' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'FK', name: 'Falkland Islands' },
  { code: 'FO', name: 'Faroe Islands' },
  { code: 'FJ', name: 'Fiji' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'GF', name: 'French Guiana' },
  { code: 'PF', name: 'French Polynesia' },
  { code: 'GA', name: 'Gabon' },
  { code: 'GM', name: 'Gambia' },
  { code: 'GE', name: 'Georgia' },
  { code: 'DE', name: 'Germany' },
  { code: 'GH', name: 'Ghana' },
  { code: 'GI', name: 'Gibraltar' },
  { code: 'GR', name: 'Greece' },
  { code: 'GL', name: 'Greenland' },
  { code: 'GD', name: 'Grenada' },
  { code: 'GP', name: 'Guadeloupe' },
  { code: 'GU', name: 'Guam' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'GG', name: 'Guernsey' },
  { code: 'GN', name: 'Guinea' },
  { code: 'GW', name: 'Guinea-Bissau' },
  { code: 'GY', name: 'Guyana' },
  { code: 'HT', name: 'Haiti' },
  { code: 'HN', name: 'Honduras' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IS', name: 'Iceland' },
  { code: 'IN', name: 'India' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'IR', name: 'Iran' },
  { code: 'IQ', name: 'Iraq' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IM', name: 'Isle of Man' },
  { code: 'IL', name: 'Israel' },
  { code: 'IT', name: 'Italy' },
  { code: 'JM', name: 'Jamaica' },
  { code: 'JP', name: 'Japan' },
  { code: 'JE', name: 'Jersey' },
  { code: 'JO', name: 'Jordan' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'KE', name: 'Kenya' },
  { code: 'KI', name: 'Kiribati' },
  { code: 'KP', name: 'North Korea' },
  { code: 'KR', name: 'South Korea' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'KG', name: 'Kyrgyzstan' },
  { code: 'LA', name: 'Laos' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LB', name: 'Lebanon' },
  { code: 'LS', name: 'Lesotho' },
  { code: 'LR', name: 'Liberia' },
  { code: 'LY', name: 'Libya' },
  { code: 'LI', name: 'Liechtenstein' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MO', name: 'Macao' },
  { code: 'MG', name: 'Madagascar' },
  { code: 'MW', name: 'Malawi' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'MV', name: 'Maldives' },
  { code: 'ML', name: 'Mali' },
  { code: 'MT', name: 'Malta' },
  { code: 'MH', name: 'Marshall Islands' },
  { code: 'MQ', name: 'Martinique' },
  { code: 'MR', name: 'Mauritania' },
  { code: 'MU', name: 'Mauritius' },
  { code: 'YT', name: 'Mayotte' },
  { code: 'MX', name: 'Mexico' },
  { code: 'FM', name: 'Micronesia' },
  { code: 'MD', name: 'Moldova' },
  { code: 'MC', name: 'Monaco' },
  { code: 'MN', name: 'Mongolia' },
  { code: 'ME', name: 'Montenegro' },
  { code: 'MS', name: 'Montserrat' },
  { code: 'MA', name: 'Morocco' },
  { code: 'MZ', name: 'Mozambique' },
  { code: 'MM', name: 'Myanmar' },
  { code: 'NA', name: 'Namibia' },
  { code: 'NR', name: 'Nauru' },
  { code: 'NP', name: 'Nepal' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'NC', name: 'New Caledonia' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'NE', name: 'Niger' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'NU', name: 'Niue' },
  { code: 'NF', name: 'Norfolk Island' },
  { code: 'MK', name: 'North Macedonia' },
  { code: 'MP', name: 'Northern Mariana Islands' },
  { code: 'NO', name: 'Norway' },
  { code: 'OM', name: 'Oman' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'PW', name: 'Palau' },
  { code: 'PS', name: 'Palestine' },
  { code: 'PA', name: 'Panama' },
  { code: 'PG', name: 'Papua New Guinea' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Peru' },
  { code: 'PH', name: 'Philippines' },
  { code: 'PN', name: 'Pitcairn' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'PR', name: 'Puerto Rico' },
  { code: 'QA', name: 'Qatar' },
  { code: 'RO', name: 'Romania' },
  { code: 'RU', name: 'Russia' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'RE', name: 'Reunion' },
  { code: 'BL', name: 'Saint Barthelemy' },
  { code: 'SH', name: 'Saint Helena' },
  { code: 'KN', name: 'Saint Kitts and Nevis' },
  { code: 'LC', name: 'Saint Lucia' },
  { code: 'MF', name: 'Saint Martin' },
  { code: 'PM', name: 'Saint Pierre and Miquelon' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines' },
  { code: 'WS', name: 'Samoa' },
  { code: 'SM', name: 'San Marino' },
  { code: 'ST', name: 'Sao Tome and Principe' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'SN', name: 'Senegal' },
  { code: 'RS', name: 'Serbia' },
  { code: 'SC', name: 'Seychelles' },
  { code: 'SL', name: 'Sierra Leone' },
  { code: 'SG', name: 'Singapore' },
  { code: 'SX', name: 'Sint Maarten' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'SB', name: 'Solomon Islands' },
  { code: 'SO', name: 'Somalia' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'GS', name: 'South Georgia' },
  { code: 'SS', name: 'South Sudan' },
  { code: 'ES', name: 'Spain' },
  { code: 'LK', name: 'Sri Lanka' },
  { code: 'SD', name: 'Sudan' },
  { code: 'SR', name: 'Suriname' },
  { code: 'SJ', name: 'Svalbard and Jan Mayen' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'SY', name: 'Syria' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'TJ', name: 'Tajikistan' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'TH', name: 'Thailand' },
  { code: 'TL', name: 'Timor-Leste' },
  { code: 'TG', name: 'Togo' },
  { code: 'TK', name: 'Tokelau' },
  { code: 'TO', name: 'Tonga' },
  { code: 'TT', name: 'Trinidad and Tobago' },
  { code: 'TN', name: 'Tunisia' },
  { code: 'TR', name: 'Turkey' },
  { code: 'TM', name: 'Turkmenistan' },
  { code: 'TC', name: 'Turks and Caicos Islands' },
  { code: 'TV', name: 'Tuvalu' },
  { code: 'UG', name: 'Uganda' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
  { code: 'UM', name: 'United States Minor Outlying Islands' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'UZ', name: 'Uzbekistan' },
  { code: 'VU', name: 'Vanuatu' },
  { code: 'VA', name: 'Vatican City' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'VG', name: 'British Virgin Islands' },
  { code: 'VI', name: 'U.S. Virgin Islands' },
  { code: 'WF', name: 'Wallis and Futuna' },
  { code: 'EH', name: 'Western Sahara' },
  { code: 'YE', name: 'Yemen' },
  { code: 'ZM', name: 'Zambia' },
  { code: 'ZW', name: 'Zimbabwe' },
]

export const revenueOptions = [
  { value: '0', label: '$0 (Pre-revenue)' },
  { value: '1-1000', label: '$1 - $1,000/month' },
  { value: '1000-5000', label: '$1,000 - $5,000/month' },
  { value: '5000-10000', label: '$5,000 - $10,000/month' },
  { value: '10000-50000', label: '$10,000 - $50,000/month' },
  { value: '50000+', label: '$50,000+/month' },
]

export const geographyOptions = [
  { value: 'us_eu', label: 'Primarily US/EU' },
  { value: 'mixed', label: 'Mixed (US/EU + other)' },
  { value: 'emerging', label: 'Primarily emerging markets' },
]

export const chargebackOptions = [
  { value: 'none', label: 'No chargebacks' },
  { value: 'low', label: 'Under 1%' },
  { value: 'medium', label: '1% - 3%' },
  { value: 'high', label: 'Over 3%' },
]
