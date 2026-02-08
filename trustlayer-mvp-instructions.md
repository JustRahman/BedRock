# TrustLayer MVP Build Instructions

> **One-liner:** We greenlight founders that US banks redlight.

---

## Table of Contents

1. [Vision & Positioning](#1-vision--positioning)
2. [MVP Scope](#2-mvp-scope)
3. [User Personas](#3-user-personas)
4. [Core User Flows](#4-core-user-flows)
5. [Feature Breakdown](#5-feature-breakdown)
6. [Technical Architecture](#6-technical-architecture)
7. [Third-Party Integrations](#7-third-party-integrations)
8. [Data Models](#8-data-models)
9. [Compliance Engine](#9-compliance-engine)
10. [Trust Score System](#10-trust-score-system)
11. [Admin Dashboard](#11-admin-dashboard)
12. [Pre-Build Validation](#12-pre-build-validation)
13. [Build Phases & Timeline](#13-build-phases--timeline)
14. [Team Responsibilities](#14-team-responsibilities)
15. [Success Metrics](#15-success-metrics)
16. [Post-MVP Roadmap](#16-post-mvp-roadmap)
17. [Risk Mitigation](#17-risk-mitigation)
18. [Resources & Tools](#18-resources--tools)

---

## 1. Vision & Positioning

### The Problem

International founders from emerging markets (CIS, Africa, South Asia, LATAM) face a **Verification Paradox**:

- Banks won't trust them because they have no US footprint
- They can't get a footprint without a bank
- Rejection rate: 40%+ based on country alone

### Current Solutions (Competitors)

| Competitor | What They Do | Gap |
|------------|--------------|-----|
| Stripe Atlas | LLC + EIN + banking intro | No help with rejections |
| Doola | LLC + compliance + bookkeeping | Just forwards applications |
| Firstbase | LLC + registered agent | Same — no verification layer |

**Their model:** Form company → Hope bank approves → Leave founder alone

**Your model:** Verify founder → Guarantee compliance → Banks trust your filter

### Your Unique Value

1. **Verification**: Prove founders are legit when banks can't
2. **Compliance**: Automate tax filings, prevent $25K+ penalties
3. **Access**: 94%+ bank approval rate vs 60% industry average

---

## 2. MVP Scope

### What MVP Includes

| Feature | Priority | Notes |
|---------|----------|-------|
| Founder onboarding flow | P0 | Multi-step verification intake |
| Identity verification | P0 | Passport + local ID + liveness |
| Business verification | P0 | GitHub, domain, social proof |
| Trust Score calculation | P0 | Simple weighted algorithm |
| LLC formation integration | P0 | Partner API (Stripe Atlas or direct) |
| Bank application prep | P0 | Pre-filled Mercury/Relay applications |
| Compliance dashboard | P1 | Track filing deadlines |
| Document storage | P1 | Secure founder documents |
| Admin dashboard | P1 | Review applications, override scores |
| Notification system | P1 | Email + SMS for deadlines |

### What MVP Does NOT Include

| Feature | Why Excluded |
|---------|--------------|
| Automated tax filing | Complex, needs CPA partnership first |
| Own banking product | Requires banking license |
| Multi-jurisdiction (UK, EU) | Focus on US first |
| Payroll features | Post-traction expansion |
| Mobile app | Web-first |
| Public API | No B2B yet |

### MVP Success Criteria

- 50 founders through full flow
- 90%+ bank approval rate for verified founders
- 3+ paying customers at $500+
- Mercury/Relay acknowledges your referrals

---

## 3. User Personas

### Primary: The Rejected Founder

```
Name: Aziz (Uzbekistan)
Background: Built SaaS with $2K MRR, sells to US customers
Problem: Mercury rejected him twice, no explanation
Current workaround: Using friend's US account (risky)
Willingness to pay: $500-1000 for guaranteed access
```

### Secondary: The First-Timer

```
Name: Priya (India)
Background: Developer launching first micro-SaaS
Problem: Doesn't know where to start with US entity
Fear: Making expensive mistakes with IRS
Willingness to pay: $300-500 for guided setup
```

### Tertiary: The Scaling Founder

```
Name: Ahmed (Egypt)
Background: Has LLC but struggling with compliance
Problem: Missed 5472 filing, facing penalties
Need: Ongoing compliance management
Willingness to pay: $100/month ongoing
```

---

## 4. Core User Flows

### Flow 1: New Founder Onboarding

```
Landing Page
    ↓
"Check Your Eligibility" CTA
    ↓
Step 1: Basic Info
    - Full legal name
    - Country of citizenship
    - Country of residence
    - Email + phone
    ↓
Step 2: Identity Verification
    - Passport upload
    - Local ID upload (country-specific)
    - Liveness check (selfie video)
    ↓
Step 3: Business Verification
    - Business description
    - Website/domain (if exists)
    - GitHub profile (if technical)
    - Social profiles (LinkedIn, Twitter)
    - Existing revenue proof (Stripe screenshots, etc.)
    ↓
Step 4: Additional Trust Signals
    - University email (if student)
    - Employer verification (if employed)
    - Accelerator/incubator affiliation
    - References (other founders)
    ↓
Trust Score Calculated
    ↓
Branch A: Score ≥ 70 → "You're Pre-Approved"
    - Show pricing
    - Collect payment
    - Begin LLC + bank process
    ↓
Branch B: Score 50-69 → "Additional Verification Needed"
    - Request more documents
    - Schedule video call
    - Manual review
    ↓
Branch C: Score < 50 → "Not Eligible Currently"
    - Explain why
    - Offer pathway to eligibility
    - Add to nurture list
```

### Flow 2: LLC Formation

```
Payment Received
    ↓
Collect Formation Details
    - LLC name (3 options)
    - Business address preference
    - Operating agreement preferences
    - Management structure
    ↓
Name Availability Check
    - Query Delaware/Wyoming API
    - Return available options
    ↓
Formation Initiated
    - Submit to registered agent partner
    - Track status in dashboard
    ↓
EIN Application
    - Auto-generate SS-4
    - Submit via IRS fax automation OR
    - Queue for manual submission
    ↓
Formation Complete
    - Deliver: Articles, EIN, Operating Agreement
    - Trigger bank application flow
```

### Flow 3: Bank Application

```
LLC + EIN Ready
    ↓
Pre-fill Bank Application
    - Mercury OR Relay OR both
    - Include Trust Score report
    - Attach verification documents
    ↓
Submit with Cover Letter
    - Explain verification process
    - Highlight trust signals
    - Provide your contact as reference
    ↓
Track Application Status
    - Pending → Under Review → Approved/Rejected
    ↓
If Rejected:
    - Collect rejection reason
    - Escalate to bank partnership contact
    - Retry with additional documentation
    ↓
If Approved:
    - Celebrate in dashboard
    - Trigger compliance onboarding
    - Schedule 30-day check-in
```

### Flow 4: Compliance Tracking

```
Bank Account Active
    ↓
Set Up Compliance Calendar
    - 5472 due date (April 15 or extension)
    - FBAR due date (April 15)
    - BOI report due date (within 90 days of formation)
    - Annual report due date (state-specific)
    ↓
60 Days Before Deadline
    - Email reminder
    - Dashboard alert
    - Collect required information
    ↓
30 Days Before Deadline
    - Generate draft forms
    - Send to founder for review
    - Escalate if no response
    ↓
Filing (MVP: Manual)
    - CPA partner files OR
    - Founder downloads and files OR
    - You file on their behalf (future)
    ↓
Confirmation
    - Store filing receipt
    - Update compliance status
    - Schedule next deadline
```

---

## 5. Feature Breakdown

### 5.1 Landing Page

**Purpose:** Convert visitors to applicants

**Sections:**
1. Hero: "US Banking Access for Global Founders"
2. Problem statement: The rejection stats
3. How it works: 3-step visual
4. Trust signals: Approval rate, founder count
5. Pricing: Transparent tiers
6. FAQ: Common objections
7. CTA: "Check Your Eligibility"

**Key elements:**
- Country selector showing "We specialize in [their country]"
- Social proof from founders in their region
- No signup required to check eligibility

### 5.2 Eligibility Checker

**Purpose:** Qualify leads, collect initial data

**Fields:**
- Country of citizenship
- Country of residence
- Business type (SaaS, services, e-commerce, other)
- Current revenue (ranges)
- Previous US entity? (yes/no)
- Previous bank rejection? (yes/no)

**Output:**
- Instant preliminary assessment
- Estimated approval likelihood
- Next steps CTA

### 5.3 Verification Portal

**Purpose:** Collect and verify founder identity + business

**Identity Verification:**
- Passport OCR + validation
- Local ID OCR + validation
- Liveness detection (prevent photo spoofing)
- Address verification (utility bill or bank statement)

**Business Verification:**
- Domain ownership (DNS TXT record)
- GitHub activity analysis
- LinkedIn profile validation
- Revenue proof (screenshot verification or Stripe OAuth)

**Implementation options:**
- Sumsub (recommended — good emerging market coverage)
- Veriff (alternative)
- Onfido (expensive but thorough)
- Manual review fallback

### 5.4 Trust Score Dashboard

**Purpose:** Show founders their score + improvement path

**Display:**
- Overall score (0-100)
- Score breakdown by category
- "Verified" badges earned
- Actions to improve score

**Categories:**
- Identity (0-25 points)
- Business (0-25 points)
- Financial (0-25 points)
- Social proof (0-25 points)

### 5.5 Document Vault

**Purpose:** Secure storage for founder documents

**Documents stored:**
- Passport copy
- Articles of Incorporation
- EIN letter
- Operating Agreement
- Bank statements
- Tax filings
- Compliance certificates

**Requirements:**
- Encrypted at rest
- Access logging
- Founder can download anytime
- Shareable links with expiry

### 5.6 Compliance Calendar

**Purpose:** Never miss a filing deadline

**Features:**
- Visual calendar with all deadlines
- Countdown timers
- Email + SMS reminders
- Document checklist per filing
- Status tracking (not started, in progress, filed)

**Deadlines tracked:**
- Form 5472 (foreign-owned LLC disclosure)
- Pro forma 1120 (accompanies 5472)
- FBAR (foreign bank account reporting)
- BOI report (beneficial ownership)
- State annual report
- Registered agent renewal

### 5.7 Founder Dashboard

**Purpose:** Single view of everything

**Sections:**
- Status overview (LLC, EIN, Bank, Compliance)
- Next action required
- Document access
- Support chat
- Upgrade options

### 5.8 Admin Dashboard

**Purpose:** Internal team management

**Features:**
- Application queue with filters
- Trust Score override capability
- Manual verification workflow
- Bank application tracking
- Compliance status across all founders
- Revenue dashboard
- Communication logs

---

## 6. Technical Architecture

### Stack Recommendation

```
Frontend:
├── Framework: Next.js 14+ (App Router)
├── Styling: Tailwind CSS
├── Components: shadcn/ui
├── State: Zustand or React Query
└── Forms: React Hook Form + Zod

Backend:
├── Runtime: Node.js 20+
├── Framework: Next.js API Routes OR separate Express/Fastify
├── Database: PostgreSQL (via Supabase)
├── Auth: Supabase Auth or Clerk
├── File storage: Supabase Storage (encrypted)
└── Background jobs: Trigger.dev or Inngest

Infrastructure:
├── Hosting: Vercel (frontend) + Railway (backend if separate)
├── Database: Supabase
├── CDN: Cloudflare
├── Email: Resend or Postmark
├── SMS: Twilio
└── Monitoring: Sentry + Axiom
```

### System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│                    (Next.js on Vercel)                          │
├─────────────────────────────────────────────────────────────────┤
│  Landing  │  Onboarding  │  Dashboard  │  Admin  │  Compliance  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         API LAYER                                │
│                   (Next.js API Routes)                          │
├─────────────────────────────────────────────────────────────────┤
│  Auth  │  Founders  │  Verification  │  Compliance  │  Webhooks │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
┌──────────────────┐ ┌──────────────┐ ┌──────────────────┐
│    Database      │ │   Storage    │ │  Background Jobs │
│   (Supabase)     │ │  (Supabase)  │ │   (Trigger.dev)  │
└──────────────────┘ └──────────────┘ └──────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
┌──────────────────┐ ┌──────────────┐ ┌──────────────────┐
│   KYC Provider   │ │  Formation   │ │   Notifications  │
│    (Sumsub)      │ │   Partner    │ │  (Resend/Twilio) │
└──────────────────┘ └──────────────┘ └──────────────────┘
```

### Security Requirements

| Requirement | Implementation |
|-------------|----------------|
| Data encryption at rest | Supabase default + additional column encryption for PII |
| Data encryption in transit | TLS 1.3 everywhere |
| Access control | Row Level Security (RLS) in Supabase |
| Audit logging | Log all data access with user, timestamp, action |
| PII handling | Separate PII table, restricted access |
| Document security | Signed URLs with expiry, no public access |
| Admin access | 2FA required, IP allowlist |
| Secrets management | Environment variables, never in code |

---

## 7. Third-Party Integrations

### Identity Verification: Sumsub

**Why:** Best emerging market coverage, reasonable pricing

**Integration points:**
- Create applicant
- Upload documents
- Get verification result
- Webhook for status updates

**Fallback:** Manual verification queue

### LLC Formation: Registered Agent Partner

**Options:**
1. **Direct state filing** (cheapest, most control)
   - Delaware: $90 state fee + registered agent
   - Wyoming: $100 state fee + registered agent
   
2. **Stripe Atlas API** (if available)
   - Reseller agreement required
   
3. **Firstbase/Doola wholesale** (fastest to start)
   - White-label their service initially

**Recommendation:** Start with wholesale partner, bring in-house at scale

### Banking: Mercury + Relay

**Mercury:**
- No public API for applications
- Build relationship with partnerships team
- Manual submission with your cover letter
- Track status via founder login

**Relay:**
- Similar approach
- Good for founders Mercury rejects

**Future:** Direct bank partnership or BaaS provider

### EIN: IRS

**Options:**
1. **Online (EIN Assistant)** — Only works for some structures
2. **Fax (Form SS-4)** — 4-5 days, automatable
3. **Phone** — Same day, but manual

**MVP approach:** Fax automation
- Generate SS-4 PDF
- Send via eFax API
- Monitor fax inbox for response
- Parse EIN from response letter

### Email: Resend

**Use cases:**
- Onboarding sequence
- Verification status updates
- Compliance reminders
- Marketing

### SMS: Twilio

**Use cases:**
- Critical deadline reminders
- Verification codes
- Bank application updates

### Background Jobs: Trigger.dev

**Use cases:**
- Daily compliance deadline checks
- Weekly digest emails
- Async document processing
- Retry failed verifications

---

## 8. Data Models

### Core Entities

```
Founder
├── id (uuid)
├── email (unique)
├── phone
├── full_legal_name
├── citizenship_country
├── residence_country
├── created_at
├── updated_at
└── status (enum: onboarding, verified, active, churned)

FounderVerification
├── id (uuid)
├── founder_id (fk)
├── type (enum: identity, business, financial, social)
├── provider (enum: sumsub, manual, github, etc.)
├── status (enum: pending, approved, rejected)
├── provider_reference
├── result_data (jsonb)
├── verified_at
└── expires_at

TrustScore
├── id (uuid)
├── founder_id (fk)
├── total_score (0-100)
├── identity_score (0-25)
├── business_score (0-25)
├── financial_score (0-25)
├── social_score (0-25)
├── calculated_at
└── factors (jsonb — detailed breakdown)

Company
├── id (uuid)
├── founder_id (fk)
├── legal_name
├── state (enum: delaware, wyoming)
├── formation_date
├── ein
├── status (enum: pending, formed, dissolved)
├── registered_agent_id
└── documents (jsonb — list of document references)

BankApplication
├── id (uuid)
├── company_id (fk)
├── bank (enum: mercury, relay, other)
├── status (enum: draft, submitted, under_review, approved, rejected)
├── submitted_at
├── decision_at
├── rejection_reason
└── account_details (jsonb — encrypted)

ComplianceDeadline
├── id (uuid)
├── company_id (fk)
├── type (enum: form_5472, fbar, boi, annual_report)
├── due_date
├── status (enum: upcoming, action_required, filed, overdue)
├── filed_at
├── filing_reference
└── reminder_sent_at

Document
├── id (uuid)
├── founder_id (fk)
├── company_id (fk, nullable)
├── type (enum: passport, ein_letter, articles, etc.)
├── storage_path
├── uploaded_at
├── verified (boolean)
└── expires_at

Payment
├── id (uuid)
├── founder_id (fk)
├── amount_cents
├── currency
├── product (enum: formation, compliance_annual, etc.)
├── status (enum: pending, completed, refunded)
├── stripe_payment_id
└── created_at
```

### Indexes Required

```sql
-- Fast lookup by founder
CREATE INDEX idx_verifications_founder ON founder_verification(founder_id);
CREATE INDEX idx_companies_founder ON company(founder_id);
CREATE INDEX idx_deadlines_company ON compliance_deadline(company_id);

-- Compliance queries
CREATE INDEX idx_deadlines_due ON compliance_deadline(due_date, status);
CREATE INDEX idx_deadlines_overdue ON compliance_deadline(status) WHERE status = 'overdue';

-- Admin queries
CREATE INDEX idx_founders_status ON founder(status, created_at);
CREATE INDEX idx_bank_apps_status ON bank_application(status);
```

---

## 9. Compliance Engine

### Filing Types

#### Form 5472 (Most Critical)

**What:** Information return for 25% foreign-owned US corporations/LLCs

**Who must file:** Single-member LLCs owned by non-US persons (treated as corporations for this purpose)

**Deadline:** April 15 (with extension: October 15)

**Penalty:** $25,000 minimum for late/incomplete filing

**Data needed:**
- Company info (name, EIN, address)
- Owner info (name, country, TIN if any)
- Reportable transactions (even $0)

**Your system:**
1. Detect company needs 5472 (foreign single-member LLC)
2. Create deadline record
3. Send reminders at 90, 60, 30 days
4. Collect transaction information
5. Generate draft form
6. Route to CPA for filing OR provide DIY instructions

#### FBAR (FinCEN 114)

**What:** Report foreign bank accounts > $10,000

**Who must file:** US entities with foreign financial accounts

**Deadline:** April 15 (auto-extension to October 15)

**Note:** Most of your founders won't need this initially (they're getting US accounts). But if they keep foreign accounts, they might.

#### BOI Report (Beneficial Ownership)

**What:** Report beneficial owners to FinCEN

**Who must file:** Almost all LLCs formed after Jan 1, 2024

**Deadline:** 90 days from formation (for new companies)

**Data needed:**
- Company info
- Each beneficial owner: name, DOB, address, ID photo

**Your system:**
1. Auto-create deadline on company formation
2. Collect owner information during onboarding (you already have this!)
3. Generate and file via FinCEN's e-filing system

#### State Annual Report

**What:** Update state on company info

**Who:** All LLCs

**Deadline:** Varies by state

**Delaware:** Due March 1, $300 fee
**Wyoming:** Due on anniversary of formation, $60 minimum

### Compliance Dashboard Requirements

```
For each company, show:

┌─────────────────────────────────────────────────────────┐
│ Compliance Status                           ● On Track │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ BOI Report         Filed Jan 15, 2025              │
│                                                         │
│  ⏳ Form 5472          Due Apr 15, 2025 (68 days)      │
│     [Start Preparation]                                 │
│                                                         │
│  ⏳ Annual Report      Due Mar 1, 2025 (24 days)       │
│     [Pay $300 Filing Fee]                              │
│                                                         │
│  ✅ Registered Agent   Renewed until Dec 2025          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 10. Trust Score System

### Scoring Philosophy

The Trust Score answers one question: **"How confident are we that this founder is legitimate and low-risk?"**

Banks care about:
1. Identity fraud risk
2. Business legitimacy
3. Financial stability
4. Sanctions/AML risk

Your score must predict these.

### Scoring Model (v1)

```
Total Score = Identity + Business + Financial + Social (max 100)

IDENTITY (max 25 points)
├── Passport verified via Sumsub         +10
├── Local ID verified                    +5
├── Liveness check passed                +5
├── Address verified                     +3
├── From high-risk country               -5
└── Previous rejection on file           -3

BUSINESS (max 25 points)
├── Has live website/product             +8
├── Domain age > 6 months                +3
├── GitHub with real activity            +5
├── LinkedIn profile complete            +3
├── Business registered locally          +4
└── Clear business description           +2

FINANCIAL (max 25 points)
├── Existing revenue > $0                +10
├── Revenue > $1000/month                +5 (additional)
├── Stripe/PayPal connected              +5
├── Bank statements provided             +3
└── Revenue verification failed          -5

SOCIAL (max 25 points)
├── Referred by verified founder         +10
├── University email verified            +5
├── Known accelerator/incubator          +8
├── Twitter with real followers          +2
├── Other social verification            +2
└── No social presence                   -3
```

### Score Thresholds

| Score | Status | Action |
|-------|--------|--------|
| 80-100 | Pre-approved | Fast-track everything |
| 70-79 | Approved | Standard process |
| 50-69 | Review needed | Additional documentation, video call |
| 30-49 | High risk | Manual review required, possible rejection |
| 0-29 | Not eligible | Explain why, suggest improvements |

### Score Display

Show founders their score with:
- Overall score
- Category breakdown
- What's verified (green checkmarks)
- What's missing (opportunities to improve)
- Clear actions to increase score

**Never show:** Internal risk flags, country penalties, rejection predictions

---

## 11. Admin Dashboard

### Application Queue

```
┌─────────────────────────────────────────────────────────────────┐
│ Applications                               [Filter ▼] [Search] │
├─────────────────────────────────────────────────────────────────┤
│ ○ Aziz K.        Uzbekistan    Score: 72    Pending Review     │
│   Applied 2h ago              [View] [Approve] [Request More]  │
├─────────────────────────────────────────────────────────────────┤
│ ○ Priya M.       India         Score: 85    Auto-Approved      │
│   Applied 1d ago              [View] [Process Formation]       │
├─────────────────────────────────────────────────────────────────┤
│ ○ Ahmed R.       Egypt         Score: 45    Needs Review       │
│   Applied 3d ago              [View] [Schedule Call] [Reject]  │
└─────────────────────────────────────────────────────────────────┘
```

### Manual Verification Workflow

For founders in review:
1. View all submitted documents
2. Check verification provider results
3. Add notes
4. Override score (with reason logged)
5. Approve / Request more docs / Reject

### Compliance Overview

```
┌─────────────────────────────────────────────────────────────────┐
│ Compliance Overview                           Feb 2025         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Upcoming Deadlines (30 days)                                  │
│  ├── 12 Annual Reports (Delaware)                              │
│  ├── 3 BOI Reports                                             │
│  └── 0 Form 5472 (next batch in April)                         │
│                                                                 │
│  ⚠️ Overdue                                                     │
│  └── 1 Annual Report - Ahmed R. (5 days overdue)               │
│                                                                 │
│  ✅ Recently Filed                                              │
│  └── 8 filings this month                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Metrics Dashboard

Track:
- Applications this week/month
- Conversion rate (application → paid)
- Approval rate (bank applications)
- Average Trust Score
- Revenue
- Compliance filing success rate
- NPS / satisfaction

---

## 12. Pre-Build Validation

### Before Writing Code

**Week 1: Demand Validation**

| Day | Action | Success Criteria |
|-----|--------|------------------|
| 1-2 | Post in communities (Reddit r/startups, r/SaaS, Indie Hackers, Twitter) | 20+ responses |
| 3-4 | DM founders who mentioned Mercury/Stripe rejection | 10+ conversations |
| 5-7 | Offer manual service ($300) | 3+ paying customers |

**Target communities:**
- r/startups
- r/SaaS
- r/EntrepreneurRideAlong
- Indie Hackers
- Twitter (search "Mercury rejected", "Stripe Atlas", "US LLC international")
- International founder Discords/Slacks

**Message template:**
> "Hey! Saw you mentioned getting rejected by Mercury. I'm building a service that helps international founders get approved by providing better verification. Would love to hear about your experience. Mind if I DM?"

### Week 2: Manual Service Test

For your first 3-5 customers:
1. Collect their documents manually (Google Forms + Drive)
2. Do verification yourself (review documents, video call)
3. Write cover letter for their Mercury application
4. Submit on their behalf (or guide them)
5. Track outcome

**Document everything:**
- What documents did you need?
- What questions did Mercury ask?
- What got people approved vs rejected?
- How long did each step take?

This becomes your product spec.

### Week 3: Bank Relationship

**Mercury:**
- Email partnerships@mercury.com
- Explain: "We're pre-verifying international founders. Can we discuss referral process?"
- Goal: Get acknowledgment that your vetted applications get faster/better review

**Relay:**
- Same approach
- Good backup for Mercury rejections

If neither responds, proceed anyway — you can still help founders apply and track outcomes.

---

## 13. Build Phases & Timeline

### Phase 0: Validation (Week 1-2)

**Goal:** Prove demand before building

**Deliverables:**
- Community posts live
- 10+ founder conversations
- 3+ manual paying customers
- Documented manual process

**Team:** Founder only (no dev needed)

### Phase 1: Foundation (Week 3-4)

**Goal:** Core infrastructure

**Deliverables:**
- Database schema deployed
- Auth system working
- Basic founder model
- Admin login

**Team:** 1 full-stack developer

### Phase 2: Onboarding Flow (Week 5-6)

**Goal:** Founders can apply

**Deliverables:**
- Landing page
- Eligibility checker
- Multi-step onboarding form
- Document upload
- Sumsub integration

**Team:** 1 frontend + 1 backend developer

### Phase 3: Trust Score (Week 7)

**Goal:** Automated scoring

**Deliverables:**
- Score calculation engine
- Score display for founders
- Admin score view + override

**Team:** 1 backend developer

### Phase 4: Admin Dashboard (Week 8)

**Goal:** Team can manage applications

**Deliverables:**
- Application queue
- Manual verification workflow
- Founder detail view
- Notes and communication log

**Team:** 1 full-stack developer

### Phase 5: Compliance Foundation (Week 9-10)

**Goal:** Track deadlines

**Deliverables:**
- Deadline calculation logic
- Compliance dashboard for founders
- Email reminders
- Compliance overview for admin

**Team:** 1 backend + 1 frontend developer

### Phase 6: Polish & Launch (Week 11-12)

**Goal:** Production-ready MVP

**Deliverables:**
- End-to-end testing
- Error handling
- Monitoring setup
- Documentation
- First 10 real users through system

**Team:** All hands

### Total Timeline: 12 Weeks

```
Week  1-2:  Validation (no code)
Week  3-4:  Foundation
Week  5-6:  Onboarding
Week  7:    Trust Score
Week  8:    Admin Dashboard
Week  9-10: Compliance
Week 11-12: Polish & Launch
```

---

## 14. Team Responsibilities

### Founder/PM

- Customer conversations
- Bank relationships
- Compliance research
- Manual verification (early)
- Pricing decisions
- Go-to-market

### Backend Developer

- Database design
- API development
- Sumsub integration
- Trust Score algorithm
- Background jobs
- Security implementation

### Frontend Developer

- Landing page
- Onboarding flow
- Founder dashboard
- Compliance dashboard
- Admin dashboard
- Responsive design

### Full-Stack (if limited team)

- All of the above
- Prioritize: Onboarding → Admin → Compliance

### Future Hires (Post-MVP)

- CPA/Tax specialist (compliance filings)
- Customer success (founder support)
- Growth marketer (acquisition)

---

## 15. Success Metrics

### MVP Success (First 90 Days)

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Applications | 100 | Demand exists |
| Paid customers | 25 | Willingness to pay |
| Bank approval rate | 90%+ | Core value prop works |
| Revenue | $10,000 | Business viability |
| NPS | 50+ | Founders would recommend |

### Leading Indicators

| Metric | Track Weekly |
|--------|--------------|
| Landing page visitors | Growth trend |
| Eligibility checks started | Top of funnel |
| Applications completed | Conversion rate |
| Avg Trust Score | Quality of applicants |
| Time to bank approval | Operational efficiency |

### Lagging Indicators

| Metric | Track Monthly |
|--------|---------------|
| MRR | Revenue growth |
| Churn | Retention |
| Compliance filings completed | Ongoing value |
| Bank approval rate | Core metric |
| CAC | Acquisition efficiency |

---

## 16. Post-MVP Roadmap

### 3-6 Months: Expand Services

- Automated tax filing (CPA partnership)
- Bookkeeping integration (Bench, Pilot)
- Multiple bank options
- Stripe Atlas alternative (direct formation)

### 6-12 Months: New Revenue Streams

- Annual compliance subscription ($600-1200/year)
- Payroll for US contractors
- Virtual office / mail forwarding
- Tax advisory (partnership)

### 12-24 Months: Scale

- Multi-jurisdiction (UK, EU, Singapore)
- API for platforms (white-label)
- Own banking relationships (higher margins)
- Regional expansion (dedicated CIS, LATAM, Africa)

### Moat Building

```
Year 1: Verification data from 500+ founders
Year 2: Predictive model for bank approval
Year 3: Banks route "risky" applicants to you
Year 4: Become required step in their process
```

---

## 17. Risk Mitigation

### Risk: Banks Don't Engage

**Mitigation:**
- Start without partnership
- Track approval rates to prove value
- Approach with data after 50+ applications

### Risk: Low Demand

**Mitigation:**
- Validate before building (Week 1-2)
- Start with manual service
- Pivot to adjacent problems (compliance-only)

### Risk: Compliance Complexity

**Mitigation:**
- Partner with CPA from day 1
- Start with deadline tracking only
- Add filing later

### Risk: Verification Fraud

**Mitigation:**
- Use established KYC provider (Sumsub)
- Manual review for edge cases
- Video calls for high-risk scores
- Refund policy if fraud detected

### Risk: Competitor Copies

**Mitigation:**
- Move fast
- Build founder community (network effects)
- Data moat (trust score improves with volume)
- Bank relationships (takes time to build)

---

## 18. Resources & Tools

### Development

| Tool | Purpose | Cost |
|------|---------|------|
| Supabase | Database + Auth + Storage | Free tier → $25/mo |
| Vercel | Frontend hosting | Free tier → $20/mo |
| Railway | Backend (if separate) | Free tier → $5/mo |
| Sumsub | KYC/Identity verification | ~$1-2 per verification |
| Resend | Email | Free tier → $20/mo |
| Twilio | SMS | Pay per message |
| Trigger.dev | Background jobs | Free tier |
| Sentry | Error monitoring | Free tier |

### Operations

| Tool | Purpose | Cost |
|------|---------|------|
| Notion | Documentation | Free |
| Linear | Task management | Free tier |
| Slack | Team communication | Free |
| Calendly | Scheduling calls | Free tier |
| Loom | Video communication | Free tier |
| Google Workspace | Email + Drive | $6/user/mo |

### Compliance & Legal

| Resource | Purpose |
|----------|---------|
| CPA (find on Upwork) | Tax filing guidance |
| Doola blog | Compliance research |
| IRS.gov | Form requirements |
| FinCEN.gov | BOI filing |

### Learning

| Resource | Topic |
|----------|-------|
| Delaware Division of Corporations | State filing |
| Wyoming Secretary of State | State filing |
| Mercury Help Center | Banking requirements |
| Stripe Atlas Guide | Formation process |

---

## Quick Start Checklist

### This Week

- [ ] Post in 3 communities about Mercury/Stripe rejection
- [ ] DM 10 founders who mentioned rejection
- [ ] Get 3 people to pay $300 for manual help

### If Validation Works

- [ ] Onboard 3 customers manually
- [ ] Document every step and question
- [ ] Contact Mercury partnerships
- [ ] Start database design

### Week 3+

- [ ] Begin Phase 1 development
- [ ] Set up Sumsub account
- [ ] Create landing page
- [ ] Process first automated application

---

## Final Notes

**Remember:**
- Validation before building
- Manual before automated
- Relationships before scale
- Trust Score is your moat
- Compliance is your retention

**The 900+ insight:**

> "We don't form LLCs. We greenlight founders that banks redlight."

**Go build.**
