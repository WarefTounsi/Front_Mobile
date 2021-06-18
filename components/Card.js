import React from "react";
import { Header, Icon } from "react-native-elements";
// import { BackgroundColor } from "../constants";
import { BackHandler } from "react-native";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Text,
  Alert,
} from "react-native";
import { IconButton, Colors } from "react-native-paper";
import { Row } from "native-base";
const BackgroundColor = "#559EDF";
const Card = (props) => {
  return (
    <View style={{ flex: 1, bottom: 40 }}>
      <Text style={styles.locationName} alignSelf="center">
        {" "}
        {props.title}
      </Text>
      <View flexDirection="row" alignSelf="center">
        {/* <IconButton
          icon="check"
          color={Colors.blue200}
          backgroundColor={Colors.grey800}
          style={{
            top: 30,
            marginRight: 210,
          }}
          size={30}
          // style={{alignItems:"left"}}
          onPress={() => console.log("added")}
        /> */}

        <Image
          style={{
            top: 30,
            marginRight: 210,
            height: 40,
            width: 40,
          }}
          onPress={() => console.log("added")}
          source={require("../assets/select.png")}
        />
        {/* <IconButton
          icon="plus"
          color={Colors.blue200}
          backgroundColor={Colors.grey200}
          size={30}
          // alignItems="left"
          style={{ marginRight: 10, top: 30 }}
          onPress={() => console.log("liked")}
        /> */}

        <Image
          style={{ marginRight: 10, top: 30, height: 40, width: 40 }}
          onPress={() => console.log("added")}
          source={require("../assets/Navigate.png")}
        />
      </View>
      <Image
        style={{
          width: 250,
          height: 250,
          borderRadius: 500 / 2,
          flex: 1,
          alignSelf: "center",
        }}
        placeholderStyle={{ backgroundColor: "transparent" }}
        PlaceholderContent={<ActivityIndicator />}
        source={{ uri: props.photo }}
      />
      <View flexDirection="row" alignSelf="center">
        {/* <IconButton
          icon="heart"
          color={Colors.red500}
          style={{ marginRight: 210, bottom: 30 }}
          size={30}
          // style={{alignItems:"left"}}
          onPress={() => console.log("liked")}
        /> */}
        <View
          style={{
            flexDirection: "row",
            // bottom: 20,
          }}
        >
          <Text style={{ right: 25, bottom: 10 }}> 206</Text>
          <Image
            style={{ right: 100, bottom: 22, height: 40, width: 40 }}
            onPress={() => console.log("added")}
            source={require("../assets/heart.png")}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            bottom: 20,
          }}
        >
          <Text
            style={{
              top: 15,
              left: 80,
              height: 42,
              width: 42,
            }}
          >
            20
          </Text>
          <Image
            style={{
              left: 70,
              height: 40,
              width: 40,
            }}
            onPress={() => console.log("added")}
            source={require("../assets/km.png")}
          />
        </View>
      </View>
    </View>
  );
};
export default Card;
const styles = StyleSheet.create({
  listItemSubtitle: { marginTop: 10, color: "#939393" },
  buttons: {
    flexDirection: "row",
    alignSelf: "center",
  },
  locationName: {
    alignSelf: "center",
    fontSize: 30,
    color: "#4f4f4f",
    // position: "absolute", //Here is the trick
    top: 40, //Here is the trick
  },
});
