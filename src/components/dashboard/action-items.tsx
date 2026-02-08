import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  high: 'border-l-red-500',
  medium: 'border-l-yellow-500',
  low: 'border-l-blue-500',
}

interface ActionItemsProps {
  items: ActionItem[]
}

export function ActionItems({ items }: ActionItemsProps) {
  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Action Items</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            You&apos;re all caught up! No pending actions.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Action Items</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => {
          const Icon = iconMap[item.icon]
          return (
            <div
              key={item.id}
              className={`rounded-lg border border-l-4 bg-gray-50 p-4 ${priorityColors[item.priority]}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
                <Link href={item.href}>
                  <Button size="sm" variant="ghost" className="shrink-0 gap-1">
                    Take Action
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

// Mock data for demonstration
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
