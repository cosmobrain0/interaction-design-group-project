import { Colors } from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

function hourNumberToFormattedString(hour: number): string {
  return String(hour).padStart(2, '0')
}

export default function HourPill({ icon, text, hour }: { icon: string, text: string, hour: number }) {
  return <View style={styles.pill}>
    <View style={styles.iconContainer}>
      <FontAwesome6
        name={icon}
        size={45}
        color={Colors.foregroundPrimary}
      />
    </View>
    <View style={styles.dataContainer}>
      <Text style={styles.dataText}>{text}</Text>
      <Text style={styles.hourText}>{hourNumberToFormattedString(hour)}</Text>
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
  dataContainer: {
    flex: 1,
    paddingTop: 2.5
  },
  dataText: {
    textAlign: "center",
    color: Colors.foregroundPrimary,
    fontSize: 35,
    fontWeight: "bold"
  },
  hourText: {
    textAlign: "center",
    color: Colors.foregroundSecondary,
    fontSize: 21,
    fontWeight: "bold"
  }
})