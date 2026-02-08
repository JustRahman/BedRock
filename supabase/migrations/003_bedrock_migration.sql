-- Migration 003: Bedrock Migration
-- Adds new enums, fields, and tables for the Bedrock scoring model

-- New enums
CREATE TYPE founder_status AS ENUM ('onboarding', 'verified', 'active', 'churned');
CREATE TYPE founder_tier AS ENUM ('basic', 'standard', 'premium');

-- Add new values to trust_score_status
ALTER TYPE trust_score_status ADD VALUE IF NOT EXISTS 'elite';
ALTER TYPE trust_score_status ADD VALUE IF NOT EXISTS 'conditional';

-- ALTER founders: add new fields
ALTER TABLE founders
  ADD COLUMN IF NOT EXISTS date_of_birth DATE,
  ADD COLUMN IF NOT EXISTS tier founder_tier DEFAULT 'basic',
  ADD COLUMN IF NOT EXISTS status founder_status DEFAULT 'onboarding',
  ADD COLUMN IF NOT EXISTS address TEXT;

-- ALTER trust_scores: add new fields
ALTER TABLE trust_scores
  ADD COLUMN IF NOT EXISTS digital_lineage_score INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS network_score INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS country_adjustment INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS version INTEGER DEFAULT 2;

-- ALTER companies: add new fields
ALTER TABLE companies
  ADD COLUMN IF NOT EXISTS state TEXT,
  ADD COLUMN IF NOT EXISTS formation_date DATE,
  ADD COLUMN IF NOT EXISTS ein TEXT,
  ADD COLUMN IF NOT EXISTS legal_name TEXT,
  ADD COLUMN IF NOT EXISTS formation_status TEXT DEFAULT 'pending';

-- CREATE digital_lineage table
CREATE TABLE IF NOT EXISTS digital_lineage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  founder_id UUID NOT NULL REFERENCES founders(id) ON DELETE CASCADE,
  github_data JSONB DEFAULT '{}',
  linkedin_data JSONB DEFAULT '{}',
  financial_data JSONB DEFAULT '{}',
  domain_data JSONB DEFAULT '{}',
  social_profiles JSONB DEFAULT '{}',
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(founder_id)
);

-- CREATE transactions table (Anti-Freeze)
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  founder_id UUID NOT NULL REFERENCES founders(id) ON DELETE CASCADE,
  amount DECIMAL(12, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  recipient TEXT,
  recipient_country TEXT,
  risk_score INTEGER DEFAULT 0,
  flagged BOOLEAN DEFAULT FALSE,
  documentation JSONB DEFAULT '{}',
  resolution_status TEXT DEFAULT 'none',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_digital_lineage_founder ON digital_lineage(founder_id);
CREATE INDEX IF NOT EXISTS idx_transactions_founder ON transactions(founder_id);
CREATE INDEX IF NOT EXISTS idx_transactions_flagged ON transactions(flagged) WHERE flagged = TRUE;

-- Updated at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_digital_lineage_updated_at ON digital_lineage;
CREATE TRIGGER update_digital_lineage_updated_at
    BEFORE UPDATE ON digital_lineage
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_transactions_updated_at ON transactions;
CREATE TRIGGER update_transactions_updated_at
    BEFORE UPDATE ON transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS policies for digital_lineage
ALTER TABLE digital_lineage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own digital lineage"
  ON digital_lineage FOR SELECT
  USING (founder_id IN (
    SELECT id FROM founders WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own digital lineage"
  ON digital_lineage FOR INSERT
  WITH CHECK (founder_id IN (
    SELECT id FROM founders WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update own digital lineage"
  ON digital_lineage FOR UPDATE
  USING (founder_id IN (
    SELECT id FROM founders WHERE user_id = auth.uid()
  ));

-- RLS policies for transactions
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  USING (founder_id IN (
    SELECT id FROM founders WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own transactions"
  ON transactions FOR INSERT
  WITH CHECK (founder_id IN (
    SELECT id FROM founders WHERE user_id = auth.uid()
  ));

-- Admin policies
CREATE POLICY "Admins can view all digital lineage"
  ON digital_lineage FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM founders WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can view all transactions"
  ON transactions FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM founders WHERE user_id = auth.uid() AND role = 'admin')
  );
