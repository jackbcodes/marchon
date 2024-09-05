import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, PostgrestError, QueryData } from "@supabase/supabase-js";

import { Database } from "@/types/database.types";

if (!process.env.EXPO_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing EXPO_PUBLIC_SUPABASE_URL");
}

if (!process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Missing EXPO_PUBLIC_SUPABASE_URL");
}

export const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);

// This could be made more performant by only selecting the fields we need, but for time's sake, we'll just select everything
export const workoutsQuery = supabase
  .from("workouts")
  .select("*, exercises(*, sets(*))")
  .order("workout_order")
  .order("exercise_order", { referencedTable: "exercises" })
  .order("set_order", { referencedTable: "exercises.sets" });

export type Workouts = QueryData<typeof workoutsQuery>;

export type Workout = Workouts[number];

export type Exercises = Workouts[number]["exercises"];

export type Exercise = Workouts[number]["exercises"][number];

export type Sets = Workouts[number]["exercises"][number]["sets"];

export type Set = Workouts[number]["exercises"][number]["sets"][number];

export function isPostgrestError(error: any): error is PostgrestError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "details" in error &&
    "hint" in error &&
    "code" in error
  );
}
