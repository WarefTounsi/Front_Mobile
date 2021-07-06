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
// import { Props } from "react-native-image-zoom-viewer/built/image-viewer.type";

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
      // SkipButtonComponent={Skip}
      // NextButtonComponent={Next}
      // DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.navigate("Home")}
      onDone={() => navigation.navigate("Home")}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={{ width: 300, height: 250, bottom: 20 }}
              source={require("../assets/Logo.png")}
            />
          ),
          title: "Tunisicone ",
          subtitle: "Language",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={{ width: 300, height: 250 }}
              source={require("../assets/Logo.png")}
            />
          ),
          title: "Tunisicone ",
          subtitle:
            "The original free online travel guide for Tunisia based on cultural identity.  \n Takes you to places filled with treasures. \n Go fair, go for real, enjoy your trip and support the local communities.",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={{ width: 300, height: 250 }}
              source={require("../assets/Waref.jpg")}
              onPress={() => console.log("process")}
            />
          ),
          title: "Thanks to",
          subtitle: " \\o/ ",
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
