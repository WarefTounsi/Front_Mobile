import React from "react";
import { Platform, View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LocationList from "./screens/LocationList";
import LocationDetail from "./screens/LocationDetail";



// https://reactnavigation.org/docs/stack-navigator/
const PokemonStack = createStackNavigator();
const MoveStack = createStackNavigator();
const stackScreenOptions = {
  headerShown: false,
  gestureEnabled: true,
};

function PokemonStackScreen() {
  return (
    <PokemonStack.Navigator screenOptions={stackScreenOptions}>
      <PokemonStack.Screen name="PokemonList" component={LocationList} />
      <PokemonStack.Screen name="LocationDetail" component={LocationDetail} />
    </PokemonStack.Navigator>
  );
}



// https://reactnavigation.org/docs/bottom-tab-navigator/
const Tab = createBottomTabNavigator();
const ActiveColor = "#000000";
const InActiveColor = "#00000077";
const tabScreenOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    return (
      <View style={{ alignItems: "center" }}>
        <Image
          source={route.name === "Pokemons" ? null:null}
          style={{
            opacity: color == ActiveColor ? 1 : 0.5,
            width: size,
            height: size,
          }}
        />
      </View>
    );
  },
});
const tabBarOptions = {
  activeTintColor: ActiveColor,
  inactiveTintColor: InActiveColor,
};

export default function Location() {
  return (
    <>
      <StatusBar style="light" />

      <NavigationContainer>
        <Tab.Navigator
          screenOptions={tabScreenOptions}
          tabBarOptions={tabBarOptions}
        >
          <Tab.Screen name="Locations" component={PokemonStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
