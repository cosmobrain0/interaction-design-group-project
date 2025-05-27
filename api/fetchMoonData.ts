export type moonDataType = {
  phase: string,
  illumination: string,
  moon_age: string
}

/**
 * Fetches the moon phase, illumination and age on a specific day from an API.
 * @param day the day which we are interested in
 * @param setMoonData a callback to trigger when the data has been successfully fetched
 * @param setLoading a callback to trigger when starting to load data and when we're done loading data
 */
export const fetchMoonData = async (day: number, setMoonData: any, setLoading: any) => {
  let response;
  try {
    setLoading(true)
    response = await fetch("https://api.viewbits.com/v1/moonphase")
    const json = await response.json()

    const todayMoonData = json[day]
    setMoonData(todayMoonData)

  } catch (error) {
    console.error("Failed to fetch moon data", error, await response?.text())
  } finally {
    setLoading(false)
  }
}