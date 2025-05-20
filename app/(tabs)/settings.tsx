import Box from "@/components/Box"
import { ToggleSetting } from "@/components/ToggleSetting";
import { Styles } from "@/constants/Styles"
import React, { useState } from "react";
import { Text, View, Image, StyleSheet, Switch } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { PickerSetting } from "@/components/PickerSetting";
import { Colors } from "react-native/Libraries/NewAppScreen";

enum DateFormat {
  DDMMYY,
  DDMMYYYY,
};

enum TimeFormat {
  TwelveHour,
  TwentyFourHour,
}

enum DegreeUnits {
  Celsius,
  Farenheit,
}

export default function Settings() {
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false); // TODO: read from file or something
  const [newsAlertsEnabled, setNewsAlertsEnabled] = useState(false);
  const [cloudCoverAlertsEnabled, setCloudCoverAlertsEnabled] = useState(false);
  const [dateFormat, setDateFormat] = useState(DateFormat.DDMMYY);
  const [timeFormat, setTimeFormat] = useState(TimeFormat.TwelveHour);
  const [degreeUnits, setDegreeUnits] = useState(DegreeUnits.Celsius);

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
    if (newNewsAlertsEnabled && cloudCoverAlertsEnabled && !notificationsEnabled) {
      setNotificationsEnabled(true);
    } else if ((!newNewsAlertsEnabled || !cloudCoverAlertsEnabled) && notificationsEnabled) {
      setNotificationsEnabled(false);
    }
  }

  const toggleCloudCoverageAlerts = () => {
    setCloudCoverAlertsEnabled(!cloudCoverAlertsEnabled);
    const newCloudCoverAlertsEnabled = !cloudCoverAlertsEnabled;
    if (newsAlertsEnabled && newCloudCoverAlertsEnabled && !notificationsEnabled) {
      setNotificationsEnabled(true);
    } else if ((!newsAlertsEnabled || !newCloudCoverAlertsEnabled) && notificationsEnabled) {
      setNotificationsEnabled(false);
    }
  }

  const chooseDateFormat = (newFormat: DateFormat) => {
    setDateFormat(newFormat);
  }

  const chooseTimeFormat = (newFormat: TimeFormat) => {
    setTimeFormat(newFormat);
  }

  const chooseDegreeUnits = (newUnits: DegreeUnits) => {
    setDegreeUnits(newUnits);
  }

  return <View style={[Styles.container, Styles.background, ]}>
    <View style={[Styles.informationColumn, styles.boxDarkBackground]}>
      <View style={[Styles.container]}>
        <ToggleSetting name="Notifications" onValueChange={toggleNotifications} value={notificationsEnabled} />
        <ToggleSetting name="News Alerts" onValueChange={toggleNewsAlerts} value={newsAlertsEnabled} />
        <ToggleSetting name="Cloud Cover Alerts" onValueChange={toggleCloudCoverageAlerts} value={cloudCoverAlertsEnabled} />
        <PickerSetting name="Date Format" onValueChange={chooseDateFormat} value={dateFormat} options={dateFormatOptions} />
        <PickerSetting name="Time Format" onValueChange={chooseTimeFormat} value={timeFormat} options={timeFormatOptions} />
        <PickerSetting name="Degree Units" onValueChange={chooseDegreeUnits} value={degreeUnits} options={degreeUnitsOptions} />
      </View>
    </View>
  </View>
}

const styles = StyleSheet.create({
  settingsRow: {
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  boxDarkBackground: {
    backgroundColor: Colors.boxDark,
  },
  floatLeft: {
    width: "70%",
    fontSize: 30,
    color: "white",
  },
  floatRight: {
    width: "30%"
  }
})
