import { StyleSheet } from "react-native"
import { Colors } from "./Colors"

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  background: {
    backgroundColor: Colors.backgroundDark
  },
  button: {
      textDecorationLine: "underline",
  },
  informationColumn: {
    flex: 11,
    width: "100%",
    padding: 7.5,
    flexDirection: "column"
  }
})