import { ScrollView, StyleSheet, View } from "react-native";
import DayPill from "./DayPill";

function addDays(date: Date, days: number) {
  const newDate = new Date(date)
  newDate.setDate(date.getDate() + days)
  return newDate
}

export default function DayScroller({ today }: { today: Date }) {
  return <ScrollView style={styles.dayScroller}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
  >
    <View style={styles.pillContainer}>
      <DayPill
        icon="cloud-moon"
        day={today}
      />
    </View>
    <View style={styles.pillContainer}>
      <DayPill
        icon="cloud"
        day={addDays(today, 1)}
      />
    </View>
    <View style={styles.pillContainer}>
      <DayPill
        icon="cloud-moon-rain"
        day={addDays(today, 2)}
      />
    </View>
    <View style={styles.pillContainer}>
      <DayPill
        icon="cloud-moon"
        day={addDays(today, 3)}
      />
    </View>
    <View style={styles.pillContainer}>
      <DayPill
        icon="cloud-moon"
        day={addDays(today, 4)}
      />
    </View>
    <View style={styles.pillContainer}>
      <DayPill
        icon="cloud-moon"
        day={addDays(today, 5)}
      />
    </View>
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