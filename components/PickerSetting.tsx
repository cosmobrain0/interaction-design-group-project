import { Colors } from "@/constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";

export function PickerSetting<T>({ name, onValueChange, value, options }: { name: string, onValueChange: ((value: T) => Promise<void> | void), value: T, options: {name: string, value: T}[] }) {
  const pickerItems = options.map((option, i) => (<Picker.Item key={i} label={option.name} value={option.value} />));
  return <View style={styles.settingsRow}>
    <Text style={styles.text}>
      {name}
    </Text>
    <Picker style={styles.picker}
      itemStyle={styles.pickerItem}
      selectedValue={value}
      onValueChange={onValueChange}
    >
      {pickerItems}
    </Picker>
  </View>
}

const styles = StyleSheet.create({
  settingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 7.5,
    marginVertical: 2.5
  },
  text: {
    fontSize: 20,
    color: Colors.foregroundPrimary,
  },
  picker: {
    width: "65%",
    color: Colors.foregroundPrimary,
  },
  pickerItem: {
    height: 50,
  }
})