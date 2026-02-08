'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ArrowLeft,
  User,
  Building2,
  FileText,
  Shield,
  Check,
  X,
  Edit,
  Mail,
  Phone,
  Globe,
  Calendar,
  Download,
} from 'lucide-react'
import { format } from 'date-fns'
import { Progress } from '@/components/ui/progress'

// Mock founder data
const mockFounder = {
  id: '1',
  name: 'Sarah Chen',
  email: 'sarah@techstartup.com',
  phone: '+65 9123 4567',
  countryOfOrigin: 'Singapore',
  countryOfResidence: 'Singapore',
  createdAt: new Date('2024-01-15'),
  onboardingCompleted: true,
  company: {
    name: 'TechStartup Inc',
    website: 'https://techstartup.com',
    description: 'B2B SaaS platform for enterprise productivity',
    monthlyRevenue: '$5,000 - $10,000',
    hasLocalBusiness: true,
    githubUrl: 'https://github.com/techstartup',
    linkedinUrl: 'https://linkedin.com/company/techstartup',
  },
  trustScore: {
    total: 82,
    identity: 16,
    business: 22,
    digitalLineage: 30,
    network: 14,
    status: 'elite',
    manualOverride: false,
  },
  verifications: [
    { type: 'Passport', status: 'verified', verifiedAt: new Date('2024-01-16') },
    { type: 'Local ID', status: 'verified', verifiedAt: new Date('2024-01-16') },
    { type: 'Address Proof', status: 'pending', verifiedAt: null },
    { type: 'Liveness Check', status: 'not_started', verifiedAt: null },
  ],
  documents: [
    { name: 'passport_scan.pdf', type: 'Passport', uploadedAt: new Date('2024-01-15'), status: 'verified' },
    { name: 'singapore_id.pdf', type: 'Local ID', uploadedAt: new Date('2024-01-15'), status: 'verified' },
    { name: 'utility_bill.pdf', type: 'Address Proof', uploadedAt: new Date('2024-01-18'), status: 'pending' },
  ],
  bankApplication: {
    status: 'under_review',
    bankName: 'Mercury',
    submittedAt: new Date('2024-01-20'),
  },
}

const statusOptions = [
  { value: 'elite', label: 'Elite' },
  { value: 'approved', label: 'Approved' },
  { value: 'review_needed', label: 'Review Needed' },
  { value: 'conditional', label: 'Conditional' },
  { value: 'not_eligible', label: 'Not Eligible' },
]

