/**
 * Seed data for the database
 * - Quick way to populate or reset the database
 * - Only included for development purposes
 * - Must follow the same schema as the database
 * - Triggered by the "Reset data" button on the home screen
 */

export const WORKOUTS = [
  {
    id: 1,
    name: "Deadlift Pyramid",
    notes: "8-4-2-2-10-10",
    workout_order: 1,
  },
  {
    id: 2,
    name: "EMOM",
    notes: "EMOM 12 rounds",
    workout_order: 2,
  },
  {
    id: 3,
    name: "Push/Pull Superset",
    notes: "3 x 8-12 Super-sets",
    workout_order: 3,
  },
  {
    id: 4,
    name: "Bench Press Test",
    notes: "3 x 5 @ 60% of 1RM",
    workout_order: 4,
  },
];

export const EXERCISES = [
  {
    id: 1,
    workout_id: 1,
    name: "Barbell Deadlift",
    type: "reps-weight",
    exercise_order: 1,
  },
  {
    id: 2,
    workout_id: 2,
    name: "Pull-ups",
    type: "reps",
    exercise_order: 1,
  },
  {
    id: 3,
    workout_id: 2,
    name: "Assault bike",
    type: "calories",
    exercise_order: 2,
  },
  {
    id: 4,
    workout_id: 2,
    name: "Run",
    type: "distance",
    exercise_order: 3,
  },
  {
    id: 5,
    workout_id: 3,
    name: "A-Frame HSPU",
    type: "reps-weight",
    exercise_order: 1,
  },
  {
    id: 6,
    workout_id: 3,
    name: "Single Arm Cable Row",
    type: "reps-weight",
    exercise_order: 2,
  },
  {
    id: 7,
    workout_id: 4,
    name: "Barbell bench press",
    type: "one-rep-max-percent",
    exercise_order: 1,
    one_rep_max_percentage: 60,
  },
];

export const SETS = [
  // Deadlift Pyramid - Barbell Deadlift
  {
    id: 1,
    workout_id: 1,
    exercise_id: 1,
    set_order: 1,
    target_reps: 8,
  },
  {
    id: 2,
    workout_id: 1,
    exercise_id: 1,
    set_order: 2,
    target_reps: 4,
  },
  {
    id: 3,
    workout_id: 1,
    exercise_id: 1,
    set_order: 3,
    target_reps: 2,
  },
  {
    id: 4,
    workout_id: 1,
    exercise_id: 1,
    set_order: 4,
    target_reps: 2,
  },
  {
    id: 5,
    workout_id: 1,
    exercise_id: 1,
    set_order: 5,
    target_reps: 10,
  },
  {
    id: 6,
    workout_id: 1,
    exercise_id: 1,
    set_order: 6,
    target_reps: 10,
  },
  // EMOM - Pull-ups
  {
    id: 8,
    workout_id: 2,
    exercise_id: 2,
    set_order: 1,
    target_reps: 12,
  },
  {
    id: 9,
    workout_id: 2,
    exercise_id: 2,
    set_order: 2,
    target_reps: 12,
  },
  {
    id: 10,
    workout_id: 2,
    exercise_id: 2,
    set_order: 3,
    target_reps: 12,
  },
  // EMOM - Assault bike
  {
    id: 11,
    workout_id: 2,
    exercise_id: 3,
    set_order: 1,
  },
  {
    id: 12,
    workout_id: 2,
    exercise_id: 3,
    set_order: 2,
  },
  {
    id: 13,
    workout_id: 2,
    exercise_id: 3,
    set_order: 3,
  },
  // EMOM - Run
  {
    id: 14,
    workout_id: 2,
    exercise_id: 4,
    set_order: 1,
  },
  {
    id: 15,
    workout_id: 2,
    exercise_id: 4,
    set_order: 2,
  },
  {
    id: 16,
    workout_id: 2,
    exercise_id: 4,
    set_order: 3,
  },
  // Push/Pull Superset - A-Frame HSPU
  {
    id: 17,
    workout_id: 3,
    exercise_id: 5,
    set_order: 1,
  },
  {
    id: 18,
    workout_id: 3,
    exercise_id: 5,
    set_order: 2,
  },
  {
    id: 19,
    workout_id: 3,
    exercise_id: 5,
    set_order: 3,
  },
  // Push/Pull Superset - Single Arm Cable Row
  {
    id: 20,
    workout_id: 3,
    exercise_id: 6,
    set_order: 1,
  },
  {
    id: 21,
    workout_id: 3,
    exercise_id: 6,
    set_order: 2,
  },
  {
    id: 22,
    workout_id: 3,
    exercise_id: 6,
    set_order: 3,
  },
  // Bench Press Test - Barbell bench press
  {
    id: 23,
    workout_id: 4,
    exercise_id: 7,
    set_order: 1,
    target_reps: 5,
  },
  {
    id: 24,
    workout_id: 4,
    exercise_id: 7,
    set_order: 2,
    target_reps: 5,
  },
  {
    id: 25,
    workout_id: 4,
    exercise_id: 7,
    set_order: 3,
    target_reps: 5,
  },
];
