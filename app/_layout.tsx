import { Colors } from "@/constants/Colors";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
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
        <Stack.Screen
          name="locationPicker"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="temperature"
          options={{
            title: "Temperature",
            headerBackButtonDisplayMode: "minimal",
            headerTintColor: Colors.foregroundPrimary,
            headerStyle: { backgroundColor: Colors.backgroundLight }
          }}
        />
        <Stack.Screen
          name="lightLevel"
          options={{
            title: "Light Level",
            headerBackButtonDisplayMode: "minimal",
            headerTintColor: Colors.foregroundPrimary,
            headerStyle: { backgroundColor: Colors.backgroundLight }
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
