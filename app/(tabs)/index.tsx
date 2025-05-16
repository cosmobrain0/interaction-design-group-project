import { fetchCloudCoverageData } from "@/api/fetchCloudCoverageData"
import { LineChart } from "@/components/LineChart"
import { Styles } from "@/constants/Styles"
import { Link } from "expo-router"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, View } from "react-native"

export default function Home() {
  const [cloudCoverageData, setCloudCoverageData] = useState<number[]>([])
  const [cloudCoverageLabels, setCloudCoverageLabels] = useState<string[]>([])
  const [cloudCoverageLoading, setCloudCoverageLoading] = useState(true)

  useEffect(() => {
    fetchCloudCoverageData(setCloudCoverageData, setCloudCoverageLabels, setCloudCoverageLoading)
  }, [])

  return <View style={Styles.container}>
    <Link href="/cloudCover" style={Styles.box}>
      { cloudCoverageLoading ? (
        <ActivityIndicator size="large" color="#888" />
      ) : (
        <LineChart
          chartData={cloudCoverageData}
          chartLabels={cloudCoverageLabels}
        />
      )}
    </Link>
  </View>
}
