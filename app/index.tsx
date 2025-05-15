import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index to edit this screen.</Text>
      <Link href="/lineGraphTest" style={styles.button}>
        Go to line graph test
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    textDecorationLine: "underline",
  }
});
