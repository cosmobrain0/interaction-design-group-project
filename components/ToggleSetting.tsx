import { Switch, View, StyleSheet, Text } from "react-native";

export function ToggleSetting({ name, onValueChange, value }: { name: string, onValueChange: ((value: boolean) => Promise<void> | void), value: boolean | undefined}) {
    return (
        <View style={[styles.settingsRow]}>
          <Text style={[styles.floatLeft]}>
            {name}
          </Text>
          <Switch style={[styles.floatRight]} trackColor={{false: "#333"}} onValueChange={onValueChange} value={value} />
        </View>
    )
}

const styles = StyleSheet.create({
  settingsRow: {
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  floatLeft: {
    width: "70%",
    fontSize: 30,
    color: "white",
  },
  floatRight: {
    width: "30%"
  }
})