import { Text, View, StyleSheet, TextInput } from "react-native";

import { Check } from "lucide-react-native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { IconButton } from "@/components/button";
import { Card, CardDivider, CardTitle } from "@/components/card";
import { useStore, useWorkout } from "@/components/store-provider";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/global-styles";
import { Exercise, Set } from "@/utils/supabase";

interface ExerciseCardProps extends Exercise {}

export function ExerciseCard({
  id,
  name,
  type,
  sets,
  one_rep_max_weight,
}: ExerciseCardProps) {
  const isRepsVisible =
    type === "reps-weight" || type === "reps" || type === "one-rep-max-percent";

  const isWeightVisible =
    type === "reps-weight" || type === "one-rep-max-percent";

  const isCaloriesVisible = type === "calories";

  return (
    <View style={{ gap: 8 }}>
      {type === "one-rep-max-percent" && (
        <OneRepMaxCard
          id={id}
          name={name}
          oneRepMaxWeight={one_rep_max_weight}
        />
      )}
      <Card>
        <CardTitle style={[globalStyles.textLg, styles.title]}>
          {name}
        </CardTitle>
        <CardDivider />
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.column1}>
              <Text style={styles.headerText}>Sets</Text>
            </View>
            <View style={styles.column2}>
              <Text style={styles.headerText}>
                {isRepsVisible
                  ? "Reps"
                  : isCaloriesVisible
                    ? "Calories"
                    : "Distance"}
              </Text>
            </View>
            <View style={styles.column3}>
              {isWeightVisible && (
                <Text style={styles.headerText}>Weight (kg)</Text>
              )}
            </View>
            <View style={styles.column4} />
          </View>
          <View style={styles.rows}>
            {sets.map((set) => (
              <SetRow
                key={set.id}
                set={set}
                isRepsVisible={isRepsVisible}
                isWeightVisible={isWeightVisible}
                isCaloriesVisible={isCaloriesVisible}
              />
            ))}
          </View>
        </View>
      </Card>
    </View>
  );
}

interface SetRowProps {
  set: Set;
  isRepsVisible: boolean;
  isWeightVisible: boolean;
  isCaloriesVisible: boolean;
}

interface SetFormData {
  reps?: string;
  weight?: string;
  calories?: string;
  distance?: string;
}

