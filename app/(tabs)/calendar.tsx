import * as calendarData from "@/assets/data/calendar.json"
import Box from "@/components/Box"
import { Colors } from "@/constants/Colors";
import { Styles } from "@/constants/Styles";
import { StyleSheet, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"

/**
 * Component for the calendar page,
 * showing a list of events with dates, titles and descriptions
 */
export default function Calendar() {
  const fullData = Object.values(calendarData).slice(0, -1)
  const today = new Date()
  const curIdx = fullData.findIndex((x) => {return new Date(x.date) > today})
  const data = fullData.slice(curIdx > 0 ? curIdx - 1: curIdx)

  const handlePress = (item: { title: any; }) => {
    console.log(`Clicked: ${item.title}`);
  };

  const renderItem = ({ item }: { item: { id: number, title: string, contents: string } }) => (
    <TouchableOpacity
      style={[styles.newsRow]}
      onPress={() => handlePress(item)}
    >
      <View style={[Styles.container]}>
        <Box href="">
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.contents}>{item.contents}</Text>
        </Box>
      </View>
    </TouchableOpacity>
  );

  return <SafeAreaView
    edges={["left", "top", "right"]}
    style={[Styles.container, Styles.background]}
  >
    {/* Heading */}
    <Text style={[Styles.headingText]}>Calendar</Text>

    {/* News column */}
    <View style={[styles.newsColumn]}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
      />
    </View>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  newsColumn: {
    flex: 1,
    width: "100%",
    padding: 15,
    flexDirection: "column",
  },
  newsRow: {
    flex: 1,
    height: 150,
    flexDirection: "row",
    marginBottom: 15
  },
  title: {
    color: Colors.foregroundPrimary,
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 7.5
  },
  contents: {
    color: Colors.foregroundSecondary
  },
})