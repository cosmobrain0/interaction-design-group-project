import Box from "@/components/Box"
import { ToggleSetting } from "@/components/ToggleSetting";
import { Styles } from "@/constants/Styles"
import { useState } from "react";
import { Text, View, Image, StyleSheet, Switch } from "react-native"

export default function Settings() {
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false); // TODO: read from file or something
  const [newsAlertsEnabled, setNewsAlertsEnabled] = useState(false);
  const [cloudCoverAlertsEnabled, setCloudCoverAlertsEnabled] = useState(false);

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

  return <View style={[Styles.container, Styles.background]}>
    <View style={Styles.informationColumn}>
      <View style={[Styles.container]}>
        <ToggleSetting name="Notifications" onValueChange={toggleNotifications} value={notificationsEnabled} />
        <ToggleSetting name="News Alerts" onValueChange={toggleNewsAlerts} value={newsAlertsEnabled} />
        <ToggleSetting name="Cloud Cover Alerts" onValueChange={toggleCloudCoverageAlerts} value={cloudCoverAlertsEnabled} />
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
  floatLeft: {
    width: "70%",
    fontSize: 30,
    color: "white",
  },
  floatRight: {
    width: "30%"
  }
})
