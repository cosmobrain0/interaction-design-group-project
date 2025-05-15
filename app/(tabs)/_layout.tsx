import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"

export default function TabsLayout() {
  return <Tabs>
    <Tabs.Screen
      name="settings"
      options={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({focused, color}) => (
          <Ionicons
            name={focused ? "settings-sharp" : "settings-outline"}
            color={color}
            size={30}
          />
        )
      }}
    />
    <Tabs.Screen
      name="index"
      options={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({focused, color}) => (
          <Ionicons
            name={focused ? "home" : "home-outline"}
            color={color}
            size={30}
          />
        )
      }}
    />
    <Tabs.Screen
      name="calendar"
      options={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({focused, color}) => (
          <Ionicons
            name={focused ? "calendar" : "calendar-outline"}
            color={color}
            size={30}
          />
        )
      }}
    />
  </Tabs>
}
