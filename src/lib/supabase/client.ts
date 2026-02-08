import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/database'

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  return !!(
    url &&
    key &&
    !url.includes('your-') &&
    !url.includes('your_') &&
    !key.includes('your_') &&
    !key.includes('your-')
  )
}

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
