import { WeatherContext } from "@/api/WeatherContext";
import { dateNumberToDateString, dayNumberToDayString } from "@/components/DayPill";
import HourScroller from "@/components/HourScroller";
import { Colors } from "@/constants/Colors";
import { Styles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Temperature() {
  const { date, temperature } = useContext(WeatherContext)

  return date && temperature && <View style={[Styles.background, styles.dataColumn]}>
    <Text>
      {dateNumberToDateString(date.getDate())} {dayNumberToDayString[date.getDay()]}
    </Text>
    <Text style={styles.averageTemperatureText}>
      {temperature.average}°
    </Text>
    <View style={styles.extremeTemperaturesContainer}>
      <View style={styles.extremeTemperatureContainer}>
        <Ionicons
          style={styles.extremeTemperatureIcon}
          name="arrow-up"
          color={Colors.foregroundSecondary}
          size={45}
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
          size={45}
        />
        <Text style={styles.extremeTemperatureText}>
          {temperature.lowest}°
        </Text>
      </View>
    </View>
    <View>

    </View>
    <View style={styles.hourScroller}>
      <HourScroller
        hourlyData={temperature.hourly.map((value) => Math.round(value) + "°")}
      />
    </View>
  </View>
}

const styles = StyleSheet.create({
  dataColumn: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  hourScroller: {
    marginTop: 15,
    width: "100%",
    height: "20%"
  },
  averageTemperatureText: {
    color: Colors.foregroundPrimary,
    fontSize: 200
  },
  extremeTemperaturesContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  extremeTemperatureContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  extremeTemperatureIcon: {

  },
  extremeTemperatureText: {
    color: Colors.foregroundPrimary,
    fontSize: 50,
    fontWeight: "bold"
  }
})