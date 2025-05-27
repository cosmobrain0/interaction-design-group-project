import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchWeatherApi } from 'openmeteo';

/**
 * fetches light information from an API
 * @returns Different information about the light level over the current day
 */
export const fetchLightLevel = async () => {
  const coordString = await AsyncStorage.getItem('selectedLocationCoords');
  const coords = coordString ? JSON.parse(coordString) : { lat: 52.52, lng: 13.41 };

  const params = {
    latitude: coords.lat,
    longitude: coords.lng,
    hourly: ['diffuse_radiation', 'terrestrial_radiation'],
    timezone: 'auto',
  };

  const url = 'https://api.open-meteo.com/v1/forecast';
  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();
  const hourly = response.hourly();

  if (!hourly) {
    throw new Error('Hourly data is null from the Open-Meteo response.');
  }

  const diffuseRadiation = hourly.variables(0)!.valuesArray()!.slice(0, 24);
  const terrestrialRadiation = hourly.variables(1)!.valuesArray()!.slice(0, 24);

  return {
    diffuseRadiation,
    terrestrialRadiation,
    maxDiffuseRadiation: Math.max(...diffuseRadiation),
    minDiffuseRadiation: Math.min(...diffuseRadiation),
  };
};