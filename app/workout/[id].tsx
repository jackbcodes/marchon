import { View, StyleSheet } from "react-native";

import { Link, useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { ExerciseCard } from "@/components/exercise-card";
import { useStore, useWorkout } from "@/components/store-provider";
import { WorkoutCard } from "@/components/workout-card";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/global-styles";

export default function WorkoutId() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { completeWorkout, startWorkout } = useStore();
  const workout = useWorkout();

  if (!workout) throw new Error("Workout not found");

  return (
    <KeyboardAwareScrollView
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View style={styles.inner}>
        <WorkoutCard key={workout.id} {...workout}>
          {(!workout.is_started || workout.is_completed) && (
            <Button onPress={async () => await startWorkout(workout.id)}>
              {workout.is_completed ? "Resume" : "Start"} workout
            </Button>
          )}
        </WorkoutCard>
        {workout.exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} {...exercise} />
        ))}
        <View style={styles.buttonContainer}>
          {workout.is_started && (
            <Button
              onPress={async () => {
                await completeWorkout(workout.id);
                router.navigate("/");
              }}
            >
              Complete workout
            </Button>
          )}
          <Link href="/" style={[globalStyles.textSm, styles.linkText]}>
            Exit to home
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ui["paper"],
  },
  inner: {
    flex: 1,
    paddingTop: 8,
    paddingHorizontal: 12,
    paddingBottom: 100,
    gap: 8,
  },
  buttonContainer: {
    marginTop: 16,
    gap: 24,
  },
  linkText: {
    fontWeight: "600",
    marginHorizontal: "auto",
  },
});
