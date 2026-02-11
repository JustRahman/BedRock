'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Calendar, Plus, CheckCircle, AlertCircle, Clock, Trash2, Loader2 } from 'lucide-react'
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
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all')
  const [saving, setSaving] = useState(false)
  const [toggling, setToggling] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  // Form state
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newDueDate, setNewDueDate] = useState('')
  const [formError, setFormError] = useState('')

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

  const handleAdd = async () => {
    if (!newTitle || !newDueDate) {
      setFormError('Title and due date are required.')
      return
    }

    setFormError('')
    setSaving(true)

    try {
      const res = await fetch('/api/compliance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription || null,
          dueDate: newDueDate,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        setFormError(data.error || 'Failed to create deadline')
        return
      }

      setIsAddOpen(false)
      setNewTitle('')
      setNewDescription('')
      setNewDueDate('')
      await fetchDeadlines()
    } catch {
      setFormError('Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const toggleComplete = async (deadline: ComplianceDeadline) => {
    setToggling(deadline.id)
    try {
      const res = await fetch('/api/compliance', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deadlineId: deadline.id,
          completed: !deadline.completed,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setDeadlines((prev) =>
          prev.map((d) => (d.id === deadline.id ? data.deadline : d))
        )
      }
    } catch {
      // ignore
    } finally {
      setToggling(null)
    }
  }

  const handleDelete = async (id: string) => {
    setDeleting(id)
    try {
      const res = await fetch(`/api/compliance?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setDeadlines((prev) => prev.filter((d) => d.id !== id))
      }
    } catch {
      // ignore
    } finally {
      setDeleting(null)
    }
  }

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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Compliance Calendar</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track important deadlines and stay compliant.
          </p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={(open) => {
          setIsAddOpen(open)
          if (!open) {
            setFormError('')
            setNewTitle('')
            setNewDescription('')
            setNewDueDate('')
          }
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Deadline
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Compliance Deadline</DialogTitle>
              <DialogDescription>
                Create a new deadline to track.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  placeholder="e.g., Annual Report Filing"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe the deadline..."
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                />
              </div>
              {formError && (
                <p className="text-sm text-red-400">{formError}</p>
              )}
              <Button className="w-full" onClick={handleAdd} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Add Deadline'
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
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
                ? 'Add your first compliance deadline to get started.'
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
                <CardContent className="flex items-start gap-4 p-4">
                  <Checkbox
                    checked={deadline.completed}
                    onCheckedChange={() => toggleComplete(deadline)}
                    disabled={toggling === deadline.id}
                    className="mt-1"
                  />
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(deadline.id)}
                    disabled={deleting === deadline.id}
                  >
                    {deleting === deadline.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4 text-red-400" />
                    )}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
