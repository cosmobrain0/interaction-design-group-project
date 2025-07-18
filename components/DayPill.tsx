import { Colors } from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export const dayNumberToDayString = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
]

export function dateNumberToDateString(dateNumber: number) {
  switch (dateNumber % 10) {
    case 1:
      return dateNumber + "st"
    case 2:
      return dateNumber + "nd"
    case 3:
      return dateNumber + "rd"
  }
  return dateNumber + "th"
}

export default function DayPill({ icon, day, selected }:
  { icon: string, day: Date, selected: boolean }) {
  return <View
    style={[
      styles.pill,
      { backgroundColor: selected ? Colors.foregroundSecondary : Colors.boxDark }
    ]}
  >
    <View style={styles.iconContainer}>
      <FontAwesome6
        name={icon}
        size={45}
        color={selected ? Colors.backgroundDark : Colors.foregroundPrimary}
      />
    </View>
    <View style={styles.dayContainer}>
      <Text style={[styles.dayText, { color: selected ? Colors.backgroundDark : Colors.foregroundPrimary }]}>
        {dayNumberToDayString[day.getDay()]}
        </Text>
      <Text style={[styles.dayText, { color: selected ? Colors.backgroundDark : Colors.foregroundPrimary }]}>
        {dateNumberToDateString(day.getDate())}
        </Text>
    </View>
  </View>
}

const styles = StyleSheet.create({
  pill: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.boxDark,
    borderRadius: 10000,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 2.5
  },
  dayContainer: {
    flex: 1,
    paddingTop: 2.5
  },
  dayText: {
    textAlign: "center",
    color: Colors.foregroundSecondary,
    fontSize: 21,
    fontWeight: "bold"
  }
})
