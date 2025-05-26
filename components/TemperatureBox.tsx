import { WeatherContext } from "@/api/WeatherContext";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Box from "./Box";


export default function TemperatureBox({ href }: { href: string }) {
  const temperature = useContext(WeatherContext)?.temperature
  
  return <Box
    title="Temperature"
    href={href}
    loading={!temperature}
  >
    {temperature && <View style={styles.temperatureColumn}>
      <View style={styles.temperatureContainer}>
        <Text style={styles.temperatureText}>
          {temperature.average}°
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
            {temperature.highest}°
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
            {temperature.lowest}°
          </Text>
        </View>
      </View>
    </View>}
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
    fontSize: 100
  },
  extremeTemperatureIcon: {

  },
  extremeTemperatureText: {
    color: Colors.foregroundPrimary,
    fontSize: 26,
    fontWeight: "bold"
  }
})
