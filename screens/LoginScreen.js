import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  BackHandler,
} from "react-native";
import { Text, ListItem } from "react-native-elements";
import Constants from "expo-constants";
import { EXAMPLE_LIST } from "../example-list";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";

import Location from "../examples/Locations/Location";
import Map from "../examples/Map/Map";
import SPath from "../examples/SPath/SPath";

const Drawer = createDrawerNavigator(
  {
    Location: { screen: Location },
    Map: { screen: Map },
    // SPath: { screen: SPath },
  },
  {
    initialRouteName: "Location",
    unmountInactiveRoutes: true,
    headerMode: "none",
    contentComponent: (props) => <Sidebar {...props} />,
  }
);

const AppNavigator = createStackNavigator(
  {
    Drawer: { screen: Drawer },
  },
  {
    initialRouteName: "Drawer",
  }
);
// const AppContainer = createAppContainer(AppNavigator);

export default function LoginScreen() {
  const [exampleIndex, setExampleIndex] = useState(null);

  // Handle when user press Hardware Back Button
  useEffect(() => {
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

  return (
    <SafeAreaView style={styles.container}>
      {/* <AppContainer /> */}

      <Text h4 style={styles.heading}>
        Tunisicon functionalities
      </Text>

      <ScrollView>
        {EXAMPLE_LIST.map((l, i) => (
          <ListItem key={i} bottomDivider onPress={() => setExampleIndex(i)}>
            <View>
              <Text>Level {l.level}</Text>
            </View>

            <ListItem.Content>
              <ListItem.Title style={styles.title}>{l.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
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
