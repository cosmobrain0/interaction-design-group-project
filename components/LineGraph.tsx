import { useRef } from "react";
import { Text } from "react-native";

export default function LineGraph({ data_points }: { data_points: Array<number> }) {
    const xAxisLength = data_points.length;
    const yAxisMin = data_points.reduce((a, b) => Math.min(a, b));
    const yAxisMax = data_points.reduce((a, b) => Math.max(a, b));
    const yAxisSize = yAxisMax - yAxisMin;
    // ASSERT: yAxisSize > 0 (idk what to do if it's 0)

    const xAxisNormalisedStep = 1 / xAxisLength;
    const yAxisNormalisedStep = 1 / yAxisSize;

    const normalisedDataPoints = data_points.map((y, i) => {
        return {
            x: i * xAxisNormalisedStep,
            y: (y-yAxisMin) * yAxisNormalisedStep
        }
    });

    let canvas = useRef(null);



    return (
        <canvas ref={canvas}>
            Your browser does not support a Canvas
        </canvas>
    )
}