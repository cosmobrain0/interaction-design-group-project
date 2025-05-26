import { createContext } from "react";

export type WeatherData = {
  date: null | Date
  temperature: null | {
    average: number,
    lowest: number,
    highest: number,
    hourly: number[]
  }
}

export const WeatherContext = createContext<WeatherData>({
  date: null,
  temperature: null
})