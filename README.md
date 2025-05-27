# Interaction Design Group Project - Astronomy Weather App

This is a weather app targeted at astronomers for the CST: Part IA Interaction Design group project.
This app uses React Native with the Expo framework.

##  How to Run the Program

###  Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or newer)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
  ```bash
  npm install -g expo-cli
  ```
- A package manager: **npm** or **yarn**
- Optional: Android Studio or Xcode for simulators

###  Installation Steps

1. **Clone the project**:
   ```bash
   git clone <https://github.com/cosmobrain0/interaction-design-group-project.git>
   cd interaction-design-group-project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the app**:
   ```bash
   npm start
   # or
   yarn start
   ```
   Then follow the prompts to open it on:
   - a real device via Expo Go app
   - an emulator (Android Studio)
   - iOS simulator (Xcode)
   - or your browser with `w` for web preview

##  Key Libraries Used

###  Core Frameworks:
- `react`, `react-native`: the foundation of your UI
- `expo`: simplifies build, testing, and deployment

###  Navigation:
- `expo-router`: for file-based routing
- `@react-navigation/native`, `@react-navigation/bottom-tabs`: for screen navigation

###  UI Enhancements:
- `@expo/vector-icons`: icon support
- `expo-linear-gradient`, `expo-blur`, `expo-image`, `expo-font`: visual styling
- `react-native-svg`, `react-native-svg-charts`: for drawing and charting

###  Location & Map:
- `react-native-maps`: for map-based views
- `react-native-google-places-autocomplete`: for location search

###  Data & Storage:
- `@react-native-async-storage/async-storage`: persistent storage
- `openmeteo`: for weather data API handling

###  Utilities:
- `expo-constants`, `expo-file-system`, `expo-status-bar`, `expo-system-ui`, `expo-web-browser`: Expo APIs
- `react-native-safe-area-context`, `react-native-screens`, `react-native-gesture-handler`: platform stability

###  Developer Tools:
- `eslint`, `typescript`: code quality and type checking
- `@babel/core`: JavaScript compiler for React Native

##  Notes

- All settings and preferences are saved with `AsyncStorage` so they persist between sessions.
- This app uses `day` index-based logic to handle forecasts and moon phase views for multiple days.