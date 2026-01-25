export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      access_control_policies: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          permissions: Json
          resource_id: string | null
          resource_type: string
          role_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          permissions: Json
          resource_id?: string | null
          resource_type: string
          role_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          permissions?: Json
          resource_id?: string | null
          resource_type?: string
          role_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      activity_logs: {
        Row: {
          actor_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string | null
          event_description: string
          event_type: string
          id: string
          metadata: Json | null
        }
        Insert: {
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          event_description: string
          event_type: string
          id?: string
          metadata?: Json | null
        }
        Update: {
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          event_description?: string
          event_type?: string
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      agent_profiles: {
        Row: {
          agency_details: Json | null
          created_at: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          agency_details?: Json | null
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          agency_details?: Json | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_models: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          model_type: Database["public"]["Enums"]["model_type"]
          name: string
          registry_url: string | null
          status: string | null
          updated_at: string | null
          validation_rules: Json | null
          version: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          model_type: Database["public"]["Enums"]["model_type"]
          name: string
          registry_url?: string | null
          status?: string | null
          updated_at?: string | null
          validation_rules?: Json | null
          version: string
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          model_type?: Database["public"]["Enums"]["model_type"]
          name?: string
          registry_url?: string | null
          status?: string | null
          updated_at?: string | null
          validation_rules?: Json | null
          version?: string
        }
        Relationships: []
      }
      alarms: {
        Row: {
          acknowledged_at: string | null
          acknowledged_by: string | null
          alarm_type: string
          cleared_at: string | null
          created_at: string | null
          current_value: number | null
          data_point_id: string | null
          id: string
          message: string
          severity: string
          status: string | null
          threshold_value: number | null
        }
        Insert: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alarm_type: string
          cleared_at?: string | null
          created_at?: string | null
          current_value?: number | null
          data_point_id?: string | null
          id?: string
          message: string
          severity: string
          status?: string | null
          threshold_value?: number | null
        }
        Update: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alarm_type?: string
          cleared_at?: string | null
          created_at?: string | null
          current_value?: number | null
          data_point_id?: string | null
          id?: string
          message?: string
          severity?: string
          status?: string | null
          threshold_value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "alarms_data_point_id_fkey"
            columns: ["data_point_id"]
            isOneToOne: false
            referencedRelation: "data_points"
            referencedColumns: ["id"]
          },
        ]
      }
      allocation_receipts: {
        Row: {
          anchor_reference: string | null
          code_version: string
          id: string
          issued_at: string
          metadata: Json | null
          proposal_hash: string
          receipt_id: string
          registries: string[]
          signatures: Json | null
          status: string
        }
        Insert: {
          anchor_reference?: string | null
          code_version: string
          id?: string
          issued_at?: string
          metadata?: Json | null
          proposal_hash: string
          receipt_id: string
          registries: string[]
          signatures?: Json | null
          status?: string
        }
        Update: {
          anchor_reference?: string | null
          code_version?: string
          id?: string
          issued_at?: string
          metadata?: Json | null
          proposal_hash?: string
          receipt_id?: string
          registries?: string[]
          signatures?: Json | null
          status?: string
        }
        Relationships: []
      }
      anomaly_queue: {
        Row: {
          anomaly_id: string
          description: string
          detected_at: string
          id: string
          metadata: Json | null
          priority: string
          resolution_details: string | null
          resolved_at: string | null
          resolved_by: string | null
          status: string
          type: string
        }
        Insert: {
          anomaly_id: string
          description: string
          detected_at?: string
          id?: string
          metadata?: Json | null
          priority: string
          resolution_details?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          type: string
        }
        Update: {
          anomaly_id?: string
          description?: string
          detected_at?: string
          id?: string
          metadata?: Json | null
          priority?: string
          resolution_details?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          type?: string
        }
        Relationships: []
      }
      assets: {
        Row: {
          asset_name: string
          asset_type: string
          brick_tags: Json | null
          created_at: string | null
          equipment_id: string | null
          floor_level: number | null
          id: string
          installation_date: string | null
          location: string
          manufacturer: string | null
          metadata: Json | null
          model: string | null
          serial_number: string | null
          site_id: string | null
          space_id: string | null
          status: string | null
          system_id: string | null
          updated_at: string | null
          warranty_end: string | null
          zone: string | null
        }
        Insert: {
          asset_name: string
          asset_type: string
          brick_tags?: Json | null
          created_at?: string | null
          equipment_id?: string | null
          floor_level?: number | null
          id?: string
          installation_date?: string | null
          location: string
          manufacturer?: string | null
          metadata?: Json | null
          model?: string | null
          serial_number?: string | null
          site_id?: string | null
          space_id?: string | null
          status?: string | null
          system_id?: string | null
          updated_at?: string | null
          warranty_end?: string | null
          zone?: string | null
        }
        Update: {
          asset_name?: string
          asset_type?: string
          brick_tags?: Json | null
          created_at?: string | null
          equipment_id?: string | null
          floor_level?: number | null
          id?: string
          installation_date?: string | null
          location?: string
          manufacturer?: string | null
          metadata?: Json | null
          model?: string | null
          serial_number?: string | null
          site_id?: string | null
          space_id?: string | null
          status?: string | null
          system_id?: string | null
          updated_at?: string | null
          warranty_end?: string | null
          zone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assets_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_system_id_fkey"
            columns: ["system_id"]
            isOneToOne: false
            referencedRelation: "systems"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance_records: {
        Row: {
          check_in_at: string | null
          check_out_at: string | null
          id: string
          marked_at: string | null
          marked_by: string | null
          status: Database["public"]["Enums"]["attendance_status"]
          user_id: string
          workshop_id: string
        }
        Insert: {
          check_in_at?: string | null
          check_out_at?: string | null
          id?: string
          marked_at?: string | null
          marked_by?: string | null
          status?: Database["public"]["Enums"]["attendance_status"]
          user_id: string
          workshop_id: string
        }
        Update: {
          check_in_at?: string | null
          check_out_at?: string | null
          id?: string
          marked_at?: string | null
          marked_by?: string | null
          status?: Database["public"]["Enums"]["attendance_status"]
          user_id?: string
          workshop_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_records_marked_by_fkey"
            columns: ["marked_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_records_workshop_id_fkey"
            columns: ["workshop_id"]
            isOneToOne: false
            referencedRelation: "workshops"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          entity: string
          entity_id: string | null
          id: string
          metadata: Json | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          entity: string
          entity_id?: string | null
          id?: string
          metadata?: Json | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          entity?: string
          entity_id?: string | null
          id?: string
          metadata?: Json | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      card_comments: {
        Row: {
          board_id: string | null
          card_id: string
          comment: string
          created_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          board_id?: string | null
          card_id: string
          comment: string
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          board_id?: string | null
          card_id?: string
          comment?: string
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "card_comments_board_id_fkey"
            columns: ["board_id"]
            isOneToOne: false
            referencedRelation: "kanban_boards"
            referencedColumns: ["id"]
          },
        ]
      }
      card_labels: {
        Row: {
          board_id: string | null
          color: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          board_id?: string | null
          color: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          board_id?: string | null
          color?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "card_labels_board_id_fkey"
            columns: ["board_id"]
            isOneToOne: false
            referencedRelation: "kanban_boards"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_reports: {
        Row: {
          compliance_standards: string[] | null
          generated_at: string | null
          generated_by: string | null
          id: string
          report_data: Json
          report_period_end: string | null
          report_period_start: string | null
          report_type: string
          status: string | null
        }
        Insert: {
          compliance_standards?: string[] | null
          generated_at?: string | null
          generated_by?: string | null
          id?: string
          report_data: Json
          report_period_end?: string | null
          report_period_start?: string | null
          report_type: string
          status?: string | null
        }
        Update: {
          compliance_standards?: string[] | null
          generated_at?: string | null
          generated_by?: string | null
          id?: string
          report_data?: Json
          report_period_end?: string | null
          report_period_start?: string | null
          report_type?: string
          status?: string | null
        }
        Relationships: []
      }
      content_items: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          file_url: string | null
          id: string
          title: string
          type: Database["public"]["Enums"]["content_item_type"]
          version: number
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          file_url?: string | null
          id?: string
          title: string
          type: Database["public"]["Enums"]["content_item_type"]
          version?: number
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          file_url?: string | null
          id?: string
          title?: string
          type?: Database["public"]["Enums"]["content_item_type"]
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "content_items_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      content_views: {
        Row: {
          content_item_id: string
          id: string
          user_id: string
          viewed_at: string | null
        }
        Insert: {
          content_item_id: string
          id?: string
          user_id: string
          viewed_at?: string | null
        }
        Update: {
          content_item_id?: string
          id?: string
          user_id?: string
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_views_content_item_id_fkey"
            columns: ["content_item_id"]
            isOneToOne: false
            referencedRelation: "content_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      control_commands: {
        Row: {
          approved_by: string | null
          command_type: string
          created_at: string | null
          current_value: number | null
          data_point_id: string | null
          executed_at: string | null
          id: string
          reason: string | null
          requested_by: string
          status: string | null
          target_value: number | null
        }
        Insert: {
          approved_by?: string | null
          command_type: string
          created_at?: string | null
          current_value?: number | null
          data_point_id?: string | null
          executed_at?: string | null
          id?: string
          reason?: string | null
          requested_by: string
          status?: string | null
          target_value?: number | null
        }
        Update: {
          approved_by?: string | null
          command_type?: string
          created_at?: string | null
          current_value?: number | null
          data_point_id?: string | null
          executed_at?: string | null
          id?: string
          reason?: string | null
          requested_by?: string
          status?: string | null
          target_value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "control_commands_data_point_id_fkey"
            columns: ["data_point_id"]
            isOneToOne: false
            referencedRelation: "data_points"
            referencedColumns: ["id"]
          },
        ]
      }
      cv_match: {
        Row: {
          created_at: string | null
          cv_metadata_id: string | null
          id: string
          job_description: string
          job_description_id: string | null
          job_role: string | null
          match_score: number | null
          matched_at: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          cv_metadata_id?: string | null
          id?: string
          job_description: string
          job_description_id?: string | null
          job_role?: string | null
          match_score?: number | null
          matched_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          cv_metadata_id?: string | null
          id?: string
          job_description?: string
          job_description_id?: string | null
          job_role?: string | null
          match_score?: number | null
          matched_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cv_match_cv_metadata_id_fkey"
            columns: ["cv_metadata_id"]
            isOneToOne: false
            referencedRelation: "cv_metadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cv_match_job_description_id_fkey"
            columns: ["job_description_id"]
            isOneToOne: false
            referencedRelation: "job_descriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      cv_metadata: {
        Row: {
          certifications: Json | null
          created_at: string | null
          current_salary: number | null
          cv_content: string | null
          education: string | null
          email: string | null
          expected_salary: number | null
          experience: number | null
          file_url: string | null
          id: string
          license: string | null
          local_singapore_citizen_pr: boolean | null
          location: string | null
          name: string | null
          nationality: string | null
          notice_period: unknown
          phone: string | null
          skills: Json | null
          types_of_work_passes: string | null
        }
        Insert: {
          certifications?: Json | null
          created_at?: string | null
          current_salary?: number | null
          cv_content?: string | null
          education?: string | null
          email?: string | null
          expected_salary?: number | null
          experience?: number | null
          file_url?: string | null
          id?: string
          license?: string | null
          local_singapore_citizen_pr?: boolean | null
          location?: string | null
          name?: string | null
          nationality?: string | null
          notice_period?: unknown
          phone?: string | null
          skills?: Json | null
          types_of_work_passes?: string | null
        }
        Update: {
          certifications?: Json | null
          created_at?: string | null
          current_salary?: number | null
          cv_content?: string | null
          education?: string | null
          email?: string | null
          expected_salary?: number | null
          experience?: number | null
          file_url?: string | null
          id?: string
          license?: string | null
          local_singapore_citizen_pr?: boolean | null
          location?: string | null
          name?: string | null
          nationality?: string | null
          notice_period?: unknown
          phone?: string | null
          skills?: Json | null
          types_of_work_passes?: string | null
        }
        Relationships: []
      }
      data_access_logs: {
        Row: {
          access_details: Json | null
          accessed_at: string | null
          action_type: string
          id: string
          ip_address: string | null
          resource_id: string | null
          resource_type: string
          user_id: string | null
        }
        Insert: {
          access_details?: Json | null
          accessed_at?: string | null
          action_type: string
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type: string
          user_id?: string | null
        }
        Update: {
          access_details?: Json | null
          accessed_at?: string | null
          action_type?: string
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      data_cleaning_jobs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          rules: Json
          source_id: string | null
          stats: Json | null
          status: Database["public"]["Enums"]["data_process_status"] | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          rules: Json
          source_id?: string | null
          stats?: Json | null
          status?: Database["public"]["Enums"]["data_process_status"] | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          rules?: Json
          source_id?: string | null
          stats?: Json | null
          status?: Database["public"]["Enums"]["data_process_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "data_cleaning_jobs_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      data_contracts: {
        Row: {
          created_at: string | null
          distribution_rules: Json | null
          id: string
          name: string
          null_value_threshold: number | null
          schema_definition: Json
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          distribution_rules?: Json | null
          id?: string
          name: string
          null_value_threshold?: number | null
          schema_definition: Json
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          distribution_rules?: Json | null
          id?: string
          name?: string
          null_value_threshold?: number | null
          schema_definition?: Json
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      data_labeling_tasks: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          label_schema: Json
          progress: number | null
          source_id: string | null
          status: Database["public"]["Enums"]["data_process_status"] | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          label_schema: Json
          progress?: number | null
          source_id?: string | null
          status?: Database["public"]["Enums"]["data_process_status"] | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          label_schema?: Json
          progress?: number | null
          source_id?: string | null
          status?: Database["public"]["Enums"]["data_process_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "data_labeling_tasks_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      data_lineage: {
        Row: {
          created_at: string | null
          id: string
          source_id: string | null
          transformation_steps: Json
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          source_id?: string | null
          transformation_steps: Json
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          source_id?: string | null
          transformation_steps?: Json
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "data_lineage_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      data_masking_rules: {
        Row: {
          column_name: string
          created_at: string | null
          id: string
          is_active: boolean | null
          masking_pattern: string | null
          masking_type: string
          table_name: string
          updated_at: string | null
        }
        Insert: {
          column_name: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          masking_pattern?: string | null
          masking_type: string
          table_name: string
          updated_at?: string | null
        }
        Update: {
          column_name?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          masking_pattern?: string | null
          masking_type?: string
          table_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      data_points: {
        Row: {
          asset_id: string | null
          brick_class: string | null
          created_at: string | null
          description: string | null
          id: string
          is_critical: boolean | null
          is_writable: boolean | null
          max_value: number | null
          min_value: number | null
          point_name: string
          point_type: string
          sample_rate: number | null
          unit: string | null
        }
        Insert: {
          asset_id?: string | null
          brick_class?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_critical?: boolean | null
          is_writable?: boolean | null
          max_value?: number | null
          min_value?: number | null
          point_name: string
          point_type: string
          sample_rate?: number | null
          unit?: string | null
        }
        Update: {
          asset_id?: string | null
          brick_class?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_critical?: boolean | null
          is_writable?: boolean | null
          max_value?: number | null
          min_value?: number | null
          point_name?: string
          point_type?: string
          sample_rate?: number | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "data_points_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
      data_quality_alerts: {
        Row: {
          alert_type: string
          created_at: string | null
          description: string
          id: string
          resolution_details: string | null
          resolved_at: string | null
          severity: string
          source_id: string | null
        }
        Insert: {
          alert_type: string
          created_at?: string | null
          description: string
          id?: string
          resolution_details?: string | null
          resolved_at?: string | null
          severity: string
          source_id?: string | null
        }
        Update: {
          alert_type?: string
          created_at?: string | null
          description?: string
          id?: string
          resolution_details?: string | null
          resolved_at?: string | null
          severity?: string
          source_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "data_quality_alerts_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      data_sources: {
        Row: {
          connection_details: Json | null
          created_at: string | null
          id: string
          name: string
          source_type: string
          updated_at: string | null
        }
        Insert: {
          connection_details?: Json | null
          created_at?: string | null
          id?: string
          name: string
          source_type: string
          updated_at?: string | null
        }
        Update: {
          connection_details?: Json | null
          created_at?: string | null
          id?: string
          name?: string
          source_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      document_embeddings: {
        Row: {
          chunk_id: string
          content: string
          created_at: string | null
          document_id: string | null
          embedding: string | null
          embedding_model_id: string
          id: string
          metadata: Json | null
        }
        Insert: {
          chunk_id: string
          content: string
          created_at?: string | null
          document_id?: string | null
          embedding?: string | null
          embedding_model_id: string
          id?: string
          metadata?: Json | null
        }
        Update: {
          chunk_id?: string
          content?: string
          created_at?: string | null
          document_id?: string | null
          embedding?: string | null
          embedding_model_id?: string
          id?: string
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "document_embeddings_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "knowledge_base_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_embeddings_embedding_model_id_fkey"
            columns: ["embedding_model_id"]
            isOneToOne: false
            referencedRelation: "embedding_models"
            referencedColumns: ["id"]
          },
        ]
      }
      document_processing_jobs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          extracted_content: Json | null
          file_id: string
          id: string
          metadata: Json | null
          processing_type: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          extracted_content?: Json | null
          file_id: string
          id?: string
          metadata?: Json | null
          processing_type?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          extracted_content?: Json | null
          file_id?: string
          id?: string
          metadata?: Json | null
          processing_type?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_processing_jobs_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "knowledge_base_files"
            referencedColumns: ["id"]
          },
        ]
      }
      domain_models: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          edges: Json
          entities: Json
          id: string
          name: string
          nodes: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          edges?: Json
          entities?: Json
          id?: string
          name: string
          nodes?: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          edges?: Json
          entities?: Json
          id?: string
          name?: string
          nodes?: Json
          updated_at?: string
        }
        Relationships: []
      }
      embedding_models: {
        Row: {
          configuration: Json | null
          created_at: string | null
          dimensions: number
          id: string
          is_active: boolean | null
          model_identifier: string
          name: string
          provider: string
        }
        Insert: {
          configuration?: Json | null
          created_at?: string | null
          dimensions: number
          id?: string
          is_active?: boolean | null
          model_identifier: string
          name: string
          provider: string
        }
        Update: {
          configuration?: Json | null
          created_at?: string | null
          dimensions?: number
          id?: string
          is_active?: boolean | null
          model_identifier?: string
          name?: string
          provider?: string
        }
        Relationships: []
      }
      employer_profiles: {
        Row: {
          alternate_contact: Json | null
          company_name: string
          contact_person: string
          country: string
          created_at: string | null
          designation: string
          email: string
          id: string
          industry: string
          is_approved: boolean | null
          is_verified: boolean | null
          phone: string
          profile_completion: number | null
          registration_number: string
          state: string
          sub_industry: string
          sub_sub_industry: string
          updated_at: string | null
          user_id: string | null
          verification_expires_at: string | null
          verification_token: string | null
        }
        Insert: {
          alternate_contact?: Json | null
          company_name: string
          contact_person: string
          country: string
          created_at?: string | null
          designation: string
          email: string
          id?: string
          industry: string
          is_approved?: boolean | null
          is_verified?: boolean | null
          phone: string
          profile_completion?: number | null
          registration_number: string
          state: string
          sub_industry: string
          sub_sub_industry: string
          updated_at?: string | null
          user_id?: string | null
          verification_expires_at?: string | null
          verification_token?: string | null
        }
        Update: {
          alternate_contact?: Json | null
          company_name?: string
          contact_person?: string
          country?: string
          created_at?: string | null
          designation?: string
          email?: string
          id?: string
          industry?: string
          is_approved?: boolean | null
          is_verified?: boolean | null
          phone?: string
          profile_completion?: number | null
          registration_number?: string
          state?: string
          sub_industry?: string
          sub_sub_industry?: string
          updated_at?: string | null
          user_id?: string | null
          verification_expires_at?: string | null
          verification_token?: string | null
        }
        Relationships: []
      }
      entity_definitions: {
        Row: {
          created_at: string | null
          description: string | null
          display_name: string
          entity_type: string
          id: string
          ontology_id: string | null
          properties_schema: Json | null
          validation_rules: Json | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_name: string
          entity_type: string
          id?: string
          ontology_id?: string | null
          properties_schema?: Json | null
          validation_rules?: Json | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_name?: string
          entity_type?: string
          id?: string
          ontology_id?: string | null
          properties_schema?: Json | null
          validation_rules?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "entity_definitions_ontology_id_fkey"
            columns: ["ontology_id"]
            isOneToOne: false
            referencedRelation: "ontologies"
            referencedColumns: ["id"]
          },
        ]
      }
      entity_document_links: {
        Row: {
          confidence_score: number | null
          created_at: string
          created_by: string | null
          document_id: string
          entity_id: string
          entity_type: string
          id: string
          link_type: string | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          created_by?: string | null
          document_id: string
          entity_id: string
          entity_type: string
          id?: string
          link_type?: string | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          created_by?: string | null
          document_id?: string
          entity_id?: string
          entity_type?: string
          id?: string
          link_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entity_document_links_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "knowledge_base_files"
            referencedColumns: ["id"]
          },
        ]
      }
      external_id_mappings: {
        Row: {
          created_at: string
          created_by: string | null
          entity_id: string
          entity_type: string
          external_id: string
          external_system: string
          id: string
          source_type: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          entity_id: string
          entity_type: string
          external_id: string
          external_system: string
          id?: string
          source_type?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          entity_id?: string
          entity_type?: string
          external_id?: string
          external_system?: string
          id?: string
          source_type?: string | null
        }
        Relationships: []
      }
      feature_engineering_jobs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          features: Json
          id: string
          source_id: string | null
          status: Database["public"]["Enums"]["data_process_status"] | null
          transformations: Json | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          features: Json
          id?: string
          source_id?: string | null
          status?: Database["public"]["Enums"]["data_process_status"] | null
          transformations?: Json | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          features?: Json
          id?: string
          source_id?: string | null
          status?: Database["public"]["Enums"]["data_process_status"] | null
          transformations?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "feature_engineering_jobs_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_store: {
        Row: {
          created_at: string | null
          description: string | null
          feature_name: string
          feature_type: string
          id: string
          last_updated: string | null
          metadata: Json | null
          updated_at: string | null
          validation_rules: Json | null
          version: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          feature_name: string
          feature_type: string
          id?: string
          last_updated?: string | null
          metadata?: Json | null
          updated_at?: string | null
          validation_rules?: Json | null
          version?: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          feature_name?: string
          feature_type?: string
          id?: string
          last_updated?: string | null
          metadata?: Json | null
          updated_at?: string | null
          validation_rules?: Json | null
          version?: string
        }
        Relationships: []
      }
      graph_edges: {
        Row: {
          created_at: string | null
          created_by: string
          id: string
          metadata: Json | null
          ontology_id: string
          properties: Json | null
          relationship_type: string
          saved_graph_id: string | null
          source_node_id: string | null
          strength: number | null
          target_node_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          id?: string
          metadata?: Json | null
          ontology_id: string
          properties?: Json | null
          relationship_type: string
          saved_graph_id?: string | null
          source_node_id?: string | null
          strength?: number | null
          target_node_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          id?: string
          metadata?: Json | null
          ontology_id?: string
          properties?: Json | null
          relationship_type?: string
          saved_graph_id?: string | null
          source_node_id?: string | null
          strength?: number | null
          target_node_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "graph_edges_ontology_id_fkey"
            columns: ["ontology_id"]
            isOneToOne: false
            referencedRelation: "ontologies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "graph_edges_source_node_id_fkey"
            columns: ["source_node_id"]
            isOneToOne: false
            referencedRelation: "graph_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "graph_edges_target_node_id_fkey"
            columns: ["target_node_id"]
            isOneToOne: false
            referencedRelation: "graph_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      graph_nodes: {
        Row: {
          created_at: string | null
          created_by: string
          entity_id: string
          entity_type: string
          id: string
          metadata: Json | null
          ontology_id: string
          properties: Json | null
          saved_graph_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          entity_id: string
          entity_type: string
          id?: string
          metadata?: Json | null
          ontology_id: string
          properties?: Json | null
          saved_graph_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          entity_id?: string
          entity_type?: string
          id?: string
          metadata?: Json | null
          ontology_id?: string
          properties?: Json | null
          saved_graph_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "graph_nodes_ontology_id_fkey"
            columns: ["ontology_id"]
            isOneToOne: false
            referencedRelation: "ontologies"
            referencedColumns: ["id"]
          },
        ]
      }
      job_descriptions: {
        Row: {
          agent_id: string | null
          benefits: string | null
          company_name: string | null
          created_at: string | null
          employer_profile_id: string | null
          file_name: string | null
          file_type: string | null
          file_url: string | null
          id: string
          job_requirements: string | null
          job_title: string | null
          location: string | null
          original_text: string
          salary_range: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          agent_id?: string | null
          benefits?: string | null
          company_name?: string | null
          created_at?: string | null
          employer_profile_id?: string | null
          file_name?: string | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          job_requirements?: string | null
          job_title?: string | null
          location?: string | null
          original_text: string
          salary_range?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          agent_id?: string | null
          benefits?: string | null
          company_name?: string | null
          created_at?: string | null
          employer_profile_id?: string | null
          file_name?: string | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          job_requirements?: string | null
          job_title?: string | null
          location?: string | null
          original_text?: string
          salary_range?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_descriptions_employer_profile_id_fkey"
            columns: ["employer_profile_id"]
            isOneToOne: false
            referencedRelation: "employer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          company: string
          created_at: string
          description: string
          id: string
          location: string
          requirements: string
          salary: string
          title: string
        }
        Insert: {
          company: string
          created_at?: string
          description: string
          id?: string
          location: string
          requirements: string
          salary: string
          title: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string
          id?: string
          location?: string
          requirements?: string
          salary?: string
          title?: string
        }
        Relationships: []
      }
      kanban_boards: {
        Row: {
          board_data: Json
          created_at: string | null
          id: string
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          board_data?: Json
          created_at?: string | null
          id?: string
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          board_data?: Json
          created_at?: string | null
          id?: string
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      knowledge_base_files: {
        Row: {
          about_entity_ids: Json | null
          chunk_method: string | null
          chunk_number: number | null
          created_at: string | null
          enabled: boolean | null
          file_path: string
          filename: string
          id: string
          parsing_status: string | null
          updated_at: string | null
          upload_date: string | null
          user_id: string | null
        }
        Insert: {
          about_entity_ids?: Json | null
          chunk_method?: string | null
          chunk_number?: number | null
          created_at?: string | null
          enabled?: boolean | null
          file_path: string
          filename: string
          id?: string
          parsing_status?: string | null
          updated_at?: string | null
          upload_date?: string | null
          user_id?: string | null
        }
        Update: {
          about_entity_ids?: Json | null
          chunk_method?: string | null
          chunk_number?: number | null
          created_at?: string | null
          enabled?: boolean | null
          file_path?: string
          filename?: string
          id?: string
          parsing_status?: string | null
          updated_at?: string | null
          upload_date?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      knowledge_bases: {
        Row: {
          chunk_size: number | null
          created_at: string | null
          description: string | null
          embedding_model: string | null
          id: string
          last_sync: string | null
          metadata: Json | null
          name: string
          source_type: string
          updated_at: string | null
          validation_status: string | null
        }
        Insert: {
          chunk_size?: number | null
          created_at?: string | null
          description?: string | null
          embedding_model?: string | null
          id?: string
          last_sync?: string | null
          metadata?: Json | null
          name: string
          source_type: string
          updated_at?: string | null
          validation_status?: string | null
        }
        Update: {
          chunk_size?: number | null
          created_at?: string | null
          description?: string | null
          embedding_model?: string | null
          id?: string
          last_sync?: string | null
          metadata?: Json | null
          name?: string
          source_type?: string
          updated_at?: string | null
          validation_status?: string | null
        }
        Relationships: []
      }
      model_validations: {
        Row: {
          id: string
          issues_found: Json | null
          metrics: Json
          model_id: string | null
          status: string | null
          validation_dataset: string | null
          validation_date: string | null
          validation_type: string
        }
        Insert: {
          id?: string
          issues_found?: Json | null
          metrics: Json
          model_id?: string | null
          status?: string | null
          validation_dataset?: string | null
          validation_date?: string | null
          validation_type: string
        }
        Update: {
          id?: string
          issues_found?: Json | null
          metrics?: Json
          model_id?: string | null
          status?: string | null
          validation_dataset?: string | null
          validation_date?: string | null
          validation_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "model_validations_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "ai_models"
            referencedColumns: ["id"]
          },
        ]
      }
      monitoring_alerts: {
        Row: {
          acknowledged_by: string | null
          alert_type: string
          id: string
          message: string
          metric_id: string | null
          resolution_details: string | null
          resolved_at: string | null
          severity: string
          status: string | null
          triggered_at: string | null
        }
        Insert: {
          acknowledged_by?: string | null
          alert_type: string
          id?: string
          message: string
          metric_id?: string | null
          resolution_details?: string | null
          resolved_at?: string | null
          severity: string
          status?: string | null
          triggered_at?: string | null
        }
        Update: {
          acknowledged_by?: string | null
          alert_type?: string
          id?: string
          message?: string
          metric_id?: string | null
          resolution_details?: string | null
          resolved_at?: string | null
          severity?: string
          status?: string | null
          triggered_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "monitoring_alerts_metric_id_fkey"
            columns: ["metric_id"]
            isOneToOne: false
            referencedRelation: "monitoring_metrics"
            referencedColumns: ["id"]
          },
        ]
      }
      monitoring_integrations: {
        Row: {
          config: Json
          created_at: string | null
          credentials: Json | null
          id: string
          integration_type: string
          is_active: boolean | null
          last_sync_at: string | null
          webhook_url: string | null
        }
        Insert: {
          config: Json
          created_at?: string | null
          credentials?: Json | null
          id?: string
          integration_type: string
          is_active?: boolean | null
          last_sync_at?: string | null
          webhook_url?: string | null
        }
        Update: {
          config?: Json
          created_at?: string | null
          credentials?: Json | null
          id?: string
          integration_type?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          webhook_url?: string | null
        }
        Relationships: []
      }
      monitoring_metrics: {
        Row: {
          alert_threshold: number | null
          alert_triggered: boolean | null
          id: string
          metric_name: string
          metric_type: string
          metric_value: number
          source: string
          timestamp: string | null
        }
        Insert: {
          alert_threshold?: number | null
          alert_triggered?: boolean | null
          id?: string
          metric_name: string
          metric_type: string
          metric_value: number
          source: string
          timestamp?: string | null
        }
        Update: {
          alert_threshold?: number | null
          alert_triggered?: boolean | null
          id?: string
          metric_name?: string
          metric_type?: string
          metric_value?: number
          source?: string
          timestamp?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          id: string
          sent_at: string | null
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
          workshop_id: string
        }
        Insert: {
          id?: string
          sent_at?: string | null
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
          workshop_id: string
        }
        Update: {
          id?: string
          sent_at?: string | null
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
          workshop_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_workshop_id_fkey"
            columns: ["workshop_id"]
            isOneToOne: false
            referencedRelation: "workshops"
            referencedColumns: ["id"]
          },
        ]
      }
      ontologies: {
        Row: {
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          is_active: boolean | null
          is_system: boolean | null
          name: string
          plugin_id: string | null
          schema_definition: Json
          updated_at: string | null
          version: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_system?: boolean | null
          name: string
          plugin_id?: string | null
          schema_definition?: Json
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_system?: boolean | null
          name?: string
          plugin_id?: string | null
          schema_definition?: Json
          updated_at?: string | null
          version?: string | null
        }
        Relationships: []
      }
      pipeline_configurations: {
        Row: {
          configuration: Json
          created_at: string | null
          id: string
          name: string
          status: string | null
          tool_type: string
          updated_at: string | null
          validation_scripts: Json | null
        }
        Insert: {
          configuration: Json
          created_at?: string | null
          id?: string
          name: string
          status?: string | null
          tool_type: string
          updated_at?: string | null
          validation_scripts?: Json | null
        }
        Update: {
          configuration?: Json
          created_at?: string | null
          id?: string
          name?: string
          status?: string | null
          tool_type?: string
          updated_at?: string | null
          validation_scripts?: Json | null
        }
        Relationships: []
      }
      pipeline_executions: {
        Row: {
          end_time: string | null
          execution_logs: Json | null
          id: string
          pipeline_id: string | null
          start_time: string | null
          status: string
          validation_results: Json | null
          version_id: string | null
        }
        Insert: {
          end_time?: string | null
          execution_logs?: Json | null
          id?: string
          pipeline_id?: string | null
          start_time?: string | null
          status: string
          validation_results?: Json | null
          version_id?: string | null
        }
        Update: {
          end_time?: string | null
          execution_logs?: Json | null
          id?: string
          pipeline_id?: string | null
          start_time?: string | null
          status?: string
          validation_results?: Json | null
          version_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_executions_pipeline_id_fkey"
            columns: ["pipeline_id"]
            isOneToOne: false
            referencedRelation: "pipeline_configurations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pipeline_executions_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "pipeline_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      pipeline_versions: {
        Row: {
          changes_description: string | null
          configuration_snapshot: Json
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          pipeline_id: string | null
          version_number: number
        }
        Insert: {
          changes_description?: string | null
          configuration_snapshot: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          pipeline_id?: string | null
          version_number: number
        }
        Update: {
          changes_description?: string | null
          configuration_snapshot?: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          pipeline_id?: string | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_versions_pipeline_id_fkey"
            columns: ["pipeline_id"]
            isOneToOne: false
            referencedRelation: "pipeline_configurations"
            referencedColumns: ["id"]
          },
        ]
      }
      plugins: {
        Row: {
          author: string | null
          configuration: Json | null
          created_at: string | null
          dependencies: Json | null
          description: string | null
          display_name: string
          id: string
          installation_status: string | null
          installed_at: string | null
          installed_by: string | null
          manifest: Json
          name: string
          package_url: string | null
          updated_at: string | null
          user_id: string | null
          version: string
        }
        Insert: {
          author?: string | null
          configuration?: Json | null
          created_at?: string | null
          dependencies?: Json | null
          description?: string | null
          display_name: string
          id?: string
          installation_status?: string | null
          installed_at?: string | null
          installed_by?: string | null
          manifest?: Json
          name: string
          package_url?: string | null
          updated_at?: string | null
          user_id?: string | null
          version: string
        }
        Update: {
          author?: string | null
          configuration?: Json | null
          created_at?: string | null
          dependencies?: Json | null
          description?: string | null
          display_name?: string
          id?: string
          installation_status?: string | null
          installed_at?: string | null
          installed_by?: string | null
          manifest?: Json
          name?: string
          package_url?: string | null
          updated_at?: string | null
          user_id?: string | null
          version?: string
        }
        Relationships: []
      }
      policy_enforcement: {
        Row: {
          created_at: string
          decision_metadata: Json | null
          enforcement_action: string
          execution_time_ms: number | null
          id: string
          policy_id: string
          policy_name: string
          request_metadata: Json | null
        }
        Insert: {
          created_at?: string
          decision_metadata?: Json | null
          enforcement_action: string
          execution_time_ms?: number | null
          id?: string
          policy_id: string
          policy_name: string
          request_metadata?: Json | null
        }
        Update: {
          created_at?: string
          decision_metadata?: Json | null
          enforcement_action?: string
          execution_time_ms?: number | null
          id?: string
          policy_id?: string
          policy_name?: string
          request_metadata?: Json | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          department: string | null
          email: string | null
          first_name: string | null
          id: string
          job_title: string | null
          last_name: string | null
          name: string | null
          organization: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          job_title?: string | null
          last_name?: string | null
          name?: string | null
          organization?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          job_title?: string | null
          last_name?: string | null
          name?: string | null
          organization?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          username?: string | null
        }
        Relationships: []
      }
      query_logs: {
        Row: {
          context_documents: Json | null
          created_at: string
          id: string
          processing_time_ms: number | null
          query_text: string
          response_text: string | null
          similarity_threshold: number | null
          user_id: string | null
        }
        Insert: {
          context_documents?: Json | null
          created_at?: string
          id?: string
          processing_time_ms?: number | null
          query_text: string
          response_text?: string | null
          similarity_threshold?: number | null
          user_id?: string | null
        }
        Update: {
          context_documents?: Json | null
          created_at?: string
          id?: string
          processing_time_ms?: number | null
          query_text?: string
          response_text?: string | null
          similarity_threshold?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      registry_adapters: {
        Row: {
          configuration: Json | null
          created_at: string
          endpoint_url: string
          id: string
          last_response_time: number | null
          last_sync_at: string | null
          metadata: Json | null
          registry_name: string
          registry_type: string
          status: string
          updated_at: string
        }
        Insert: {
          configuration?: Json | null
          created_at?: string
          endpoint_url: string
          id?: string
          last_response_time?: number | null
          last_sync_at?: string | null
          metadata?: Json | null
          registry_name: string
          registry_type: string
          status?: string
          updated_at?: string
        }
        Update: {
          configuration?: Json | null
          created_at?: string
          endpoint_url?: string
          id?: string
          last_response_time?: number | null
          last_sync_at?: string | null
          metadata?: Json | null
          registry_name?: string
          registry_type?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      relationship_definitions: {
        Row: {
          created_at: string | null
          description: string | null
          display_name: string
          id: string
          ontology_id: string | null
          properties_schema: Json | null
          relationship_type: string
          source_entity_type: string
          target_entity_type: string
          validation_rules: Json | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_name: string
          id?: string
          ontology_id?: string | null
          properties_schema?: Json | null
          relationship_type: string
          source_entity_type: string
          target_entity_type: string
          validation_rules?: Json | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_name?: string
          id?: string
          ontology_id?: string | null
          properties_schema?: Json | null
          relationship_type?: string
          source_entity_type?: string
          target_entity_type?: string
          validation_rules?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "relationship_definitions_ontology_id_fkey"
            columns: ["ontology_id"]
            isOneToOne: false
            referencedRelation: "ontologies"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_graphs: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          edge_count: number | null
          id: string
          metadata: Json | null
          name: string
          node_count: number | null
          ontology_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          edge_count?: number | null
          id?: string
          metadata?: Json | null
          name: string
          node_count?: number | null
          ontology_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          edge_count?: number | null
          id?: string
          metadata?: Json | null
          name?: string
          node_count?: number | null
          ontology_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      schema_versions: {
        Row: {
          created_at: string | null
          drift_details: Json | null
          drift_detected: boolean | null
          id: string
          is_current: boolean | null
          schema_snapshot: Json
          source_id: string | null
          version_number: number
        }
        Insert: {
          created_at?: string | null
          drift_details?: Json | null
          drift_detected?: boolean | null
          id?: string
          is_current?: boolean | null
          schema_snapshot: Json
          source_id?: string | null
          version_number: number
        }
        Update: {
          created_at?: string | null
          drift_details?: Json | null
          drift_detected?: boolean | null
          id?: string
          is_current?: boolean | null
          schema_snapshot?: Json
          source_id?: string | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "schema_versions_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "data_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      sensors: {
        Row: {
          asset_id: string | null
          created_at: string
          created_by: string | null
          id: string
          name: string
          sensor_type: string | null
          unit: string
          updated_at: string
        }
        Insert: {
          asset_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
          sensor_type?: string | null
          unit: string
          updated_at?: string
        }
        Update: {
          asset_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          sensor_type?: string | null
          unit?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sensors_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
      sites: {
        Row: {
          address: string | null
          country: string
          created_at: string
          created_by: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          country: string
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          country?: string
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      spaces: {
        Row: {
          category: string | null
          created_at: string
          created_by: string | null
          id: string
          level: string | null
          name: string
          site_id: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          level?: string | null
          name: string
          site_id: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          level?: string | null
          name?: string
          site_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "spaces_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      system_metrics: {
        Row: {
          id: string
          metadata: Json | null
          metric_name: string
          metric_value: number
          target_value: number | null
          timestamp: string
          unit: string | null
        }
        Insert: {
          id?: string
          metadata?: Json | null
          metric_name: string
          metric_value: number
          target_value?: number | null
          timestamp?: string
          unit?: string | null
        }
        Update: {
          id?: string
          metadata?: Json | null
          metric_name?: string
          metric_value?: number
          target_value?: number | null
          timestamp?: string
          unit?: string | null
        }
        Relationships: []
      }
      systems: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          name: string
          site_id: string
          system_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
          site_id: string
          system_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          site_id?: string
          system_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "systems_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      telemetry: {
        Row: {
          data_point_id: string | null
          id: number
          metadata: Json | null
          quality: string | null
          timestamp_utc: string
          value: number
        }
        Insert: {
          data_point_id?: string | null
          id?: number
          metadata?: Json | null
          quality?: string | null
          timestamp_utc?: string
          value: number
        }
        Update: {
          data_point_id?: string | null
          id?: number
          metadata?: Json | null
          quality?: string | null
          timestamp_utc?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "telemetry_data_point_id_fkey"
            columns: ["data_point_id"]
            isOneToOne: false
            referencedRelation: "data_points"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          department: string | null
          email: string
          id: string
          name: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email: string
          id: string
          name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string
          id?: string
          name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      validation_results: {
        Row: {
          created_at: string | null
          details: Json | null
          id: string
          message: string | null
          rule_name: string
          rule_set_id: string | null
          status: string
          target_id: string
          target_type: string
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          id?: string
          message?: string | null
          rule_name: string
          rule_set_id?: string | null
          status: string
          target_id: string
          target_type: string
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          id?: string
          message?: string | null
          rule_name?: string
          rule_set_id?: string | null
          status?: string
          target_id?: string
          target_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "validation_results_rule_set_id_fkey"
            columns: ["rule_set_id"]
            isOneToOne: false
            referencedRelation: "validation_rule_sets"
            referencedColumns: ["id"]
          },
        ]
      }
      validation_rule_sets: {
        Row: {
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          ontology_id: string | null
          plugin_id: string | null
          priority: number | null
          rules: Json
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          ontology_id?: string | null
          plugin_id?: string | null
          priority?: number | null
          rules?: Json
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          ontology_id?: string | null
          plugin_id?: string | null
          priority?: number | null
          rules?: Json
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "validation_rule_sets_ontology_id_fkey"
            columns: ["ontology_id"]
            isOneToOne: false
            referencedRelation: "ontologies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "validation_rule_sets_plugin_id_fkey"
            columns: ["plugin_id"]
            isOneToOne: false
            referencedRelation: "plugins"
            referencedColumns: ["id"]
          },
        ]
      }
      work_orders: {
        Row: {
          actual_hours: number | null
          ai_generated: boolean | null
          alarm_id: string | null
          asset_id: string | null
          assigned_to: string | null
          attachments: Json | null
          completed_at: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          due_date: string | null
          estimated_hours: number | null
          id: string
          priority: string | null
          status: string | null
          telemetry_snapshot: Json | null
          title: string
          updated_at: string | null
          work_order_number: string
        }
        Insert: {
          actual_hours?: number | null
          ai_generated?: boolean | null
          alarm_id?: string | null
          asset_id?: string | null
          assigned_to?: string | null
          attachments?: Json | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          estimated_hours?: number | null
          id?: string
          priority?: string | null
          status?: string | null
          telemetry_snapshot?: Json | null
          title: string
          updated_at?: string | null
          work_order_number: string
        }
        Update: {
          actual_hours?: number | null
          ai_generated?: boolean | null
          alarm_id?: string | null
          asset_id?: string | null
          assigned_to?: string | null
          attachments?: Json | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          estimated_hours?: number | null
          id?: string
          priority?: string | null
          status?: string | null
          telemetry_snapshot?: Json | null
          title?: string
          updated_at?: string | null
          work_order_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_orders_alarm_id_fkey"
            columns: ["alarm_id"]
            isOneToOne: false
            referencedRelation: "alarms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_orders_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
      workshop_contents: {
        Row: {
          content_item_id: string
          id: string
          order: number
          workshop_id: string
        }
        Insert: {
          content_item_id: string
          id?: string
          order: number
          workshop_id: string
        }
        Update: {
          content_item_id?: string
          id?: string
          order?: number
          workshop_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workshop_contents_content_item_id_fkey"
            columns: ["content_item_id"]
            isOneToOne: false
            referencedRelation: "content_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workshop_contents_workshop_id_fkey"
            columns: ["workshop_id"]
            isOneToOne: false
            referencedRelation: "workshops"
            referencedColumns: ["id"]
          },
        ]
      }
      workshop_registrations: {
        Row: {
          attended: boolean | null
          id: string
          registered_at: string | null
          status: string
          user_id: string | null
          workshop_id: string | null
        }
        Insert: {
          attended?: boolean | null
          id?: string
          registered_at?: string | null
          status?: string
          user_id?: string | null
          workshop_id?: string | null
        }
        Update: {
          attended?: boolean | null
          id?: string
          registered_at?: string | null
          status?: string
          user_id?: string | null
          workshop_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workshop_registrations_workshop_id_fkey"
            columns: ["workshop_id"]
            isOneToOne: false
            referencedRelation: "workshops"
            referencedColumns: ["id"]
          },
        ]
      }
      workshops: {
        Row: {
          capacity: number
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string
          id: string
          instructor_id: string | null
          location: string | null
          prerequisites: string | null
          start_date: string
          status: Database["public"]["Enums"]["workshop_status"]
          tags: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          capacity?: number
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date: string
          id?: string
          instructor_id?: string | null
          location?: string | null
          prerequisites?: string | null
          start_date: string
          status?: Database["public"]["Enums"]["workshop_status"]
          tags?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          capacity?: number
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string
          id?: string
          instructor_id?: string | null
          location?: string | null
          prerequisites?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["workshop_status"]
          tags?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workshops_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_password_security_settings: { Args: never; Returns: string }
      has_role: { Args: { _role: string; _user_id: string }; Returns: boolean }
      insert_job_description: {
        Args: {
          p_extracted_role: Json
          p_file_name: string
          p_file_type: string
          p_file_url: string
          p_original_text: string
        }
        Returns: string
      }
      search_similar_documents: {
        Args: {
          filter_user_id?: string
          match_count?: number
          match_threshold?: number
          query_embedding: string
        }
        Returns: {
          content: string
          id: string
          metadata: Json
          similarity: number
        }[]
      }
    }
    Enums: {
      attendance_status: "registered" | "checked_in" | "checked_out" | "absent"
      card_priority: "low" | "medium" | "high"
      content_item_type: "slide" | "guide" | "exercise"
      data_process_status: "pending" | "in_progress" | "completed" | "failed"
      model_type: "rag" | "classification" | "generation" | "embedding"
      notification_type: "confirmation" | "reminder" | "new_content" | "no_show"
      profile_status: "pending" | "verified" | "rejected"
      registration_status: "registered" | "cancelled"
      user_role: "admin" | "trainer" | "learner"
      workshop_status: "draft" | "published" | "cancelled" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      attendance_status: ["registered", "checked_in", "checked_out", "absent"],
      card_priority: ["low", "medium", "high"],
      content_item_type: ["slide", "guide", "exercise"],
      data_process_status: ["pending", "in_progress", "completed", "failed"],
      model_type: ["rag", "classification", "generation", "embedding"],
      notification_type: ["confirmation", "reminder", "new_content", "no_show"],
      profile_status: ["pending", "verified", "rejected"],
      registration_status: ["registered", "cancelled"],
      user_role: ["admin", "trainer", "learner"],
      workshop_status: ["draft", "published", "cancelled", "completed"],
    },
  },
} as const
