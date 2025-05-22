import { Colors } from "@/constants/Colors";
import { Styles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function Temperature() {

  return <View style={[Styles.background, styles.dataColumn]}>
    <Text style={styles.averageTemperatureText}>
      22°
    </Text>
    <View style={styles.extremeTemperaturesContainer}>
      <View style={styles.extremeTemperatureContainer}>
        <Ionicons
          style={styles.extremeTemperatureIcon}
          name="arrow-up"
          color={Colors.foregroundSecondary}
          size={45}
        />
        <Text style={styles.extremeTemperatureText}>
          22°
        </Text>
      </View>
      <View style={styles.extremeTemperatureContainer}>
        <Ionicons
          style={styles.extremeTemperatureIcon}
          name="arrow-down"
          color={Colors.foregroundSecondary}
          size={45}
        />
        <Text style={styles.extremeTemperatureText}>
          9°
        </Text>
      </View>
    </View>
  </View>
}

const styles = StyleSheet.create({
  dataColumn: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  averageTemperatureText: {
    color: Colors.foregroundPrimary,
    fontSize: 200
  },
  extremeTemperaturesContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  extremeTemperatureContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  extremeTemperatureIcon: {

  },
  extremeTemperatureText: {
    color: Colors.foregroundPrimary,
    fontSize: 50,
    fontWeight: "bold"
  }
})