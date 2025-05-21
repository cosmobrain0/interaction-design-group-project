import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import Box from "./Box";

type lightLevelData = {
  sunset: Date,
  sunrise: Date
}

function dateToHourMinutesString(date: Date) {
  return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0')
}

export default function LightLevelBox({ href, loading, data }:
  { href: string, loading: boolean, data: lightLevelData }) {
  return <Box
    title="Light Level"
    href={href}
    loading={loading}
  >
    <View style={styles.lightLevelColumn}>
      <View style={styles.lightInfoContainer}>
        <MaterialCommunityIcons name="weather-sunset-down"
          color={Colors.foregroundSecondary}
          size={50}
        />
        <Text style={styles.lightInfoText}>{dateToHourMinutesString(data.sunrise)}</Text>
      </View>
      <View style={styles.lightInfoContainer}>
        <MaterialCommunityIcons name="weather-sunset-up"
          color={Colors.foregroundSecondary}
          size={50}
        />
        <Text style={styles.lightInfoText}>{dateToHourMinutesString(data.sunset)}</Text>
      </View>
    </View>
  </Box>
}

const styles = StyleSheet.create({
  lightLevelColumn: {
    flex: 1,
    flexDirection: "column"
  },
  lightInfoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  lightInfoText: {
    color: Colors.foregroundPrimary,
    fontSize: 40,
  }
})