import { Stack } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="cloudCover"
        options={{
          headerBackButtonDisplayMode: "minimal",
          title: ""
        }}
      />
      <Stack.Screen name="lineGraphTest" options={{ title: "Line Graph Test" }} />
    </Stack>
  );
}
