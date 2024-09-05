import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextProps,
  ViewProps,
} from "react-native";

import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/global-styles";

interface ButtonProps extends PressableProps {
  style?: ViewProps["style"];
  children: TextProps["children"];
}

export function Button({ style, children, ...props }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        props.disabled && globalStyles.disabled,
        style,
      ]}
      {...props}
    >
      <Text style={[globalStyles.textSm, styles.buttonText]}>{children}</Text>
    </Pressable>
  );
}

interface IconButtonProps extends PressableProps {
  style?: ViewProps["style"];
  children: React.ReactNode;
}

export function IconButton({ style, children, ...props }: IconButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.iconButton,
        pressed && styles.buttonPressed,
        props.disabled && globalStyles.disabled,
        style,
      ]}
      {...props}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
  iconButton: {
    backgroundColor: colors.ui.neutral[30],
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
  },
});
