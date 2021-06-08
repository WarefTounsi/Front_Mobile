import React, { useEffect } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import I18n from 'ex-react-native-i18n';

const deviceLocale = I18n.locale
useEffect

const Home = () => {
  
  return (
    <View style={styles.center}>
      
      <Text>Home TODO/Ask Yan {deviceLocale}</Text>
      {/* <Text style={styles.value}>{translate('home.title')}</Text> */}

    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Home;