import { Picker } from "@react-native-picker/picker";
import { Switch, View, StyleSheet, Text } from "react-native";

export function PickerSetting<T>({ name, onValueChange, value, options }: { name: string, onValueChange: ((value: T) => Promise<void> | void), value: T, options: {name: string, value: T}[] }) {
    const pickerItems = options.map((option, i) => (<Picker.Item key={i} label={option.name} value={option.value} />));
    return (
        <View style={[styles.settingsRow]}>
          <Text style={[styles.floatLeft]}>
            {name}
          </Text>
          <Picker style={styles.floatRight} selectedValue={value} onValueChange={onValueChange}>
            {pickerItems}
          </Picker>

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
    width: "40%",
    fontSize: 20,
    color: "white",
  },
  floatRight: {
    width: "60%",
    color: "white",
  }
})