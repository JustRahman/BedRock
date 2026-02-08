-- Migration 002: Add missing RLS policies
-- Run this in Supabase SQL Editor after creating the "documents" storage bucket

-- ============================================================
-- compliance_deadlines: allow INSERT / UPDATE / DELETE for own rows
-- ============================================================
CREATE POLICY "Users can insert own compliance deadlines"
    ON compliance_deadlines FOR INSERT
    WITH CHECK (
        founder_id IN (SELECT id FROM founders WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can update own compliance deadlines"
    ON compliance_deadlines FOR UPDATE
    USING (
        founder_id IN (SELECT id FROM founders WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can delete own compliance deadlines"
    ON compliance_deadlines FOR DELETE
    USING (
        founder_id IN (SELECT id FROM founders WHERE user_id = auth.uid())
    );

-- ============================================================
-- documents: allow DELETE for own rows
-- ============================================================
CREATE POLICY "Users can delete own documents"
    ON documents FOR DELETE
    USING (
        founder_id IN (SELECT id FROM founders WHERE user_id = auth.uid())
    );

-- ============================================================
-- trust_scores: allow INSERT / UPDATE for own rows
-- (needed for upsert during registration / score calculation)
-- ============================================================
CREATE POLICY "Users can insert own trust score"
    ON trust_scores FOR INSERT
    WITH CHECK (
        founder_id IN (SELECT id FROM founders WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can update own trust score"
    ON trust_scores FOR UPDATE
    USING (
        founder_id IN (SELECT id FROM founders WHERE user_id = auth.uid())
    );

-- ============================================================
-- Storage: "documents" bucket policies
-- Bucket must already exist (create via Dashboard -> Storage -> New Bucket)
-- Files are stored as {founder_id}/{timestamp}.{ext}
-- so we check the folder name matches the user's founder record
-- ============================================================
CREATE POLICY "Users can upload own documents"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'documents'
        AND (storage.foldername(name))[1] IN (
            SELECT id::text FROM founders WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can read own documents"
    ON storage.objects FOR SELECT
    USING (
        bucket_id = 'documents'
        AND (storage.foldername(name))[1] IN (
            SELECT id::text FROM founders WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own document files"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'documents'
        AND (storage.foldername(name))[1] IN (
            SELECT id::text FROM founders WHERE user_id = auth.uid()
        )
    );
