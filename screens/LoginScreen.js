import React from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  View,
  BackHandler,
  Button,
} from "react-native";
import { Text, ListItem } from "react-native-elements";
import Constants from "expo-constants";
import { EXAMPLE_LIST } from "../example-list";

const [exampleIndex, setExampleIndex] = React.useState(null);

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text h4 style={styles.heading}>
        React Native Expo Examples
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
};

export default LoginScreen;
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
