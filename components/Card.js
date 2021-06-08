import React from "react";
import { Header, Icon } from "react-native-elements";
// import { BackgroundColor } from "../constants";
import {BackHandler} from "react-native";
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
const BackgroundColor = "#559EDF";
const Card = (props) => {
  return (
    <View styles={StyleSheet}>
    <TouchableOpacity
       onPress={() => console.log("process" )}
       style={styles.closeButton}
     >
       <View flexDirection="row" alignSelf= "center">
         <IconButton
           icon="plus"
           color={Colors.blue200}
          //  style={{ marginRight: 180 }}
           size={30}
           // style={{alignItems:"left"}}
           onPress={() => console.log("added")}
         />


         <IconButton
           icon="check"
           color={Colors.blue200}
           size={30}
           alignItems="right"
           // style={{alignItems:"left"}}
           onPress={() => console.log("liked")}
         />
       </View>
     </TouchableOpacity>
     <Image style={{ width: 100, height: 100, borderRadius: 200 / 2, flex: 1 ,alignSelf: "center"}}
       placeholderStyle={{ backgroundColor: "transparent" }}
       PlaceholderContent={<ActivityIndicator />}
       source={{ uri: props.photo }}
     />
     <View flexDirection="row" alignSelf= "center">
       <IconButton
         icon="heart"
         color={Colors.red500}
        //  style={{ marginRight: 180 }}
         size={30}
         // style={{alignItems:"left"}}
         onPress={() => console.log("liked")}
       />

       <Text
         style={{
           backgroundColor: "lightgrey",
           borderRadius: 30,
           height: 40,
         }}
       >
         20 Km
       </Text>
     </View>

     <Text style={styles.locationName} alignSelf= "center">{props.title}  </Text>
     </View>
  );
}
export default Card
const styles = StyleSheet.create({
  listItemSubtitle: { marginTop: 10, color: "#939393" },
  buttons: {
    flexDirection: "row",
    alignSelf: "center",
  },
  locationName: {
    marginTop: 20,
    alignSelf: "center",
    fontSize: 30,
    color: "#4f4f4f",
  },
});
