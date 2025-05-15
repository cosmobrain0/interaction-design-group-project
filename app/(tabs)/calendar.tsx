import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";

export default function Calendar() {
  const data = Array.from({ length: 20 }, (_, i) => ({
    id: i.toString(),
    title: `Item ${i + 1}`,
  }));

  const handlePress = (item: { title: any; }) => {
    console.log(`Clicked: ${item.title}`);
  };

  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <TouchableOpacity
      onPress={() => handlePress(item)}
      style={styles.item}
    >
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  item: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    width: 300,
    alignItems: "center"
  },
  itemText: {
    fontSize: 16,
    color: "#333"
  }
});