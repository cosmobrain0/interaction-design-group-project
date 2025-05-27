import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import Box from "./Box";


export default function TemperatureBox({ href, data, loading }: { href: string, data: any, loading: boolean }) {
  
  return <Box
    title="Temperature"
    href={href}
    loading={loading}
  >
    <View style={styles.temperatureColumn}>
      <View style={styles.temperatureContainer}>
        <Text style={styles.temperatureText}>
          {data.avgTemperature}°
        </Text>
      </View>
      <View style={styles.extremeTemperaturesContainer}>
        <View style={styles.extremeTemperatureContainer}>
          <Ionicons
            style={styles.extremeTemperatureIcon}
            name="arrow-up"
            color={Colors.foregroundSecondary}
            size={24}
          />
          <Text style={styles.extremeTemperatureText}>
            {data.maxTemperature}°
          </Text>
        </View>
        <View style={styles.extremeTemperatureContainer}>
          <Ionicons
            style={styles.extremeTemperatureIcon}
            name="arrow-down"
            color={Colors.foregroundSecondary}
            size={24}
          />
          <Text style={styles.extremeTemperatureText}>
            {data.minTemperature}°
          </Text>
        </View>
      </View>
    </View>
  </Box>
}

const styles = StyleSheet.create({
  temperatureColumn: {
    flex: 1,
    flexDirection: "column"
  },
  temperatureContainer: {
    flex: 3,
    justifyContent: "center"
  },
  extremeTemperaturesContainer: {
    flex: 1,
    flexDirection: "row"
  },
  extremeTemperatureContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  temperatureText: {
    marginTop: -8,
    color: Colors.foregroundPrimary,
    fontSize: 72
  },
  extremeTemperatureIcon: {

  },
  extremeTemperatureText: {
    color: Colors.foregroundPrimary,
    fontSize: 26,
    fontWeight: "bold"
  }
})
