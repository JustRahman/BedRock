'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  Settings,
  Shield,
  LogOut,
  BarChart3,
  Building2,
  Landmark,
  Briefcase,
  Home,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Intro', href: '/admin', icon: Home },
  { name: 'Overview', href: '/admin/overview', icon: LayoutDashboard },
  { name: 'Applications', href: '/admin/applications', icon: FileText },
  { name: 'Formations', href: '/admin/formations', icon: Building2 },
  { name: 'Founders', href: '/admin/founders', icon: Users },
  { name: 'Bank Apps', href: '/admin/bank-apps', icon: Landmark },
  { name: 'Service Requests', href: '/admin/services', icon: Briefcase },
  { name: 'Compliance', href: '/admin/compliance', icon: Calendar },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-gray-900">
      <div className="flex h-16 items-center gap-2 border-b border-gray-800 px-6">
        <Shield className="h-8 w-8 text-blue-400" />
        <div>
          <span className="text-xl font-bold text-white">BedRock</span>
          <p className="text-xs text-gray-400">Admin Panel</p>
        </div>
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
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-gray-800 p-4">
        <Link href="/dashboard">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <Users className="h-5 w-5" />
            Switch to User View
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-gray-300 hover:bg-gray-800 hover:text-white"
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}
