export const fetchMoonData = async (setMoonData: any, setLoading: any) => {
  try {
    setLoading(true)
    // request moonphase from api
    const response = await fetch("https://api.viewbits.com/v1/moonphase")
    const json = await response.json()

    // use only the current date's moonphase
    const todayMoonData = json[3]
    setMoonData(todayMoonData)

  } catch (error) {
    console.error("Failed to fetch moon data", error)
  } finally {
    setLoading(false)
  }
}