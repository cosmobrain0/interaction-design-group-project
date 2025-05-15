import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, Pressable, Platform, SafeAreaView, ActivityIndicator } from "react-native"
import { WebView } from "react-native-webview"
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
    <SafeAreaView style={styles.webviewContainer}>
      <View style={styles.topBar}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
      </View>
      <View style={styles.webviewWrapper}>
        <WebView
          style={styles.webview}
          source={{
            uri: "https://weather.metoffice.gov.uk/maps-and-charts/cloud-cover-map#?model=ukmo-ukv&layer=cloud-amount-total&bbox=[[42.16340342422403,-37.22167968750001],[64.11060221954631,29.223632812500004]]"
          }}
        />
      </View>
    </SafeAreaView>
  ) : (
    <View style={styles.container}>
      <Pressable style={styles.box} onPress={handlePress}>
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
              formatLabel={(_, index) => index % 3 === 0 ? chartLabels[index] : ''}
              contentInset={{ left: 10, right: 10 }}
              svg={{ fontSize: 10, fill: 'black' }}
            />
          </View>
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  box: {
    position: "absolute",
    top: 200,
    left: 25,
    backgroundColor: "#ffffff",
    padding: 10,
    width: "90%",
    height: "30%",
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  text: {
    color: "white",
    fontWeight: "bold"
  },
  webviewContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  topBar: {
    height: Platform.OS === "ios" ? 60 : 40,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0"
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  backButtonText: {
    fontSize: 16,
    color: "#007AFF"
  },
  webviewWrapper: {
    flex: 1
  },
  webview: {
    flex: 1
  }
})