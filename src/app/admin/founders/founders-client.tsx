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

interface FounderRow {
  id: string
  full_name: string
  email: string
  country_of_origin: string
  country_of_residence: string
  role: string
  onboarding_completed: boolean
  created_at: string
  trust_scores: { total_score: number; status: string }[] | null
  companies: { id: string; name: string; formation_status: string }[] | null
}

export function FoundersClient({ founders }: { founders: FounderRow[] }) {
  const [search, setSearch] = useState('')

  const filtered = founders.filter((f) =>
    f.full_name.toLowerCase().includes(search.toLowerCase()) ||
    f.email.toLowerCase().includes(search.toLowerCase()) ||
    f.country_of_origin.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Founders</h1>
        <p className="mt-1 text-sm text-gray-500">
          All registered founders. {founders.length} total.
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by name, email, or country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Founders</CardTitle>
          <CardDescription>{filtered.length} founders found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Founder</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Trust Score</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500">
                    No founders found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((f) => {
                  const score = Array.isArray(f.trust_scores) && f.trust_scores[0]
                    ? f.trust_scores[0].total_score : null
                  const company = Array.isArray(f.companies) && f.companies[0]
                    ? f.companies[0] : null

                  return (
                    <TableRow key={f.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{f.full_name}</p>
                          <p className="text-sm text-gray-500">{f.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{f.country_of_origin}</TableCell>
                      <TableCell>
                        {score !== null ? (
                          <Badge className={getScoreColor(score)}>{score}</Badge>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {company ? (
                          <div>
                            <p className="text-sm font-medium">{company.name}</p>
                            <Badge className={getFormationColor(company.formation_status)}>
                              {company.formation_status}
                            </Badge>
                          </div>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={f.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}>
                          {f.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{format(new Date(f.created_at), 'MMM d, yyyy')}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/admin/founders/${f.id}`}>
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

function getScoreColor(score: number): string {
  if (score >= 80) return 'bg-green-100 text-green-700'
  if (score >= 70) return 'bg-blue-100 text-blue-700'
  if (score >= 50) return 'bg-yellow-100 text-yellow-700'
  return 'bg-red-100 text-red-700'
}

function getFormationColor(status: string): string {
  switch (status) {
    case 'formed': return 'bg-green-100 text-green-700'
    case 'processing': return 'bg-blue-100 text-blue-700'
    case 'pending': return 'bg-yellow-100 text-yellow-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}
