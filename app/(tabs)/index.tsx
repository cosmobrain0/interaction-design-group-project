import { fetchCloudCoverageData } from "@/api/fetchCloudCoverageData"
import Box from "@/components/Box"
import DayScroller from "@/components/DayScroller"
import LightLevelBox from "@/components/LightLevelBox"
import { LineChart } from "@/components/LineChart"
import LocationSelector from "@/components/LocationSelector"
import PrecipitationAndWindBox from "@/components/PrecipitationAndWindBox"
import TemperatureBox from "@/components/TemperatureBox"
import { Styles } from "@/constants/Styles"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Home() {
  const [savedName, setSavedName] = useState<string | null>(null); // TODO: save savedName using AsyncStorage

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
          <Box href="" title="Moon Phase"/>
        </View>
        <View style={styles.boxContainer}>
          <LightLevelBox
            href="/lightLevel"
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
          <PrecipitationAndWindBox
            href=""
            loading={false}
            data={{
              precipitationChance: 11,
              windSpeed: 13,
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
  }
})
