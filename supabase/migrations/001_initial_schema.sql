-- TrustLayer Initial Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'failed', 'expired');
CREATE TYPE application_status AS ENUM ('draft', 'submitted', 'under_review', 'approved', 'rejected', 'completed');
CREATE TYPE trust_score_status AS ENUM ('pre_approved', 'approved', 'review_needed', 'high_risk', 'not_eligible');
CREATE TYPE document_type AS ENUM ('passport', 'local_id', 'address_proof', 'bank_statement', 'business_license', 'other');
CREATE TYPE payment_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'refunded');
CREATE TYPE user_role AS ENUM ('founder', 'admin');

-- Founders table
CREATE TABLE founders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    country_of_origin TEXT NOT NULL,
    country_of_residence TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    onboarding_completed BOOLEAN DEFAULT FALSE,
    role user_role DEFAULT 'founder'
);

-- Founder verifications table
CREATE TABLE founder_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    founder_id UUID NOT NULL REFERENCES founders(id) ON DELETE CASCADE,
    verification_type TEXT NOT NULL,
    status verification_status DEFAULT 'pending',
    verified_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(founder_id, verification_type)
);

-- Trust scores table
CREATE TABLE trust_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    founder_id UUID NOT NULL REFERENCES founders(id) ON DELETE CASCADE UNIQUE,
    total_score INTEGER NOT NULL DEFAULT 0,
    identity_score INTEGER NOT NULL DEFAULT 0,
    business_score INTEGER NOT NULL DEFAULT 0,
    financial_score INTEGER NOT NULL DEFAULT 0,
    social_score INTEGER NOT NULL DEFAULT 0,
    status trust_score_status NOT NULL DEFAULT 'not_eligible',
    score_breakdown JSONB,
    manual_override BOOLEAN DEFAULT FALSE,
    override_reason TEXT,
    calculated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Companies table
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    founder_id UUID NOT NULL REFERENCES founders(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    website TEXT,
    domain_age_months INTEGER,
    github_url TEXT,
    linkedin_url TEXT,
    description TEXT,
    has_local_business BOOLEAN DEFAULT FALSE,
    monthly_revenue DECIMAL(12, 2),
    stripe_connected BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bank applications table
CREATE TABLE bank_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    founder_id UUID NOT NULL REFERENCES founders(id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    status application_status DEFAULT 'draft',
    bank_name TEXT,
    submitted_at TIMESTAMPTZ,
    approved_at TIMESTAMPTZ,
    rejection_reason TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Compliance deadlines table
CREATE TABLE compliance_deadlines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    founder_id UUID NOT NULL REFERENCES founders(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATE NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    reminder_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documents table
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    founder_id UUID NOT NULL REFERENCES founders(id) ON DELETE CASCADE,
    type document_type NOT NULL,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    mime_type TEXT NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMPTZ,
    verified_by UUID REFERENCES founders(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    founder_id UUID NOT NULL REFERENCES founders(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    status payment_status DEFAULT 'pending',
    stripe_payment_id TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX idx_founders_user_id ON founders(user_id);
CREATE INDEX idx_founders_email ON founders(email);
CREATE INDEX idx_founder_verifications_founder_id ON founder_verifications(founder_id);
CREATE INDEX idx_trust_scores_founder_id ON trust_scores(founder_id);
CREATE INDEX idx_trust_scores_status ON trust_scores(status);
CREATE INDEX idx_companies_founder_id ON companies(founder_id);
CREATE INDEX idx_bank_applications_founder_id ON bank_applications(founder_id);
CREATE INDEX idx_bank_applications_status ON bank_applications(status);
CREATE INDEX idx_compliance_deadlines_founder_id ON compliance_deadlines(founder_id);
CREATE INDEX idx_compliance_deadlines_due_date ON compliance_deadlines(due_date);
CREATE INDEX idx_documents_founder_id ON documents(founder_id);
CREATE INDEX idx_payments_founder_id ON payments(founder_id);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_founders_updated_at
    BEFORE UPDATE ON founders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_founder_verifications_updated_at
    BEFORE UPDATE ON founder_verifications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trust_scores_updated_at
    BEFORE UPDATE ON trust_scores
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companies_updated_at
    BEFORE UPDATE ON companies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bank_applications_updated_at
    BEFORE UPDATE ON bank_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_compliance_deadlines_updated_at
    BEFORE UPDATE ON compliance_deadlines
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at
    BEFORE UPDATE ON documents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
    BEFORE UPDATE ON payments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE founders ENABLE ROW LEVEL SECURITY;
ALTER TABLE founder_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE trust_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE bank_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_deadlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Founders can read/update their own data
CREATE POLICY "Users can view own founder profile"
    ON founders FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own founder profile"
    ON founders FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own founder profile"
    ON founders FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Admins can view all founders
CREATE POLICY "Admins can view all founders"
    ON founders FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM founders
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

-- Similar policies for other tables
CREATE POLICY "Users can view own verifications"
    ON founder_verifications FOR SELECT
    USING (
        founder_id IN (SELECT id FROM founders WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can view own trust score"
    ON trust_scores FOR SELECT
    USING (
        founder_id IN (SELECT id FROM founders WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can view own companies"
    ON companies FOR SELECT
    USING (
        founder_id IN (SELECT id FROM founders WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can manage own companies"
    ON companies FOR ALL
    USING (
        founder_id IN (SELECT id FROM founders WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can view own bank applications"
    ON bank_applications FOR SELECT
    USING (
        founder_id IN (SELECT id FROM founders WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can view own compliance deadlines"
    ON compliance_deadlines FOR SELECT
    USING (
        founder_id IN (SELECT id FROM founders WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can view own documents"
    ON documents FOR SELECT
    USING (
        founder_id IN (SELECT id FROM founders WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can upload own documents"
    ON documents FOR INSERT
    WITH CHECK (
        founder_id IN (SELECT id FROM founders WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can view own payments"
    ON payments FOR SELECT
    USING (
        founder_id IN (SELECT id FROM founders WHERE user_id = auth.uid())
    );

-- Storage bucket for documents (run this separately in Supabase dashboard)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);

-- Storage policies
-- CREATE POLICY "Users can upload own documents"
--     ON storage.objects FOR INSERT
--     WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- CREATE POLICY "Users can view own documents"
--     ON storage.objects FOR SELECT
--     USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);
