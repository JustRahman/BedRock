export const KNOWN_ACCELERATORS = [
  'Y Combinator',
  'Techstars',
  '500 Global',
  'Alchemist Accelerator',
  'Plug and Play',
  'MassChallenge',
  'Founders Factory',
  'Startupbootcamp',
  'Seedcamp',
  'Entrepreneur First',
  'Antler',
  'On Deck',
  'South Park Commons',
  'Pioneer',
  'Launch Academy',
  'Indie.vc',
  'Dreamit Ventures',
  'Betaworks',
  'HAX',
  'IndieBio',
  'Creative Destruction Lab',
  'SOSV',
  'Chinaccelerator',
  'Orbital',
  'Flat6Labs',
  'Wayra',
  'Microsoft for Startups',
  'Google for Startups',
  'AWS Activate',
  'NVIDIA Inception',
  'Intel Ignite',
  'Barclays Accelerator',
  'Citi Ventures',
  'Comcast NBCUniversal LIFT Labs',
  'Newchip',
  'Gener8tor',
  'Boomtown Accelerator',
  'Mucker Capital',
  'Capital Factory',
  'Lunar Startups',
  'Starburst Aerospace',
  'Elemental Excelerator',
  'Greentown Labs',
  'Climate-KIC',
  'Katapult',
  'Village Capital',
  'Unreasonable Group',
  'Parallel18',
  'Start-Up Chile',
  'Station F',
]

const normalizedSet = new Set(
  KNOWN_ACCELERATORS.map((a) => a.toLowerCase())
)

export function searchAccelerators(query: string): string[] {
  if (!query || query.length < 2) return []
  const lower = query.toLowerCase()
  return KNOWN_ACCELERATORS.filter((a) => a.toLowerCase().includes(lower))
}

export function isKnownAccelerator(name: string): boolean {
  return normalizedSet.has(name.toLowerCase())
}
