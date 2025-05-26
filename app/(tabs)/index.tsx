import { fetchCloudCoverageData } from "@/api/fetchCloudCoverageData";
import { fetchOtherWeatherData } from "@/api/fetchOtherWeatherData";
import { fetchMoonData, moonDataType } from "@/api/fetchMoonData"
import Box from "@/components/Box";
import DayScroller from "@/components/DayScroller";
import LightLevelBox from "@/components/LightLevelBox";
import { LineChart } from "@/components/LineChart";
import LocationSelector from "@/components/LocationSelector";
import PrecipitationAndWindBox from "@/components/PrecipitationAndWindBox";
import TemperatureBox from "@/components/TemperatureBox";
import { Colors } from "@/constants/Colors"
import { Styles } from "@/constants/Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [savedName, setSavedName] = useState<string | null>(null); // TODO: save savedName using AsyncStorage

  const [avgTemperature, setAvgTemperature] = useState<number | null>(null);
  const [maxTemperature, setMaxTemperature] = useState<number | null>(null);
  const [minTemperature, setMinTemperature] = useState<number | null>(null);
  const [avgPrecipitation, setAvgPrecipitation] = useState<number | null>(null);
  const [avgWind, setAvgWind] = useState<number | null>(null);
  const [sunriseTime, setSunriseTime] = useState<Date | null>(null);
  const [sunsetTime, setSunsetTime] = useState<Date | null>(null);


  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('selectedLocationName')
        .then((name) => {
          setSavedName(name);
          console.log("Refreshed location name:", name);
          // Refresh the line chart data when returning to the index page
          fetchCloudCoverageData(setCloudCoverageData, setCloudCoverageLabels, setCloudCoverageLoading);
          fetchOtherWeatherData(
            setAvgTemperature,
            setAvgPrecipitation,
            setAvgWind,
            setSunriseTime,
            setSunsetTime,
            setMaxTemperature,
            setMinTemperature,
            () => {},
            () => {
              setCloudCoverageLoading(false);
            }
          );
        })
        .catch((err) => console.warn('Failed to load saved location', err));
    }, [])
  );

  const [cloudCoverageData, setCloudCoverageData] = useState<number[]>([])
  const [cloudCoverageLabels, setCloudCoverageLabels] = useState<string[]>([])
  const [cloudCoverageLoading, setCloudCoverageLoading] = useState(true)

  const today = new Date()

  useEffect(() => {
    fetchCloudCoverageData(setCloudCoverageData, setCloudCoverageLabels, setCloudCoverageLoading)
  }, [])

  const [moonData, setMoonData] = useState<moonDataType>({ phase: "", illumination: "", moon_age: ""})
  const [moonLoading, setMoonLoading] = useState(true)

  useEffect(() => {
    fetchMoonData(setMoonData, setMoonLoading)
  }, [])

  return <SafeAreaView
    edges={["left", "top", "right"]}
    style={[Styles.background, Styles.safeAreaView]}
  >
    <LocationSelector savedName={savedName} />
    {/* Day selector */}
    <View style={styles.daySelector}>
      <DayScroller today={today}/>
    </View>
    {/* Weather information column */}
    <View style={styles.weatherInformationColumn}>
      {/* Cloud Coverage Box */}
      <View style={[Styles.container, styles.boxContainer]}>
        <Box href="/cloudCover" loading={cloudCoverageLoading} title="Cloud Cover">
          <LineChart
            chartData={cloudCoverageData}
            chartLabels={cloudCoverageLabels}
          />
        </Box>
      </View>
      <View style={styles.weatherInformationRow}>
        <View style={styles.boxContainer}>
          <Box href="/moon/details" title="Moon Phase" loading={moonLoading}>
            <View style={styles.moonContent}>
                <Text style={styles.phase}>{moonData.phase}</Text>
              <Text style={styles.info}>Illumination: {moonData.illumination}</Text>
              <Text style={styles.info}>Age: {moonData.moon_age}</Text>
            </View>
          </Box>
        </View>
        <View style={styles.boxContainer}>
          <LightLevelBox
            href="/lightLevel"
            loading={false}
            data={{
              sunrise: sunriseTime ?? new Date(),
              sunset: sunsetTime ?? new Date()
            }}
          />
        </View>
      </View>
      <View style={styles.weatherInformationRow}>
        <View style={styles.boxContainer}>
          <TemperatureBox
            href="/temperature"
            data={{
              avgTemperature: avgTemperature ?? 0,
              maxTemperature: maxTemperature ?? 0,
              minTemperature: minTemperature ?? 0,
            }}
          />
        </View>
        <View style={[Styles.container, styles.boxContainer]}>
          <PrecipitationAndWindBox
            href=""
            loading={false}
            data={{
              precipitationChance: avgPrecipitation ?? 0,
              windSpeed: avgWind ?? 0,
              windDirection: 0.445
            }}
          />
        </View>
      </View>
    </View>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1
  },
  daySelector: {
    flex: 3,
    width: "100%",
    paddingVertical: 7.5,
  },
  weatherInformationColumn: {
    flex: 11,
    width: "100%",
    paddingHorizontal: 7.5,
    paddingBottom: 7.5,
    flexDirection: "column"
  },
  informationColumn: {
    flex: 11,
    width: "100%",
    padding: 7.5,
    flexDirection: "column"
  },
  weatherInformationRow: {
    flex: 1,
    flexDirection: "row"
  },
  boxContainer: {
    flex: 1,
    margin: 7.5
  },
    moonContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingVertical: 8,
  },
  phase: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.foregroundPrimary,
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: Colors.foregroundSecondary,
  }
})
