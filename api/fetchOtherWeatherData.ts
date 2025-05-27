import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchWeatherApi } from 'openmeteo';



async function loadData<T>(key: string, defaultValue: T): Promise<T> {
  try {
    const valueUnparsed = await AsyncStorage.getItem(key);
    if (valueUnparsed == null) return defaultValue;
    const value: T | null = JSON.parse(valueUnparsed);
    return value == null ? defaultValue : value;
  } catch (_) {
    return defaultValue;
  }
}




export const fetchOtherWeatherData = async (
  day: number,
  setTemperature: any,
  setPrecipitation: any,
  setWind: any,
  setSunrise: any,
  setSunset: any,
  setMinTemperature: any,
  setMaxTemperature: any,
  setHourlyTemperature: any,
  setLoading: any
) => {
  try {
    const hoursOffset = day * 24

    const coordString = await AsyncStorage.getItem('selectedLocationCoords');
    let coords = { lat: 52.2, lng: 0.1167 };
    try {
      const parsed = coordString ? JSON.parse(coordString) : null;
      if (!parsed || typeof parsed.lat !== 'number' || typeof parsed.lng !== 'number') {
        console.warn("Invalid parsed coordinates, using default");
        // Early return if parsed result is invalid
      } else {
        coords = parsed;
      }
    } catch (e) {
      console.warn("Failed to parse selectedLocationCoords, using default coords", e);
    }

    const params = {
      latitude: coords.lat,
      longitude: coords.lng,
      hourly: ['temperature_2m', 'precipitation_probability', 'wind_speed_10m'],
      daily: ['temperature_2m_max', 'temperature_2m_min', 'precipitation_probability_max', 'sunrise', 'sunset'],
      timezone: 'auto',
    };

    const url = 'https://api.open-meteo.com/v1/forecast';
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    const utcOffsetSeconds = response.utcOffsetSeconds();
    const hourly = response.hourly();
    const daily = response.daily();

    if (!hourly || !daily) {
      throw new Error('Missing hourly or daily data');
    }

    const temperature = hourly.variables(0)!.valuesArray()!.subarray(hoursOffset, hoursOffset + 24);
    const precipitation = hourly.variables(1)!.valuesArray()!.subarray(hoursOffset, hoursOffset + 24);
    const wind = hourly.variables(2)!.valuesArray()!.subarray(hoursOffset, hoursOffset + 24);

    const maxTemperature = Math.round(Math.max(...temperature));
    const minTemperature = Math.round(Math.min(...temperature));
    const maxPrecipitation = Math.round(Math.max(...precipitation));

    const average = (arr: Float32Array) => {
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
      }
      return sum / arr.length;
    };

    let avgTemperature = Math.round(average(temperature));
    let convertedMaxTemperature = maxTemperature;
    let convertedMinTemperature = minTemperature;

    const unit = await loadData("degreeUnits", "Celsius");
    const isFahrenheit = unit === "FARENHEIT";
    if (isFahrenheit) {
      avgTemperature = Math.round(avgTemperature * 9 / 5 + 32);
      convertedMaxTemperature = Math.round(maxTemperature * 9 / 5 + 32);
      convertedMinTemperature = Math.round(minTemperature * 9 / 5 + 32);
    }

    setMaxTemperature(convertedMaxTemperature);
    setMinTemperature(convertedMinTemperature);
    setHourlyTemperature([...hourly.variables(0)!.valuesArray()!.subarray(hoursOffset, hoursOffset + 24)])
    setPrecipitation(maxPrecipitation);

    

    await AsyncStorage.setItem('avgTemperature', avgTemperature.toString());
    await AsyncStorage.setItem('maxTemperature', convertedMaxTemperature.toString());
    await AsyncStorage.setItem('minTemperature', convertedMinTemperature.toString());
    await AsyncStorage.setItem('maxPrecipitationProbability', maxPrecipitation.toString());

    const avgPrecipitation = Math.round(average(precipitation) * 100);
    const avgWind = Number(average(wind).toFixed(1));

    await AsyncStorage.setItem('averagePrecipitation', avgPrecipitation.toString());
    await AsyncStorage.setItem('averageWind', avgWind.toString());

    const sunriseVar = daily.variables(3)!;
    const sunsetVar = daily.variables(4)!;
    const sunrise = new Date((Number(sunriseVar.valuesInt64(day)) + utcOffsetSeconds) * 1000);
    const sunset = new Date((Number(sunsetVar.valuesInt64(day)) + utcOffsetSeconds) * 1000);

    const timeFormat = await loadData("timeFormat", "TwentyFourHour");
    const timeOptions: Intl.DateTimeFormatOptions = timeFormat === "TWELVEHOUR"
      ? { hour: "numeric", minute: "numeric", hour12: true }
      : { hour: "numeric", minute: "numeric", hour12: false };



    setTemperature(avgTemperature);
    await AsyncStorage.setItem('temperatureData', JSON.stringify(temperature));
    await AsyncStorage.setItem('precipitationData', JSON.stringify(precipitation));
    setWind(avgWind);
    await AsyncStorage.setItem('windData', JSON.stringify(wind));
    await AsyncStorage.setItem('sunriseTime', sunrise.toISOString());
    setSunrise(sunrise);
    await AsyncStorage.setItem('sunsetTime', sunset.toISOString());
    setSunset(sunset);
  } catch (error) {
    console.error('Failed to fetch other weather data', error);
  } finally {
    setLoading(false);
  }
};
