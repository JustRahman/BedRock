import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { generateStatementOfOrganizer, generateOperatingAgreement } from '@/lib/generate-llc-docs'
import type { LLCDocData } from '@/lib/generate-llc-docs'

interface FounderData {
  id: string
  full_name: string
  role: string
}

interface CompanyData {
  id: string
  founder_id: string
  name: string
  legal_name: string | null
  state: string | null
  formation_date: string | null
  ein: string | null
  registered_agent_name: string | null
  description: string | null
}

export async function POST(request: Request) {
  try {
    const authClient = await createClient()
    const supabase = createServiceClient()

    // Auth check
    const { data: { user }, error: userError } = await authClient.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Admin check
    const { data: founderData } = await supabase
      .from('founders')
      .select('id, full_name, role')
      .eq('user_id', user.id)
      .single()

    const founder = founderData as FounderData | null
    if (!founder || founder.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const body = await request.json()
    const { companyId } = body as { companyId: string }

    if (!companyId) {
      return NextResponse.json({ error: 'companyId is required' }, { status: 400 })
    }

    // Fetch company
    const { data: companyData, error: companyError } = await supabase
      .from('companies')
      .select('id, founder_id, name, legal_name, state, formation_date, ein, registered_agent_name, description')
      .eq('id', companyId)
      .single()

    if (companyError || !companyData) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    const company = companyData as CompanyData

    if (!company.name || !company.state || !company.formation_date) {
      return NextResponse.json(
        { error: 'Company must have name, state, and formation date to generate documents' },
        { status: 400 }
      )
    }

    // Fetch the company's founder (the owner, not the admin)
    const { data: ownerData } = await supabase
      .from('founders')
      .select('id, full_name, role')
      .eq('id', company.founder_id)
      .single()

    const owner = ownerData as FounderData | null
    if (!owner) {
      return NextResponse.json({ error: 'Company owner not found' }, { status: 404 })
    }

    const stateNames: Record<string, string> = {
      DE: 'Delaware', WY: 'Wyoming', NV: 'Nevada', TX: 'Texas',
      FL: 'Florida', CA: 'California', NY: 'New York',
    }
    const fullState = stateNames[company.state] || company.state

    const today = new Date().toISOString().split('T')[0]

    const docData: LLCDocData = {
      llcName: company.legal_name || company.name,
      state: company.state,
      formationDate: company.formation_date,
      filingOffice: `Secretary of State of ${fullState}`,
      members: [{ name: owner.full_name }],
      organizerName: owner.full_name,
      signingDate: today,
      registeredAgent: company.registered_agent_name || 'To be designated',
      businessPurpose: company.description || 'any lawful purpose',
      ein: company.ein || undefined,
    }

    // Generate both documents
    const [statementBuffer, agreementBuffer] = await Promise.all([
      generateStatementOfOrganizer(docData),
      generateOperatingAgreement(docData),
    ])

    const timestamp = Date.now()
    const statementPath = `${company.founder_id}/${timestamp}-statement-of-organizer.docx`
    const agreementPath = `${company.founder_id}/${timestamp}-operating-agreement.docx`

    // Upload both to Supabase Storage
    const [statementUpload, agreementUpload] = await Promise.all([
      supabase.storage.from('documents').upload(statementPath, statementBuffer, {
        contentType: 'application/pdf',
      }),
      supabase.storage.from('documents').upload(agreementPath, agreementBuffer, {
        contentType: 'application/pdf',
      }),
    ])

    if (statementUpload.error) {
      return NextResponse.json({ error: `Upload failed: ${statementUpload.error.message}` }, { status: 500 })
    }
    if (agreementUpload.error) {
      // Clean up the first upload if second fails
      await supabase.storage.from('documents').remove([statementPath])
      return NextResponse.json({ error: `Upload failed: ${agreementUpload.error.message}` }, { status: 500 })
    }

    // Create document records
    const now = new Date().toISOString()

    const { data: statementDoc, error: statementInsertError } = await (supabase
      .from('documents') as ReturnType<typeof supabase.from>)
      .insert({
        founder_id: company.founder_id,
        type: 'articles_of_organization',
        file_name: 'Statement of LLC Organizer.docx',
        file_path: statementUpload.data.path,
        file_size: statementBuffer.length,
        mime_type: 'application/pdf',
        verified: true,
        verified_at: now,
        verified_by: founder.id,
      })
      .select()
      .single()

    if (statementInsertError) {
      return NextResponse.json({ error: statementInsertError.message }, { status: 500 })
    }

    const { data: agreementDoc, error: agreementInsertError } = await (supabase
      .from('documents') as ReturnType<typeof supabase.from>)
      .insert({
        founder_id: company.founder_id,
        type: 'operating_agreement',
        file_name: 'Operating Agreement.docx',
        file_path: agreementUpload.data.path,
        file_size: agreementBuffer.length,
        mime_type: 'application/pdf',
        verified: true,
        verified_at: now,
        verified_by: founder.id,
      })
      .select()
      .single()

    if (agreementInsertError) {
      return NextResponse.json({ error: agreementInsertError.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      documents: [
        { id: (statementDoc as { id: string }).id, type: 'articles_of_organization', fileName: 'Statement of LLC Organizer.docx' },
        { id: (agreementDoc as { id: string }).id, type: 'operating_agreement', fileName: 'Operating Agreement.docx' },
      ],
    })
  } catch (err) {
    console.error('Document generation error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
