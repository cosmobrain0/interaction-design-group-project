import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";


export default function Box({ children, href, loading, title, style }: any) {
  return <Link
    href={href}
    style={style ? style : styles.box}
  >
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
    <View style={styles.childrenContainer}>
      { loading ? (
        <ActivityIndicator size="large" color={Colors.foregroundSecondary} />
      ) : children }
    </View>
  </Link>
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    backgroundColor: Colors.boxDark,
    padding: 10,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  titleContainer: {
    width: "100%",
  },
  title: {
    color: Colors.foregroundSecondary
  },
  childrenContainer: {
    flex: 7,
    width: "100%",
    height: "90%",
    justifyContent: "center"
  }
})