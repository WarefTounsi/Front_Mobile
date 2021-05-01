import React from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Onboarding from "react-native-onboarding-swiper";
import { Props } from "react-native-image-zoom-viewer/built/image-viewer.type";

const Dots = ({ selected }) => {
  let backgroundColor;
  backgroundColor = selected ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.3)";

  return (
    <View
      style={{
        width: 5,
        height: 5,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};
const Skip = ({ ...props }) => <Button title="Skip" color="#000000" />;
const Next = ({ ...props }) => (
  <Button title="Next" color="#000000" {...props} />
);
const Done = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Done</Text>
  </TouchableOpacity>
);

const OnBoardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      // imageContainerStyles={{
      //   width: 100,
      //   height: 100,
      //   resizeMode: "contain",
      // }}
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.navigate("Login")}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={{ width: 300, height: 250 }}
              source={require("../assets/Logo.png")}
            />
          ),
          title: "Tunisicone 1",
          subtitle: "Welcome to Tunisia",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={{ width: 300, height: 250 }}
              source={require("../assets/Aziz.png")}
            />
          ),
          title: "This is Aziz ",
          subtitle: "He developped this app",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={{ width: 300, height: 250 }}
              source={require("../assets/Waref.jpg")}
            />
          ),
          title: "And this is Waref ",
          subtitle: "Wallah I helped",
        },
      ]}
    />
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    // flex: 1,
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
