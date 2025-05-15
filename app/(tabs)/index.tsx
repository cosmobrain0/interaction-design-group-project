import { Link } from "expo-router"
import { StyleSheet, Text, View } from "react-native"

export default function Home() {
  return <View style={styles.container}>
    <Text>Home</Text>
    <Link href="../lineGraphTest" style={styles.button}>
      Go to line graph test
    </Link>
  </View>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    button: {
      textDecorationLine: "underline",
    }
  })