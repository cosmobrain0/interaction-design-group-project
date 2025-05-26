export function getMoonIcon(phase: string) {
  switch (phase) {
    case "New Moon": return require("@/assets/MoonIcons/newmoon.png")
    case "Full Moon": return require("@/assets/MoonIcons/fullmoon.png")
    case "Waning Crescent": return require("@/assets/MoonIcons/waningcrescent1.png")
    case "Waxing Crescent": return require("@/assets/MoonIcons/waxingcrescent1.png")
    case "First Quarter": return require("@/assets/MoonIcons/firstquarter.png")
    case "Last Quarter": return require("@/assets/MoonIcons/lastquarter.png")
    case "Waxing Gibbous": return require("@/assets/MoonIcons/waxinggibbous1.png")
    case "Waning Gibbous": return require("@/assets/MoonIcons/waninggibbous1.png")

    default: return require("@/assets/MoonIcons/fullmoon.png")
  }
}