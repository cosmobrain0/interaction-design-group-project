import { fetchLightLevel } from "@/api/fetchLightLevel";
import Box from "@/components/Box";
import { LineChart } from "@/components/LineChart";
import { Colors } from "@/constants/Colors";
import { Styles } from "@/constants/Styles";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function lightLevel() {
    const [savedName, setSavedName] = useState(null);
    let [data, setData] = useState<number[][]>([]);
    let [maxLightLevel, setMaxLightLevel] = useState(0);
    let [minLightLevel, setMinLightLevel] = useState(0);
    let [loading, setLoading] = useState(true);
    useFocusEffect(
      React.useCallback(() => {
        fetchLightLevel().then(x => {
          setData([x.terrestrialRadiation, x.diffuseRadiation]);
          setMaxLightLevel(x.diffuseRadiation.reduce((a, b) => Math.max(a, b)));
          setMinLightLevel(x.diffuseRadiation.reduce((a, b) => Math.min(a, b)));
          setLoading(false);
        });
      }, [])
    );
    return (
        <View
            style={[Styles.background, Styles.safeAreaView, { justifyContent: "flex-start" }]}
        >
          <View style={styles.settingsColumn}>
            <View style={[styles.outer]}>
                <View style={[styles.sunGraph]}>
                    <Box href="" loading={loading} title="Diffuse Light Level">
                        <LineChart targetWidth="100%" targetHeight="100%" chartData={data[1]} chartLabels={new Array(24).fill("").map((_, i) => getHour(i))} />
                    </Box>
                </View>
            </View>
            <View style={[styles.outer]}>
              <Box href="" loading={loading} title="Minimum and Maximum light levels">
                <View style={[styles.horizontal]}>
                  <Text style={[styles.info, styles.left]}>Max light level: {maxLightLevel}</Text>
                  <Text style={[styles.info, styles.right]}>Min light level: {minLightLevel}</Text>
                </View>
              </Box>
            </View>
          </View>
        </View>
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
    margin: 7.5,
    height: 200,
    color: "white",
  },
  sunGraph: {
    margin: 0.75,
    width: "100%",
    height: "100%",
  },
  info: {
    color: Colors.foregroundPrimary,
  },
  left: {
    width: "50%",
  },
  right: {
    width: "50%",
    textAlign: "right",
  },
  horizontal: {
    flex: 1,
    flexDirection: "row",
  }
})
