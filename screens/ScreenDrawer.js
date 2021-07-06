import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";

export default class ScreenDrawer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={(flex = 1)}>
          <TouchableOpacity
            style={{ alignItems: "flex-end", margin: 14 }}
            onPress={() => this.props.navigation.openDrawer}
          >
            <FontAwesome5 name="bars" size={24} color="#161924" />
          </TouchableOpacity>
          ;
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});
