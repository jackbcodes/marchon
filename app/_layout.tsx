import { Stack } from "expo-router";

import { StoreProvider } from "@/components/store-provider";

export default function RootLayout() {
  return (
    <StoreProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="workout/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </StoreProvider>
  );
}
