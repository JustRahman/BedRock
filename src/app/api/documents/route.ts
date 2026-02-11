import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { verifyDocument } from '@/lib/document-verification'

interface FounderData {
  id: string
  full_name?: string
  date_of_birth?: string | null
  country_of_origin?: string
  role?: string
}

interface DocumentData {
  file_path: string
}

export async function GET(request: Request) {
  try {
    const authClient = await createClient()
    const supabase = createServiceClient()

    // Get current user
    const { data: { user }, error: userError } = await authClient.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get founder
    const { data: founderData } = await supabase
      .from('founders')
      .select('id, role')
      .eq('user_id', user.id)
      .single()

    const founder = founderData as FounderData | null

    if (!founder) {
      return NextResponse.json({ error: 'Founder not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const founderId = searchParams.get('founderId')

    // Admin can view any founder's documents
    if (founder.role === 'admin' && founderId) {
      const { data: documents, error } = await supabase
        .from('documents')
        .select('*')
        .eq('founder_id', founderId)
        .order('created_at', { ascending: false })

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ documents })
    }

    // Regular user sees their own documents
    const { data: documents, error } = await supabase
      .from('documents')
      .select('*')
      .eq('founder_id', founder.id)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ documents })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const authClient = await createClient()
    const supabase = createServiceClient()

    // Get current user
    const { data: { user }, error: userError } = await authClient.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get founder with profile fields for verification
    const { data: founderData } = await supabase
      .from('founders')
      .select('id, full_name, date_of_birth, country_of_origin')
      .eq('user_id', user.id)
      .single()

    const founder = founderData as FounderData | null

    if (!founder) {
      return NextResponse.json({ error: 'Founder not found' }, { status: 404 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string

    if (!file || !type) {
      return NextResponse.json({ error: 'File and type are required' }, { status: 400 })
    }

    // Read file buffer once (File stream can only be consumed once)
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop()
    const fileName = `${founder.id}/${Date.now()}.${fileExt}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(fileName, buffer, { contentType: file.type })

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    // Create document record with type assertion
    const insertData = {
      founder_id: founder.id,
      type: type,
      file_name: file.name,
      file_path: uploadData.path,
      file_size: file.size,
      mime_type: file.type,
    }

    const { data: document, error } = await (supabase
      .from('documents') as ReturnType<typeof supabase.from>)
      .insert(insertData)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Auto-verify identity documents with Claude Vision
    let verification = null
    const verifiableTypes = ['passport', 'local_id', 'address_proof']

    if (verifiableTypes.includes(type) && founder.full_name && founder.country_of_origin) {
      try {
        const result = await verifyDocument({
          fileBase64: buffer.toString('base64'),
          mimeType: file.type,
          documentType: type,
          founderProfile: {
            full_name: founder.full_name,
            date_of_birth: founder.date_of_birth ?? null,
            country_of_origin: founder.country_of_origin,
          },
        })

        verification = result

        // Update document record if verified
        if (result.status === 'verified') {
          await (supabase
            .from('documents') as ReturnType<typeof supabase.from>)
            .update({
              verified: true,
              verified_at: new Date().toISOString(),
              verified_by: 'ai_verification',
            })
            .eq('id', (document as { id: string }).id)
        }

        // Upsert founder_verifications record
        const verificationData = {
          founder_id: founder.id,
          verification_type: `document_${type}`,
          status: result.status === 'review_needed' ? 'pending' as const : result.status as 'verified' | 'failed',
          verified_at: result.status === 'verified' ? new Date().toISOString() : null,
          metadata: {
            document_id: (document as { id: string }).id,
            extracted_data: result.extractedData,
            match_results: result.matchResults,
            confidence: result.confidence,
            reasoning: result.reasoning,
          },
        }

        await (supabase
          .from('founder_verifications') as ReturnType<typeof supabase.from>)
          .upsert(verificationData, {
            onConflict: 'founder_id,verification_type',
          })
      } catch (verificationError) {
        console.error('Document verification failed:', verificationError)
        // Verification failure never blocks the upload
      }
    }

    return NextResponse.json({ document, verification }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const authClient = await createClient()
    const supabase = createServiceClient()

    // Get current user
    const { data: { user }, error: userError } = await authClient.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get founder
    const { data: founderData } = await supabase
      .from('founders')
      .select('id')
      .eq('user_id', user.id)
      .single()

    const founder = founderData as FounderData | null

    if (!founder) {
      return NextResponse.json({ error: 'Founder not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const documentId = searchParams.get('id')

    if (!documentId) {
      return NextResponse.json({ error: 'Document ID required' }, { status: 400 })
    }

    // Get document to find file path
    const { data: documentData } = await supabase
      .from('documents')
      .select('file_path')
      .eq('id', documentId)
      .eq('founder_id', founder.id)
      .single()

    const document = documentData as DocumentData | null

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    // Delete from storage
    await supabase.storage.from('documents').remove([document.file_path])

    // Delete record
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', documentId)
      .eq('founder_id', founder.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Admin: Verify document
export async function PATCH(request: Request) {
  try {
    const authClient = await createClient()
    const supabase = createServiceClient()

    // Get current user
    const { data: { user }, error: userError } = await authClient.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if admin
    const { data: founderData } = await supabase
      .from('founders')
      .select('id, role')
      .eq('user_id', user.id)
      .single()

    const founder = founderData as FounderData | null

    if (!founder || founder.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const body = await request.json()

    const updateData = {
      verified: body.verified,
      verified_at: body.verified ? new Date().toISOString() : null,
      verified_by: body.verified ? founder.id : null,
    }

    const { data: document, error } = await (supabase
      .from('documents') as ReturnType<typeof supabase.from>)
      .update(updateData)
      .eq('id', body.documentId)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ document })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
