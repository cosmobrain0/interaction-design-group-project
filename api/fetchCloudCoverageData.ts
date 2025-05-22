export const fetchCloudCoverageData = async (setChartData: any, setChartLabels: any, setLoading: any) => {
  try {
    // request cloud coverage data from the api
    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.2&longitude=0.1167&hourly=cloud_cover")
    const json = await response.json()

    // use only the first 24 hours of cloud coverage data
    if (!json.hourly) {
      console.log("API limit reached!");
      setLoading(false);
      return;
    }
    const data = json.hourly.cloud_cover.slice(0, 24)
    setChartData(data)

    // set time as x-axis labels
    const timeLabels = json.hourly.time.slice(0, 24).map((t: string | number | Date) => {
      const hour = new Date(t).getHours()
      // return string, formatted to be in the form HH:MM
      return `${String(hour).padStart(2, '0')}:00`
    })
    setChartLabels(timeLabels)
  } catch (error) {
    console.error("Failed to fetch cloud cover data", error)
  } finally {
    setLoading(false)
  }
}
