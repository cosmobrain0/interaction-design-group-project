import { Colors } from "@/constants/Colors";
import { StyleSheet, Switch, Text, View } from "react-native";

export function ToggleSetting({ name, onValueChange, value }: { name: string, onValueChange: ((value: boolean) => Promise<void> | void), value: boolean | undefined}) {
    return (
        <View style={[styles.settingsRow]}>
          <Text style={styles.text}>
            {name}
          </Text>
          <Switch trackColor={{true: Colors.boxLight, false: "#333"}} onValueChange={onValueChange} value={value} />
        </View>
    )
}

const styles = StyleSheet.create({
  settingsRow: {
    margin: 7.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  text: {
    fontSize: 20,
    color: Colors.foregroundPrimary,
  }
})