import { fetchCloudCoverageData } from "@/api/fetchCloudCoverageData"
import Box from "@/components/Box"
import DayScroller from "@/components/DayScroller"
import { LineChart } from "@/components/LineChart"
import { Colors } from "@/constants/Colors"
import { Styles } from "@/constants/Styles"
import { Ionicons } from "@expo/vector-icons"
import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Home() {
  const [cloudCoverageData, setCloudCoverageData] = useState<number[]>([])
  const [cloudCoverageLabels, setCloudCoverageLabels] = useState<string[]>([])
  const [cloudCoverageLoading, setCloudCoverageLoading] = useState(true)

  const today = new Date()

  useEffect(() => {
    fetchCloudCoverageData(setCloudCoverageData, setCloudCoverageLabels, setCloudCoverageLoading)
  }, [])

  return <SafeAreaView
    edges={["left", "top", "right"]}
    style={[Styles.container, Styles.background, styles.safeAreaView]}
  >
    {/* Location selector */}
    <View style={styles.locationSelector}>
      <View style={styles.locationButton}>
        <Ionicons
          name="location-sharp"
          color={Colors.foregroundPrimary}
          size={30}
          style={styles.locationIcon}
        />
        <Text style={styles.locationText}>Location</Text>
      </View>
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
        <View  style={[Styles.container, styles.boxContainer]}>
          <Box href="" title="Moon Phase"/>
        </View>
        <View  style={[Styles.container, styles.boxContainer]}>
          <Box href="" title="Light Level"/>
        </View>
      </View>
      <View style={[Styles.container, styles.weatherInformationRow]}>
        <View  style={[Styles.container, styles.boxContainer]}>
          <Box href="" title="Temperature"/>
        </View>
        <View  style={[Styles.container, styles.boxContainer]}>
          <Box href="" title="Precipitation and Wind"/>
        </View>
      </View>
    </View>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  safeAreaView: {
    flexDirection: "column"
  },
  locationIcon: {

  },
  locationText: {
    color: Colors.foregroundPrimary,
    fontSize: 30,
    fontWeight: "bold"
  },
  locationButton: {
    flexDirection: "row"
  },
  locationSelector: {
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 15
  },
  daySelector: {
    flex: 3,
    width: "100%",
    paddingVertical: 7.5 
  },
  weatherInformationColumn: {
    flex: 11,
    width: "100%",
    paddingHorizontal: 7.5,
    paddingBottom: 7.5,
    flexDirection: "column"
  },
  weatherInformationRow: {
    flex: 1,
    flexDirection: "row"
  },
  boxContainer: {
    margin: 7.5
  }
})
