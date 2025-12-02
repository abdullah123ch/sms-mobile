// app/(tabs)/student/grades/_layout.tsx
import { Stack } from "expo-router";

export default function GradesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="detailed"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
