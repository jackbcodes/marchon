import { StyleSheet, Text, View } from "react-native";

import { Check } from "lucide-react-native";

import { Card, CardDivider, CardNotes, CardTitle } from "@/components/card";
import { colors } from "@/constants/colors";
import { Workout } from "@/utils/supabase";

interface WorkoutCardProps extends Workout {
  children?: React.ReactNode;
}

export function WorkoutCard({
  name,
  notes,
  exercises,
  is_completed,
  children,
}: WorkoutCardProps) {
  return (
    <Card>
      <View style={styles.header}>
        <CardTitle>{name}</CardTitle>
        {is_completed && (
          <View style={styles.completeIcon}>
            <Check size={16} color="black" />
          </View>
        )}
      </View>
      <CardDivider />
      <CardNotes>{notes}</CardNotes>
      <View style={styles.exercisesContainer}>
        {exercises.map((exercise) => (
          <View style={styles.exerciseItem} key={exercise.id}>
            <Text style={styles.exerciseText}>{exercise.name}</Text>
          </View>
        ))}
      </View>
      {children}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  completeIcon: {
    width: 28,
    aspectRatio: 1,
    backgroundColor: colors.ui.success,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  exercisesContainer: {
    gap: 8,
  },
  exerciseItem: {
    borderRadius: 6,
    backgroundColor: colors.ui.neutral[20],
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  exerciseText: {
    fontWeight: "600",
  },
});
