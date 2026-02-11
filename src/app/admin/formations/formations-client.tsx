'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Search, Eye } from 'lucide-react'
import { format } from 'date-fns'

interface CompanyWithFounder {
  id: string
  name: string
  legal_name: string | null
  state: string | null
  formation_status: string
  ein: string | null
  created_at: string
  founders: { id: string; full_name: string; email: string } | null
}

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
  processing: { label: 'Processing', color: 'bg-blue-100 text-blue-700' },
  formed: { label: 'Formed', color: 'bg-green-100 text-green-700' },
}

const tabs = ['All', 'Pending', 'Processing', 'Formed'] as const

export function FormationsClient({ companies }: { companies: CompanyWithFounder[] }) {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<string>('All')

  const filtered = companies.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.founders?.full_name || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.founders?.email || '').toLowerCase().includes(search.toLowerCase())

    const matchesTab =
      activeTab === 'All' || c.formation_status === activeTab.toLowerCase()

    return matchesSearch && matchesTab
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Formations</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage LLC formation requests. {companies.length} total.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-1 rounded-lg bg-gray-100 p-1 w-fit">
        {tabs.map((tab) => {
          const count =
            tab === 'All'
              ? companies.length
              : companies.filter((c) => c.formation_status === tab.toLowerCase()).length
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab} ({count})
            </button>
          )
        })}
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by company name, founder, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Formation Requests</CardTitle>
          <CardDescription>{filtered.length} formations found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Founder</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>EIN</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500">
                    No formations found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((c) => {
                  const status = statusConfig[c.formation_status] || statusConfig.pending
                  return (
                    <TableRow key={c.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{c.name}</p>
                          {c.legal_name ? (
                            <p className="text-sm text-gray-500">{c.legal_name}</p>
                          ) : null}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{c.founders?.full_name || 'N/A'}</p>
                          <p className="text-sm text-gray-500">{c.founders?.email || ''}</p>
                        </div>
                      </TableCell>
                      <TableCell>{c.state === 'DE' ? 'Delaware' : c.state === 'WY' ? 'Wyoming' : c.state || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge className={status.color}>{status.label}</Badge>
                      </TableCell>
                      <TableCell>{c.ein || '—'}</TableCell>
                      <TableCell>{format(new Date(c.created_at), 'MMM d, yyyy')}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/admin/formations/${c.id}`}>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
