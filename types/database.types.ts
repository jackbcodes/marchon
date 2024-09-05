export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      exercises: {
        Row: {
          created_at: string;
          exercise_order: number;
          id: number;
          name: string;
          one_rep_max_percentage: number | null;
          one_rep_max_weight: number | null;
          type: string;
          workout_id: number;
        };
        Insert: {
          created_at?: string;
          exercise_order: number;
          id?: number;
          name: string;
          one_rep_max_percentage?: number | null;
          one_rep_max_weight?: number | null;
          type: string;
          workout_id: number;
        };
        Update: {
          created_at?: string;
          exercise_order?: number;
          id?: number;
          name?: string;
          one_rep_max_percentage?: number | null;
          one_rep_max_weight?: number | null;
          type?: string;
          workout_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "exercises_workout_id_fkey";
            columns: ["workout_id"];
            isOneToOne: false;
            referencedRelation: "workouts";
            referencedColumns: ["id"];
          },
        ];
      };
      sets: {
        Row: {
          achieved_calories: number | null;
          achieved_distance: number | null;
          achieved_reps: number | null;
          achieved_weight: number | null;
          created_at: string;
          exercise_id: number;
          id: number;
          is_completed: boolean;
          set_order: number;
          target_calories: number | null;
          target_distance: number | null;
          target_reps: number | null;
          target_weight: number | null;
          workout_id: number;
        };
        Insert: {
          achieved_calories?: number | null;
          achieved_distance?: number | null;
          achieved_reps?: number | null;
          achieved_weight?: number | null;
          created_at?: string;
          exercise_id: number;
          id?: number;
          is_completed?: boolean;
          set_order: number;
          target_calories?: number | null;
          target_distance?: number | null;
          target_reps?: number | null;
          target_weight?: number | null;
          workout_id: number;
        };
        Update: {
          achieved_calories?: number | null;
          achieved_distance?: number | null;
          achieved_reps?: number | null;
          achieved_weight?: number | null;
          created_at?: string;
          exercise_id?: number;
          id?: number;
          is_completed?: boolean;
          set_order?: number;
          target_calories?: number | null;
          target_distance?: number | null;
          target_reps?: number | null;
          target_weight?: number | null;
          workout_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "sets_exercise_id_fkey";
            columns: ["exercise_id"];
            isOneToOne: false;
            referencedRelation: "exercises";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sets_workout_id_fkey";
            columns: ["workout_id"];
            isOneToOne: false;
            referencedRelation: "workouts";
            referencedColumns: ["id"];
          },
        ];
      };
      workouts: {
        Row: {
          created_at: string;
          id: number;
          is_completed: boolean;
          is_started: boolean;
          name: string;
          notes: string;
          workout_order: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          is_completed?: boolean;
          is_started?: boolean;
          name: string;
          notes: string;
          workout_order?: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          is_completed?: boolean;
          is_started?: boolean;
          name?: string;
          notes?: string;
          workout_order?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
