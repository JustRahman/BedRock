import { Sidebar } from '@/components/dashboard'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dark flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {/* pt-14 on mobile for the fixed top bar, lg:pt-0 for desktop */}
        <div className="px-4 py-6 pt-20 sm:px-6 sm:py-8 lg:px-8 lg:pt-8">{children}</div>
      </main>
    </div>
  )
}
