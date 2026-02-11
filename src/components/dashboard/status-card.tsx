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
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    label: 'Completed',
  },
  in_progress: {
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    label: 'In Progress',
  },
  pending: {
    badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    label: 'Pending',
  },
  not_started: {
    badge: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
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
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-zinc-400">{title}</span>
        <Icon className="h-5 w-5 text-zinc-600" />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.badge}`}>
          {config.label}
        </span>
      </div>
      <p className="text-lg font-semibold text-white">{statusText}</p>
      {description ? (
        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      ) : null}
    </div>
  )
}
