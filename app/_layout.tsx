import { WeatherContext } from "@/api/WeatherContext";
import { Colors } from "@/constants/Colors";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <WeatherContext value={
      {
        date: new Date(),
        temperature: {
          average: 16,
          lowest: 12,
          highest: 21,
          hourly: [13.4,13.1,13.0,12.3,12.4,12.8,13.3,14.2,15.6,16.4,17.4,18.4,19.4,19.8,20.4,20.8,20.5,17.7,17.6,16.7,16.0,15.2,14.6,14.0]
        }
      }
    }>
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
    </WeatherContext>
  );
}
