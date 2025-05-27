import { Colors } from "@/constants/Colors";
import { SafeAreaView, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";

/**
 * Component for the cloud coverage,
 * implmemented using a WebView to get
 * accurate data from the Met Office
 */
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
      backgroundColor: Colors.backgroundDark,
    },
    webviewWrapper: {
      flex: 1,
      borderColor: Colors.backgroundDark,
      borderWidth: 10,
      borderRadius: 10,
    },
    webview: {
      flex: 1
    }
  }
)
