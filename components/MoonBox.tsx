import { Colors } from "@/constants/Colors";
import { Image, StyleSheet, Text, View } from "react-native";
import Box from "./Box";
import { getMoonIcon } from "./getMoonIcon";

export default function MoonBox({ href, loading, data }: { href: string, loading: boolean, data: any }) {
  return <Box href="" title="Moon Phase" loading={loading}>
    <View style={styles.moonContent}>
      <View style={styles.iconContainer}>
        <Image
          source={getMoonIcon(data.phase)}
          style={styles.icon}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.phase}>{data.phase}</Text>
        <Text style={styles.info}>Illumination: {data.illumination}</Text>
        <Text style={styles.info}>Age: {data.moon_age}</Text>
      </View>
    </View>
  </Box>
}

const styles = StyleSheet.create({
  moonContent: {
    flex: 1,
    justifyContent: "center"
  },
  phase: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.foregroundPrimary,
    marginBottom: 2,
  },
  infoContainer: {

  },
  info: {
    fontSize: 14,
    color: Colors.foregroundSecondary,
  },
  iconContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    width: 55,
    height: 55,
    resizeMode: "contain"
  }
})