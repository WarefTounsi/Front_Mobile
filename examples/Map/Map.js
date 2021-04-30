import React from "react";
import { Platform, View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import gmap from "./Gmap";
import LocationDetail from "./LocationDetail";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";




// https://reactnavigation.org/docs/stack-navigator/
const AppStack = createStackNavigator();
const stackScreenOptions = {
  headerShown: false,
  gestureEnabled: true,
};
const tabBarOptions = {
    activeTintColor: ActiveColor,
    inactiveTintColor: InActiveColor,
  };
  const Tab = createBottomTabNavigator();
  const ActiveColor = "#000000";
  const InActiveColor = "#00000077";
function AppStackScreen() {
  return (
    <AppStack.Navigator screenOptions={stackScreenOptions}>
      <AppStack.Screen name="Map" component={gmap} />
      <AppStack.Screen name="LocationDetail" component={LocationDetail} />
    </AppStack.Navigator>
  );
}

export default function Location() {
    return (
      <>
        <StatusBar style="light" />
  
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={stackScreenOptions}
            tabBarOptions={tabBarOptions}
          >
            <Tab.Screen name="Locations" component={AppStackScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </>
    );
  }