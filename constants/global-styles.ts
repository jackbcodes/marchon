import { StyleSheet } from "react-native";

import { colors } from "./colors";

export const globalStyles = StyleSheet.create({
  // Text
  textSm: {
    color: colors.text[100],
    fontSize: 14,
    lineHeight: 20,
  },
  textBase: {
    color: colors.text[100],
    fontSize: 16,
    lineHeight: 24,
  },
  textLg: {
    color: colors.text[100],
    fontSize: 18,
    lineHeight: 28,
  },
  textXl: {
    color: colors.text[100],
    fontSize: 20,
    lineHeight: 28,
  },
  text2Xl: {
    color: colors.text[100],
    fontSize: 24,
    lineHeight: 32,
  },

  // Button
  button: {
    backgroundColor: colors.text[100],
    borderRadius: 100,
    padding: 12,
  },
  buttonText: {
    fontWeight: "600",
    color: "#FFFFFF",
    marginHorizontal: "auto",
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },

  // Other
  disabled: {
    opacity: 0.5,
  },
});
