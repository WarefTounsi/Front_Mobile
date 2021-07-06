import React from "react";
import ScreenDrawer from "./ScreenDrawer";

export const SitesOnMapScreen = ({ navigation }) => (
  <Screen navigation={navigation} name="SitesOnMap" />
);
export const SitesByDistanceScreen = ({ navigation }) => (
  <Screen navigation={navigation} name="SitesByDistance" />
);
export const SitesAlphaScreen = ({ navigation }) => (
  <Screen navigation={navigation} name="SitesAlpha" />
);
export const SettingsScreen = ({ navigation }) => (
  <Screen navigation={navigation} name="Settings" />
);
export const InfoScreen = ({ navigation }) => (
  <Screen navigation={navigation} name="Info" />
);
