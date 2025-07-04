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
      abouts: {
        Row: {
          created_at: string | null
          created_by_id: number | null
          id: number
          title: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          title?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          title?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "abouts_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "abouts_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      abouts_components: {
        Row: {
          component_id: number | null
          component_type: string | null
          entity_id: number | null
          field: string | null
          id: number
          order: number | null
        }
        Insert: {
          component_id?: number | null
          component_type?: string | null
          entity_id?: number | null
          field?: string | null
          id?: number
          order?: number | null
        }
        Update: {
          component_id?: number | null
          component_type?: string | null
          entity_id?: number | null
          field?: string | null
          id?: number
          order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "abouts_entity_fk"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "abouts"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_permissions: {
        Row: {
          action: string | null
          action_parameters: Json | null
          conditions: Json | null
          created_at: string | null
          created_by_id: number | null
          id: number
          properties: Json | null
          subject: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          action?: string | null
          action_parameters?: Json | null
          conditions?: Json | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          properties?: Json | null
          subject?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          action?: string | null
          action_parameters?: Json | null
          conditions?: Json | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          properties?: Json | null
          subject?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_permissions_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_permissions_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_permissions_role_links: {
        Row: {
          id: number
          permission_id: number | null
          permission_order: number | null
          role_id: number | null
        }
        Insert: {
          id?: number
          permission_id?: number | null
          permission_order?: number | null
          role_id?: number | null
        }
        Update: {
          id?: number
          permission_id?: number | null
          permission_order?: number | null
          role_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_permissions_role_links_fk"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "admin_permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_permissions_role_links_inv_fk"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "admin_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_roles: {
        Row: {
          code: string | null
          created_at: string | null
          created_by_id: number | null
          description: string | null
          id: number
          name: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          id?: number
          name?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          id?: number
          name?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_roles_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_roles_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_users: {
        Row: {
          blocked: boolean | null
          created_at: string | null
          created_by_id: number | null
          email: string | null
          firstname: string | null
          id: number
          is_active: boolean | null
          lastname: string | null
          password: string | null
          prefered_language: string | null
          registration_token: string | null
          reset_password_token: string | null
          updated_at: string | null
          updated_by_id: number | null
          username: string | null
        }
        Insert: {
          blocked?: boolean | null
          created_at?: string | null
          created_by_id?: number | null
          email?: string | null
          firstname?: string | null
          id?: number
          is_active?: boolean | null
          lastname?: string | null
          password?: string | null
          prefered_language?: string | null
          registration_token?: string | null
          reset_password_token?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
          username?: string | null
        }
        Update: {
          blocked?: boolean | null
          created_at?: string | null
          created_by_id?: number | null
          email?: string | null
          firstname?: string | null
          id?: number
          is_active?: boolean | null
          lastname?: string | null
          password?: string | null
          prefered_language?: string | null
          registration_token?: string | null
          reset_password_token?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_users_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_users_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_users_roles_links: {
        Row: {
          id: number
          role_id: number | null
          role_order: number | null
          user_id: number | null
          user_order: number | null
        }
        Insert: {
          id?: number
          role_id?: number | null
          role_order?: number | null
          user_id?: number | null
          user_order?: number | null
        }
        Update: {
          id?: number
          role_id?: number | null
          role_order?: number | null
          user_id?: number | null
          user_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_users_roles_links_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_users_roles_links_inv_fk"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "admin_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          created_at: string | null
          created_by_id: number | null
          description: string | null
          id: number
          published_at: string | null
          slug: string | null
          title: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          id?: number
          published_at?: string | null
          slug?: string | null
          title?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          id?: number
          published_at?: string | null
          slug?: string | null
          title?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "articles_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      articles_author_links: {
        Row: {
          article_id: number | null
          article_order: number | null
          author_id: number | null
          id: number
        }
        Insert: {
          article_id?: number | null
          article_order?: number | null
          author_id?: number | null
          id?: number
        }
        Update: {
          article_id?: number | null
          article_order?: number | null
          author_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "articles_author_links_fk"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_author_links_inv_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["id"]
          },
        ]
      }
      articles_category_links: {
        Row: {
          article_id: number | null
          article_order: number | null
          category_id: number | null
          id: number
        }
        Insert: {
          article_id?: number | null
          article_order?: number | null
          category_id?: number | null
          id?: number
        }
        Update: {
          article_id?: number | null
          article_order?: number | null
          category_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "articles_category_links_fk"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_category_links_inv_fk"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      articles_components: {
        Row: {
          component_id: number | null
          component_type: string | null
          entity_id: number | null
          field: string | null
          id: number
          order: number | null
        }
        Insert: {
          component_id?: number | null
          component_type?: string | null
          entity_id?: number | null
          field?: string | null
          id?: number
          order?: number | null
        }
        Update: {
          component_id?: number | null
          component_type?: string | null
          entity_id?: number | null
          field?: string | null
          id?: number
          order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "articles_entity_fk"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      authors: {
        Row: {
          created_at: string | null
          created_by_id: number | null
          email: string | null
          id: number
          name: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: number | null
          email?: string | null
          id?: number
          name?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: number | null
          email?: string | null
          id?: number
          name?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "authors_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "authors_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          created_by_id: number | null
          description: string | null
          id: number
          name: string | null
          slug: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          id?: number
          name?: string | null
          slug?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          id?: number
          name?: string | null
          slug?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categories_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      components_shared_media: {
        Row: {
          id: number
        }
        Insert: {
          id?: number
        }
        Update: {
          id?: number
        }
        Relationships: []
      }
      components_shared_quotes: {
        Row: {
          body: string | null
          id: number
          title: string | null
        }
        Insert: {
          body?: string | null
          id?: number
          title?: string | null
        }
        Update: {
          body?: string | null
          id?: number
          title?: string | null
        }
        Relationships: []
      }
      components_shared_rich_texts: {
        Row: {
          body: string | null
          id: number
        }
        Insert: {
          body?: string | null
          id?: number
        }
        Update: {
          body?: string | null
          id?: number
        }
        Relationships: []
      }
      components_shared_seos: {
        Row: {
          id: number
          meta_description: string | null
          meta_title: string | null
        }
        Insert: {
          id?: number
          meta_description?: string | null
          meta_title?: string | null
        }
        Update: {
          id?: number
          meta_description?: string | null
          meta_title?: string | null
        }
        Relationships: []
      }
      components_shared_sliders: {
        Row: {
          id: number
        }
        Insert: {
          id?: number
        }
        Update: {
          id?: number
        }
        Relationships: []
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
      files: {
        Row: {
          alternative_text: string | null
          caption: string | null
          created_at: string | null
          created_by_id: number | null
          ext: string | null
          folder_path: string | null
          formats: Json | null
          hash: string | null
          height: number | null
          id: number
          mime: string | null
          name: string | null
          preview_url: string | null
          provider: string | null
          provider_metadata: Json | null
          size: number | null
          updated_at: string | null
          updated_by_id: number | null
          url: string | null
          width: number | null
        }
        Insert: {
          alternative_text?: string | null
          caption?: string | null
          created_at?: string | null
          created_by_id?: number | null
          ext?: string | null
          folder_path?: string | null
          formats?: Json | null
          hash?: string | null
          height?: number | null
          id?: number
          mime?: string | null
          name?: string | null
          preview_url?: string | null
          provider?: string | null
          provider_metadata?: Json | null
          size?: number | null
          updated_at?: string | null
          updated_by_id?: number | null
          url?: string | null
          width?: number | null
        }
        Update: {
          alternative_text?: string | null
          caption?: string | null
          created_at?: string | null
          created_by_id?: number | null
          ext?: string | null
          folder_path?: string | null
          formats?: Json | null
          hash?: string | null
          height?: number | null
          id?: number
          mime?: string | null
          name?: string | null
          preview_url?: string | null
          provider?: string | null
          provider_metadata?: Json | null
          size?: number | null
          updated_at?: string | null
          updated_by_id?: number | null
          url?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "files_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "files_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      files_folder_links: {
        Row: {
          file_id: number | null
          file_order: number | null
          folder_id: number | null
          id: number
        }
        Insert: {
          file_id?: number | null
          file_order?: number | null
          folder_id?: number | null
          id?: number
        }
        Update: {
          file_id?: number | null
          file_order?: number | null
          folder_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "files_folder_links_fk"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "files_folder_links_inv_fk"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "upload_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      files_related_morphs: {
        Row: {
          field: string | null
          file_id: number | null
          id: number
          order: number | null
          related_id: number | null
          related_type: string | null
        }
        Insert: {
          field?: string | null
          file_id?: number | null
          id?: number
          order?: number | null
          related_id?: number | null
          related_type?: string | null
        }
        Update: {
          field?: string | null
          file_id?: number | null
          id?: number
          order?: number | null
          related_id?: number | null
          related_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "files_related_morphs_fk"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
        ]
      }
      freelancer_offers: {
        Row: {
          created_at: string
          delivery_time: string
          description: string
          freelancer_id: string
          group_id: string | null
          id: string
          price: number
          skills_required: string[] | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          delivery_time: string
          description: string
          freelancer_id: string
          group_id?: string | null
          id?: string
          price: number
          skills_required?: string[] | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          delivery_time?: string
          description?: string
          freelancer_id?: string
          group_id?: string | null
          id?: string
          price?: number
          skills_required?: string[] | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "freelancer_offers_group_id_fkey"
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
          id: string
          user_id: string | null
          verified: boolean | null
        }
        Insert: {
          assessment_score?: number | null
          available?: boolean | null
          created_at?: string | null
          id?: string
          user_id?: string | null
          verified?: boolean | null
        }
        Update: {
          assessment_score?: number | null
          available?: boolean | null
          created_at?: string | null
          id?: string
          user_id?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      globals: {
        Row: {
          created_at: string | null
          created_by_id: number | null
          id: number
          site_description: string | null
          site_name: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          site_description?: string | null
          site_name?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          site_description?: string | null
          site_name?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "globals_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "globals_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      globals_components: {
        Row: {
          component_id: number | null
          component_type: string | null
          entity_id: number | null
          field: string | null
          id: number
          order: number | null
        }
        Insert: {
          component_id?: number | null
          component_type?: string | null
          entity_id?: number | null
          field?: string | null
          id?: number
          order?: number | null
        }
        Update: {
          component_id?: number | null
          component_type?: string | null
          entity_id?: number | null
          field?: string | null
          id?: number
          order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "globals_entity_fk"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "globals"
            referencedColumns: ["id"]
          },
        ]
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
          admins: string[] | null
          business_objective: string | null
          created_at: string | null
          creator_id: string | null
          current_phase: string | null
          description: string | null
          id: string
          jurisdiction: string | null
          legal_framework: string | null
          max_members: number | null
          min_members: number | null
          name: string
          round_number: number | null
          service_gateway: string
          status: string | null
          type: string
          updated_at: string | null
          visibility: string | null
        }
        Insert: {
          admins?: string[] | null
          business_objective?: string | null
          created_at?: string | null
          creator_id?: string | null
          current_phase?: string | null
          description?: string | null
          id?: string
          jurisdiction?: string | null
          legal_framework?: string | null
          max_members?: number | null
          min_members?: number | null
          name: string
          round_number?: number | null
          service_gateway: string
          status?: string | null
          type: string
          updated_at?: string | null
          visibility?: string | null
        }
        Update: {
          admins?: string[] | null
          business_objective?: string | null
          created_at?: string | null
          creator_id?: string | null
          current_phase?: string | null
          description?: string | null
          id?: string
          jurisdiction?: string | null
          legal_framework?: string | null
          max_members?: number | null
          min_members?: number | null
          name?: string
          round_number?: number | null
          service_gateway?: string
          status?: string | null
          type?: string
          updated_at?: string | null
          visibility?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          content: string | null
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          bio: string | null
          company_name: string | null
          created_at: string | null
          experience_years: number | null
          full_name: string | null
          id: string
          kyc_status: string | null
          phone: string | null
          role: string | null
          skills: string[] | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          bio?: string | null
          company_name?: string | null
          created_at?: string | null
          experience_years?: number | null
          full_name?: string | null
          id: string
          kyc_status?: string | null
          phone?: string | null
          role?: string | null
          skills?: string[] | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          bio?: string | null
          company_name?: string | null
          created_at?: string | null
          experience_years?: number | null
          full_name?: string | null
          id?: string
          kyc_status?: string | null
          phone?: string | null
          role?: string | null
          skills?: string[] | null
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
      role_capabilities: {
        Row: {
          capability: string
          created_at: string | null
          description: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          capability: string
          created_at?: string | null
          description?: string | null
          id?: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          capability?: string
          created_at?: string | null
          description?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      strapi_api_token_permissions: {
        Row: {
          action: string | null
          created_at: string | null
          created_by_id: number | null
          id: number
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          action?: string | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          action?: string | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_api_token_permissions_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_api_token_permissions_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_api_token_permissions_token_links: {
        Row: {
          api_token_id: number | null
          api_token_permission_id: number | null
          api_token_permission_order: number | null
          id: number
        }
        Insert: {
          api_token_id?: number | null
          api_token_permission_id?: number | null
          api_token_permission_order?: number | null
          id?: number
        }
        Update: {
          api_token_id?: number | null
          api_token_permission_id?: number | null
          api_token_permission_order?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "strapi_api_token_permissions_token_links_fk"
            columns: ["api_token_permission_id"]
            isOneToOne: false
            referencedRelation: "strapi_api_token_permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_api_token_permissions_token_links_inv_fk"
            columns: ["api_token_id"]
            isOneToOne: false
            referencedRelation: "strapi_api_tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_api_tokens: {
        Row: {
          access_key: string | null
          created_at: string | null
          created_by_id: number | null
          description: string | null
          expires_at: string | null
          id: number
          last_used_at: string | null
          lifespan: number | null
          name: string | null
          type: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          access_key?: string | null
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          expires_at?: string | null
          id?: number
          last_used_at?: string | null
          lifespan?: number | null
          name?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          access_key?: string | null
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          expires_at?: string | null
          id?: number
          last_used_at?: string | null
          lifespan?: number | null
          name?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_api_tokens_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_api_tokens_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_core_store_settings: {
        Row: {
          environment: string | null
          id: number
          key: string | null
          tag: string | null
          type: string | null
          value: string | null
        }
        Insert: {
          environment?: string | null
          id?: number
          key?: string | null
          tag?: string | null
          type?: string | null
          value?: string | null
        }
        Update: {
          environment?: string | null
          id?: number
          key?: string | null
          tag?: string | null
          type?: string | null
          value?: string | null
        }
        Relationships: []
      }
      strapi_database_schema: {
        Row: {
          hash: string | null
          id: number
          schema: Json | null
          time: string | null
        }
        Insert: {
          hash?: string | null
          id?: number
          schema?: Json | null
          time?: string | null
        }
        Update: {
          hash?: string | null
          id?: number
          schema?: Json | null
          time?: string | null
        }
        Relationships: []
      }
      strapi_migrations: {
        Row: {
          id: number
          name: string | null
          time: string | null
        }
        Insert: {
          id?: number
          name?: string | null
          time?: string | null
        }
        Update: {
          id?: number
          name?: string | null
          time?: string | null
        }
        Relationships: []
      }
      strapi_release_actions: {
        Row: {
          content_type: string | null
          created_at: string | null
          created_by_id: number | null
          id: number
          is_entry_valid: boolean | null
          locale: string | null
          target_id: number | null
          target_type: string | null
          type: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          content_type?: string | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          is_entry_valid?: boolean | null
          locale?: string | null
          target_id?: number | null
          target_type?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          content_type?: string | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          is_entry_valid?: boolean | null
          locale?: string | null
          target_id?: number | null
          target_type?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_release_actions_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_release_actions_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_release_actions_release_links: {
        Row: {
          id: number
          release_action_id: number | null
          release_action_order: number | null
          release_id: number | null
        }
        Insert: {
          id?: number
          release_action_id?: number | null
          release_action_order?: number | null
          release_id?: number | null
        }
        Update: {
          id?: number
          release_action_id?: number | null
          release_action_order?: number | null
          release_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_release_actions_release_links_fk"
            columns: ["release_action_id"]
            isOneToOne: false
            referencedRelation: "strapi_release_actions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_release_actions_release_links_inv_fk"
            columns: ["release_id"]
            isOneToOne: false
            referencedRelation: "strapi_releases"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_releases: {
        Row: {
          created_at: string | null
          created_by_id: number | null
          id: number
          name: string | null
          released_at: string | null
          scheduled_at: string | null
          status: string | null
          timezone: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          name?: string | null
          released_at?: string | null
          scheduled_at?: string | null
          status?: string | null
          timezone?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          name?: string | null
          released_at?: string | null
          scheduled_at?: string | null
          status?: string | null
          timezone?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_releases_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_releases_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_transfer_token_permissions: {
        Row: {
          action: string | null
          created_at: string | null
          created_by_id: number | null
          id: number
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          action?: string | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          action?: string | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_transfer_token_permissions_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_transfer_token_permissions_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_transfer_token_permissions_token_links: {
        Row: {
          id: number
          transfer_token_id: number | null
          transfer_token_permission_id: number | null
          transfer_token_permission_order: number | null
        }
        Insert: {
          id?: number
          transfer_token_id?: number | null
          transfer_token_permission_id?: number | null
          transfer_token_permission_order?: number | null
        }
        Update: {
          id?: number
          transfer_token_id?: number | null
          transfer_token_permission_id?: number | null
          transfer_token_permission_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_transfer_token_permissions_token_links_fk"
            columns: ["transfer_token_permission_id"]
            isOneToOne: false
            referencedRelation: "strapi_transfer_token_permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_transfer_token_permissions_token_links_inv_fk"
            columns: ["transfer_token_id"]
            isOneToOne: false
            referencedRelation: "strapi_transfer_tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_transfer_tokens: {
        Row: {
          access_key: string | null
          created_at: string | null
          created_by_id: number | null
          description: string | null
          expires_at: string | null
          id: number
          last_used_at: string | null
          lifespan: number | null
          name: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          access_key?: string | null
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          expires_at?: string | null
          id?: number
          last_used_at?: string | null
          lifespan?: number | null
          name?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          access_key?: string | null
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          expires_at?: string | null
          id?: number
          last_used_at?: string | null
          lifespan?: number | null
          name?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_transfer_tokens_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_transfer_tokens_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_webhooks: {
        Row: {
          enabled: boolean | null
          events: Json | null
          headers: Json | null
          id: number
          name: string | null
          url: string | null
        }
        Insert: {
          enabled?: boolean | null
          events?: Json | null
          headers?: Json | null
          id?: number
          name?: string | null
          url?: string | null
        }
        Update: {
          enabled?: boolean | null
          events?: Json | null
          headers?: Json | null
          id?: number
          name?: string | null
          url?: string | null
        }
        Relationships: []
      }
      supplier_offers: {
        Row: {
          company_name: string
          created_at: string
          delivery_terms: string | null
          group_id: string | null
          id: string
          offer_description: string
          payment_terms: string | null
          price_details: Json | null
          status: string
          supplier_id: string
          updated_at: string
          valid_until: string | null
        }
        Insert: {
          company_name: string
          created_at?: string
          delivery_terms?: string | null
          group_id?: string | null
          id?: string
          offer_description: string
          payment_terms?: string | null
          price_details?: Json | null
          status?: string
          supplier_id: string
          updated_at?: string
          valid_until?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string
          delivery_terms?: string | null
          group_id?: string | null
          id?: string
          offer_description?: string
          payment_terms?: string | null
          price_details?: Json | null
          status?: string
          supplier_id?: string
          updated_at?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supplier_offers_group_id_fkey"
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
          created_at: string | null
          description: string | null
          id: string
          name: string
          verified: boolean | null
        }
        Insert: {
          compliance_rating?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          verified?: boolean | null
        }
        Update: {
          compliance_rating?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      up_permissions: {
        Row: {
          action: string | null
          created_at: string | null
          created_by_id: number | null
          id: number
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          action?: string | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          action?: string | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "up_permissions_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "up_permissions_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      up_permissions_role_links: {
        Row: {
          id: number
          permission_id: number | null
          permission_order: number | null
          role_id: number | null
        }
        Insert: {
          id?: number
          permission_id?: number | null
          permission_order?: number | null
          role_id?: number | null
        }
        Update: {
          id?: number
          permission_id?: number | null
          permission_order?: number | null
          role_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "up_permissions_role_links_fk"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "up_permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "up_permissions_role_links_inv_fk"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "up_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      up_roles: {
        Row: {
          created_at: string | null
          created_by_id: number | null
          description: string | null
          id: number
          name: string | null
          type: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          id?: number
          name?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          id?: number
          name?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "up_roles_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "up_roles_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      up_users: {
        Row: {
          blocked: boolean | null
          confirmation_token: string | null
          confirmed: boolean | null
          created_at: string | null
          created_by_id: number | null
          email: string | null
          id: number
          password: string | null
          provider: string | null
          reset_password_token: string | null
          updated_at: string | null
          updated_by_id: number | null
          username: string | null
        }
        Insert: {
          blocked?: boolean | null
          confirmation_token?: string | null
          confirmed?: boolean | null
          created_at?: string | null
          created_by_id?: number | null
          email?: string | null
          id?: number
          password?: string | null
          provider?: string | null
          reset_password_token?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
          username?: string | null
        }
        Update: {
          blocked?: boolean | null
          confirmation_token?: string | null
          confirmed?: boolean | null
          created_at?: string | null
          created_by_id?: number | null
          email?: string | null
          id?: number
          password?: string | null
          provider?: string | null
          reset_password_token?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "up_users_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "up_users_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      up_users_role_links: {
        Row: {
          id: number
          role_id: number | null
          user_id: number | null
          user_order: number | null
        }
        Insert: {
          id?: number
          role_id?: number | null
          user_id?: number | null
          user_order?: number | null
        }
        Update: {
          id?: number
          role_id?: number | null
          user_id?: number | null
          user_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "up_users_role_links_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "up_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "up_users_role_links_inv_fk"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "up_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      upload_folders: {
        Row: {
          created_at: string | null
          created_by_id: number | null
          id: number
          name: string | null
          path: string | null
          path_id: number | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          name?: string | null
          path?: string | null
          path_id?: number | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          name?: string | null
          path?: string | null
          path_id?: number | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "upload_folders_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "upload_folders_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      upload_folders_parent_links: {
        Row: {
          folder_id: number | null
          folder_order: number | null
          id: number
          inv_folder_id: number | null
        }
        Insert: {
          folder_id?: number | null
          folder_order?: number | null
          id?: number
          inv_folder_id?: number | null
        }
        Update: {
          folder_id?: number | null
          folder_order?: number | null
          id?: number
          inv_folder_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "upload_folders_parent_links_fk"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "upload_folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "upload_folders_parent_links_inv_fk"
            columns: ["inv_folder_id"]
            isOneToOne: false
            referencedRelation: "upload_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          expires_at: string | null
          granted_at: string | null
          granted_by: string | null
          id: string
          is_active: boolean | null
          role: Database["public"]["Enums"]["user_role"]
          role_data: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          is_active?: boolean | null
          role?: Database["public"]["Enums"]["user_role"]
          role_data?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          is_active?: boolean | null
          role?: Database["public"]["Enums"]["user_role"]
          role_data?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      votes: {
        Row: {
          choice: string
          created_at: string | null
          id: string
          reason: string | null
          user_id: string | null
          voting_session_id: string | null
          weight: number | null
        }
        Insert: {
          choice: string
          created_at?: string | null
          id?: string
          reason?: string | null
          user_id?: string | null
          voting_session_id?: string | null
          weight?: number | null
        }
        Update: {
          choice?: string
          created_at?: string | null
          id?: string
          reason?: string | null
          user_id?: string | null
          voting_session_id?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "votes_voting_session_id_fkey"
            columns: ["voting_session_id"]
            isOneToOne: false
            referencedRelation: "voting_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      voting_sessions: {
        Row: {
          created_at: string
          created_by: string
          deadline: string | null
          description: string | null
          group_id: string | null
          id: string
          options: Json
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          deadline?: string | null
          description?: string | null
          group_id?: string | null
          id?: string
          options: Json
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          deadline?: string | null
          description?: string | null
          group_id?: string | null
          id?: string
          options?: Json
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "voting_sessions_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_primary_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      get_user_roles: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["user_role"][]
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      user_role:
        | "user"
        | "company"
        | "freelancer"
        | "supervisor"
        | "supplier"
        | "arbitrator"
        | "admin"
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
    Enums: {
      user_role: [
        "user",
        "company",
        "freelancer",
        "supervisor",
        "supplier",
        "arbitrator",
        "admin",
      ],
    },
  },
} as const
