import { Stack } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return <Stack>
    <Stack.Screen
      name="(tabs)"
      options={{
        headerShown: false
      }}
    />
  </Stack>;
}
