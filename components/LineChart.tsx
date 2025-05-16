import { Styles } from "@/constants/Styles";
import { curveMonotoneX } from "d3-shape";
import { View } from "react-native";
import { LineChart as Chart, Grid, XAxis, YAxis } from "react-native-svg-charts";

export function LineChart({ chartData, chartLabels }: any) {
  return <View style={Styles.container}>
    <View style={{ flexDirection: 'row', height: 180 }}>
      <YAxis
        data={chartData}
        contentInset={{ top: 20, bottom: 5 }}
        svg={{ fontSize: 10, fill: 'black' }}
        style={{ marginRight: 5 }}
        numberOfTicks={5}
      />
      <Chart
        style={{ flex: 1 }}
        data={chartData}
        curve={curveMonotoneX}
        svg={{ stroke: 'rgb(134, 65, 244)', strokeWidth: 2 }}
        contentInset={{ top: 20, bottom: 5 }}
      >
        <Grid direction={Grid.Direction.HORIZONTAL} />
      </Chart>
    </View>
    <XAxis
      style={{ marginTop: 10, height: 20, marginLeft: 35, width:'100%' }}
      data={chartData}
      formatLabel={(_: any, index: number) => index % 3 === 0 ? chartLabels[index] : ''}
      contentInset={{ left: 10, right: 10 }}
      svg={{ fontSize: 10, fill: 'black' }}
    />
  </View>
}