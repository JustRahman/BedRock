import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LucideIcon } from 'lucide-react'

interface StatusCardProps {
  title: string
  icon: LucideIcon
  status: 'completed' | 'in_progress' | 'pending' | 'not_started'
  statusText: string
  description?: string
}

const statusConfig = {
  completed: {
    badge: 'bg-green-100 text-green-700',
    label: 'Completed',
  },
  in_progress: {
    badge: 'bg-blue-100 text-blue-700',
    label: 'In Progress',
  },
  pending: {
    badge: 'bg-yellow-100 text-yellow-700',
    label: 'Pending',
  },
  not_started: {
    badge: 'bg-gray-100 text-gray-700',
    label: 'Not Started',
  },
}

export function StatusCard({
  title,
  icon: Icon,
  status,
  statusText,
  description,
}: StatusCardProps) {
  const config = statusConfig[status]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <Icon className="h-5 w-5 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Badge className={config.badge}>{config.label}</Badge>
        </div>
        <p className="mt-2 text-lg font-semibold text-gray-900">{statusText}</p>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}