function SetRow({
  set,
  isRepsVisible,
  isWeightVisible,
  isCaloriesVisible,
}: SetRowProps) {
  const { completeSet } = useStore();
  const workout = useWorkout();

  const { control, handleSubmit, formState } = useForm<SetFormData>({
    values: {
      reps: set.achieved_reps?.toString(),
      weight: set.achieved_weight?.toString(),
      calories: set.achieved_calories?.toString(),
      distance: set.achieved_distance?.toString(),
    },
  });

  const onSubmit: SubmitHandler<SetFormData> = async (formData) => {
    const achieved_reps = Number(formData.reps) || set.target_reps;
    const achieved_weight = Number(formData.weight) || set.target_weight;
    const achieved_calories = Number(formData.calories) || set.target_calories;
    const achieved_distance = Number(formData.distance) || set.target_distance;

    let completedData;

    if (isRepsVisible && isWeightVisible) {
      completedData = {
        achieved_reps,
        achieved_weight,
      };
    } else if (isRepsVisible) {
      completedData = {
        achieved_reps,
      };
    } else if (isCaloriesVisible) {
      completedData = {
        achieved_calories,
      };
    } else {
      completedData = {
        achieved_distance,
      };
    }

    await completeSet(set.id, completedData);
  };

  const isDisabled = formState.isSubmitting || !workout.is_started;

  return (
    <View style={styles.row}>
      <View style={styles.column1}>
        <Text style={styles.set}>{set.set_order}</Text>
      </View>
      <View style={styles.column2}>
        <Controller
          control={control}
          rules={{
            required: isRepsVisible
              ? !Boolean(set.target_reps)
              : isCaloriesVisible
                ? !Boolean(set.target_calories)
                : !Boolean(set.target_distance),
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder={
                isRepsVisible
                  ? set.target_reps?.toString()
                  : isCaloriesVisible
                    ? set.target_calories?.toString()
                    : set.target_distance?.toString()
              }
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={[
                styles.input,
                set.is_completed && !formState.isDirty && styles.inputSuccess,
                isDisabled && globalStyles.disabled,
              ]}
              editable={!isDisabled}
              inputMode="numeric"
            />
          )}
          name={
            isRepsVisible ? "reps" : isCaloriesVisible ? "calories" : "distance"
          }
        />
      </View>
      <View style={styles.column3}>
        {isWeightVisible && (
          <Controller
            control={control}
            rules={{ required: !Boolean(set.target_weight) }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder={set.target_weight?.toString()}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={[
                  styles.input,
                  set.is_completed && !formState.isDirty && styles.inputSuccess,
                  isDisabled && globalStyles.disabled,
                ]}
                editable={!isDisabled}
                inputMode="numeric"
              />
            )}
            name="weight"
          />
        )}
      </View>
      <View style={styles.column4}>
        <IconButton
          style={[
            set.is_completed && !formState.isDirty && styles.buttonSuccess,
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={isDisabled}
        >
          <Check size={20} color="black" />
        </IconButton>
      </View>
    </View>
  );
}

interface OneRepMaxFormData {
  oneRepMaxWeight: string;
}

interface OneRepMaxCardProps {
  id: Exercise["id"];
  name: Exercise["name"];
  oneRepMaxWeight: Exercise["one_rep_max_weight"];
}

function OneRepMaxCard({ id, name, oneRepMaxWeight }: OneRepMaxCardProps) {
  const { updateOneRepMaxWeight } = useStore();
  const workout = useWorkout();

  const { control, handleSubmit, formState, watch } =
    useForm<OneRepMaxFormData>({
      values: {
        oneRepMaxWeight: oneRepMaxWeight?.toString() ?? "",
      },
    });

  const onSubmit: SubmitHandler<OneRepMaxFormData> = async (formData) => {
    await updateOneRepMaxWeight(id, Number(formData.oneRepMaxWeight));
  };

  const isComplete = oneRepMaxWeight === Number(watch("oneRepMaxWeight"));

  const isDisabled = formState.isSubmitting || !workout.is_started;

  return (
    <Card>
      <CardTitle style={styles.title}>{name} 1RM</CardTitle>
      <CardDivider />
      <View style={styles.content}>
        <Text style={styles.headerText}>Weight (kg)</Text>
        <View style={styles.rows}>
          <View style={styles.row}>
            <View style={styles.column1}>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={[
                      styles.input,
                      isComplete && styles.inputSuccess,
                      isDisabled && globalStyles.disabled,
                    ]}
                    editable={!isDisabled}
                    inputMode="numeric"
                  />
                )}
                name="oneRepMaxWeight"
              />
            </View>
            <View style={styles.column4}>
              <>
                <IconButton
                  style={[
                    isComplete && !formState.isDirty && styles.buttonSuccess,
                  ]}
                  onPress={handleSubmit(onSubmit)}
                  disabled={isDisabled}
                >
                  <Check size={20} color="black" />
                </IconButton>
              </>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
  },
  content: {
    gap: 8,
  },
  header: {
    flexDirection: "row",
    gap: 8,
  },
  headerText: {
    color: colors.text[40],
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 46,
  },
  column1: {
    flex: 2,
  },
  column2: {
    flex: 3,
  },
  column3: {
    flex: 5,
  },
  column4: {
    width: 46,
    marginLeft: 8,
  },
  rows: {
    gap: 12,
  },
  input: {
    fontSize: 18,
    fontWeight: "600",
    borderWidth: 1,
    borderColor: colors.ui["paper-dark"],
    borderRadius: 6,
    flex: 1,
    paddingLeft: 12,
  },
  inputSuccess: {
    backgroundColor: colors.ui.green[20],
    borderColor: colors.ui.success,
  },
  set: {
    fontSize: 18,
    paddingLeft: 8,
    fontWeight: "600",
    color: colors.text[40],
  },
  buttonSuccess: {
    backgroundColor: colors.ui.success,
  },
});
