import { fetchLightLevel } from "@/api/fetchLightLevel";
import Box from "@/components/Box";
import { LineChart } from "@/components/LineChart";
import LocationSelector from "@/components/LocationSelector";
import { PickerSetting } from "@/components/PickerSetting";
import { ToggleSetting } from "@/components/ToggleSetting";
import { Styles } from "@/constants/Styles";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function lightLevel() {
    const [savedName, setSavedName] = useState(null);
    let [data, setData] = useState<number[] | null>(null);
    let [loading, setLoading] = useState(true);
    fetchLightLevel().then(x => {
      setData(x.terrestrialRadiation);
      setLoading(false);
    });
    return (
        <SafeAreaView
            edges={["left", "top", "right"]}
            style={[Styles.background, Styles.safeAreaView]}
        >
            <LocationSelector savedName={savedName} />
            <View style={[Styles.container, Styles.background]}>
                <View style={[styles.outer]}>
                    <View style={[styles.sunGraph]}>
                        <Box href="" loading={loading} title="Light Level">
                            <LineChart targetWidth="100%" targetHeight="100%" chartData={data} chartLabels={new Array(24).fill("")} />
                        </Box>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  settingsColumn: {
    padding: 7.5
  },
  outer: {
    width: "100%",
    margin: 0.75,
    paddingHorizontal: 7.5,
    paddingBottom: 7.5,
    height: 200,
  },
  sunGraph: {
    margin: 0.75,
    width: "100%",
    height: "100%",
  }
})
