import { Colors } from "@/constants/Colors"
import { FontAwesome6, Ionicons } from "@expo/vector-icons"
import { StyleSheet, Text, View } from "react-native"
import Box from "./Box"


type PrecipitationAndWindData = {
  precipitationChance: number,
  windSpeed: number,
  windDirection: number
}

export default function PrecipitationAndWindBox({ href, loading, data }:
  { href: string, loading: boolean, data: PrecipitationAndWindData }) {
  return <Box
    title="Precipitation and Wind"
    href={href}
    loading={loading}
  >
    <View style={styles.precipitationAndWindColumn}>
      <View style={styles.precipitationAndWindInfoContainer}>
        <Ionicons name="rainy"
          color={Colors.foregroundSecondary}
          size={50}
        />
        <View style={styles.precipitationAndWindInfoTextContainer}>
          <Text style={styles.precipitationAndWindInfoText}>{data.precipitationChance}</Text>
          <Text style={styles.unitsText}>%</Text>
        </View>
      </View>
      <View style={styles.precipitationAndWindInfoContainer}>
        <View style={styles.precipitationAndWindInfoTextContainer}>
          <Text style={styles.precipitationAndWindInfoText}>{data.windSpeed}</Text>
          <Text style={styles.unitsText}>km/h</Text>
        </View>
        <FontAwesome6 name="wind"
          color={Colors.foregroundSecondary}
          size={40}
        />
      </View>
    </View>
  </Box>
}

const styles = StyleSheet.create({
  precipitationAndWindColumn: {
    flex: 1,
    flexDirection: "column",
    paddingRight: 5,
    paddingTop: 5
  },
  precipitationAndWindInfoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  precipitationAndWindInfoText: {
    color: Colors.foregroundPrimary,
    fontSize: 40,
  },
  unitsText: {
    color: Colors.foregroundPrimary,
    fontSize: 20,
  },
  precipitationAndWindInfoTextContainer: {
    flexDirection: "row",
    alignItems: "baseline"
  }
})