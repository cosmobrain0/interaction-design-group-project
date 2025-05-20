export const fetchAstronomyNews = async () => {
  try {
    // request cloud coverage data from the api
    // const response = await fetch("https://api.xmltime.com/astronomy?accesskey=Drq8BaQL56&expires=2025-05-20T16%3A34%3A18%2B00%3A00&signature=68aJvfrZ4hdfE6u2ZMTGKUUK0uw%3D&version=3&prettyprint=1&out=js&object=sun&placeid=norway%2Foslo&startdt=2025-05-20")
    // const json = await response.json()
    // console.log(json)
    // return json
    // const response = await fetch("https://www.timeanddate.com/astronomy/sights-to-see.html")
    // console.log(response)
    // return response
    const url = 'https://astronomy-calendar.p.rapidapi.com/events.php?year=2024';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'astronomy-calendar.p.rapidapi.com'
      }
    };
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
    return result
  } catch (error) {
    console.error("Failed to fetch cloud cover data", error)
  }
}
