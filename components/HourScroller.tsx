import { ScrollView, StyleSheet, View } from "react-native";
import HourPill from "./HourPill";


export default function HourScroller({ hourlyData }: { hourlyData: string[] }) {
  return <ScrollView style={styles.dayScroller}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
  >
    {hourlyData.map((value, hour) => (
      <View key={hour} style={styles.pillContainer}>
        <HourPill
          icon="cloud"
          text={value}
          hour={hour}
        />
      </View>
    ))}
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