# Bedrock — MVP Build Instructions

> **One-liner:** The autonomous identity, risk, and compliance layer for founders the financial system ignores.

---

## Table of Contents

1. [Vision](#1-vision)
2. [Core Concept: Proof of Personhood](#2-core-concept-proof-of-personhood)
3. [MVP Scope](#3-mvp-scope)
4. [User Personas](#4-user-personas)
5. [Complete User Flows](#5-complete-user-flows)
6. [Trust Score System (Digital Lineage)](#6-trust-score-system-digital-lineage)
7. [Anti-Freeze Shield](#7-anti-freeze-shield)
8. [Agentic Compliance Officer](#8-agentic-compliance-officer)
9. [Trust Score API (B2B)](#9-trust-score-api-b2b)
10. [Feature Specifications](#10-feature-specifications)
11. [Data Architecture](#11-data-architecture)
12. [Third-Party Integrations](#12-third-party-integrations)
13. [Operational Workflows](#13-operational-workflows)
14. [Validation Before Building](#14-validation-before-building)
15. [Build Phases & Timeline](#15-build-phases--timeline)
16. [YC Application Strategy](#16-yc-application-strategy)
17. [Metrics & Success Criteria](#17-metrics--success-criteria)
18. [Risks & Mitigations](#18-risks--mitigations)
19. [Post-MVP Roadmap](#19-post-mvp-roadmap)
20. [Resources](#20-resources)

---

## 1. Vision

### The Problem (4 Layers)

| Layer | Problem | Impact |
|-------|---------|--------|
| **Identity** | Banks use passport + selfie. Deepfakes up 300%. Documents prove nothing. | Fraud rises, legitimate founders rejected |
| **Access** | Banks blacklist 100+ countries. No data = auto-reject. | 40%+ rejection rate for emerging markets |
| **Compliance** | Founders get approved, then frozen. One weird transaction = account shut. | Businesses destroyed overnight |
| **Operations** | Tax filings manual, confusing. $25K penalty if late. | Founders lose money, give up |

### The Solution (4 Layers)

| Layer | Solution | How |
|-------|----------|-----|
| **Identity** | Proof of Personhood | Verify Digital Lineage, not documents |
| **Access** | Trust Score | Proprietary risk model for ignored countries |
| **Compliance** | Anti-Freeze Shield | AI monitors transactions before banks freeze |
| **Operations** | Agentic Compliance | AI handles all filings autonomously |

### Why Now

| Trend | Impact |
|-------|--------|
| Deepfakes broke KYC | Old verification doesn't work |
| AI agents mature | Autonomous compliance now possible |
| Cross-border founders booming | Bigger market every year |
| Banks de-risking harder | More rejections = more demand |
| Crypto/stablecoin growth | Same verification needed |

---

## 2. Core Concept: Proof of Personhood

### Old KYC vs Bedrock

| Old KYC | Bedrock Proof of Personhood |
|---------|----------------------------|
| "Is this document real?" | "Is this person real?" |
| Passport scan | Digital Lineage verification |
| Selfie match | Behavioral pattern analysis |
| Point-in-time check | 5 years of history |
| Easy to fake (deepfakes) | Impossible to fake retroactively |

### Digital Lineage = 5 Pillars

```
1. CODE HISTORY
   └── GitHub: commits, patterns, repos, contribution timeline
   
2. PROFESSIONAL GRAPH
   └── LinkedIn: connections, endorsements from 2+ years ago, career progression
   
3. FINANCIAL FOOTPRINT
   └── Stripe/PayPal: real transactions, revenue patterns
   └── Local bank data (via partners)
   └── Mobile money history (Africa, Asia)
   
4. DIGITAL PRESENCE
   └── Domain age, website history
   └── Social media timeline (Twitter, etc.)
   └── App store presence (if applicable)
   
5. LOCAL VERIFICATION
   └── Local tax records
   └── University verification
   └── Employer verification
   └── Local business registration
```

### Why This Can't Be Faked

| Signal | Why Unfakeable |
|--------|----------------|
| GitHub commits from 2021 | Can't backdate blockchain-style history |
| LinkedIn endorsements from 3 years ago | Would need to hack others' accounts |
| Stripe revenue from 2022 | Can't fake Stripe's database |
| Domain registered 4 years ago | WHOIS history is permanent |
| Local tax filings | Government records |

**The pitch:** "Deepfakes can fake a selfie. They can't fake 5 years of Digital Residue."

---

## 3. MVP Scope

### What MVP MUST Have (P0)

| Feature | Why Critical |
|---------|--------------|
| Landing page | Convert visitors |
| Onboarding flow | Collect founder data |
| Digital Lineage verification | Core differentiator |
| Trust Score calculation | The product |
| Founder dashboard | Show status |
| Admin dashboard | Manage applications |
| LLC formation workflow | Revenue |
| Bank application prep | Core value |
| Basic compliance calendar | Retention |

### What MVP SHOULD Have (P1)

| Feature | Why Important |
|---------|---------------|
| AI document analysis | Reduce manual work |
| Email notifications | Keep founders engaged |
| Anti-Freeze alerts (basic) | Differentiation |
| Multiple bank options | Increase approval rate |

### What MVP Should NOT Have (P2+)

| Feature | Why Not Now |
|---------|-------------|
| Trust Score API | Need data first |
| Full Agentic Compliance | Complex, phase 2 |
| Multi-jurisdiction | Focus on US first |
| Lending products | Way later |
| Mobile app | Web first |
| Transaction monitoring | Needs bank integration |

### MVP Success = 

- 20+ founders through full flow
- 85%+ bank approval rate
- 5+ paying customers
- Trust Score correlates with approval
- One bank acknowledges your referrals

---

## 4. User Personas

### Primary: The Rejected Founder

```
Name:        Sardor
Country:     Uzbekistan
Background:  Built SaaS with $3K MRR, US customers
Problem:     Mercury rejected twice, no explanation
Current:     Using friend's account (risky)
Pays:        $500-1,000 for guaranteed access
```

### Secondary: The First-Timer

```
Name:        Amina  
Country:     Nigeria
Background:  Developer launching micro-SaaS
Problem:     Doesn't know where to start
Fear:        Making $25K mistake with IRS
Pays:        $500 for guided setup
```

### Tertiary: The Frozen Founder

```
Name:        Raj
Country:     Pakistan  
Background:  Had Mercury, got frozen
Problem:     Wired money to contractor, account locked
Need:        Someone to prevent this next time
Pays:        $1,000/year for Anti-Freeze
```

### Future: B2B Customer

```
Name:        Mercury Risk Team
Problem:     Want Uzbek founders but afraid
Need:        Someone to verify them
Pays:        $5-20 per verification or revenue share
```

---

## 5. Complete User Flows

### Flow 1: Discovery → Signup

```
Founder searches "US LLC Pakistan" on Google
    ↓
Lands on Bedrock landing page
    ↓
Sees: "94% approval rate for founders banks reject"
    ↓
Clicks "Check Your Eligibility" (free)
    ↓
Quick form:
    - Country of citizenship
    - Country of residence  
    - Business type
    - Current revenue (range)
    - Previous rejection? (yes/no)
    ↓
Instant result:
    - "You're likely eligible" OR
    - "You may need additional verification"
    ↓
CTA: "Start Full Verification →"
```

### Flow 2: Digital Lineage Verification

```
Step 1: Basic Info
    - Full legal name (as on passport)
    - Email
    - Phone
    - Date of birth
    - Current address
    ↓
Step 2: Identity Documents
    - Passport upload
    - Local government ID upload
    - Proof of address (utility bill, bank statement)
    - Selfie/liveness check
    ↓
Step 3: Digital Lineage — Code
    - Connect GitHub (OAuth)
    - OR provide GitHub username for analysis
    - System checks:
        □ Account age
        □ Commit frequency over time
        □ Contribution patterns
        □ Repo quality
        □ Languages used
    ↓
Step 4: Digital Lineage — Professional
    - Connect LinkedIn (OAuth)
    - OR provide LinkedIn URL
    - System checks:
        □ Account age
        □ Connection count + quality
        □ Endorsements (when received)
        □ Career progression
        □ Mutual connections with verified founders
    ↓
Step 5: Digital Lineage — Financial
    - Connect Stripe (OAuth) — if have revenue
    - OR upload bank statements
    - OR connect local payment method (M-Pesa, etc.)
    - System checks:
        □ Revenue history
        □ Transaction patterns
        □ Customer geography
        □ Chargeback rate
    ↓
Step 6: Digital Lineage — Presence
    - Website URL
    - Twitter/X handle
    - Any other social profiles
    - App store links (if applicable)
    - System checks:
        □ Domain age (WHOIS)
        □ Website history (Wayback Machine)
        □ Social account age
        □ Follower authenticity
    ↓
Step 7: Additional Trust Signals
    - University email (optional)
    - Employer verification (optional)
    - Accelerator/incubator affiliation (optional)
    - Referral from verified Bedrock founder (optional)
    ↓
Processing (Real-time + Background)
    - AI analyzes all signals
    - Cross-references data points
    - Checks for inconsistencies
    - Generates Trust Score
    ↓
Result Page
    - Trust Score: 78/100
    - Breakdown by category
    - "Approved" / "Review Needed" / "More Info Required"
    - What to do next
```

### Flow 3: Trust Score → Payment

```
Trust Score calculated
    ↓
Branch by score:

SCORE 70+: "You're Approved"
    ↓
    Show pricing:
    ├── Basic: $500 (Formation + Banking)
    ├── Standard: $800 (+ 1 year compliance)
    └── Premium: $1,500 (+ Anti-Freeze + Guarantee)
    ↓
    Founder selects package
    ↓
    Stripe checkout
    ↓
    Payment confirmed → Start formation

SCORE 50-69: "Additional Verification"
    ↓
    Show what's missing:
    "Your score would increase with:"
    ├── +10: Connect Stripe (show revenue)
    ├── +8: Get referral from verified founder
    └── +5: Verify university email
    ↓
    Option A: Add more verification
    Option B: Request manual review ($100 fee)
    Option C: Schedule video call (free)

SCORE <50: "Not Eligible Yet"
    ↓
    Explain why (without revealing exact algorithm)
    ├── "Insufficient business history"
    ├── "Unable to verify identity"
    └── "Need more digital presence"
    ↓
    Show pathway to eligibility
    Add to nurture email list
```

### Flow 4: LLC Formation

```
Payment received
    ↓
Dashboard unlocks "Formation" section
    ↓
Collect formation details:
    - LLC name (3 choices, ranked)
    - State: Delaware or Wyoming (explain difference)
    - Business address:
        □ Use Bedrock registered agent address
        □ Use own address
    - Management structure (default: single-member)
    ↓
AI checks name availability
    - Query state database
    - Return available options
    - Founder confirms choice
    ↓
Generate documents:
    - Articles of Organization (state-specific)
    - Operating Agreement (template)
    - Initial Resolutions
    ↓
Submit to state
    - Via registered agent partner
    - Track status in real-time
    ↓
Status updates:
    Day 1: "Submitted"
    Day 2-3: "Processing"
    Day 3-7: "Approved" or "Issue" (rare)
    ↓
Documents delivered to dashboard:
    - Stamped Articles of Organization
    - Certificate of Formation
    - Operating Agreement
    ↓
Trigger EIN flow
```

### Flow 5: EIN Acquisition

```
LLC approved
    ↓
Auto-generate Form SS-4
    - Pre-fill from founder data
    - Founder reviews + confirms
    ↓
Submission method:
    
OPTION A: Fax (Default)
    - Generate SS-4 PDF
    - Send via eFax API to IRS
    - Monitor fax inbox
    - Parse response (4-7 business days)
    
OPTION B: Phone (Backup)
    - Schedule call slot
    - Bedrock team calls IRS
    - Same-day EIN
    - Higher cost ($50 add-on)
    ↓
EIN received
    ↓
Upload EIN letter to dashboard
    ↓
Trigger bank application flow
```

### Flow 6: Bank Application

```
EIN received
    ↓
Dashboard shows: "Ready for Bank Application"
    ↓
Founder selects bank preference:
    □ Mercury (recommended)
    □ Relay (backup)
    □ Apply to both (Premium tier)
    ↓
AI generates application package:
    
    1. Pre-filled application form
    2. Cover letter explaining:
        - Who the founder is
        - What the business does
        - Trust Score summary
        - Why they're low risk
    3. Document package:
        - Articles of Organization
        - EIN letter
        - Operating Agreement
        - Passport
        - Proof of address
        - Trust Score report (Bedrock branded)
    ↓
Founder reviews package
    ↓
Submission:
    - Founder submits via bank portal (guided)
    - OR Bedrock submits on behalf (Premium)
    ↓
Track application:
    Day 0: "Submitted"
    Day 1-3: "Under Review"
    Day 3-7: "Additional Questions" (if any)
    Day 7-14: "Decision"
    ↓
If questions from bank:
    - Bedrock AI drafts response
    - Founder reviews + sends
    - Track response
    ↓
If rejected:
    - Collect rejection reason
    - Analyze: fixable or not?
    - If fixable: appeal with more docs
    - If not: try Relay
    - Last resort: escalate to bank contact
    ↓
If approved:
    - 🎉 Dashboard celebration
    - Guide: "Set up your account"
    - Trigger compliance onboarding
    - Trigger Anti-Freeze setup (if Premium)
```

### Flow 7: Compliance Calendar

```
Bank account active
    ↓
System auto-calculates all deadlines:

    1. BOI Report (Beneficial Ownership)
       Due: 90 days from LLC formation
       Status: [  ] Not started
       
    2. Form 5472 (Foreign-owned LLC)
       Due: April 15 (or Oct 15 with extension)
       Status: [  ] Not started
       
    3. State Annual Report
       Due: March 1 (Delaware) or Anniversary (Wyoming)
       Status: [  ] Not started
       
    4. Registered Agent Renewal
       Due: Annual
       Status: [✓] Active until Dec 2026
    ↓
Dashboard shows calendar view:
    - Visual timeline
    - Days until each deadline
    - Status (not started / in progress / filed)
    - Action buttons
    ↓
Reminder schedule:
    - 90 days before: Email "Upcoming deadline"
    - 60 days before: Email + Dashboard alert
    - 30 days before: Email + SMS + Urgent alert
    - 7 days before: Daily reminders
    ↓
Filing flow (per deadline):
    - Click "Start Filing"
    - Answer questions (AI pre-fills from data)
    - Review generated form
    - Submit OR download for self-filing
    - Upload confirmation
    - Mark complete
```

### Flow 8: Anti-Freeze Shield (Premium)

```
Founder has Premium tier
    ↓
Connect bank account:
    - Plaid connection OR
    - Bank OAuth (Mercury API if available) OR
    - Manual transaction upload (CSV)
    ↓
AI monitors transactions:

SCENARIO A: Safe Transaction
    Founder sends $500 to US contractor
    → AI: "✓ Normal transaction"
    → No action
    
SCENARIO B: Risky Transaction
    Founder about to send $10,000 to Pakistan
    → AI detects: "High-risk destination + large amount"
    → BEFORE sending: Alert popup
    → "This transaction may trigger a review. Upload invoice/contract first."
    → Founder uploads invoice
    → AI: "Documentation attached. Safe to proceed."
    → Transaction goes through
    
SCENARIO C: Urgent Risk
    Bank sends inquiry about transaction
    → AI detects email from Mercury
    → Immediate alert to founder
    → AI drafts response
    → Founder reviews + sends
    → Track resolution
    ↓
Monthly report:
    - Transactions analyzed: 47
    - Risks flagged: 3
    - Actions taken: 3
    - Account status: Healthy
```

---

## 6. Trust Score System (Digital Lineage)

### Scoring Architecture

```
TRUST SCORE (0-100)
│
├── DIGITAL LINEAGE (0-40 points)
│   ├── Code History (0-15)
│   │   ├── GitHub account age
│   │   ├── Commit frequency
│   │   ├── Contribution consistency
│   │   ├── Repo quality
│   │   └── Open source contributions
│   │
│   ├── Professional Graph (0-15)
│   │   ├── LinkedIn account age
│   │   ├── Connection count + quality
│   │   ├── Endorsement timeline
│   │   ├── Career progression
│   │   └── Mutual connections with verified founders
│   │
│   └── Digital Presence (0-10)
│       ├── Domain age
│       ├── Website history
│       ├── Social account ages
│       └── Consistency across platforms
│
├── BUSINESS SIGNALS (0-25 points)
│   ├── Revenue existence (+10)
│   ├── Revenue > $1K/month (+5)
│   ├── Customer geography (US/EU = +5)
│   ├── Low chargeback rate (+3)
│   └── Business age (+2)
│
├── IDENTITY VERIFICATION (0-20 points)
│   ├── Passport verified (+8)
│   ├── Local ID verified (+5)
│   ├── Liveness check passed (+4)
│   └── Address verified (+3)
│
└── TRUST NETWORK (0-15 points)
    ├── Referral from verified founder (+10)
    ├── University email verified (+3)
    ├── Accelerator affiliation (+5)
    └── Employer verification (+2)
```

### Score Thresholds

| Score | Status | Experience |
|-------|--------|------------|
| 85-100 | Elite | Auto-approved, premium support, fastest processing |
| 70-84 | Approved | Standard approval, full access |
| 50-69 | Review | Manual review required, may need video call |
| 30-49 | Conditional | Significant additional verification needed |
| 0-29 | Not Eligible | Cannot proceed, show improvement path |

### Country Risk Adjustments

```
Base score calculated
    ↓
Apply country modifier:

TIER 1 (No adjustment): Canada, UK, EU, Australia, Singapore
TIER 2 (-5 points): India, Brazil, Mexico, Philippines  
TIER 3 (-10 points): Pakistan, Nigeria, Kenya, Vietnam
TIER 4 (-15 points): Turkmenistan, Uzbekistan, Bangladesh, Venezuela

BUT: Strong Digital Lineage can OVERRIDE country penalty
    If Digital Lineage > 30 points → Country penalty reduced by 50%
    If Digital Lineage > 35 points → Country penalty eliminated
```

### Score Display to Founder

```
┌─────────────────────────────────────────────────────────────┐
│                     Your Trust Score                        │
│                                                             │
│                          78                                 │
│                        ━━━━━━                              │
│                       APPROVED                              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Digital Lineage        ████████████████░░░░   32/40       │
│  Business Signals       ██████████████░░░░░░   18/25       │
│  Identity               ████████████████████   20/20       │
│  Trust Network          ████████░░░░░░░░░░░░    8/15       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ✓ GitHub verified (4 years, 847 commits)                  │
│  ✓ LinkedIn verified (6 years, 500+ connections)           │
│  ✓ Stripe connected ($2.4K MRR)                            │
│  ✓ Passport verified                                        │
│  ○ Get referral from verified founder (+10 points)         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### What NOT To Show

- Exact algorithm weights
- Country penalty details
- Comparison to other founders
- Bank-specific adjustments
- Fraud flags (if any)

---

## 7. Anti-Freeze Shield

### Why Banks Freeze Accounts

| Trigger | Example |
|---------|---------|
| Large wire to high-risk country | $10K to Pakistan |
| Unusual transaction pattern | 10x normal volume |
| Inconsistent business activity | SaaS company buying gold |
| Missing documentation | Invoice not on file |
| Keyword triggers | "Crypto", certain country names |
| Velocity changes | Sudden spike in transactions |

### How Anti-Freeze Works

```
MONITORING LAYER
    ↓
Connect to bank data:
    - Plaid (read-only transaction access)
    - Mercury API (if partnership established)
    - Manual CSV upload (fallback)
    ↓
Real-time analysis:

For each transaction:
    1. Amount check
       - Is this unusually large?
       - Compare to founder's history
       
    2. Destination check
       - Is recipient in high-risk country?
       - Is recipient a known entity?
       
    3. Pattern check
       - Does this fit business model?
       - Is velocity normal?
       
    4. Keyword check
       - Memo contains flagged words?
       
    5. Risk score calculation
       - Low (0-30): No action
       - Medium (31-70): Log, may alert
       - High (71-100): Immediate alert
```

### Alert System

```
HIGH RISK DETECTED
    ↓
Before transaction processes:
    ↓
┌─────────────────────────────────────────────────────────────┐
│  ⚠️ TRANSACTION REVIEW NEEDED                               │
│                                                             │
│  You're about to send $8,500 to:                           │
│  Muhammad Ali (Karachi, Pakistan)                          │
│                                                             │
│  This transaction may trigger a bank review because:       │
│  • Large amount to high-risk destination                   │
│  • First transaction to this recipient                     │
│                                                             │
│  RECOMMENDED ACTION:                                        │
│  Upload supporting documentation before sending:           │
│  □ Invoice or contract                                     │
│  □ Proof of business relationship                          │
│  □ Email thread showing context                            │
│                                                             │
│  [Upload Documents]    [Proceed Anyway]    [Cancel]        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Documentation Vault

```
For each flagged transaction:
    ↓
Founder uploads:
    - Invoice PDF
    - Contract
    - Email screenshots
    - Any supporting docs
    ↓
AI analyzes:
    - Does invoice match amount?
    - Does recipient match?
    - Is this consistent with business?
    ↓
Store in vault:
    - Linked to transaction
    - Ready if bank asks
    - Searchable
    ↓
If bank inquires later:
    - Auto-retrieve documentation
    - AI drafts response
    - Founder approves + sends
```

### Bank Inquiry Response

```
Mercury emails: "Please explain transaction #4521"
    ↓
System detects inquiry (email parsing or founder reports)
    ↓
AI retrieves:
    - Transaction details
    - Stored documentation
    - Business context
    ↓
AI drafts response:

    "Dear Mercury Team,
    
    Transaction #4521 for $8,500 to Muhammad Ali was payment 
    for software development services. Mr. Ali has been our 
    contractor since March 2025.
    
    Attached:
    - Signed contractor agreement (dated March 15, 2025)
    - Invoice #INV-0047 for this payment
    - Previous payment history (3 prior transactions)
    
    Please let me know if you need additional documentation.
    
    Best regards,
    [Founder Name]"
    ↓
Founder reviews, edits if needed, sends
    ↓
Track response from bank
    ↓
Resolution logged
```

---

## 8. Agentic Compliance Officer

### What It Handles

| Filing | Complexity | AI Automation Level |
|--------|------------|---------------------|
| BOI Report | Low | 95% automated |
| Form 5472 | Medium | 80% automated |
| State Annual Report | Low | 90% automated |
| FBAR | Medium | 70% automated |
| Form 1120 (if needed) | High | 50% automated |

### BOI Report Flow (Fully Automated)

```
LLC formed
    ↓
System knows: BOI due in 90 days
    ↓
Day 1: Auto-collect data
    - Company info (already have)
    - Beneficial owner info (already have from onboarding)
    - Owner ID photos (already have)
    ↓
Day 60: Generate draft
    - Pre-fill FinCEN form
    - Flag any missing info
    ↓
Day 70: Founder review
    - Email: "Your BOI Report is ready for review"
    - Dashboard: Show pre-filled form
    - Founder confirms or corrects
    ↓
Day 75: Submit
    - E-file via FinCEN BOIR system
    - Capture confirmation
    ↓
Done
    - Store confirmation in vault
    - Update compliance status
    - No action needed from founder
```

### Form 5472 Flow (Semi-Automated)

```
Tax year ends (December 31)
    ↓
January: Start data collection
    
    AI asks founder:
    "Did your LLC have any of these transactions with you (the owner)?"
    □ Capital contributions
    □ Loans to/from owner
    □ Distributions to owner
    □ Services provided by owner
    □ Rent paid to owner
    □ Other transactions
    ↓
    For each "yes": collect amount + description
    ↓
February: Generate forms
    
    - Form 5472 (information return)
    - Pro forma Form 1120 (required attachment)
    - Pre-fill everything from data
    ↓
March: Founder review
    
    Dashboard shows:
    - Generated forms
    - Summary of reported transactions
    - "Does this look correct?"
    ↓
April 1-15: File or Extend
    
    Option A: File now
        - Founder approves
        - System files (or provides instructions)
        - Confirmation stored
    
    Option B: Extend
        - File Form 7004 for extension
        - New deadline: October 15
        - Continue in September
    ↓
If late: ALERT
    
    "$25,000 PENALTY RISK"
    - Escalate immediately
    - Offer emergency filing service
    - Document everything for reasonable cause
```

### Compliance Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│                   Compliance Status                         │
│                                                             │
│  Overall: ✓ ON TRACK                                       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ✅ BOI Report                                              │
│     Filed: January 15, 2026                                │
│     Status: Complete                                        │
│                                                             │
│  ⏳ Form 5472 + 1120                                        │
│     Due: April 15, 2026 (68 days)                          │
│     Status: Data collection in progress                    │
│     [Complete Questionnaire]                               │
│                                                             │
│  ⏳ Delaware Annual Report                                  │
│     Due: March 1, 2026 (24 days)                           │
│     Status: Ready to file                                  │
│     Fee: $300                                              │
│     [Pay & File]                                           │
│                                                             │
│  ✅ Registered Agent                                        │
│     Status: Active until December 2026                     │
│     [Renew Early]                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 9. Trust Score API (B2B)

### Phase 2 Feature — Design Now, Build Later

### The Concept

```
Today:    You verify founders → You help them bank
Tomorrow: Fintechs pay you → To verify founders for them
```

### API Use Cases

| Customer | Use Case |
|----------|----------|
| Mercury | "Is this Uzbek founder legit?" before they apply |
| Brex | Verify founders from markets they're expanding to |
| Wise | De-risk business accounts from high-risk countries |
| Stripe | Verify Atlas applicants they'd otherwise reject |
| Crypto exchanges | KYC for users from emerging markets |
| VCs | Due diligence on founders before wiring money |

### API Endpoints (Future)

```
POST /v1/verify
{
    "founder": {
        "name": "Sardor Karimov",
        "email": "sardor@example.com",
        "country": "UZ",
        "github": "sardordev",
        "linkedin": "sardorkarimov"
    },
    "level": "standard" | "deep" | "instant"
}

Response:
{
    "trust_score": 78,
    "status": "approved",
    "verification_id": "ver_abc123",
    "breakdown": {
        "digital_lineage": 32,
        "business": 18,
        "identity": 20,
        "network": 8
    },
    "flags": [],
    "report_url": "https://bedrock.com/report/ver_abc123"
}
```

### Pricing Model (Future)

| Tier | Price | Includes |
|------|-------|----------|
| Per verification | $10-25 | Single check |
| Startup | $500/month | 50 verifications |
| Growth | $2,000/month | 250 verifications |
| Enterprise | Custom | Unlimited + SLA |

### How This Creates The Moat

```
Year 1: 500 founders verified
        → Dataset: "Founders with score 70+ have 94% approval rate"
        
Year 2: 2,000 founders verified
        → Dataset: "By country: UZ=91%, PK=88%, NG=86%"
        → Pattern: "GitHub >3 years + revenue = 97% approval"
        
Year 3: 5,000+ founders verified
        → Predictive model: "This founder will be approved by Mercury"
        → Banks: "We trust Bedrock's score more than our own model"
```

---

## 10. Feature Specifications

### Landing Page

**Sections:**

1. **Hero**
   - Headline: "US Banking Access for Founders Banks Ignore"
   - Subhead: "94% approval rate. Deepfake-proof verification. Automated compliance."
   - CTA: "Check Your Eligibility" (free)
   
2. **Problem**
   - "40% of founders from emerging markets get rejected"
   - "It's not because they're risky. It's because banks have no data."
   
3. **Solution**
   - Proof of Personhood (not just KYC)
   - Digital Lineage verification
   - Anti-Freeze protection
   
4. **How It Works**
   - Step 1: Verify your Digital Lineage (10 min)
   - Step 2: Get your Trust Score
   - Step 3: We handle formation + banking
   - Step 4: Stay compliant forever
   
5. **Trust Signals**
   - "94% approval rate vs 60% industry average"
   - "500+ founders verified"
   - "0 accounts frozen with Anti-Freeze"
   
6. **Pricing**
   - Basic: $500
   - Standard: $800
   - Premium: $1,500
   
7. **FAQ**
   - "What countries do you support?"
   - "How long does it take?"
   - "What if I get rejected?"
   - "How is this different from Stripe Atlas?"
   
8. **Final CTA**
   - "Check Your Eligibility — Free, 2 minutes"

### Founder Dashboard

**Sections:**

1. **Overview**
   - Trust Score (prominent)
   - Status cards: LLC, EIN, Bank, Compliance
   - Next action required
   - Recent activity
   
2. **Documents**
   - All formation documents
   - Tax filings
   - Bank documents
   - Upload new documents
   
3. **Compliance**
   - Calendar view
   - Deadline list
   - Filing status
   - Action buttons
   
4. **Bank Account**
   - Connection status
   - Transaction monitoring (if Premium)
   - Alert history
   
5. **Billing**
   - Current plan
   - Payment history
   - Upgrade options
   
6. **Settings**
   - Profile info
   - Notification preferences
   - Connected accounts

### Admin Dashboard

**Sections:**

1. **Queue**
   - New applications
   - Pending review
   - Filter by score, country, status
   
2. **Founder Details**
   - All verification data
   - Trust Score breakdown
   - Documents
   - Communication history
   - Override score (with reason)
   - Approve / Reject / Request more
   
3. **Compliance Overview**
   - All deadlines across founders
   - Overdue alerts
   - Filing success rate
   
4. **Metrics**
   - Applications this week
   - Conversion rate
   - Approval rate by bank
   - Revenue
   - Trust Score distribution
   
5. **Bank Relationships**
   - Application status by bank
   - Rejection reasons
   - Success rate per bank

---

## 11. Data Architecture

### Core Entities

```
Founder
├── id
├── email
├── full_name
├── citizenship_country
├── residence_country
├── phone
├── status (onboarding | verified | active | churned)
├── tier (basic | standard | premium)
├── created_at
└── updated_at

TrustScore
├── id
├── founder_id
├── total_score (0-100)
├── digital_lineage_score
├── business_score  
├── identity_score
├── network_score
├── breakdown (JSON: detailed scoring)
├── country_adjustment
├── calculated_at
└── version

DigitalLineage
├── id
├── founder_id
├── github_data (JSON)
├── linkedin_data (JSON)
├── domain_data (JSON)
├── social_data (JSON)
├── financial_data (JSON)
├── verified_at
└── raw_data (JSON: full API responses)

IdentityVerification
├── id
├── founder_id
├── type (passport | local_id | address | liveness)
├── status (pending | verified | failed)
├── provider (sumsub | manual)
├── provider_reference
├── result_data (JSON)
└── verified_at

Company
├── id
├── founder_id
├── legal_name
├── state (DE | WY)
├── formation_date
├── ein
├── status (pending | formed | dissolved)
├── registered_agent
└── documents (JSON: document references)

BankApplication
├── id
├── company_id
├── bank (mercury | relay | brex)
├── status (draft | submitted | review | approved | rejected)
├── submitted_at
├── decision_at
├── rejection_reason
├── notes
└── application_data (JSON)

ComplianceDeadline
├── id
├── company_id
├── type (boi | form_5472 | annual_report | fbar)
├── due_date
├── status (upcoming | action_required | filed | overdue)
├── filed_at
├── filing_reference
└── documents (JSON)

Transaction (Anti-Freeze)
├── id
├── founder_id
├── amount
├── currency
├── recipient
├── recipient_country
├── risk_score
├── flagged (boolean)
├── documentation (JSON)
├── resolution_status
└── created_at

Document
├── id
├── founder_id
├── company_id (nullable)
├── type (passport | ein_letter | articles | invoice | etc)
├── storage_path
├── verified (boolean)
└── uploaded_at
```

### Data Flow

```
Founder signs up
    ↓
Collect basic info → Founder table
    ↓
OAuth connections (GitHub, LinkedIn, Stripe)
    ↓
Fetch external data → DigitalLineage table
    ↓
AI analyzes → TrustScore table
    ↓
If approved → Payment → Company creation
    ↓
Formation process → Company table updates
    ↓
Bank application → BankApplication table
    ↓
Compliance setup → ComplianceDeadline table
    ↓
Transaction monitoring → Transaction table
```

---

## 12. Third-Party Integrations

### Identity Verification

| Provider | Purpose | Priority |
|----------|---------|----------|
| Sumsub | Passport, ID, liveness | P0 |
| Manual review | Fallback | P0 |

### Digital Lineage

| Provider | Purpose | Priority |
|----------|---------|----------|
| GitHub API | Code history | P0 |
| LinkedIn API | Professional graph | P0 |
| Stripe Connect | Revenue verification | P0 |
| WHOIS API | Domain age | P1 |
| Wayback Machine API | Website history | P2 |
| Twitter API | Social presence | P2 |

### Formation

| Provider | Purpose | Priority |
|----------|---------|----------|
| Registered agent partner | File LLCs | P0 |
| Delaware Division of Corps | Name check | P0 |
| Wyoming Secretary of State | Name check | P0 |
| eFax API | EIN applications | P0 |

### Banking

| Provider | Purpose | Priority |
|----------|---------|----------|
| Mercury | Primary bank | P0 |
| Relay | Backup bank | P1 |
| Plaid | Transaction monitoring | P1 |

### Payments

| Provider | Purpose | Priority |
|----------|---------|----------|
| Stripe | Customer payments | P0 |

### Communications

| Provider | Purpose | Priority |
|----------|---------|----------|
| Resend | Email | P0 |
| Twilio | SMS | P1 |

### AI

| Provider | Purpose | Priority |
|----------|---------|----------|
| Claude API | Document analysis, drafting, chat | P0 |

---

## 13. Operational Workflows

### Daily Operations

```
Morning:
├── Check new applications in queue
├── Review flagged Trust Scores (50-69 range)
├── Respond to founder support requests
└── Check bank application statuses

Afternoon:
├── Process formations ready to submit
├── Follow up on pending EINs
├── Handle bank questions/escalations
└── Review compliance alerts

Weekly:
├── Analyze approval rates by country
├── Review Trust Score accuracy (did predictions match outcomes?)
├── Update scoring model if needed
├── Send compliance reminder emails
└── Review revenue and metrics
```

### Manual Review Workflow

```
Application enters review queue (score 50-69)
    ↓
Admin opens founder profile
    ↓
Review checklist:
    □ Identity documents clear?
    □ Digital Lineage data looks real?
    □ Business makes sense?
    □ Any red flags?
    ↓
Decision:
    A) Approve with current score
    B) Request additional docs (specify which)
    C) Schedule video call
    D) Reject with reason
    ↓
Log decision + reasoning
    ↓
Notify founder
```

### Bank Rejection Handling

```
Bank rejects application
    ↓
Collect rejection reason:
    □ Insufficient documentation
    □ Business type not supported
    □ Country risk
    □ Unable to verify identity
    □ Other: ___________
    ↓
Analyze: Is this fixable?
    ↓
If yes:
    - Gather additional documentation
    - Draft appeal letter
    - Resubmit or escalate to bank contact
    
If no:
    - Try backup bank (Relay)
    - If still no: honest conversation with founder
    - Offer partial refund if appropriate
    ↓
Log everything for future scoring improvement
```

### Compliance Escalation

```
Deadline approaching (7 days)
    ↓
Founder hasn't responded to reminders
    ↓
Escalation sequence:
    Day 7: Email + SMS
    Day 5: Phone call attempt
    Day 3: "URGENT" email, CC their other email if available
    Day 1: "FINAL NOTICE - $25K penalty risk"
    ↓
If still no response:
    - Document all outreach attempts
    - File extension if possible
    - Prepare "reasonable cause" documentation
    ↓
If founder responds:
    - Rush filing process
    - Hand-hold through completion
    - Document for future (flag as "needs extra reminders")
```

---

## 14. Validation Before Building

### Week 1: Find Founders (No Code)

**Goal:** Talk to 10+ founders with this problem

| Day | Action |
|-----|--------|
| 1 | Post on Reddit (r/startups, r/SaaS, r/EntrepreneurRideAlong) |
| 2 | Post on Twitter, search "Mercury rejected" and DM |
| 3 | Post on Indie Hackers |
| 4 | Search Russian Telegram groups (founder communities) |
| 5 | Follow up on all responses |
| 6-7 | Schedule and conduct calls |

**What to ask:**
- "Tell me about your rejection experience"
- "What did you try after rejection?"
- "How much time/money have you spent on this?"
- "Would you pay $500 to solve this?"
- "What would guaranteed approval be worth?"

**Success:** 10+ conversations, 5+ would pay

### Week 2: Manual Service (No Code)

**Goal:** Help 3-5 founders manually

| Action | How |
|--------|-----|
| Find 3-5 paying customers | From Week 1 conversations |
| Charge $300-500 | PayPal or Stripe link |
| Manual verification | Review their documents, LinkedIn, GitHub yourself |
| Create Trust Score manually | Spreadsheet calculation |
| Help with bank application | Write cover letter, prep docs |
| Track outcome | Did they get approved? |

**Success:** 3+ paid, 2+ approved

### Week 3: Relationship Building

**Goal:** Validate bank partnership potential

| Action | How |
|--------|-----|
| Email Mercury partnerships | "We pre-verify founders, reduce your risk" |
| Email Relay | Same pitch |
| Document your approval rate | "We submitted 5, 4 approved" |
| Get any response | Even "interesting, tell me more" = validation |

**Success:** Any positive signal from a bank

---

## 15. Build Phases & Timeline

### Phase 0: Validation (Week 1-2)

No code. Talk to founders. Manual service.

**Deliverables:**
- 10+ founder conversations
- 3-5 manual customers
- Bank outreach sent
- Manual Trust Score methodology

### Phase 1: Core Platform (Week 3-4)

**Build:**
- Landing page
- Founder signup + onboarding flow
- Basic Trust Score (identity + business)
- Founder dashboard (status overview)
- Admin dashboard (queue + review)
- Document upload + storage

**Team:** 1-2 developers

### Phase 2: Digital Lineage (Week 5-6)

**Build:**
- GitHub OAuth + analysis
- LinkedIn OAuth + analysis
- Stripe OAuth (for revenue)
- Enhanced Trust Score algorithm
- Score display with breakdown

**Team:** 1-2 developers

### Phase 3: Formation Flow (Week 7-8)

**Build:**
- LLC formation workflow
- State name check integration
- EIN automation (fax)
- Document generation
- Status tracking

**Team:** 1 developer + ops person

### Phase 4: Bank Application (Week 9-10)

**Build:**
- Application prep workflow
- Cover letter generation (AI)
- Document packaging
- Application tracking
- Rejection handling flow

**Team:** 1 developer

### Phase 5: Compliance (Week 11-12)

**Build:**
- Compliance calendar
- Deadline calculations
- Reminder system (email + SMS)
- Basic filing workflows (BOI first)
- Compliance dashboard

**Team:** 1 developer

### Phase 6: Polish + Launch (Week 13-14)

**Build:**
- End-to-end testing
- Error handling
- Mobile responsiveness
- Monitoring + alerts
- Documentation

**Deliverables:**
- Production-ready MVP
- 20+ founders through system
- Metrics dashboard

---

## 16. YC Application Strategy

### Key Points to Hit

| Question | Your Answer |
|----------|-------------|
| What do you do? | "We verify founders that banks can't, using Digital Lineage instead of documents." |
| Why now? | "Deepfakes broke KYC. Our method can't be faked." |
| Market size? | "5-10K founders/year from 100+ countries (wedge). $B+ fintech identity market (expansion)." |
| Why you? | "I'm from Turkmenistan. I was rejected by Mercury. I built this for myself." |
| Traction? | "X founders verified, Y% approval rate vs Z% baseline, $W revenue" |
| Moat? | "Digital Lineage dataset. Every founder makes the model smarter." |

### The 30-Second Pitch

> "Banks blacklist 100+ countries. They reject 40% of legitimate founders because of bad data, not bad founders.
>
> We built Bedrock — Proof of Personhood verification using Digital Lineage. We check 5 years of GitHub commits, LinkedIn history, and revenue data. Deepfakes can't fake that.
>
> Our approval rate is X% vs Y% baseline. We've helped Z founders get banked who were rejected elsewhere.
>
> Formation is our wedge. The real business is selling our Trust Score to banks and fintechs who want to safely onboard founders from markets they currently ignore.
>
> I'm from Turkmenistan. I was rejected by Mercury. I built this for myself first."

### What To Have By Application

| Proof Point | Target |
|-------------|--------|
| Founders verified | 10+ |
| Bank approval rate | 85%+ |
| Paying customers | 5+ |
| Revenue | $2,500+ |
| Waitlist | 50+ |
| Bank response | Any positive signal |

### What To Have By Interview

| Proof Point | Target |
|-------------|--------|
| Founders verified | 25+ |
| Bank approval rate | 90%+ |
| Paying customers | 15+ |
| Revenue | $7,500+ |
| Trust Score accuracy | "Score 70+ = 95% approval" |
| Bank relationship | "Mercury considering partnership" |

---

## 17. Metrics & Success Criteria

### North Star Metric

**Bank Approval Rate for Bedrock Founders**

Target: 90%+ (vs ~60% baseline for same countries)

### Primary Metrics

| Metric | Week 1 | Month 1 | Month 3 |
|--------|--------|---------|---------|
| Founders verified | 5 | 25 | 100 |
| Approval rate | 80% | 85% | 90% |
| Paying customers | 3 | 15 | 50 |
| Revenue | $1,500 | $7,500 | $25,000 |
| Trust Score correlation | TBD | 70%+ | 85%+ |

### Secondary Metrics

| Metric | Target |
|--------|--------|
| Time to Trust Score | <24 hours |
| Time to LLC formation | <7 days |
| Time to EIN | <14 days |
| Time to bank decision | <21 days |
| Compliance filing rate | 100% on time |
| Accounts frozen (Anti-Freeze) | <2% |
| NPS | 50+ |

### Tracking Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│                     Bedrock Metrics                         │
│                      February 2026                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Founders                          Approval Rate            │
│  ┌──────────────────┐              ┌──────────────────┐    │
│  │       47         │              │       91%        │    │
│  │   ↑ 12 this week │              │   vs 58% baseline│    │
│  └──────────────────┘              └──────────────────┘    │
│                                                             │
│  Revenue                           Trust Score Accuracy     │
│  ┌──────────────────┐              ┌──────────────────┐    │
│  │    $18,500       │              │       87%        │    │
│  │   MRR: $2,100    │              │ Score 70+ = 94%  │    │
│  └──────────────────┘              └──────────────────┘    │
│                                                             │
│  By Country                                                 │
│  ├── Uzbekistan: 12 (92% approved)                         │
│  ├── Nigeria: 9 (89% approved)                             │
│  ├── Pakistan: 8 (88% approved)                            │
│  └── Other: 18 (91% approved)                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 18. Risks & Mitigations

### Risk: Banks Don't Engage

| Risk | Impact | Mitigation |
|------|--------|------------|
| Mercury ignores partnership request | High | Start without partnership, prove value with data, re-approach |
| Banks build this themselves | High | Move fast, build data moat, become acquisition target |

### Risk: Low Demand

| Risk | Impact | Mitigation |
|------|--------|------------|
| Fewer founders need this than expected | High | Validate in Week 1-2 before building |
| Founders won't pay $500 | Medium | Test pricing with real customers |

### Risk: Verification Fails

| Risk | Impact | Mitigation |
|------|--------|------------|
| Trust Score doesn't predict approval | High | Manual override, improve model, refund policy |
| Deepfakes beat Digital Lineage | Medium | Multi-signal approach, human review fallback |

### Risk: Compliance Complexity

| Risk | Impact | Mitigation |
|------|--------|------------|
| Tax filings more complex than expected | Medium | Partner with CPA, start with simple filings |
| Founder misses deadline despite reminders | Medium | Aggressive escalation, document everything |

### Risk: Platform Dependency

| Risk | Impact | Mitigation |
|------|--------|------------|
| Mercury changes API/policies | High | Multiple bank relationships |
| Sumsub goes down | Medium | Manual verification fallback |
| GitHub/LinkedIn change APIs | Medium | Multiple data sources |

### Risk: Competition

| Risk | Impact | Mitigation |
|------|--------|------------|
| Doola adds Trust Score | High | Build data moat fast, B2B relationships |
| Stripe Atlas improves for emerging markets | High | Focus on "rejected" segment they'll never serve |

---

## 19. Post-MVP Roadmap

### Month 3-6: Anti-Freeze + B2B Prep

- Full transaction monitoring (Plaid integration)
- Real-time alerts
- Documentation vault
- Bank inquiry response automation
- Prepare Trust Score API specs

### Month 6-12: Trust Score API

- Launch API for beta partners
- First B2B customer
- Pricing model validation
- SLA and support infrastructure

### Month 12-18: Multi-Jurisdiction

- UK formation + banking
- EU (Estonia e-Residency)
- Singapore
- Unified compliance across jurisdictions

### Month 18-24: Financial Products

- Lending (using Trust Score for credit decisions)
- Revenue-based financing
- Founder credit cards
- Full Deel competitor

---

## 20. Resources

### Tools

| Tool | Purpose | Cost |
|------|---------|------|
| Supabase | Database + Auth | Free → $25/mo |
| Vercel | Hosting | Free → $20/mo |
| Sumsub | KYC | ~$1-2/verification |
| Resend | Email | Free → $20/mo |
| Twilio | SMS | Pay per message |
| Claude API | AI | Pay per token |
| Stripe | Payments | 2.9% + $0.30 |
| eFax | EIN faxing | ~$15/mo |
| Plaid | Bank connection | ~$0.30/connection |

### External Partners

| Partner | Purpose |
|---------|---------|
| Registered agent (Delaware) | LLC filing |
| Registered agent (Wyoming) | LLC filing |
| CPA (international experience) | Tax compliance guidance |
| Immigration lawyer | Edge case advice |

### Reading

| Resource | Topic |
|----------|-------|
| Delaware Division of Corporations | Formation requirements |
| IRS.gov Form 5472 instructions | Compliance requirements |
| FinCEN BOI guidance | Beneficial ownership |
| Mercury Help Center | Banking requirements |
| Stripe Atlas documentation | Competitor research |
| Doola blog | Competitor research |

---

## Quick Reference

### The One-Liner

> "Proof of Personhood verification for founders banks ignore."

### The Differentiation

| Them | Bedrock |
|------|---------|
| Check documents | Check Digital Lineage |
| Form company | Get you approved |
| Leave you alone | Protect your account |
| Charge once | Ongoing relationship |

### The Moat

> "Every founder we verify makes our model smarter. Banks can't build this — they don't have emerging market data."

### The Ask

> "$500 to get banked. $1,000/year to stay banked."

---

## Final Checklist

### Before Submitting YC Application (Feb 9)

- [ ] 10+ founder conversations
- [ ] 3-5 manual paying customers
- [ ] Track approval rate
- [ ] Landing page live
- [ ] Bank outreach sent
- [ ] Application written

### Before YC Interview (March 15)

- [ ] 20+ founders verified
- [ ] 85%+ approval rate
- [ ] Trust Score methodology documented
- [ ] "Score 70+ = X% approval" proven
- [ ] Revenue growing
- [ ] Bank relationship progress

---

**Now go build.**
