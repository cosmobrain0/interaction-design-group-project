import { Colors } from "@/constants/Colors";
import { Styles } from "@/constants/Styles";
import { curveMonotoneX } from "d3-shape";
import { View, Text } from "react-native";
import { LineChart as Chart, Grid, XAxis, YAxis } from "react-native-svg-charts";

export function LineChart({ chartData, chartLabels }: any) {
  return <View style={[Styles.container, { width: "100%", height: "100%" } ]}>
    <View style={{ flexDirection: 'row', height: "100%" }}>
      <YAxis
        data={chartData}
        contentInset={{ top: 10, bottom: 7.5 }}
        svg={{ fontSize: 10, fill: Colors.foregroundSecondary }}
        style={{ width: 15 }}
        numberOfTicks={5}
      />
      <Chart
        style={{ flex: 1, paddingLeft: 3 }}
        data={chartData}
        curve={curveMonotoneX}
        svg={{ stroke: Colors.foregroundPrimary, strokeWidth: 2 }}
        contentInset={{ top: 10, bottom: 7.5 }}
      >
        <Grid
          direction={Grid.Direction.HORIZONTAL}
          svg={{ stroke: Colors.foregroundSecondary, strokeOpacity: 0.15 }}
        />
      </Chart>
    </View>
    {/*<XAxis
      style={{ width:'100%', marginBottom: 5 }}
      data={chartData}
      formatLabel={(value, index) => {
        const label = chartLabels?.[index];
        const result = index % 4 === 0 && typeof label === 'string' ? label.slice(0, 2) : '';
        console.log(`Label[${index}]:`, result);
        return result;
      }}
      contentInset={{ left: 18, right: 0 }}
      svg={{ fontSize: 10, fill: Colors.foregroundSecondary }}
    />*/}
  </View>
}