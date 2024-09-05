import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";

import { useLocalSearchParams } from "expo-router";

import { EXERCISES, SETS, WORKOUTS } from "@/constants/seed";
import { Database } from "@/types/database.types";
import {
  isPostgrestError,
  supabase,
  Workouts,
  workoutsQuery,
} from "@/utils/supabase";

interface StoreContextValue {
  workouts: Workouts;
  completeSet: (
    id: number,
    set: Database["public"]["Tables"]["sets"]["Update"],
  ) => Promise<void>;
  updateOneRepMaxWeight: (id: number, weight: number) => Promise<void>;
  completeWorkout: (id: number) => Promise<void>;
  startWorkout: (id: number) => Promise<void>;
  resetWorkouts: () => Promise<void>;
}

const StoreContext = createContext<StoreContextValue>({
  workouts: [],
  completeSet: async () => {},
  updateOneRepMaxWeight: async () => {},
  completeWorkout: async () => {},
  startWorkout: async () => {},
  resetWorkouts: async () => {},
});

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [workouts, setWorkouts] = useState<Workouts>([]);

  async function fetchWorkouts() {
    try {
      const { data, error } = await workoutsQuery;

      if (error) throw error;

      setWorkouts(data);
    } catch (error) {
      if (isPostgrestError(error)) {
        Alert.alert(error.message);
        return;
      }
      Alert.alert("Error fetching workouts");
    }
  }

  async function completeSet(
    id: number,
    set: Database["public"]["Tables"]["sets"]["Update"],
  ) {
    try {
      const updateOneResult = await supabase
        .from("sets")
        .update({
          ...set,
          is_completed: true,
        })
        .eq("id", id)
        .select()
        .single();

      if (updateOneResult.error) throw updateOneResult.error;

      let updateManyData;

      if (
        updateOneResult.data.achieved_reps &&
        updateOneResult.data.achieved_weight
      ) {
        updateManyData = {
          target_reps: updateOneResult.data.achieved_reps,
          target_weight: updateOneResult.data.achieved_weight,
        };
      } else if (updateOneResult.data.achieved_reps) {
        updateManyData = {
          target_reps: updateOneResult.data.achieved_reps,
        };
      } else if (updateOneResult.data.achieved_calories) {
        updateManyData = {
          target_calories: updateOneResult.data.achieved_calories,
        };
      } else {
        updateManyData = {
          target_distance: updateOneResult.data.achieved_distance,
        };
      }

      const updateManyResult = await supabase
        .from("sets")
        .update(updateManyData)
        .eq("exercise_id", updateOneResult.data.exercise_id)
        .gt("set_order", updateOneResult.data.set_order)
        .select();

      if (updateManyResult.error) throw updateManyResult.error;

      await fetchWorkouts();
    } catch (error) {
      if (isPostgrestError(error)) {
        Alert.alert(error.message);
        return;
      }
      Alert.alert("Error updating set");
    }
  }

  async function updateOneRepMaxWeight(id: number, weight: number) {
    try {
      const updateOneResult = await supabase
        .from("exercises")
        .update({
          one_rep_max_weight: weight,
        })
        .eq("id", id)
        .select()
        .single();

      if (updateOneResult.error) throw updateOneResult.error;

      if (!updateOneResult.data.one_rep_max_percentage) {
        throw new Error("One rep max percentage not set");
      }

      const updateManyResult = await supabase
        .from("sets")
        .update({
          target_weight:
            weight * (updateOneResult.data.one_rep_max_percentage / 100),
        })
        .eq("exercise_id", updateOneResult.data.id)
        .select();

      if (updateManyResult.error) throw updateManyResult.error;

      await fetchWorkouts();
    } catch (error) {
      if (isPostgrestError(error)) {
        Alert.alert(error.message);
        return;
      }
      Alert.alert("Error updating one rep max");
    }
  }

  async function completeWorkout(id: number) {
    try {
      const { error } = await supabase
        .from("workouts")
        .update({
          is_completed: true,
          is_started: false,
        })
        .eq("id", id)
        .select();

      if (error) throw error;

      await fetchWorkouts();
    } catch (error) {
      if (isPostgrestError(error)) {
        Alert.alert(error.message);
        return;
      }
      Alert.alert("Error completing workout");
    }
  }

  async function startWorkout(id: number) {
    try {
      const { error } = await supabase
        .from("workouts")
        .update({
          is_started: true,
          is_completed: false,
        })
        .eq("id", id)
        .select();

      if (error) throw error;

      await fetchWorkouts();
    } catch (error) {
      if (isPostgrestError(error)) {
        Alert.alert(error.message);
        return;
      }
      Alert.alert("Error starting workout");
    }
  }

  async function resetWorkouts() {
    try {
      setWorkouts([]);

      const { error: deleteError } = await supabase
        .from("workouts")
        .delete()
        .gt("id", 0);

      if (deleteError) throw deleteError;

      const { error: workoutsError } = await supabase
        .from("workouts")
        .upsert(WORKOUTS)
        .select();

      if (workoutsError) throw workoutsError;

      const { error: exercisesError } = await supabase
        .from("exercises")
        .upsert(EXERCISES)
        .select();

      if (exercisesError) throw exercisesError;

      const { error: setsError } = await supabase
        .from("sets")
        .upsert(SETS)
        .select();

      if (setsError) throw setsError;

      await fetchWorkouts();
    } catch (error) {
      if (isPostgrestError(error)) {
        Alert.alert(error.message);
        return;
      }
      Alert.alert("Error seeding workouts");
    }
  }

  useEffect(() => {
    fetchWorkouts();
  }, []);

  if (!workouts.length) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <StoreContext.Provider
      value={{
        workouts,
        completeSet,
        updateOneRepMaxWeight,
        completeWorkout,
        startWorkout,
        resetWorkouts,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const useStore = () => useContext(StoreContext);

export const useWorkout = () => {
  const { workouts } = useStore();
  const { id } = useLocalSearchParams<{ id: string }>();

  const workout = workouts.find((workout) => workout.id === Number(id));

  if (!workout) throw new Error("Workout not found");

  return workout;
};
