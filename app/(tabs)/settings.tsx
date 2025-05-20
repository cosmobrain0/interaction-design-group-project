import { PickerSetting } from "@/components/PickerSetting";
import { ToggleSetting } from "@/components/ToggleSetting";
import { Styles } from "@/constants/Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

enum DateFormat {
  DDMMYY = "DDMMYY",
  DDMMYYYY = "DDMMYYYY",
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

export default function Settings() {
  const savedDateFormat: Promise<DateFormat> = loadData("dateFormat", DateFormat.DDMMYY);
  const savedTimeFormat: Promise<TimeFormat> = loadData("timeFormat", TimeFormat.TwelveHour);
  const savedDegreeUnits: Promise<DegreeUnits> = loadData("degreeUnits", DegreeUnits.Celsius);
  const savedNewsAlertsEnabled: Promise<boolean> = loadData("newsAlertsEnabled", false);
  const savedCloudCoverAlertsEnabled: Promise<boolean> = loadData("cloudCoverAlertsEnabled", false);

  const [notificationsEnabled, setNotificationsEnabled] = useState(false); // TODO: read from file or something
  const [newsAlertsEnabled, setNewsAlertsEnabled] = useState(false);
  const [cloudCoverAlertsEnabled, setCloudCoverAlertsEnabled] = useState(false);
  const [dateFormat, setDateFormat] = useState(DateFormat.DDMMYY);
  const [timeFormat, setTimeFormat] = useState(TimeFormat.TwelveHour);
  const [degreeUnits, setDegreeUnits] = useState(DegreeUnits.Celsius);

  savedDateFormat.then(savedValue => setDateFormat(savedValue));
  savedTimeFormat.then(savedValue => setTimeFormat(savedValue));
  savedDegreeUnits.then(savedValue => setDegreeUnits(savedValue));
  savedNewsAlertsEnabled.then(savedValue => {
    setNewsAlertsEnabled(savedValue);
    if (savedValue && cloudCoverAlertsEnabled) setNotificationsEnabled(true);
  });
  savedCloudCoverAlertsEnabled.then(savedValue => {
    setCloudCoverAlertsEnabled(savedValue)
    if (savedValue && newsAlertsEnabled) setNotificationsEnabled(true);
  });

  const dateFormatOptions = [
    {
      name: "DD / MM / YY",
      value: DateFormat.DDMMYY,
    },
    {
      name: "DD / MM / YYYY",
      value: DateFormat.DDMMYYYY,
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
    setNotificationsEnabled(!notificationsEnabled);
    setNewsAlertsEnabled(!notificationsEnabled);
    setCloudCoverAlertsEnabled(!notificationsEnabled);
  }

  const toggleNewsAlerts = () => {
    setNewsAlertsEnabled(!newsAlertsEnabled);
    const newNewsAlertsEnabled = !newsAlertsEnabled;
    saveData("newsAlertsEnabled", newNewsAlertsEnabled).then(() => null);
    if (newNewsAlertsEnabled && cloudCoverAlertsEnabled && !notificationsEnabled) {
      setNotificationsEnabled(true);
    } else if ((!newNewsAlertsEnabled || !cloudCoverAlertsEnabled) && notificationsEnabled) {
      setNotificationsEnabled(false);
    }
  }

  const toggleCloudCoverageAlerts = () => {
    setCloudCoverAlertsEnabled(!cloudCoverAlertsEnabled);
    const newCloudCoverAlertsEnabled = !cloudCoverAlertsEnabled;
    saveData("cloudCoverAlertsEnabled", newCloudCoverAlertsEnabled).then(() => null);
    if (newsAlertsEnabled && newCloudCoverAlertsEnabled && !notificationsEnabled) {
      setNotificationsEnabled(true);
    } else if ((!newsAlertsEnabled || !newCloudCoverAlertsEnabled) && notificationsEnabled) {
      setNotificationsEnabled(false);
    }
  }

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

  return <View style={[styles.settingsColumn, Styles.background]}>
    <ToggleSetting name="Notifications" onValueChange={toggleNotifications} value={notificationsEnabled}/>
    <ToggleSetting name="News Alerts" onValueChange={toggleNewsAlerts} value={newsAlertsEnabled} />
    <ToggleSetting name="Cloud Cover Alerts" onValueChange={toggleCloudCoverageAlerts} value={cloudCoverAlertsEnabled} />
    <PickerSetting name="Date Format" onValueChange={chooseDateFormat} value={dateFormat} options={dateFormatOptions} />
    <PickerSetting name="Time Format" onValueChange={chooseTimeFormat} value={timeFormat} options={timeFormatOptions} />
    <PickerSetting name="Degree Units" onValueChange={chooseDegreeUnits} value={degreeUnits} options={degreeUnitsOptions} />
  </View>
}

const styles = StyleSheet.create({
  settingsColumn: {
    flex: 1,
    padding: 7.5
  }
})