export default function FounderDetailPage() {
  const params = useParams()
  const [isOverrideOpen, setIsOverrideOpen] = useState(false)
  const [overrideScore, setOverrideScore] = useState(mockFounder.trustScore.total.toString())
  const [overrideStatus, setOverrideStatus] = useState(mockFounder.trustScore.status)
  const [overrideReason, setOverrideReason] = useState('')

  const founder = mockFounder // In production, fetch based on params.id

  const handleOverride = () => {
    // Save override logic here
    setIsOverrideOpen(false)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/applications"
          className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Applications
        </Link>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
              {founder.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{founder.name}</h1>
              <p className="text-gray-500">{founder.company.name}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Mail className="h-4 w-4" />
              Contact
            </Button>
            <Dialog open={isOverrideOpen} onOpenChange={setIsOverrideOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Override Score
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Override Trust Score</DialogTitle>
                  <DialogDescription>
                    Manually adjust the trust score and status for this founder.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>New Score (0-100)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={overrideScore}
                      onChange={(e) => setOverrideScore(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>New Status</Label>
                    <Select value={overrideStatus} onValueChange={setOverrideStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Reason for Override</Label>
                    <Textarea
                      value={overrideReason}
                      onChange={(e) => setOverrideReason(e.target.value)}
                      placeholder="Explain why you're overriding the score..."
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleOverride} className="w-full">
                    Save Override
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button className="gap-2 bg-green-600 hover:bg-green-700">
              <Check className="h-4 w-4" />
              Approve
            </Button>
            <Button variant="destructive" className="gap-2">
              <X className="h-4 w-4" />
              Reject
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="verifications">Verifications</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              {/* Personal Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{founder.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{founder.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{founder.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Country of Origin</p>
                    <p className="font-medium">{founder.countryOfOrigin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Country of Residence</p>
                    <p className="font-medium">{founder.countryOfResidence}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium">{format(founder.createdAt, 'MMM d, yyyy')}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Company Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Building2 className="h-5 w-5" />
                    Company Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Company Name</p>
                      <p className="font-medium">{founder.company.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Monthly Revenue</p>
                      <p className="font-medium">{founder.company.monthlyRevenue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <a
                        href={founder.company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {founder.company.website}
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Local Business</p>
                      <p className="font-medium">
                        {founder.company.hasLocalBusiness ? 'Yes' : 'No'}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="font-medium">{founder.company.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Bank Application */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Building2 className="h-5 w-5" />
                    Bank Application
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Bank</p>
                    <p className="font-medium">{founder.bankApplication.bankName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <Badge className="bg-yellow-100 text-yellow-700">
                      Under Review
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Submitted</p>
                    <p className="font-medium">
                      {format(founder.bankApplication.submittedAt, 'MMM d, yyyy')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="verifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Verification Status</CardTitle>
                  <CardDescription>
                    Track the verification progress for this founder.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {founder.verifications.map((verification, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div className="flex items-center gap-3">
                          {verification.status === 'verified' ? (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                              <Check className="h-4 w-4 text-green-600" />
                            </div>
                          ) : verification.status === 'pending' ? (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                              <Calendar className="h-4 w-4 text-yellow-600" />
                            </div>
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                              <X className="h-4 w-4 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{verification.type}</p>
                            {verification.verifiedAt && (
                              <p className="text-sm text-gray-500">
                                Verified {format(verification.verifiedAt, 'MMM d, yyyy')}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              verification.status === 'verified'
                                ? 'bg-green-100 text-green-700'
                                : verification.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-700'
                            }
                          >
                            {verification.status === 'verified'
                              ? 'Verified'
                              : verification.status === 'pending'
                              ? 'Pending'
                              : 'Not Started'}
                          </Badge>
                          {verification.status === 'pending' && (
                            <Button size="sm">Verify</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Uploaded Documents</CardTitle>
                  <CardDescription>
                    Review and verify submitted documents.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {founder.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-gray-400" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-gray-500">
                              {doc.type} • Uploaded {format(doc.uploadedAt, 'MMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              doc.status === 'verified'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }
                          >
                            {doc.status === 'verified' ? 'Verified' : 'Pending'}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          {doc.status === 'pending' && (
                            <>
                              <Button size="sm" variant="outline">
                                Reject
                              </Button>
                              <Button size="sm">Verify</Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Log</CardTitle>
                  <CardDescription>
                    Recent activity and changes for this founder.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activityLog.map((activity, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
                          <activity.icon className="h-4 w-4 text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.action}</span>
                          </p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trust Score Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="h-5 w-5" />
                Trust Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-5xl font-bold text-green-600">
                  {founder.trustScore.total}
                </div>
                <Badge className="mt-2 bg-green-100 text-green-700">
                  Pre-Approved
                </Badge>
                {founder.trustScore.manualOverride && (
                  <p className="mt-2 text-xs text-orange-600">
                    * Manually overridden
                  </p>
                )}
              </div>
              <div className="mt-6 space-y-3">
                <ScoreBar label="Digital Lineage" value={founder.trustScore.digitalLineage} max={40} />
                <ScoreBar label="Business" value={founder.trustScore.business} max={25} />
                <ScoreBar label="Identity" value={founder.trustScore.identity} max={20} />
                <ScoreBar label="Network" value={founder.trustScore.network} max={15} />
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Documents</span>
                <span className="font-medium">
                  {founder.documents.filter((d) => d.status === 'verified').length}/
                  {founder.documents.length} verified
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Verifications</span>
                <span className="font-medium">
                  {founder.verifications.filter((v) => v.status === 'verified').length}/
                  {founder.verifications.length} complete
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Days Since Signup</span>
                <span className="font-medium">
                  {Math.floor((Date.now() - founder.createdAt.getTime()) / (1000 * 60 * 60 * 24))}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Admin Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Admin Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add notes about this founder..."
                rows={4}
                className="resize-none"
              />
              <Button className="mt-2 w-full" size="sm">
                Save Notes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ScoreBar({ label, value, max }: { label: string; value: number; max: number }) {
  const percentage = (value / max) * 100

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">{label}</span>
        <span className="font-medium text-gray-700">
          {value}/{max}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  )
}

const activityLog = [
  { action: 'Bank application submitted to Mercury', time: '3 days ago', icon: Building2 },
  { action: 'Local ID document verified', time: '5 days ago', icon: FileText },
  { action: 'Passport document verified', time: '5 days ago', icon: FileText },
  { action: 'Trust score calculated: 82', time: '6 days ago', icon: Shield },
  { action: 'Onboarding completed', time: '6 days ago', icon: Check },
  { action: 'Account created', time: '6 days ago', icon: User },
]
