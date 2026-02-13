import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

const US_STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
  MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
  OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
}

interface FounderData {
  id: string
  role?: string
}

export async function GET() {
  try {
    const authClient = await createClient()
    const supabase = createServiceClient()

    const { data: { user }, error: userError } = await authClient.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: founderData } = await supabase
      .from('founders')
      .select('id')
      .eq('user_id', user.id)
      .single()

    const founder = founderData as FounderData | null
    if (!founder) {
      return NextResponse.json({ error: 'Founder not found' }, { status: 404 })
    }

    const { data: company, error } = await supabase
      .from('companies')
      .select('*')
      .eq('founder_id', founder.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Fetch company updates timeline if company exists
    let updates = null
    if (company) {
      const companyRecord = company as { id: string }
      const { data: updatesData } = await supabase
        .from('company_updates')
        .select('*')
        .eq('company_id', companyRecord.id)
        .order('created_at', { ascending: true })
      updates = updatesData
    }

    return NextResponse.json({ company: company || null, updates: updates || [] })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const authClient = await createClient()
    const supabase = createServiceClient()

    const { data: { user }, error: userError } = await authClient.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: founderData } = await supabase
      .from('founders')
      .select('id')
      .eq('user_id', user.id)
      .single()

    const founder = founderData as FounderData | null
    if (!founder) {
      return NextResponse.json({ error: 'Founder not found' }, { status: 404 })
    }

    const body = await request.json()

    const isAlreadyFormed = body.alreadyFormed === true

    const insertData: Record<string, unknown> = {
      founder_id: founder.id,
      name: body.name,
      legal_name: body.legalName || body.name,
      state: body.state,
      description: body.description || null,
      formation_status: isAlreadyFormed ? 'formed' : 'pending',
    }

    if (isAlreadyFormed) {
      if (body.ein) insertData.ein = body.ein
      insertData.formation_date = body.formationDate || new Date().toISOString().split('T')[0]
    }

    const { data: company, error } = await (supabase
      .from('companies') as ReturnType<typeof supabase.from>)
      .insert(insertData)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const companyId = (company as { id: string }).id
    const now = new Date()

    if (isAlreadyFormed) {
      // Already-formed LLC: create recurring compliance deadlines
      const state = body.state || 'DE'
      const stateName = US_STATE_NAMES[state] || state

      let annualReportDue: Date
      if (state === 'WY') {
        annualReportDue = new Date(now.getFullYear() + 1, now.getMonth(), 1)
      } else {
        annualReportDue = new Date(now.getFullYear() + 1, 2, 1)
      }

      const raRenewalDue = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())

      let taxDue: Date
      let taxTitle: string
      let taxDescription: string
      if (state === 'DE') {
        taxDue = new Date(now.getFullYear() + 1, 5, 1)
        taxTitle = 'Delaware Franchise Tax'
        taxDescription = 'Annual Delaware franchise tax filing due June 1.'
      } else {
        taxDue = new Date(now.getFullYear() + 1, 3, 15)
        taxTitle = 'Federal Tax Filing'
        taxDescription = 'Federal tax return filing due April 15.'
      }

      const boiDue = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)

      await (supabase.from('compliance_deadlines') as ReturnType<typeof supabase.from>)
        .insert([
          {
            founder_id: founder.id,
            company_id: companyId,
            title: 'FinCEN BOI Report',
            description: 'Beneficial Ownership Information report — verify if already filed.',
            due_date: boiDue.toISOString().split('T')[0],
            is_recurring: false,
            recurring_type: 'boi_report',
          },
          {
            founder_id: founder.id,
            company_id: companyId,
            title: `${stateName} LLC Annual Report`,
            description: `Annual report filing for ${stateName} LLC.`,
            due_date: annualReportDue.toISOString().split('T')[0],
            is_recurring: true,
            recurring_type: 'llc_annual_report',
          },
          {
            founder_id: founder.id,
            company_id: companyId,
            title: 'Registered Agent Renewal',
            description: 'Annual registered agent service renewal.',
            due_date: raRenewalDue.toISOString().split('T')[0],
            is_recurring: true,
            recurring_type: 'ra_renewal',
          },
          {
            founder_id: founder.id,
            company_id: companyId,
            title: taxTitle,
            description: taxDescription,
            due_date: taxDue.toISOString().split('T')[0],
            is_recurring: true,
            recurring_type: 'tax_filing',
          },
        ])
    } else {
      // New formation: create pending deadlines
      const boiDue = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)
      const annualReportDue = new Date(now.getFullYear() + 1, 2, 1)

      await (supabase.from('compliance_deadlines') as ReturnType<typeof supabase.from>)
        .insert([
          {
            founder_id: founder.id,
            company_id: companyId,
            title: 'FinCEN BOI Report',
            description: 'Beneficial Ownership Information report due within 90 days of formation.',
            due_date: boiDue.toISOString().split('T')[0],
            is_recurring: false,
            recurring_type: 'boi_report',
          },
          {
            founder_id: founder.id,
            company_id: companyId,
            title: `${body.state === 'DE' ? 'Delaware' : 'Wyoming'} Annual Report`,
            description: `Annual report and franchise tax filing for ${body.state === 'DE' ? 'Delaware' : 'Wyoming'}.`,
            due_date: annualReportDue.toISOString().split('T')[0],
            is_recurring: false,
            recurring_type: null,
          },
        ])
    }

    return NextResponse.json({ company }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const authClient = await createClient()
    const supabase = createServiceClient()

    const { data: { user }, error: userError } = await authClient.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: founderData } = await supabase
      .from('founders')
      .select('id, role')
      .eq('user_id', user.id)
      .single()

    const founder = founderData as FounderData | null
    if (!founder) {
      return NextResponse.json({ error: 'Founder not found' }, { status: 404 })
    }

    const body = await request.json()

    const updateData: Record<string, unknown> = {}
    if (body.formationStatus !== undefined) updateData.formation_status = body.formationStatus
    if (body.ein !== undefined) updateData.ein = body.ein
    if (body.formationDate !== undefined) updateData.formation_date = body.formationDate
    if (body.name !== undefined) updateData.name = body.name
    if (body.legalName !== undefined) updateData.legal_name = body.legalName
    if (body.registeredAgentName !== undefined) updateData.registered_agent_name = body.registeredAgentName
    if (body.registeredAgentNotes !== undefined) updateData.registered_agent_notes = body.registeredAgentNotes

    // Determine which company to update
    const isAdmin = founder.role === 'admin' && body.companyId
    let queryBuilder = (supabase.from('companies') as ReturnType<typeof supabase.from>)
      .update(updateData)

    queryBuilder = isAdmin
      ? queryBuilder.eq('id', body.companyId)
      : queryBuilder.eq('founder_id', founder.id)

    const { data: company, error } = await queryBuilder
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Log status change to company_updates if status was changed
    if (body.formationStatus && company) {
      const companyRecord = company as { id: string }
      await (supabase.from('company_updates') as ReturnType<typeof supabase.from>)
        .insert({
          company_id: companyRecord.id,
          status: body.formationStatus,
          note: body.note || null,
          created_by: founder.id,
        })
    }

    // Auto-create recurring deadlines when status changes to 'formed'
    if (body.formationStatus === 'formed' && company) {
      const companyRecord = company as { id: string; founder_id: string; state: string }

      // Check if recurring deadlines already exist for this company
      const { data: existingRecurring } = await supabase
        .from('compliance_deadlines')
        .select('id')
        .eq('company_id', companyRecord.id)
        .eq('is_recurring', true)

      if (!existingRecurring || existingRecurring.length === 0) {
        const now = new Date()
        const state = companyRecord.state || 'DE'

        // LLC Annual Report due date
        let annualReportDue: Date
        if (state === 'WY') {
          // Wyoming: anniversary month of next year
          annualReportDue = new Date(now.getFullYear() + 1, now.getMonth(), 1)
        } else {
          // Delaware: March 1 next year
          annualReportDue = new Date(now.getFullYear() + 1, 2, 1)
        }

        // RA Renewal: 1 year from formation
        const raRenewalDue = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())

        // Tax Filing due date
        let taxDue: Date
        let taxTitle: string
        let taxDescription: string
        if (state === 'DE') {
          taxDue = new Date(now.getFullYear() + 1, 5, 1) // June 1
          taxTitle = 'Delaware Franchise Tax'
          taxDescription = 'Annual Delaware franchise tax filing due June 1.'
        } else {
          taxDue = new Date(now.getFullYear() + 1, 3, 15) // April 15
          taxTitle = 'Federal Tax Filing'
          taxDescription = 'Federal tax return filing due April 15.'
        }

        const stateName = state === 'DE' ? 'Delaware' : state === 'WY' ? 'Wyoming' : state

        // Remove the non-recurring annual report that was created at company creation
        await (supabase.from('compliance_deadlines') as ReturnType<typeof supabase.from>)
          .delete()
          .eq('company_id', companyRecord.id)
          .eq('is_recurring', false)
          .like('title', `%Annual Report%`)

        // Create recurring deadlines
        await (supabase.from('compliance_deadlines') as ReturnType<typeof supabase.from>)
          .insert([
            {
              founder_id: companyRecord.founder_id,
              company_id: companyRecord.id,
              title: `${stateName} LLC Annual Report`,
              description: `Annual report filing for ${stateName} LLC.`,
              due_date: annualReportDue.toISOString().split('T')[0],
              is_recurring: true,
              recurring_type: 'llc_annual_report',
            },
            {
              founder_id: companyRecord.founder_id,
              company_id: companyRecord.id,
              title: 'Registered Agent Renewal',
              description: 'Annual registered agent service renewal.',
              due_date: raRenewalDue.toISOString().split('T')[0],
              is_recurring: true,
              recurring_type: 'ra_renewal',
            },
            {
              founder_id: companyRecord.founder_id,
              company_id: companyRecord.id,
              title: taxTitle,
              description: taxDescription,
              due_date: taxDue.toISOString().split('T')[0],
              is_recurring: true,
              recurring_type: 'tax_filing',
            },
          ])
      }
    }

    return NextResponse.json({ company })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
