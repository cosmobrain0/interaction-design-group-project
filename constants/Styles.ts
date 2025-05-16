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
  box: {
    position: "absolute",
    top: 200,
    left: 25,
    backgroundColor: Colors.boxDark,
    padding: 10,
    width: "90%",
    height: "30%",
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  button: {
      textDecorationLine: "underline",
  }
})