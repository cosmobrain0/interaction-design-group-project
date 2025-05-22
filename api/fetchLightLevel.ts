export const fetchLightLevel = async () => {
    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=direct_radiation,diffuse_radiation,shortwave_radiation,global_tilted_irradiance,terrestrial_radiation,direct_normal_irradiance")
    const json = await response.json();

    const terrestrialRadiation = json.hourly.terrestrial_radiation.slice(0, 24);
    const diffuseRadiation: number[] = json.hourly.diffuse_radiation.slice(0, 24);
    return {
        terrestrialRadiation,
        diffuseRadiation,
        maxDiffuseRadiation: diffuseRadiation.reduce((a, b) => Math.max(a, b)),
        minDiffuseRadiation: diffuseRadiation.reduce((a, b) => Math.min(a, b)),
    };
}