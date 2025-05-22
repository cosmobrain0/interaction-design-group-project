import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";


export default function LocationPickerButton({ href, savedName }: { href: string, savedName: string | null } ) {
  return <Link href="/locationPicker">
    <View style={styles.locationButton}>
      <Ionicons
        name="location-sharp"
        color={Colors.foregroundPrimary}
        size={30}
      />
      <Text style={styles.locationText}>{savedName || 'Location'}</Text>
    </View>
  </Link>
}

const styles = StyleSheet.create({
  locationText: {
    color: Colors.foregroundPrimary,
    fontSize: 35,
    fontWeight: "bold"
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
  }
})