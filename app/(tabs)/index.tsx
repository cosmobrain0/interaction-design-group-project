import { fetchCloudCoverageData } from "@/api/fetchCloudCoverageData"
import Box from "@/components/Box"
import { LineChart } from "@/components/LineChart"
import { Colors } from "@/constants/Colors"
import { Styles } from "@/constants/Styles"
import { Ionicons } from "@expo/vector-icons"
import React, { useEffect, useState } from "react"
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, Pressable} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"

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

  const router = useRouter();
  const [cloudCoverageData, setCloudCoverageData] = useState<number[]>([])
  const [cloudCoverageLabels, setCloudCoverageLabels] = useState<string[]>([])
  const [cloudCoverageLoading, setCloudCoverageLoading] = useState(true)

  useEffect(() => {
    fetchCloudCoverageData(setCloudCoverageData, setCloudCoverageLabels, setCloudCoverageLoading)
  }, [])

  return <SafeAreaView
    edges={["left", "top", "right"]}
    style={[Styles.container, Styles.background, styles.safeAreaView]}
  >
    {/* Location selector */}
    <View style={styles.locationSelector}>
      <Pressable style={styles.locationButton} onPress={() => router.push("/locationPicker")}>
        <Ionicons
          name="location-sharp"
          color={Colors.foregroundPrimary}
          size={30}
          style={styles.locationIcon}
        />
        <Text style={styles.locationText}>{savedName || 'Location'}</Text>
      </Pressable>
    </View>
    {/* Date selector */}
    <View style={styles.dateSelector}>

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
  dateSelector: {
    flex: 3,
    width: "100%"
  },
  weatherInformationColumn: {
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
    margin: 7.5
  }
})
