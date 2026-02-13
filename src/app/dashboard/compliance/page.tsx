'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, CheckCircle, AlertCircle, Clock } from 'lucide-react'
import { format, differenceInDays, isPast } from 'date-fns'

interface ComplianceDeadline {
  id: string
  title: string
  description: string | null
  due_date: string
  completed: boolean
  completed_at: string | null
  created_at: string
}

export default function CompliancePage() {
  const [deadlines, setDeadlines] = useState<ComplianceDeadline[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all')

  async function fetchDeadlines() {
    try {
      const res = await fetch('/api/compliance')
      if (res.ok) {
        const data = await res.json()
        setDeadlines(data.deadlines ?? [])
      }
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDeadlines()
  }, [])

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <div className="h-8 w-56 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-72 animate-pulse rounded bg-muted" />
        </div>
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-16 animate-pulse rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-16 animate-pulse rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const sortedDeadlines = [...deadlines].sort(
    (a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
  )

  const filteredDeadlines = sortedDeadlines.filter((d) => {
    if (filter === 'upcoming') return !d.completed
    if (filter === 'completed') return d.completed
    return true
  })

  const upcomingCount = deadlines.filter((d) => !d.completed).length
  const overdueCount = deadlines.filter(
    (d) => !d.completed && isPast(new Date(d.due_date))
  ).length
  const completedCount = deadlines.filter((d) => d.completed).length

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Compliance Calendar</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your compliance deadlines and filings. BedRock handles these for you.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 sm:mb-8 grid grid-cols-3 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Upcoming
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-400" />
              <p className="text-3xl font-bold text-foreground">{upcomingCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overdue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p className="text-3xl font-bold text-red-400">{overdueCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              <p className="text-3xl font-bold text-emerald-400">{completedCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2">
        {(['all', 'upcoming', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-white/[0.1] text-white border border-white/[0.15]'
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.05] border border-transparent'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Deadlines List */}
      {filteredDeadlines.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Calendar className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
            <p className="font-medium text-foreground">No deadlines found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {filter === 'all'
                ? 'No compliance deadlines yet.'
                : `No ${filter} deadlines.`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredDeadlines.map((deadline) => {
            const dueDate = new Date(deadline.due_date)
            const daysUntil = differenceInDays(dueDate, new Date())
            const isOverdue = isPast(dueDate) && !deadline.completed

            return (
              <Card
                key={deadline.id}
                className={`transition-opacity ${deadline.completed ? 'opacity-60' : ''}`}
              >
                <CardContent className="flex items-start gap-3 p-3 sm:gap-4 sm:p-4">
                  <div className="mt-1">
                    {deadline.completed ? (
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                    ) : isOverdue ? (
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    ) : (
                      <Clock className="h-5 w-5 text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3
                          className={`font-medium ${
                            deadline.completed
                              ? 'text-muted-foreground line-through'
                              : 'text-foreground'
                          }`}
                        >
                          {deadline.title}
                        </h3>
                        {deadline.description && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {deadline.description}
                          </p>
                        )}
                      </div>
                      {isOverdue && (
                        <Badge className="bg-red-500/15 text-red-400 border-red-500/20">Overdue</Badge>
                      )}
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {format(dueDate, 'MMM d, yyyy')}
                      </div>
                      {!deadline.completed && (
                        <span
                          className={`font-medium ${
                            isOverdue
                              ? 'text-red-400'
                              : daysUntil <= 7
                              ? 'text-yellow-400'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {isOverdue
                            ? `${Math.abs(daysUntil)} days overdue`
                            : daysUntil === 0
                            ? 'Due today'
                            : `${daysUntil} days remaining`}
                        </span>
                      )}
                      {deadline.completed && deadline.completed_at && (
                        <span className="text-emerald-400">
                          Completed {format(new Date(deadline.completed_at), 'MMM d, yyyy')}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
