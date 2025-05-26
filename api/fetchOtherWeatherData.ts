import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchWeatherApi } from 'openmeteo';

export const fetchOtherWeatherData = async (
  setTemperature: any,
  setPrecipitation: any,
  setWind: any,
  setSunrise: any,
  setSunset: any,
  setMinTemperature: any,
  setMaxTemperature: any,
  setLoading: any
) => {
  try {
    const coordString = await AsyncStorage.getItem('selectedLocationCoords');
    let coords = { lat: 52.2, lng: 0.1167 };
    try {
      const parsed = coordString ? JSON.parse(coordString) : null;
      if (!parsed || typeof parsed.lat !== 'number' || typeof parsed.lng !== 'number') {
        console.warn("Invalid parsed coordinates, using default");
        // Early return if parsed result is invalid
        return;
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

    const temperature = hourly.variables(0)!.valuesArray()!.subarray(0, 24);
    const precipitation = hourly.variables(1)!.valuesArray()!.subarray(0, 24);
    const wind = hourly.variables(2)!.valuesArray()!.subarray(0, 24);

    const maxTemperature = Math.round(daily.variables(0)!.valuesArray()![0]);
    const minTemperature = Math.round(daily.variables(1)!.valuesArray()![0]);
    const maxPrecipitation = Math.round(daily.variables(2)!.valuesArray()![0]);

    const average = (arr: Float32Array) => {
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
      }
      return sum / arr.length;
    };

    const avgTemperature = Math.round(average(temperature));

    setMaxTemperature(maxTemperature);
    setMinTemperature(minTemperature);
    setPrecipitation(maxPrecipitation);

    await AsyncStorage.setItem('avgTemperature', avgTemperature.toString());
    await AsyncStorage.setItem('maxTemperature', maxTemperature.toString());
    await AsyncStorage.setItem('minTemperature', minTemperature.toString());
    await AsyncStorage.setItem('maxPrecipitationProbability', maxPrecipitation.toString());

    const avgPrecipitation = Math.round(average(precipitation) * 100);
    const avgWind = Number(average(wind).toFixed(1));

    await AsyncStorage.setItem('averagePrecipitation', avgPrecipitation.toString());
    await AsyncStorage.setItem('averageWind', avgWind.toString());

    const sunriseVar = daily.variables(3)!;
    const sunsetVar = daily.variables(4)!;
    const sunrise = new Date((Number(sunriseVar.valuesInt64(0)) + utcOffsetSeconds) * 1000);
    const sunset = new Date((Number(sunsetVar.valuesInt64(0)) + utcOffsetSeconds) * 1000);

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
