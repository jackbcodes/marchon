import { StyleSheet, Text, TextProps, View } from "react-native";

import { Repeat } from "lucide-react-native";

import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/global-styles";

interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return <View style={styles.container}>{children}</View>;
}

export function CardTitle({ children, style }: TextProps) {
  return (
    <Text style={[globalStyles.textXl, styles.title, style]}>{children}</Text>
  );
}

export function CardDivider() {
  return <View style={styles.divider} />;
}

export function CardNotes({ children }: CardProps) {
  return (
    <View style={styles.notesContainer}>
      <Repeat size={16} color={colors.text[60]} />
      <Text style={[globalStyles.textBase, styles.notesText]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.ui["paper-dark"],
    padding: 16,
    gap: 12,
  },
  title: {
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: colors.ui["paper-dark"],
  },
  notesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  notesText: {
    fontWeight: "600",
    color: colors.text[60],
  },
});
