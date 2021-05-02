import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Image,
  Button,
  Modal,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

import { IconButton, Colors } from "react-native-paper";
import { Icon } from "react-native-elements";
import ProgressBar from "react-native-progress/Bar";
import MainHeader from "./MainHeader";

import { AsyncStorage } from 'react-native';

import Config from "react-native-config";

// import { BackgroundColor } from "../constants";
const BackgroundColor = "#559EDF";
const value =  AsyncStorage.getItem('language');

import { API_URL } from "../env";

export default function LocationDetail({ navigation, route }) {
  const [staProgress, setStaProgress] = useState(0);
  const [atkProgress, setAtkProgress] = useState(0);
  const [defProgress, setDefProgress] = useState(0);
  const [cpProgress, setCpProgress] = useState(0);
  const [media, setMedia] = useState([]);

  const maxSTA = 400;
  const maxATK = 400;
  const maxDEF = 400;
  const maxCP = 4000;

  const { pokemon = {} } = route.params;
  const { location = {} } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
 async function retrieveData()  {
    try {
      const value = await AsyncStorage.getItem('language');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  function getPictures() {
    fetch(API_URL + "locations/" + location.id + "/media", {
      method: "GET",
      // "headers": {
      //   "x-rapidapi-host": "quotes15.p.rapidapi.com",
      //   "x-rapidapi-key": "yourapikey"
      // }
    })
      .then((response) => response.json())
      .then((response) => {
        // newArr.push(response.Locations);
        setMedia(response.Media);
        // console.lcog(response.Media)
      })
      .catch((err) => {
        setMedia(err);
      });
  }
  function showSlider(item) {
    console.log(item);
    setModalVisible(true);
  }
  const renderPictures = ({ item, index }) => {
    return (
      <SafeAreaView>
        <View>
          <TouchableOpacity onPress={() => showSlider(index)}>
            <Image
              style={{ width: 100, height: 100, margin: 5 }}
              source={{ uri: item.url }}
            />
            <Modal
              visible={modalVisible}
              transparent={true}
              onRequestClose={() => setModalVisible(false)}
            >
              <ImageViewer imageUrls={media} index={index} />
            </Modal>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  function fetchData(item) {
    try {
      if (item == "themes") {
        fetch(API_URL + "locations/" + location.id + "/themes", {
          method: "GET",
          // "headers": {
          //   "x-rapidapi-host": "quotes15.p.rapidapi.com",
          //   "x-rapidapi-key": "yourapikey"
          // }
        })
          .then((response) => response.json())
          .then((response) => {
            // newArr.push(response.Locations);
            let data = response.Themes;
            // console.log(response)
            for (let theme of data) {
              console.log("teeeest");
              theme["url"] = theme["photo"];
            }
            setMedia(data);
            // console.log(response)
          })
          .catch((err) => {
            setMedia(err);
          });
      } else if (item == "intro") {
        getPictures();
      } else if (item == "stations") {
        fetch(API_URL + "stations/" + location.id + "/media", {
          method: "GET",
        })
          .then((response) => response.json())
          .then((response) => {
            // newArr.push(response.Locations);
            console.log("jaw");
            console.log(response);
            let data = response.Media;
            // console.log(response)
            // for (let theme of data){
            //   theme["url"]=theme["photo"];
            // }
            setMedia(data);
            // console.log(response)
          })
          .catch((err) => {
            // console.log(err)
            setMedia(err);
          });
      }
    } catch (err) {}
  }

  useEffect(() => {
    // console.log( AsyncStorage.getItem('language'))
    // console.log("vaeza");
    // console.log(value);
    retrieveData();
    getPictures();
    const timeOut = setTimeout(() => {
      setStaProgress(+pokemon.sta / maxSTA);
      setAtkProgress(+pokemon.atk / maxATK);
      setDefProgress(+pokemon.def / maxDEF);
      setCpProgress(+pokemon.cp / maxCP);
    }, 800);

    // https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={StyleSheet.absoluteFillObject}
        source={{ uri: location.photo }}
      />
      <MainHeader navigation={navigation} />

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => console.log({ process })}
            style={styles.closeButton}
          >
            <View flexDirection="row">
              <IconButton
                icon="plus"
                color={Colors.blue200}
                style={{ marginRight: 180 }}
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
          <Image
            style={{ width: 200, height: 200, borderRadius: 200 / 2, flex: 2 }}
            placeholderStyle={{ backgroundColor: "transparent" }}
            PlaceholderContent={<ActivityIndicator />}
            source={{ uri: location.photo }}
          />
          <View flexDirection="row">
            <IconButton
              icon="heart"
              color={Colors.red500}
              style={{ marginRight: 180 }}
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

          <Text style={styles.locationName}>{location.title} </Text>

          <View>
            <Text style={styles.description}>{location.description_title}</Text>
          </View>

          {/* <View> */}
          <View style={styles.buttons}>
            <Button
              onPress={() => fetchData("intro")}
              title="Intro"
              color={BackgroundColor}
              accessibilityLabel="Learn more about this purple button"
            />
            <Button
              onPress={() => fetchData("themes")}
              title="Themes"
              color={BackgroundColor}
              accessibilityLabel="Learn more about this purple button"
            />
            <Button
              onPress={() => fetchData("stations")}
              title="Stations"
              color={BackgroundColor}
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
          <FlatList
            data={media}
            style={{ flex: 1 }}
            renderItem={renderPictures}
            numColumns={3}
          />
          {/* </View> */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#559EDF",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    alignSelf: "center",
  },
  button: {
    padding: 10,
    marginLeft: 150,
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 0,
    minHeight: 500,
    marginTop: 150,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    width: 200,
    height: 200,
    alignSelf: "center",
    top: -130,
    resizeMode: "contain",
  },
  locationName: {
    marginTop: 80,
    alignSelf: "center",
    fontSize: 30,
    color: "#4f4f4f",
  },
  description: {
    color: "#4f4f4f",
    textAlign: "center",
    lineHeight: 22,
    marginTop: 15,
    marginBottom: 35,
  },
  pokemonType: {
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  item: {},
  // media: {
  //   backgroundColor: '#6495ED',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   flex: 1,
  //   margin: 1,
  // },
});
