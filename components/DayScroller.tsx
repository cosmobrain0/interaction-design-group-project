import { useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import DayPill from "./DayPill";

function addDays(date: Date, days: number) {
  const newDate = new Date(date)
  newDate.setDate(date.getDate() + days)
  return newDate
}

const daysInAdvance = 7

export default function DayScroller({ today, setDate }: { today: Date, setDate: any }) {
  const [selected, setSelected] = useState<number | null>(0);

  return <ScrollView style={styles.dayScroller}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
  >
    {[...Array(daysInAdvance).keys()].map((day) =>
      <Pressable key={day} style={styles.pillContainer}
        onPress={() => {
          setSelected(day)
          setDate(addDays(today, day))
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