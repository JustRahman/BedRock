import { Shield, Users, Building2, Landmark, Briefcase, Calendar, BarChart3, FileText } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const sections = [
  { name: 'Overview', href: '/admin/overview', icon: BarChart3, description: 'Dashboard with key metrics and recent activity' },
  { name: 'Applications', href: '/admin/applications', icon: FileText, description: 'Review and manage founder applications' },
  { name: 'Formations', href: '/admin/formations', icon: Building2, description: 'Track LLC formation requests and progress' },
  { name: 'Founders', href: '/admin/founders', icon: Users, description: 'View and manage all registered founders' },
  { name: 'Bank Apps', href: '/admin/bank-apps', icon: Landmark, description: 'Monitor bank account applications' },
  { name: 'Service Requests', href: '/admin/services', icon: Briefcase, description: 'Handle ITIN, EIN, and other service requests' },
  { name: 'Compliance', href: '/admin/compliance', icon: Calendar, description: 'Manage deadlines and compliance alerts' },
]

export default function AdminIntroPage() {
  return (
    <div>
      <div className="mb-10 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-12">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="h-10 w-10 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">BedRock Admin Panel</h1>
        </div>
        <p className="text-lg text-gray-300 max-w-2xl">
          Manage founders, LLC formations, compliance, banking, and services — all in one place.
        </p>
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link key={section.name} href={section.href}>
            <Card className="h-full transition-colors hover:border-blue-300 hover:bg-blue-50/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <section.icon className="h-5 w-5 text-gray-700" />
                  </div>
                  <CardTitle className="text-base">{section.name}</CardTitle>
                </div>
                <CardDescription className="mt-2">{section.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
