import { fetchCloudCoverageData } from "@/api/fetchCloudCoverageData";
import { fetchMoonData } from "@/api/fetchMoonData";
import { fetchOtherWeatherData } from "@/api/fetchOtherWeatherData";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import DayPill from "./DayPill";
import AsyncStorage from "@react-native-async-storage/async-storage";

function addDays(date: Date, days: number) {
  const newDate = new Date(date)
  newDate.setDate(date.getDate() + days)
  return newDate
}

async function saveData<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
}

const daysInAdvance = 7

type DataSetters = {
  setCloudCoverageData: any,
  setCloudCoverageLabels: any,
  setCloudCoverageLoading: any
  setAvgTemperature: any,
  setAvgPrecipitation: any,
  setAvgWind: any,
  setSunriseTime: any,
  setSunsetTime: any,
  setMaxTemperature: any,
  setMinTemperature: any,
  setMoonData: any,
  setMoonLoading: any
}

export default function DayScroller({ today, setDay, dataSetters }: { today: Date, setDay: any, dataSetters: DataSetters }) {
  const [selected, setSelected] = useState<number | null>(0);

  return <ScrollView style={styles.dayScroller}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
  >
    {[...Array(daysInAdvance).keys()].map((day) =>
      <Pressable key={day} style={styles.pillContainer}
        onPress={() => {
          setSelected(day)
          
          setDay(day)
          saveData("selectedDay", day)
          fetchCloudCoverageData(
            day, 
            dataSetters.setCloudCoverageData,
            dataSetters.setCloudCoverageLabels,
            dataSetters.setCloudCoverageLoading
          )
          fetchOtherWeatherData(
            day,
            dataSetters.setAvgTemperature,
            dataSetters.setAvgPrecipitation,
            dataSetters.setAvgWind,
            dataSetters.setSunriseTime,
            dataSetters.setSunsetTime,
            dataSetters.setMaxTemperature,
            dataSetters.setMinTemperature,
            () => {},
            () => {},
          )
          fetchMoonData(
            day,
            dataSetters.setMoonData,
            dataSetters.setMoonLoading
          )
        }}
      >
        <DayPill
          icon="cloud-moon"
          day={addDays(today, day)}
          selected={selected == day}
        />
      </Pressable>
    )}
  </ScrollView>
}

const styles = StyleSheet.create({
  dayScroller: {
    width: "100%",
    paddingHorizontal: 7.5,
  },
  pillContainer: {
    width: 70,
    marginHorizontal: 7.5
  }
})