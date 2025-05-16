import { Styles } from "@/constants/Styles";
import { SafeAreaView, View } from "react-native";
import WebView from "react-native-webview";

export default function CloudCover() {
  return <SafeAreaView style={Styles.webviewContainer}>
      <View style={Styles.webviewWrapper}>
        <WebView
          style={Styles.webview}
          source={{
            uri: "https://weather.metoffice.gov.uk/maps-and-charts/cloud-cover-map#?model=ukmo-ukv&layer=cloud-amount-total&bbox=[[42.16340342422403,-37.22167968750001],[64.11060221954631,29.223632812500004]]"
          }}
        />
      </View>
    </SafeAreaView>
}