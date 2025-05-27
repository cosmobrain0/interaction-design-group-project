import { fetchOtherWeatherData } from "@/api/fetchOtherWeatherData";
import HourScroller from "@/components/HourScroller";
import { Colors } from "@/constants/Colors";
import { Styles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Temperature() {
  const day = Number(useLocalSearchParams().day)

  const [avgTemperature, setAvgTemperature] = useState<number | null>(null);
  const [maxTemperature, setMaxTemperature] = useState<number | null>(null);
  const [minTemperature, setMinTemperature] = useState<number | null>(null);
  const [hourlyTemperature, setHourlyTemperature] = useState<number[] | null>(null);
  
  useEffect(
    React.useCallback(() => {
      fetchOtherWeatherData(
        day,
        setAvgTemperature,
        () => {},
        () => {},
        () => {},
        () => {},
        setMinTemperature,
        setMaxTemperature,
        setHourlyTemperature,
        () => {}
      );
    }, [])
  );

  return <View style={[Styles.background, styles.dataColumn]}>
    <Text style={styles.averageTemperatureText}>
      {avgTemperature}°
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
          {maxTemperature}°
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
          {minTemperature}°
        </Text>
      </View>
    </View>
    <View>

    </View>
    <View style={styles.hourScroller}>
      {hourlyTemperature && <HourScroller
        hourlyData={[...hourlyTemperature.map((value) => String(Math.round(value)))]}
      />}
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