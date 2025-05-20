import Box from "@/components/Box"
import { Styles } from "@/constants/Styles";
import { StyleSheet, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"

export default function Calendar() {
  const data = Array.from({ length: 10 }, (_, i) => ({
    id: i.toString(),
    title: `Item ${i + 1}`,
  }));

  const handlePress = (item: { title: any; }) => {
    console.log(`Clicked: ${item.title}`);
  };

  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <TouchableOpacity
      style={[styles.newsRow]}
      onPress={() => handlePress(item)}
    >
      <View style={[Styles.container]}>
        <Box href="" title={item.title}/>
      </View>
    </TouchableOpacity>
  );

  return (<SafeAreaView
    edges={["left", "top", "right"]}
    style={[Styles.container, Styles.background]}
  >
    {/* Heading */}
    <View>
      <Text style={[Styles.headingText]}>Calendar</Text>
    </View>

    {/* News column */}
    <View style={[styles.newsColumn]}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  newsColumn: {
    flex: 1,
    width: "100%",
    padding: 7.5,
    flexDirection: "column",
  },
  newsRow: {
    flex: 1,
    height: 150,
    paddingRight: 7.5,
    flexDirection: "row",
    margin: 7.5
  }
})