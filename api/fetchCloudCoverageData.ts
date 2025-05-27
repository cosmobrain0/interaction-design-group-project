import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchWeatherApi } from 'openmeteo';

/**
 * Loads cloud coverage data for a specific day and passes it to a chart (or something else) using the provided callbacks
 * @param day the day to get coverage for
 * @param setChartData the callback to pass cloud coverage percentages to
 * @param setChartLabels the callback to pass labels for the chart to
 * @param setLoading the callback which allows a component relying on this async function to be told when the function is loading new data and when it is done
 */
export const fetchCloudCoverageData = async (day: number, setChartData: any, setChartLabels: any, setLoading: any) => {
  try {
    const hoursOffset = 24 * day

    const coordString = await AsyncStorage.getItem('selectedLocationCoords');
    const coords = coordString ? JSON.parse(coordString) : { lat: 52.2, lng: 0.1167 };

    const params = {
      latitude: coords.lat,
      longitude: coords.lng,
      hourly: ['cloud_cover'],
      current: 'cloud_cover',
    };
    const url = 'https://api.open-meteo.com/v1/forecast';
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    const utcOffsetSeconds = response.utcOffsetSeconds();
    const hourly = response.hourly();
    if (!hourly) {
      throw new Error("Hourly data is null");
    }

    const timeLabels = [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
      (_, i) => {
        const date = new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000);
        return `${String(date.getHours()).padStart(2, '0')}:00`;
      }
    );

    if (timeLabels.length < 24) {
      throw new Error("Not enough time labels to render chart");
    }

    const cloudCoverData = hourly.variables(0)!.valuesArray()!.slice(hoursOffset, hoursOffset + 24);

    setChartData(cloudCoverData);
    setChartLabels(timeLabels.slice(0, 24));
  } catch (error) {
    console.error("Failed to fetch cloud cover data", error)
  } finally {
    setLoading(false)
  }
}
