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
          created_at: string | null
          description: string | null
          evidence_ipfs: string | null
          filed_by: string | null
          group_id: string | null
          id: string
          status: string | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          evidence_ipfs?: string | null
          filed_by?: string | null
          group_id?: string | null
          id?: string
          status?: string | null
          title: string
          type: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          evidence_ipfs?: string | null
          filed_by?: string | null
          group_id?: string | null
          id?: string
          status?: string | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "arbitration_cases_group_id_fkey"
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
          created_at: string | null
          created_by: string | null
          group_id: string | null
          id: string
          ipfs_hash: string | null
          status: string | null
          title: string
          updated_at: string | null
          version: number | null
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          created_by?: string | null
          group_id?: string | null
          id?: string
          ipfs_hash?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          created_by?: string | null
          group_id?: string | null
          id?: string
          ipfs_hash?: string | null
          status?: string | null
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
      freelancers: {
        Row: {
          assessment_score: number | null
          available: boolean | null
          created_at: string | null
          experience_years: number | null
          hourly_rate: number | null
          id: string
          portfolio_url: string | null
          skills: string[] | null
          user_id: string | null
          verified: boolean | null
        }
        Insert: {
          assessment_score?: number | null
          available?: boolean | null
          created_at?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          portfolio_url?: string | null
          skills?: string[] | null
          user_id?: string | null
          verified?: boolean | null
        }
        Update: {
          assessment_score?: number | null
          available?: boolean | null
          created_at?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          portfolio_url?: string | null
          skills?: string[] | null
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
          business_objective: string | null
          created_at: string | null
          creator_id: string
          description: string | null
          id: string
          jurisdiction: string | null
          legal_framework: string | null
          name: string
          service_gateway: string
          status: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          business_objective?: string | null
          created_at?: string | null
          creator_id: string
          description?: string | null
          id?: string
          jurisdiction?: string | null
          legal_framework?: string | null
          name: string
          service_gateway: string
          status?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          business_objective?: string | null
          created_at?: string | null
          creator_id?: string
          description?: string | null
          id?: string
          jurisdiction?: string | null
          legal_framework?: string | null
          name?: string
          service_gateway?: string
          status?: string | null
          type?: string
          updated_at?: string | null
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
