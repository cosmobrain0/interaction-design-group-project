export const fetchAstronomyNews = async (setChartData: any, setChartLabels: any, setLoading: any) => {
  try {
    // request cloud coverage data from the api
    const response = await fetch("https://api.xmltime.com/astronomy?accesskey=Drq8BaQL56&expires=2025-05-20T16%3A34%3A18%2B00%3A00&signature=68aJvfrZ4hdfE6u2ZMTGKUUK0uw%3D&version=3&prettyprint=1&out=js&object=sun&placeid=norway%2Foslo&startdt=2025-05-20")
    const json = await response.json()
    console.log(json)
  } catch (error) {
    console.error("Failed to fetch cloud cover data", error)
  } finally {
    setLoading(false)
  }
}
