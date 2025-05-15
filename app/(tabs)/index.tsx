import { Styles } from "@/constants/Styles"
import { Link } from "expo-router"
import { Text, View } from "react-native"

export default function Home() {
  return <View style={Styles.container}>
    <Text>Home</Text>
    <Link href="../lineGraphTest" style={Styles.button}>
      Go to line graph test
    </Link>
  </View>
}
