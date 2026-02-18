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

    // Get caller's founder record (need role check for admin uploads)
    const { data: founderData } = await supabase
      .from('founders')
      .select('id, full_name, date_of_birth, country_of_origin, role')
      .eq('user_id', user.id)
      .single()

    const founder = founderData as FounderData | null

    if (!founder) {
      return NextResponse.json({ error: 'Founder not found' }, { status: 404 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string
    const targetFounderId = formData.get('founderId') as string | null

    if (!file || !type) {
      return NextResponse.json({ error: 'File and type are required' }, { status: 400 })
    }

    // Admin upload: if founderId is provided, verify caller is admin
    const isAdminUpload = !!targetFounderId
    if (isAdminUpload && founder.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Determine which founder the document belongs to
    const ownerFounderId = isAdminUpload ? targetFounderId : founder.id

    // Validate file size (max 10MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10MB.' }, { status: 400 })
    }

    // Check if a document of this type already exists for this founder
    const { data: existingDocs } = await supabase
      .from('documents')
      .select('id, file_path')
      .eq('founder_id', ownerFounderId)
      .eq('type', type)

    const existingDoc = (existingDocs as { id: string; file_path: string }[] | null)?.[0]

    // Read file buffer once (File stream can only be consumed once)
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop()
    const fileName = `${ownerFounderId}/${Date.now()}.${fileExt}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(fileName, buffer, { contentType: file.type })

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    let document: unknown
    let error: { message: string } | null = null

    if (existingDoc) {
      // Replace existing document: update the record and delete old file from storage
      const { data: updated, error: updateError } = await (supabase
        .from('documents') as ReturnType<typeof supabase.from>)
        .update({
          file_name: file.name,
          file_path: uploadData.path,
          file_size: file.size,
          mime_type: file.type,
          verified: isAdminUpload ? true : false,
          verified_at: isAdminUpload ? new Date().toISOString() : null,
          verified_by: isAdminUpload ? founder.id : null,
        })
        .eq('id', existingDoc.id)
        .select()
        .single()

      document = updated
      error = updateError as typeof error

      // Clean up old file from storage
      if (!updateError && existingDoc.file_path) {
        await supabase.storage.from('documents').remove([existingDoc.file_path])
      }
    } else {
      // Create new document record
      const insertData = {
        founder_id: ownerFounderId,
        type: type,
        file_name: file.name,
        file_path: uploadData.path,
        file_size: file.size,
        mime_type: file.type,
        ...(isAdminUpload ? {
          verified: true,
          verified_at: new Date().toISOString(),
          verified_by: 'admin',
        } : {}),
      }

      const { data: inserted, error: insertError } = await (supabase
        .from('documents') as ReturnType<typeof supabase.from>)
        .insert(insertData)
        .select()
        .single()

      document = inserted
      error = insertError as typeof error
    }

    if (error) {
      return NextResponse.json({ error: (error as { message: string }).message }, { status: 500 })
    }

    // Skip AI verification for admin uploads — already marked verified
    if (isAdminUpload) {
      return NextResponse.json({ document, verification: null }, { status: 201 })
    }

    // Auto-verify selfie (face match already passed before upload)
    if (type === 'selfie') {
      await (supabase
        .from('documents') as ReturnType<typeof supabase.from>)
        .update({
          verified: true,
          verified_at: new Date().toISOString(),
          verified_by: 'face_match',
        })
        .eq('id', (document as { id: string }).id)
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
          verification_type: type,
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
