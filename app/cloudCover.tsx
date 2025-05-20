import { SafeAreaView, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";

export default function CloudCover() {
  return <SafeAreaView style={styles.webviewContainer}>
      <View style={styles.webviewWrapper}>
        <WebView
          style={styles.webview}
          source={{
            uri: "https://weather.metoffice.gov.uk/maps-and-charts/cloud-cover-map#?model=ukmo-ukv&layer=cloud-amount-total&bbox=[[42.16340342422403,-37.22167968750001],[64.11060221954631,29.223632812500004]]"
          }}
        />
      </View>
    </SafeAreaView>
}

const styles = StyleSheet.create(
  {
    webviewContainer: {
      flex: 1,
      backgroundColor: "white"
    },
    webviewWrapper: {
      flex: 1
    },
    webview: {
      flex: 1
    }
  }
)
