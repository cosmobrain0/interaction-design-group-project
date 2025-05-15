import { CloudCoverMapView } from "@/components/CloudCoverMapView"
import { Styles } from "@/constants/Styles"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, Pressable, View } from "react-native"
import { LineChart, XAxis, YAxis } from 'react-native-svg-charts'

export default function Home() {
  const [showWebView, setShowWebView] = useState(false)
  const [chartData, setChartData] = useState<number[]>([])
  const [chartLabels, setChartLabels] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.2&longitude=0.1167&hourly=cloud_cover")
        const json = await response.json()
        const data = json.hourly.cloud_cover.slice(0, 24)  // use first 24 data points
        setChartData(data)
        const timeLabels = json.hourly.time.slice(0, 24).map((t: string | number | Date) => {
          const hour = new Date(t).getHours()
          return `${String(hour).padStart(2, '0')}:00`
        })
        setChartLabels(timeLabels)
      } catch (error) {
        console.error("Failed to fetch cloud cover data", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handlePress = () => {
    setShowWebView(true)
  }

  const handleBack = () => {
    setShowWebView(false)
  }

  return showWebView ? (
    <CloudCoverMapView handleBack={handleBack}/>
  ) : (
    <View style={Styles.container}>
      <Pressable style={Styles.box} onPress={handlePress}>
        {loading ? (
          <ActivityIndicator size="large" color="#888" />
        ) : (
          <View>
            <View style={{ flexDirection: 'row', height: 180 }}>
              <YAxis
                data={chartData}
                contentInset={{ top: 20, bottom: 20 }}
                svg={{ fontSize: 10, fill: 'black' }}
                style={{ marginRight: 5 }}
                numberOfTicks={5}
              />
              <LineChart
                style={{ flex: 1 }}
                data={chartData}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={{ top: 20, bottom: 20 }}
              />
            </View>
            <XAxis
              style={{ marginTop: 10, height: 20, marginLeft: 35 }}
              data={chartData}
              formatLabel={(_: any, index: number) => index % 3 === 0 ? chartLabels[index] : ''}
              contentInset={{ left: 10, right: 10 }}
              svg={{ fontSize: 10, fill: 'black' }}
            />
          </View>
        )}
      </Pressable>
    </View>
  )
}
