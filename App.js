import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  View,
  BackHandler,
} from "react-native";
import { Text, ListItem } from "react-native-elements";
import Constants from "expo-constants";
import { EXAMPLE_LIST } from "./example-list";

//hahahahahaha hedhi el bronch Waref Sexy
import Onboarding from "react-native-onboarding-swiper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { AsyncStorage } from "@react-native-async-storage/async-storage";

import OnBoardingScreen from "./screens/OnBoardingScreen";
import LoginScreen from "./screens/LoginScreen";
import { Value } from "react-native-reanimated";
const AppStack = createStackNavigator();

export default function App() {
  const [exampleIndex, setExampleIndex] = useState(null);

  // Handle when user press Hardware Back Button
  useEffect(() => {
    // AsyncStorage.getItem("alreadyLaunched").then((Value) => {
    //   if (Value == null) {
    //     AnsyncStorage.setItem("alreadyLaunched", "true");
    //     setIsFirstLaunch(true);
    //   } else {
    //     setIsFirstLaunch(false);
    //   }
    // });

    const backAction = () => {
      // Go back to Example List
      if (exampleIndex !== null) {
        setExampleIndex(null);
      }
      // Exit app if user currently in Example List
      else {
        BackHandler.exitApp();
      }

      return true;
    };

    // https://reactnative.dev/docs/backhandler
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [exampleIndex]);

  if (exampleIndex !== null) return EXAMPLE_LIST[exampleIndex].component;

  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

  // if (isFirstLaunch == null) {
  //   return null;
  // }
  // if (isFirstLaunch == true) {
  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode="none">
        <AppStack.Screen name="Onboarding" component={OnBoardingScreen} />
        <AppStack.Screen name="Login" component={LoginScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
  // } else {
  //   <LoginScreen />;
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  heading: {
    textAlign: "center",
    padding: 12,
  },
  title: {
    fontWeight: "bold",
  },
});
