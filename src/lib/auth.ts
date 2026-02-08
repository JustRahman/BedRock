import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

interface FounderData {
  id: string
  user_id: string
  email: string
  full_name: string
  phone: string | null
  country_of_origin: string
  country_of_residence: string
  created_at: string
  updated_at: string
  onboarding_completed: boolean
  role: string
}

export async function getUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  return user
}

export async function getFounder(): Promise<FounderData | null> {
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    return null
  }

  const { data: founderData, error: founderError } = await supabase
    .from('founders')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (founderError || !founderData) {
    return null
  }

  return founderData as FounderData
}

export async function requireAuth() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return user
}

export async function requireFounder() {
  const founder = await getFounder()

  if (!founder) {
    redirect('/login')
  }

  return founder
}

export async function requireAdmin() {
  const founder = await getFounder()

  if (!founder || founder.role !== 'admin') {
    redirect('/dashboard')
  }

  return founder
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
