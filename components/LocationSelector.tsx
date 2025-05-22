import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

export default function LocationSelector({ savedName }: { savedName: string | null }) {
    return (
        <View style={styles.locationSelector}>
          <Link href="/locationPicker">
            <View style={styles.locationButton}>
              <Ionicons
                name="location-sharp"
                color={Colors.foregroundPrimary}
                size={30}
                style={styles.locationIcon}
              />
              <Text style={styles.locationText}>{savedName || 'Location'}</Text>
            </View>
          </Link>
        </View>
    )
}

const styles = StyleSheet.create({
  locationIcon: {

  },
  locationText: {
    color: Colors.foregroundPrimary,
    fontSize: 35,
    fontWeight: "bold"
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationSelector: {
    flex: 0.8,
    flexDirection: "row",
    paddingHorizontal: 15,
  },
})