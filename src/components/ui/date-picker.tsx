'use client'

import { useState, useRef, useMemo, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { CalendarDays, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

interface DatePickerProps {
  value?: string
  onChange?: (value: string) => void
  id?: string
  placeholder?: string
  className?: string
  minYear?: number
  maxYear?: number
}

export function DatePicker({
  value = '',
  onChange,
  id,
  placeholder = 'DD / MM / YYYY',
  className,
  minYear = 1940,
  maxYear,
}: DatePickerProps) {
  const currentYear = new Date().getFullYear()
  const max = maxYear ?? currentYear

  const parsed = value ? new Date(value + 'T00:00:00') : null
  const selectedDay = parsed && !isNaN(parsed.getTime()) ? parsed.getDate() : null
  const selectedMonth = parsed && !isNaN(parsed.getTime()) ? parsed.getMonth() : null
  const selectedYear = parsed && !isNaN(parsed.getTime()) ? parsed.getFullYear() : null

  const [open, setOpen] = useState(false)
  const [viewMonth, setViewMonth] = useState(selectedMonth ?? 0)
  const [viewYear, setViewYear] = useState(selectedYear ?? 1990)
  const [monthPickerOpen, setMonthPickerOpen] = useState(false)
  const [yearPickerOpen, setYearPickerOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const yearListRef = useRef<HTMLDivElement>(null)

  // Scroll active year into view when year picker opens
  useEffect(() => {
    if (yearPickerOpen && yearListRef.current) {
      const active = yearListRef.current.querySelector('[data-active="true"]')
      if (active) {
        active.scrollIntoView({ block: 'center' })
      }
    }
  }, [yearPickerOpen])

  const displayText = parsed && !isNaN(parsed.getTime())
    ? `${String(parsed.getDate()).padStart(2, '0')} / ${String(parsed.getMonth() + 1).padStart(2, '0')} / ${parsed.getFullYear()}`
    : ''

  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay()
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate()

    const cells: { day: number; current: boolean; date: Date }[] = []

    for (let i = firstDay - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i
      cells.push({ day: d, current: false, date: new Date(viewYear, viewMonth - 1, d) })
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, current: true, date: new Date(viewYear, viewMonth, d) })
    }
    const remaining = 42 - cells.length
    for (let d = 1; d <= remaining; d++) {
      cells.push({ day: d, current: false, date: new Date(viewYear, viewMonth + 1, d) })
    }

    return cells
  }, [viewMonth, viewYear])

  const years = useMemo(() => {
    const arr: number[] = []
    for (let y = max; y >= minYear; y--) arr.push(y)
    return arr
  }, [minYear, max])

  // Decade range for quick year navigation
  const decadeStart = Math.floor(viewYear / 10) * 10

  const handleSelect = (date: Date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    onChange?.(`${y}-${m}-${d}`)
    setOpen(false)
  }

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  const isSelected = (date: Date) =>
    selectedDay === date.getDate() &&
    selectedMonth === date.getMonth() &&
    selectedYear === date.getFullYear()

  const isToday = (date: Date) => {
    const now = new Date()
    return date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
  }

  // Which sub-view to show
  const showingPicker = monthPickerOpen || yearPickerOpen

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {/* Trigger button */}
      <button
        id={id}
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'flex h-9 w-full items-center justify-between rounded-md border border-white/[0.1] bg-white/[0.05] px-3 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow]',
          'focus-visible:border-blue-500/50 focus-visible:ring-blue-500/20 focus-visible:ring-[3px]',
          displayText ? 'text-white' : 'text-zinc-500'
        )}
      >
        <span>{displayText || placeholder}</span>
        <CalendarDays className="h-4 w-4 text-zinc-500" />
      </button>

      {/* Dropdown calendar */}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => { setOpen(false); setMonthPickerOpen(false); setYearPickerOpen(false) }} />
          <div className="absolute left-0 top-full z-50 mt-1 w-[300px] rounded-xl border border-white/[0.1] bg-[#18181b] p-4 shadow-2xl">

            {/* Header: navigation + month/year buttons */}
            <div className="mb-3 flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevMonth}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg hover:bg-white/[0.08] text-zinc-400 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Month button */}
              <button
                type="button"
                onClick={() => { setMonthPickerOpen(!monthPickerOpen); setYearPickerOpen(false) }}
                className={cn(
                  'flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg text-sm font-medium transition-colors',
                  monthPickerOpen
                    ? 'bg-blue-500/15 text-blue-400'
                    : 'text-zinc-200 hover:bg-white/[0.06]'
                )}
              >
                {MONTHS[viewMonth]}
                <ChevronDown className={cn('h-3 w-3 transition-transform', monthPickerOpen && 'rotate-180')} />
              </button>

              {/* Year button */}
              <button
                type="button"
                onClick={() => { setYearPickerOpen(!yearPickerOpen); setMonthPickerOpen(false) }}
                className={cn(
                  'flex h-8 w-[80px] shrink-0 items-center justify-center gap-1.5 rounded-lg text-sm font-medium transition-colors',
                  yearPickerOpen
                    ? 'bg-blue-500/15 text-blue-400'
                    : 'text-zinc-200 hover:bg-white/[0.06]'
                )}
              >
                {viewYear}
                <ChevronDown className={cn('h-3 w-3 transition-transform', yearPickerOpen && 'rotate-180')} />
              </button>

              <button
                type="button"
                onClick={nextMonth}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg hover:bg-white/[0.08] text-zinc-400 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Month picker grid */}
            {monthPickerOpen && (
              <div className="mb-3 grid grid-cols-3 gap-1.5">
                {MONTHS_SHORT.map((m, i) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => { setViewMonth(i); setMonthPickerOpen(false) }}
                    className={cn(
                      'flex h-9 items-center justify-center rounded-lg text-sm transition-colors',
                      i === viewMonth
                        ? 'bg-blue-500 text-white font-medium'
                        : 'text-zinc-300 hover:bg-white/[0.06]'
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}

            {/* Year picker grid */}
            {yearPickerOpen && (
              <div className="mb-3">
                {/* Decade navigation */}
                <div className="mb-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setViewYear(Math.max(minYear, viewYear - 10))}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 hover:bg-white/[0.06] hover:text-zinc-300 transition-colors"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-xs font-medium text-zinc-500">
                    {decadeStart} &mdash; {decadeStart + 9}
                  </span>
                  <button
                    type="button"
                    onClick={() => setViewYear(Math.min(max, viewYear + 10))}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 hover:bg-white/[0.06] hover:text-zinc-300 transition-colors"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div ref={yearListRef} className="grid grid-cols-4 gap-1.5 max-h-[200px] overflow-y-auto scrollbar-thin">
                  {years.map((y) => (
                    <button
                      key={y}
                      type="button"
                      data-active={y === viewYear}
                      onClick={() => { setViewYear(y); setYearPickerOpen(false) }}
                      className={cn(
                        'flex h-9 items-center justify-center rounded-lg text-sm transition-colors',
                        y === viewYear
                          ? 'bg-blue-500 text-white font-medium'
                          : 'text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-200'
                      )}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Calendar view (hidden when month/year picker is open) */}
            {!showingPicker && (
              <>
                {/* Day headers */}
                <div className="mb-1 grid grid-cols-7 gap-0">
                  {DAYS.map((d) => (
                    <div key={d} className="py-1 text-center text-xs font-medium text-zinc-500">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Day grid */}
                <div className="grid grid-cols-7 gap-0">
                  {calendarDays.map((cell, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelect(cell.date)}
                      className={cn(
                        'flex h-8 w-full items-center justify-center rounded-lg text-sm transition-colors',
                        cell.current ? 'text-zinc-200' : 'text-zinc-600',
                        isSelected(cell.date)
                          ? 'bg-blue-500 text-white font-medium'
                          : isToday(cell.date)
                          ? 'bg-white/[0.08] text-blue-400'
                          : 'hover:bg-white/[0.06]'
                      )}
                    >
                      {cell.day}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Quick actions */}
            <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-3">
              <button
                type="button"
                onClick={() => {
                  const now = new Date()
                  setViewMonth(now.getMonth())
                  setViewYear(now.getFullYear())
                  setMonthPickerOpen(false)
                  setYearPickerOpen(false)
                }}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Today
              </button>
              {displayText && (
                <button
                  type="button"
                  onClick={() => { onChange?.(''); setOpen(false) }}
                  className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
