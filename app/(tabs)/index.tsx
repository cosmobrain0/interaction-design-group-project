import { fetchCloudCoverageData } from "@/api/fetchCloudCoverageData"
import { fetchMoonData, moonDataType } from "@/api/fetchMoonData"
import Box from "@/components/Box"
import DayScroller from "@/components/DayScroller"
import LightLevelBox from "@/components/LightLevelBox"
import { LineChart } from "@/components/LineChart"
import TemperatureBox from "@/components/TemperatureBox"
import { Colors } from "@/constants/Colors"
import { Styles } from "@/constants/Styles"
import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from '@react-navigation/native'
import { Link } from "expo-router"
import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Home() {
  const [savedName, setSavedName] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('selectedLocationName')
        .then((name) => {
          setSavedName(name);
          console.log("Refreshed location name:", name);
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
    style={[Styles.background, styles.safeAreaView]}
  >
    {/* Location selector */}
    <View style={styles.locationSelector}>
      <Link href="/locationPicker">
        <View style={styles.locationButton}>
          <Ionicons
            name="location-sharp"
            color={Colors.foregroundPrimary}
            size={30}
            style={styles.locationIcon}
          />
          <Text style={styles.locationText}>{savedName || 'Location'}</Text>
        </View>
      </Link>
    </View>
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
      <View style={[Styles.container, styles.weatherInformationRow]}>
        <View style={[Styles.container, styles.boxContainer]}>
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
            href=""
            loading={false}
            data={{
              sunset: new Date(),
              sunrise: new Date()
            }}
          />
        </View>
      </View>
      <View style={styles.weatherInformationRow}>
        <View style={styles.boxContainer}>
          <TemperatureBox
            href=""
            loading={false}
            data={{
              averageTemperature: 22,
              highestTemperature: 22,
              lowestTemperature: 9
            }}
          />
        </View>
        <View style={[Styles.container, styles.boxContainer]}>
          <Box href="" title="Precipitation and Wind"/>
        </View>
      </View>
    </View>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1
  },
  locationIcon: {

  },
  locationText: {
    color: Colors.foregroundPrimary,
    fontSize: 35,
    fontWeight: "bold"
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationSelector: {
    flex: 0.8,
    flexDirection: "row",
    paddingHorizontal: 15,
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
