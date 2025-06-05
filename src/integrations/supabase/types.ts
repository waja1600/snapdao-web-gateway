export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      arbitration_cases: {
        Row: {
          arbitrator_assigned: string | null
          contract_id: string | null
          created_at: string | null
          description: string | null
          dispute_amount: number | null
          evidence_ipfs: string | null
          filed_by: string | null
          group_id: string | null
          id: string
          ipfs_evidence_hash: string | null
          resolution_deadline: string | null
          resolution_details: Json | null
          status: string | null
          title: string
          type: string
        }
        Insert: {
          arbitrator_assigned?: string | null
          contract_id?: string | null
          created_at?: string | null
          description?: string | null
          dispute_amount?: number | null
          evidence_ipfs?: string | null
          filed_by?: string | null
          group_id?: string | null
          id?: string
          ipfs_evidence_hash?: string | null
          resolution_deadline?: string | null
          resolution_details?: Json | null
          status?: string | null
          title: string
          type: string
        }
        Update: {
          arbitrator_assigned?: string | null
          contract_id?: string | null
          created_at?: string | null
          description?: string | null
          dispute_amount?: number | null
          evidence_ipfs?: string | null
          filed_by?: string | null
          group_id?: string | null
          id?: string
          ipfs_evidence_hash?: string | null
          resolution_deadline?: string | null
          resolution_details?: Json | null
          status?: string | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "arbitration_cases_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "arbitration_cases_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      company_formations: {
        Row: {
          business_type: string
          company_name: string
          created_at: string | null
          group_id: string | null
          id: string
          incorporation_country: string
          legal_documents: Json | null
          share_capital: number | null
          shareholders: Json | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          business_type: string
          company_name: string
          created_at?: string | null
          group_id?: string | null
          id?: string
          incorporation_country: string
          legal_documents?: Json | null
          share_capital?: number | null
          shareholders?: Json | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          business_type?: string
          company_name?: string
          created_at?: string | null
          group_id?: string | null
          id?: string
          incorporation_country?: string
          legal_documents?: Json | null
          share_capital?: number | null
          shareholders?: Json | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_formations_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          content: Json | null
          contract_type: string | null
          created_at: string | null
          created_by: string | null
          group_id: string | null
          id: string
          ipfs_hash: string | null
          ipfs_versions: Json | null
          negotiation_history: Json | null
          parties: Json | null
          signing_deadline: string | null
          status: string | null
          terms: Json | null
          title: string
          updated_at: string | null
          version: number | null
        }
        Insert: {
          content?: Json | null
          contract_type?: string | null
          created_at?: string | null
          created_by?: string | null
          group_id?: string | null
          id?: string
          ipfs_hash?: string | null
          ipfs_versions?: Json | null
          negotiation_history?: Json | null
          parties?: Json | null
          signing_deadline?: string | null
          status?: string | null
          terms?: Json | null
          title: string
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          content?: Json | null
          contract_type?: string | null
          created_at?: string | null
          created_by?: string | null
          group_id?: string | null
          id?: string
          ipfs_hash?: string | null
          ipfs_versions?: Json | null
          negotiation_history?: Json | null
          parties?: Json | null
          signing_deadline?: string | null
          status?: string | null
          terms?: Json | null
          title?: string
          updated_at?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contracts_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          active: boolean | null
          code: string
          created_at: string | null
          currency_code: string
          flag_emoji: string | null
          id: string
          name_ar: string
          name_en: string
          timezone: string
        }
        Insert: {
          active?: boolean | null
          code: string
          created_at?: string | null
          currency_code: string
          flag_emoji?: string | null
          id?: string
          name_ar: string
          name_en: string
          timezone: string
        }
        Update: {
          active?: boolean | null
          code?: string
          created_at?: string | null
          currency_code?: string
          flag_emoji?: string | null
          id?: string
          name_ar?: string
          name_en?: string
          timezone?: string
        }
        Relationships: []
      }
      currencies: {
        Row: {
          code: string
          exchange_rate: number | null
          id: string
          name_ar: string
          name_en: string
          symbol: string
          updated_at: string | null
        }
        Insert: {
          code: string
          exchange_rate?: number | null
          id?: string
          name_ar: string
          name_en: string
          symbol: string
          updated_at?: string | null
        }
        Update: {
          code?: string
          exchange_rate?: number | null
          id?: string
          name_ar?: string
          name_en?: string
          symbol?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      freelancer_proposals: {
        Row: {
          attachments: Json | null
          deliverables: Json | null
          description: string | null
          estimated_duration: string | null
          freelancer_id: string | null
          group_id: string | null
          id: string
          proposed_rate: number | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          submitted_at: string | null
          title: string
        }
        Insert: {
          attachments?: Json | null
          deliverables?: Json | null
          description?: string | null
          estimated_duration?: string | null
          freelancer_id?: string | null
          group_id?: string | null
          id?: string
          proposed_rate?: number | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          submitted_at?: string | null
          title: string
        }
        Update: {
          attachments?: Json | null
          deliverables?: Json | null
          description?: string | null
          estimated_duration?: string | null
          freelancer_id?: string | null
          group_id?: string | null
          id?: string
          proposed_rate?: number | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          submitted_at?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "freelancer_proposals_freelancer_id_fkey"
            columns: ["freelancer_id"]
            isOneToOne: false
            referencedRelation: "freelancers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "freelancer_proposals_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      freelancers: {
        Row: {
          assessment_score: number | null
          availability_status: string | null
          available: boolean | null
          average_rating: number | null
          certification_documents: Json | null
          completed_projects: number | null
          created_at: string | null
          experience_years: number | null
          hourly_rate: number | null
          id: string
          mcp_assessment_score: number | null
          portfolio_url: string | null
          skills: string[] | null
          specializations: string[] | null
          user_id: string | null
          verified: boolean | null
        }
        Insert: {
          assessment_score?: number | null
          availability_status?: string | null
          available?: boolean | null
          average_rating?: number | null
          certification_documents?: Json | null
          completed_projects?: number | null
          created_at?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          mcp_assessment_score?: number | null
          portfolio_url?: string | null
          skills?: string[] | null
          specializations?: string[] | null
          user_id?: string | null
          verified?: boolean | null
        }
        Update: {
          assessment_score?: number | null
          availability_status?: string | null
          available?: boolean | null
          average_rating?: number | null
          certification_documents?: Json | null
          completed_projects?: number | null
          created_at?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          mcp_assessment_score?: number | null
          portfolio_url?: string | null
          skills?: string[] | null
          specializations?: string[] | null
          user_id?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      gpo: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      group_members: {
        Row: {
          group_id: string | null
          id: string
          joined_at: string | null
          role: string | null
          user_id: string | null
          voting_weight: number | null
        }
        Insert: {
          group_id?: string | null
          id?: string
          joined_at?: string | null
          role?: string | null
          user_id?: string | null
          voting_weight?: number | null
        }
        Update: {
          group_id?: string | null
          id?: string
          joined_at?: string | null
          role?: string | null
          user_id?: string | null
          voting_weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          business_model: string | null
          business_objective: string | null
          created_at: string | null
          creator_id: string
          description: string | null
          gateway_type: string | null
          id: string
          incorporation_country: string | null
          jurisdiction: string | null
          legal_framework: string | null
          legal_framework_type: string | null
          maximum_members: number | null
          minimum_members: number | null
          name: string
          service_gateway: string
          status: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          business_model?: string | null
          business_objective?: string | null
          created_at?: string | null
          creator_id: string
          description?: string | null
          gateway_type?: string | null
          id?: string
          incorporation_country?: string | null
          jurisdiction?: string | null
          legal_framework?: string | null
          legal_framework_type?: string | null
          maximum_members?: number | null
          minimum_members?: number | null
          name: string
          service_gateway: string
          status?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          business_model?: string | null
          business_objective?: string | null
          created_at?: string | null
          creator_id?: string
          description?: string | null
          gateway_type?: string | null
          id?: string
          incorporation_country?: string | null
          jurisdiction?: string | null
          legal_framework?: string | null
          legal_framework_type?: string | null
          maximum_members?: number | null
          minimum_members?: number | null
          name?: string
          service_gateway?: string
          status?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      languages: {
        Row: {
          active: boolean | null
          code: string
          direction: string | null
          id: string
          name_en: string
          name_native: string
        }
        Insert: {
          active?: boolean | null
          code: string
          direction?: string | null
          id?: string
          name_en: string
          name_native: string
        }
        Update: {
          active?: boolean | null
          code?: string
          direction?: string | null
          id?: string
          name_en?: string
          name_native?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company_name: string | null
          country: string | null
          created_at: string | null
          full_name: string | null
          id: string
          kyc_status: string | null
          phone: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          company_name?: string | null
          country?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          kyc_status?: string | null
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          company_name?: string | null
          country?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          kyc_status?: string | null
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      proposals: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          group_id: string | null
          id: string
          status: string | null
          title: string
          type: string
          voting_deadline: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          group_id?: string | null
          id?: string
          status?: string | null
          title: string
          type: string
          voting_deadline?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          group_id?: string | null
          id?: string
          status?: string | null
          title?: string
          type?: string
          voting_deadline?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "proposals_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      supplier_proposals: {
        Row: {
          attachments: Json | null
          delivery_schedule: Json | null
          description: string | null
          group_id: string | null
          id: string
          pricing: Json | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          submitted_at: string | null
          supplier_id: string | null
          terms_conditions: string | null
          title: string
        }
        Insert: {
          attachments?: Json | null
          delivery_schedule?: Json | null
          description?: string | null
          group_id?: string | null
          id?: string
          pricing?: Json | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          submitted_at?: string | null
          supplier_id?: string | null
          terms_conditions?: string | null
          title: string
        }
        Update: {
          attachments?: Json | null
          delivery_schedule?: Json | null
          description?: string | null
          group_id?: string | null
          id?: string
          pricing?: Json | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          submitted_at?: string | null
          supplier_id?: string | null
          terms_conditions?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "supplier_proposals_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_proposals_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          compliance_rating: number | null
          country: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          specialization: string[] | null
          verified: boolean | null
        }
        Insert: {
          compliance_rating?: number | null
          country?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          specialization?: string[] | null
          verified?: boolean | null
        }
        Update: {
          compliance_rating?: number | null
          country?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          specialization?: string[] | null
          verified?: boolean | null
        }
        Relationships: []
      }
      votes: {
        Row: {
          choice: string
          id: string
          proposal_id: string | null
          reason: string | null
          user_id: string | null
          voted_at: string | null
          weight: number | null
        }
        Insert: {
          choice: string
          id?: string
          proposal_id?: string | null
          reason?: string | null
          user_id?: string | null
          voted_at?: string | null
          weight?: number | null
        }
        Update: {
          choice?: string
          id?: string
          proposal_id?: string | null
          reason?: string | null
          user_id?: string | null
          voted_at?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "votes_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
