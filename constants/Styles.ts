import { Platform, StyleSheet } from "react-native"

export const Styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    box: {
      position: "absolute",
      top: 200,
      left: 25,
      backgroundColor: "#ffffff",
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
  },
  webviewContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  topBar: {
    height: Platform.OS === "ios" ? 60 : 40,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0"
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  backButtonText: {
    fontSize: 16,
    color: "#007AFF"
  },
  webviewWrapper: {
    flex: 1
  },
  webview: {
    flex: 1
  }
})