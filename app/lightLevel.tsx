import { fetchLightLevel } from "@/api/fetchLightLevel";
import Box from "@/components/Box";
import { LineChart } from "@/components/LineChart";
import LocationSelector from "@/components/LocationSelector";
import { PickerSetting } from "@/components/PickerSetting";
import { ToggleSetting } from "@/components/ToggleSetting";
import { Styles } from "@/constants/Styles";
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function lightLevel() {
    const [savedName, setSavedName] = useState(null);
    let [data, setData] = useState<number[][]>([]);
    let [maxLightLevel, setMaxLightLevel] = useState(0);
    let [loading, setLoading] = useState(true);
    fetchLightLevel().then(x => {
      setData([x.terrestrialRadiation, x.diffuseRadiation]);
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
                        <Box href="" loading={loading} title="Diffuse Light Level">
                            <LineChart targetWidth="100%" targetHeight="100%" chartData={data[1]} chartLabels={new Array(24).fill("").map((_, i) => getHour(i))} />
                        </Box>
                    </View>
                </View>
            </View>
            <View style={[Styles.container, Styles.background]}>
                <View style={[styles.outer]}>
                  <Box href="" loading={loading} title="Diffuse Light Level">
                    <Text>Max light level: {maxLightLevel}</Text>
                  </Box>
                </View>
            </View>
        </SafeAreaView>
    )
}

const getHour = (n: number): string => {
  if (n >= 10) return `${n}:00`;
  else return `0${n}:00`;
};

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
    color: "white",
  },
  sunGraph: {
    margin: 0.75,
    width: "100%",
    height: "100%",
  }
})
