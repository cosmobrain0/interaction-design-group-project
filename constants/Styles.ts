import { StyleSheet } from "react-native"
import { Colors } from "./Colors"

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    backgroundColor: Colors.backgroundDark
  },
  button: {
      textDecorationLine: "underline",
  },
  headingText: {
    color: Colors.foregroundPrimary,
    fontSize: 30,
    fontWeight: "bold"
  }
})