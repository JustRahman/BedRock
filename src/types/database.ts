export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type VerificationStatus = 'pending' | 'verified' | 'failed' | 'expired'
export type ApplicationStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'completed'
export type TrustScoreStatus = 'elite' | 'approved' | 'review_needed' | 'conditional' | 'not_eligible'
export type DocumentType = 'passport' | 'local_id' | 'address_proof' | 'bank_statement' | 'business_license' | 'other'
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
export type UserRole = 'founder' | 'admin'
export type FounderStatus = 'onboarding' | 'verified' | 'active' | 'churned'
export type FounderTier = 'basic' | 'standard' | 'premium'

export interface Database {
  public: {
    Tables: {
      founders: {
        Row: {
          id: string
          user_id: string
          email: string
          full_name: string
          phone: string | null
          country_of_origin: string
          country_of_residence: string
          date_of_birth: string | null
          tier: FounderTier
          status: FounderStatus
          address: string | null
          created_at: string
          updated_at: string
          onboarding_completed: boolean
          role: UserRole
        }
        Insert: {
          id?: string
          user_id: string
          email: string
          full_name: string
          phone?: string | null
          country_of_origin: string
          country_of_residence: string
          date_of_birth?: string | null
          tier?: FounderTier
          status?: FounderStatus
          address?: string | null
          created_at?: string
          updated_at?: string
          onboarding_completed?: boolean
          role?: UserRole
        }
        Update: {
          id?: string
          user_id?: string
          email?: string
          full_name?: string
          phone?: string | null
          country_of_origin?: string
          country_of_residence?: string
          date_of_birth?: string | null
          tier?: FounderTier
          status?: FounderStatus
          address?: string | null
          created_at?: string
          updated_at?: string
          onboarding_completed?: boolean
          role?: UserRole
        }
      }
      founder_verifications: {
        Row: {
          id: string
          founder_id: string
          verification_type: string
          status: VerificationStatus
          verified_at: string | null
          expires_at: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          founder_id: string
          verification_type: string
          status?: VerificationStatus
          verified_at?: string | null
          expires_at?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          founder_id?: string
          verification_type?: string
          status?: VerificationStatus
          verified_at?: string | null
          expires_at?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      trust_scores: {
        Row: {
          id: string
          founder_id: string
          total_score: number
          identity_score: number
          business_score: number
          financial_score: number
          social_score: number
          digital_lineage_score: number
          network_score: number
          country_adjustment: number
          version: number
          status: TrustScoreStatus
          score_breakdown: Json | null
          manual_override: boolean
          override_reason: string | null
          calculated_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          founder_id: string
          total_score: number
          identity_score: number
          business_score: number
          financial_score?: number
          social_score?: number
          digital_lineage_score?: number
          network_score?: number
          country_adjustment?: number
          version?: number
          status: TrustScoreStatus
          score_breakdown?: Json | null
          manual_override?: boolean
          override_reason?: string | null
          calculated_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          founder_id?: string
          total_score?: number
          identity_score?: number
          business_score?: number
          financial_score?: number
          social_score?: number
          digital_lineage_score?: number
          network_score?: number
          country_adjustment?: number
          version?: number
          status?: TrustScoreStatus
          score_breakdown?: Json | null
          manual_override?: boolean
          override_reason?: string | null
          calculated_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      companies: {
        Row: {
          id: string
          founder_id: string
          name: string
          website: string | null
          domain_age_months: number | null
          github_url: string | null
          linkedin_url: string | null
          description: string | null
          has_local_business: boolean
          monthly_revenue: number | null
          stripe_connected: boolean
          state: string | null
          formation_date: string | null
          ein: string | null
          legal_name: string | null
          formation_status: string
          registered_agent_name: string | null
          registered_agent_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          founder_id: string
          name: string
          website?: string | null
          domain_age_months?: number | null
          github_url?: string | null
          linkedin_url?: string | null
          description?: string | null
          has_local_business?: boolean
          monthly_revenue?: number | null
          stripe_connected?: boolean
          state?: string | null
          formation_date?: string | null
          ein?: string | null
          legal_name?: string | null
          formation_status?: string
          registered_agent_name?: string | null
          registered_agent_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          founder_id?: string
          name?: string
          website?: string | null
          domain_age_months?: number | null
          github_url?: string | null
          linkedin_url?: string | null
          description?: string | null
          has_local_business?: boolean
          monthly_revenue?: number | null
          stripe_connected?: boolean
          state?: string | null
          formation_date?: string | null
          ein?: string | null
          legal_name?: string | null
          formation_status?: string
          registered_agent_name?: string | null
          registered_agent_notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      digital_lineage: {
        Row: {
          id: string
          founder_id: string
          github_data: Json
          linkedin_data: Json
          financial_data: Json
          domain_data: Json
          social_profiles: Json
          verified_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          founder_id: string
          github_data?: Json
          linkedin_data?: Json
          financial_data?: Json
          domain_data?: Json
          social_profiles?: Json
          verified_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          founder_id?: string
          github_data?: Json
          linkedin_data?: Json
          financial_data?: Json
          domain_data?: Json
          social_profiles?: Json
          verified_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          founder_id: string
          amount: number
          currency: string
          recipient: string | null
          recipient_country: string | null
          risk_score: number
          flagged: boolean
          documentation: Json
          resolution_status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          founder_id: string
          amount: number
          currency?: string
          recipient?: string | null
          recipient_country?: string | null
          risk_score?: number
          flagged?: boolean
          documentation?: Json
          resolution_status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          founder_id?: string
          amount?: number
          currency?: string
          recipient?: string | null
          recipient_country?: string | null
          risk_score?: number
          flagged?: boolean
          documentation?: Json
          resolution_status?: string
          created_at?: string
          updated_at?: string
        }
      }
      bank_applications: {
        Row: {
          id: string
          founder_id: string
          company_id: string
          status: ApplicationStatus
          bank_name: string | null
          submitted_at: string | null
          approved_at: string | null
          rejection_reason: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          founder_id: string
          company_id: string
          status?: ApplicationStatus
          bank_name?: string | null
          submitted_at?: string | null
          approved_at?: string | null
          rejection_reason?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          founder_id?: string
          company_id?: string
          status?: ApplicationStatus
          bank_name?: string | null
          submitted_at?: string | null
          approved_at?: string | null
          rejection_reason?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      compliance_deadlines: {
        Row: {
          id: string
          founder_id: string
          company_id: string | null
          title: string
          description: string | null
          due_date: string
          completed: boolean
          completed_at: string | null
          reminder_sent: boolean
          is_recurring: boolean
          recurring_type: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          founder_id: string
          company_id?: string | null
          title: string
          description?: string | null
          due_date: string
          completed?: boolean
          completed_at?: string | null
          reminder_sent?: boolean
          is_recurring?: boolean
          recurring_type?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          founder_id?: string
          company_id?: string | null
          title?: string
          description?: string | null
          due_date?: string
          completed?: boolean
          completed_at?: string | null
          reminder_sent?: boolean
          is_recurring?: boolean
          recurring_type?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          founder_id: string
          type: DocumentType
          file_name: string
          file_path: string
          file_size: number
          mime_type: string
          verified: boolean
          verified_at: string | null
          verified_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          founder_id: string
          type: DocumentType
          file_name: string
          file_path: string
          file_size: number
          mime_type: string
          verified?: boolean
          verified_at?: string | null
          verified_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          founder_id?: string
          type?: DocumentType
          file_name?: string
          file_path?: string
          file_size?: number
          mime_type?: string
          verified?: boolean
          verified_at?: string | null
          verified_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      referral_codes: {
        Row: {
          id: string
          code: string
          founder_id: string
          founder_name: string
          max_uses: number
          times_used: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code: string
          founder_id: string
          founder_name: string
          max_uses?: number
          times_used?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string
          founder_id?: string
          founder_name?: string
          max_uses?: number
          times_used?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      university_verification_codes: {
        Row: {
          id: string
          email: string
          code: string
          verified: boolean
          attempts: number
          expires_at: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          code: string
          verified?: boolean
          attempts?: number
          expires_at: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          code?: string
          verified?: boolean
          attempts?: number
          expires_at?: string
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          founder_id: string
          amount: number
          currency: string
          status: PaymentStatus
          stripe_payment_id: string | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          founder_id: string
          amount: number
          currency?: string
          status?: PaymentStatus
          stripe_payment_id?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          founder_id?: string
          amount?: number
          currency?: string
          status?: PaymentStatus
          stripe_payment_id?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      company_updates: {
        Row: {
          id: string
          company_id: string
          status: string
          note: string | null
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          company_id: string
          status: string
          note?: string | null
          created_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          status?: string
          note?: string | null
          created_by?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      verification_status: VerificationStatus
      application_status: ApplicationStatus
      trust_score_status: TrustScoreStatus
      document_type: DocumentType
      payment_status: PaymentStatus
      user_role: UserRole
      founder_status: FounderStatus
      founder_tier: FounderTier
    }
  }
}

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Convenience types
export type Founder = Tables<'founders'>
export type FounderVerification = Tables<'founder_verifications'>
export type TrustScore = Tables<'trust_scores'>
export type Company = Tables<'companies'>
export type DigitalLineage = Tables<'digital_lineage'>
export type Transaction = Tables<'transactions'>
export type BankApplication = Tables<'bank_applications'>
export type ComplianceDeadline = Tables<'compliance_deadlines'>
export type Document = Tables<'documents'>
export type Payment = Tables<'payments'>
export type ReferralCode = Tables<'referral_codes'>
export type UniversityVerificationCode = Tables<'university_verification_codes'>
export type CompanyUpdate = Tables<'company_updates'>
