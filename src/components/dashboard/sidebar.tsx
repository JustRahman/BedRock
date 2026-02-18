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
  Menu,
  X,
  Zap,
  Heart,
  Rocket,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
  section?: string
  roles?: string[]
}

const navigation: NavItem[] = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  // Founder services
  { name: 'Formation', href: '/dashboard/formation', icon: Landmark, section: 'Services', roles: ['founder'] },
  { name: 'Bank Account', href: '/dashboard/bank', icon: Building2, roles: ['founder'] },
  { name: 'Compliance', href: '/dashboard/compliance', icon: Calendar, roles: ['founder'] },
  { name: 'Stripe Help', href: '/dashboard/stripe', icon: Zap, roles: ['founder'] },
  { name: 'Business Credit', href: '/dashboard/credit', icon: CreditCard, roles: ['founder'] },
  { name: 'Alternative ID', href: '/dashboard/alternative-id', icon: Heart, roles: ['founder'] },
  // Student services
  { name: 'Tax Filing', href: '/dashboard/tax-filing', icon: FileText, section: 'Services', roles: ['student'] },
  // Account (shared)
  { name: 'Documents', href: '/dashboard/documents', icon: FileText, section: 'Account' },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userRole, setUserRole] = useState<string>('founder')

  // Fetch user role
  useEffect(() => {
    fetch('/api/founders/me')
      .then((r) => r.json())
      .then((data) => {
        if (data.role) setUserRole(data.role)
      })
      .catch(() => {})
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  const filteredNavigation = navigation.filter(
    (item) => !item.roles || item.roles.includes(userRole)
  )

  const navContent = (
    <>
      <nav className="flex-1 space-y-0.5 px-3 py-4 overflow-y-auto">
        {filteredNavigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <div key={item.name}>
              {item.section && (
                <p className="mt-4 mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  {item.section}
                </p>
              )}
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-zinc-700/40 text-white'
                    : 'text-zinc-400 hover:bg-zinc-700/25 hover:text-zinc-200'
                }`}
              >
                <item.icon className={`h-4.5 w-4.5 ${isActive ? 'text-blue-400' : ''}`} />
                {item.name}
              </Link>
            </div>
          )
        })}
      </nav>

      {/* Student upgrade CTA */}
      {userRole === 'student' && (
        <div className="px-3 pb-2">
          <Link href="/dashboard?upgrade=true">
            <div className="rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-blue-500/10 p-4 cursor-pointer hover:border-violet-500/40 transition-colors">
              <div className="flex items-center gap-2 mb-1.5">
                <Rocket className="h-4 w-4 text-violet-400" />
                <span className="text-sm font-semibold text-white">Start a US Company</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Ready to incorporate? Upgrade to founder and get LLC formation, banking, and more.
              </p>
            </div>
          </Link>
        </div>
      )}

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
    </>
  )

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-b border-border bg-sidebar px-4 lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-semibold tracking-tight text-white">BedRock</span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-zinc-400 hover:text-white hover:bg-zinc-700/25 transition-colors"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile slide-out drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-full w-72 flex-col border-r border-border bg-sidebar transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-semibold tracking-tight text-white">BedRock</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-zinc-400 hover:text-white hover:bg-zinc-700/25 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {navContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex h-screen w-64 flex-col border-r border-border bg-sidebar sticky top-0">
        <div className="flex h-16 items-center gap-2.5 border-b border-border px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">BedRock</span>
        </div>
        {navContent}
      </aside>
    </>
  )
}
