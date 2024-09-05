import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";

import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { useStore } from "@/components/store-provider";
import { WorkoutCard } from "@/components/workout-card";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/global-styles";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { workouts, resetWorkouts } = useStore();

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <Text style={[globalStyles.text2Xl, styles.title]}>
          Marchon Take Home 1.0
        </Text>
        {workouts.map((workout) => (
          <Link key={workout.id} href={`/workout/${workout.id}`} asChild>
            <Pressable>
              <WorkoutCard {...workout} />
            </Pressable>
          </Link>
        ))}
        {process.env.NODE_ENV !== "production" && (
          <Button onPress={resetWorkouts} style={{ marginTop: 16 }}>
            {workouts.length ? "Reset" : "Seed"} data (dev only)
          </Button>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ui["paper"],
  },
  content: {
    paddingTop: 20,
    paddingHorizontal: 12,
    paddingBottom: 100,
    gap: 8,
  },
  title: {
    marginBottom: 8,
    fontWeight: "700",
    marginHorizontal: 4,
  },
});
