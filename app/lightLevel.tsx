import Box from "@/components/Box";
import { LineChart } from "@/components/LineChart";
import { PickerSetting } from "@/components/PickerSetting";
import { ToggleSetting } from "@/components/ToggleSetting";
import { Styles } from "@/constants/Styles";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function lightLevel() {
    return (
        <View style={[Styles.container, Styles.background]}>
            <View style={[styles.outer]}>
                <View style={[styles.sunGraph]}>
                    <Box href="" loading={false} title="Sun Position">
                        <LineChart targetWidth="70%" targetHeight="100%" chartData={[0, 0.2, 0.1, 0.6]} chartLabels={["a", "b", "c", "d"]} />
                    </Box>
                </View>
            </View>
        </View>
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
