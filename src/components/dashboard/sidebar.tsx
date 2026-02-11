'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Settings,
  Shield,
  LogOut,
  Building2,
  CreditCard,
  Landmark,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Formation', href: '/dashboard/formation', icon: Landmark },
  { name: 'Documents', href: '/dashboard/documents', icon: FileText },
  { name: 'Compliance', href: '/dashboard/compliance', icon: Calendar },
  { name: 'Bank Account', href: '/dashboard/bank', icon: Building2 },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-sidebar">
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600">
          <Shield className="h-4 w-4 text-white" />
        </div>
        <span className="text-lg font-semibold tracking-tight text-white">BedRock</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-zinc-700/40 text-white'
                  : 'text-zinc-400 hover:bg-zinc-700/25 hover:text-zinc-200'
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? 'text-blue-400' : ''}`} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/25"
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}
