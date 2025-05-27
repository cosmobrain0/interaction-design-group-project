import { PickerSetting } from "@/components/PickerSetting";
import { ToggleSetting } from "@/components/ToggleSetting";
import { Colors } from "@/constants/Colors";
import { Styles } from "@/constants/Styles";
import Box from "@/components/Box";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"

enum DateFormat {
  DDMMYY = "DDMMYY",
  MMDDYY = "MMDDYY",
};

enum TimeFormat {
  TwelveHour = "TWELVEHOUR",
  TwentyFourHour = "TWENTYFOURHOUR",
}

enum DegreeUnits {
  Celsius = "CELSIUS",
  Farenheit = "FARENHEIT",
}

async function loadData<T>(key: string, defaultValue: T): Promise<T> {
  try {
    const valueUnparsed = await AsyncStorage.getItem(key);
    if (valueUnparsed == null) return defaultValue;
    const value: T | null = JSON.parse(valueUnparsed);
    return value == null ? defaultValue : value;
  } catch (_) {
    return defaultValue;
  }
}

async function saveData<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
}

/**
 * Component for the settings page,
 * allowing the user to change things such as notification settings,
 * temperature units and date formats
 */
export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [newsAlertsEnabled, setNewsAlertsEnabled] = useState(false);
  const [cloudCoverAlertsEnabled, setCloudCoverAlertsEnabled] = useState(false);
  const [dateFormat, setDateFormat] = useState(DateFormat.DDMMYY);
  const [timeFormat, setTimeFormat] = useState(TimeFormat.TwelveHour);
  const [degreeUnits, setDegreeUnits] = useState(DegreeUnits.Celsius);

  React.useEffect(() => {
    loadData("dateFormat", DateFormat.DDMMYY).then(setDateFormat);
    loadData("timeFormat", TimeFormat.TwelveHour).then(setTimeFormat);
    loadData("degreeUnits", DegreeUnits.Celsius).then(setDegreeUnits);
    loadData("newsAlertsEnabled", false).then((value) => {
      setNewsAlertsEnabled(value);
      if (value && cloudCoverAlertsEnabled) setNotificationsEnabled(true);
    });
    loadData("cloudCoverAlertsEnabled", false).then((value) => {
      setCloudCoverAlertsEnabled(value);
      if (value && newsAlertsEnabled) setNotificationsEnabled(true);
    });
  }, []);

  const dateFormatOptions = [
    {
      name: "DD / MM / YY",
      value: DateFormat.DDMMYY,
    },
    {
      name: "MM / DD / YY",
      value: DateFormat.MMDDYY,
    }
  ];

  const timeFormatOptions = [
    {
      name: "12 hour",
      value: TimeFormat.TwelveHour,
    },
    {
      name: "24 hour",
      value: TimeFormat.TwentyFourHour,
    }
  ];

  const degreeUnitsOptions = [
    {
      name: "Celsius",
      value: DegreeUnits.Celsius,
    },
    {
      name: "Farenheit",
      value: DegreeUnits.Farenheit,
    }
  ];

  const toggleNotifications = () => {
    const newNotificationsEnabled = !notificationsEnabled;
    setNotificationsEnabled(newNotificationsEnabled);

    if (!newNotificationsEnabled) {
      setNewsAlertsEnabled(false);
      setCloudCoverAlertsEnabled(false);
      saveData("newsAlertsEnabled", false);
      saveData("cloudCoverAlertsEnabled", false);
    }
  };

  const toggleNewsAlerts = () => {
    const newNewsAlertsEnabled = !newsAlertsEnabled;
    setNewsAlertsEnabled(newNewsAlertsEnabled);
    saveData("newsAlertsEnabled", newNewsAlertsEnabled);

    if (newNewsAlertsEnabled || cloudCoverAlertsEnabled) {
      setNotificationsEnabled(true);
    } else {
      setNotificationsEnabled(false);
    }
  };

  const toggleCloudCoverageAlerts = () => {
    const newCloudCoverAlertsEnabled = !cloudCoverAlertsEnabled;
    setCloudCoverAlertsEnabled(newCloudCoverAlertsEnabled);
    saveData("cloudCoverAlertsEnabled", newCloudCoverAlertsEnabled);

    if (newsAlertsEnabled || newCloudCoverAlertsEnabled) {
      setNotificationsEnabled(true);
    } else {
      setNotificationsEnabled(false);
    }
  };

  const chooseDateFormat = (newFormat: DateFormat) => {
    setDateFormat(newFormat);
    saveData("dateFormat", newFormat).then(() => null);
  }

  const chooseTimeFormat = (newFormat: TimeFormat) => {
    setTimeFormat(newFormat);
    saveData("timeFormat", newFormat).then(() => null);
  }

  const chooseDegreeUnits = (newUnits: DegreeUnits) => {
    setDegreeUnits(newUnits);
    saveData("degreeUnits", newUnits).then(() => null);
  }

  return <SafeAreaView
      edges={["left", "top", "right"]}
      style={[Styles.container, Styles.background]}
  >
    <Text style={[Styles.headingText]}>Settings</Text>
    <View style={[styles.settingsContainer]}>
      <Box href="" style={[styles.settingsColumn]}>
        <ToggleSetting name="Notifications" onValueChange={toggleNotifications} value={notificationsEnabled}/>
        <ToggleSetting name="News Alerts" onValueChange={toggleNewsAlerts} value={newsAlertsEnabled} />
        <ToggleSetting name="Cloud Cover Alerts" onValueChange={toggleCloudCoverageAlerts} value={cloudCoverAlertsEnabled} />
        <PickerSetting name="Date Format" onValueChange={chooseDateFormat} value={dateFormat} options={dateFormatOptions} />
        <PickerSetting name="Time Format" onValueChange={chooseTimeFormat} value={timeFormat} options={timeFormatOptions} />
        <PickerSetting name="Degree Units" onValueChange={chooseDegreeUnits} value={degreeUnits} options={degreeUnitsOptions} />
      </Box>
    </View>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  settingsColumn: {
      flex: 1,
      width: "100%",
      flexDirection: "column",
      backgroundColor: Colors.boxDark,
      padding: 10,
      borderRadius: 8,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4
    },
  settingsContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    paddingBottom: 0,
    width: "100%"
  }
})
