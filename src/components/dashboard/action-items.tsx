import { Button } from '@/components/ui/button'
import { ArrowRight, AlertCircle, FileText, Calendar, CreditCard } from 'lucide-react'
import Link from 'next/link'

interface ActionItem {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  icon: 'document' | 'calendar' | 'payment' | 'alert'
  href: string
}

const iconMap = {
  document: FileText,
  calendar: Calendar,
  payment: CreditCard,
  alert: AlertCircle,
}

const priorityColors = {
  high: 'border-l-red-500/60',
  medium: 'border-l-yellow-500/60',
  low: 'border-l-blue-500/60',
}

interface ActionItemsProps {
  items: ActionItem[]
}

export function ActionItems({ items }: ActionItemsProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Action Items</h3>
        <p className="text-sm text-zinc-500">
          You&apos;re all caught up! No pending actions.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Action Items</h3>
      <div className="space-y-3">
        {items.map((item) => {
          const Icon = iconMap[item.icon]
          return (
            <div
              key={item.id}
              className={`rounded-lg border border-border border-l-4 bg-muted/40 p-4 ${priorityColors[item.priority]}`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-zinc-500" />
                  <div>
                    <p className="font-medium text-zinc-200">{item.title}</p>
                    <p className="mt-1 text-sm text-zinc-500">{item.description}</p>
                  </div>
                </div>
                <Link href={item.href}>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="shrink-0 gap-1 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 w-full sm:w-auto"
                  >
                    Take Action
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const mockActionItems: ActionItem[] = [
  {
    id: '1',
    title: 'Upload Passport',
    description: 'Your passport document is required to complete verification',
    priority: 'high',
    icon: 'document',
    href: '/dashboard/documents',
  },
  {
    id: '2',
    title: 'Upcoming Compliance Deadline',
    description: 'Annual report due in 14 days',
    priority: 'medium',
    icon: 'calendar',
    href: '/dashboard/compliance',
  },
  {
    id: '3',
    title: 'Complete Payment',
    description: 'Service fee payment pending',
    priority: 'high',
    icon: 'payment',
    href: '/dashboard/billing',
  },
]
