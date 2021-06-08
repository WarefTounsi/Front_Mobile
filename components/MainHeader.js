import React from "react";
import { Header, Icon } from "react-native-elements";
// import { BackgroundColor } from "../constants";
import {BackHandler} from "react-native";
const BackgroundColor = "#559EDF";
export default function MainHeader({ navigation, isMain, title }) {
  if (isMain) {
    return (
      <Header
        containerStyle={{
          backgroundColor: BackgroundColor,
        }}
        centerComponent={{ text: title, style: { color: "#fff" } }}
        
      />

    );
  } else {
    return (
      <Header
        containerStyle={{
          backgroundColor: BackgroundColor,
          borderBottomWidth: 0,
          shadowOffset:{  width: 10,  height: 10,  },
shadowColor: 'black',
shadowOpacity: 1.0,
        }}
        leftComponent={
          <Icon
            name="menu"
            color="#fff"
            size={40}
            onPress={() => {
              console.log(navigation);
              // navigation.goBack();
            }}
          />
        }
        centerComponent={{ text: title, style: { color: "#fff",shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: 'black',
        shadowOpacity: 1.0, } }}
      />
    );
  }
}
