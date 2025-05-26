export type moonDataType = {
  phase: string,
  illumination: string,
  moon_age: string
}

export const fetchMoonData = async (setMoonData: any, setLoading: any) => {
  try {
    setLoading(true)
    const response = await fetch("https://api.viewbits.com/v1/moonphase")
    const json = await response.json()

    const todayMoonData = json[3]
    console.log("hi")
    setMoonData(todayMoonData)

  } catch (error) {
    console.error("Failed to fetch moon data", error)
  } finally {
    setLoading(false)
  }
}