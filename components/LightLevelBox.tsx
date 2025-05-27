import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View } from "react-native";
import Box from "./Box";

async function loadData<T>(key: string, defaultValue: T): Promise<T> {
  try {
    const valueUnparsed = await AsyncStorage.getItem(key);
    if (valueUnparsed == null) return defaultValue;
    const value: T | null = JSON.parse(valueUnparsed);
    return value == null ? defaultValue : value;
  } catch (_) {
    return defaultValue;
  }
}


type lightLevelData = {
  sunset: Date,
  sunrise: Date
}

async function dateToHourMinutesString(date: Date) {
    const timeFormat = await loadData("timeFormat", "TwentyFourHour");
    const timeOptions: Intl.DateTimeFormatOptions = timeFormat === "TWELVEHOUR"
      ? { hour: "numeric", minute: "numeric", hour12: true }
      : { hour: "numeric", minute: "numeric", hour12: false };
    return date.toLocaleTimeString([], timeOptions);
  
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
    fontSize: 35,
  }
})