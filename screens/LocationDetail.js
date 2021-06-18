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
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import Card from "../components/Card";
import { IconButton, Colors } from "react-native-paper";

// import MainHeader from "../components/MainHeader";

// import Config from "react-native-config";

// import { BackgroundColor } from "../constants";
import { API_URL } from "../env";

export default function LocationDetail({ navigation, route }) {
  const [media, setMedia] = useState([]);

  const { location = {} } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const BackgroundColor = "#559EDF";

  function getPictures() {
    fetch(API_URL + "locations/" + (location.id - 1) + "/media", {
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
    );
  };

  useEffect(() => {
    getPictures();
    const timeOut = setTimeout(() => {}, 800);

    // https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* <MainHeader navigation={navigation} /> */}

      <ScrollView style={{ flex: 1 }}>
        {/* <View style={styles.content}> */}
        <Card title={location.title} photo={location.photo}></Card>
        {/* <Text style={styles.locationName}>{location.title} </Text>
        <Image style={styles.avatar} source={{ uri: location.photo }} /> */}

        <View>
          <Text style={styles.description}>{location.description_title}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log(media)}
            accessibilityLabel="Learn more about this purple button"
          >
            <Text style={{ alignItems: "center" }}>INTRO</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log(API_URL)}
            accessibilityLabel="Learn more about this purple button"
          >
            <Text>TOPICS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log(media)}
            accessibilityLabel="Learn more about this purple button"
          >
            <Text>PLACES</Text>
          </TouchableOpacity>
          <FlatList
            data={media}
            style={{ flex: 1 }}
            renderItem={renderPictures}
            numColumns={3}
          />
        </View>
        {/* </View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    left: 15,
  },
  button: {
    flex: 1,
    backgroundColor: "#E6E7E8",
    borderRadius: 13,
    borderColor: "#00AEEF",
    borderWidth: 2,
    marginLeft: 15,
    width: 100,
    height: 30,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",

    // flexDirection:"row"
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
    top: 30,
  },
  avatar: {
    position: "absolute",
    width: 200,
    height: 200,
    alignSelf: "center",
    top: 80,
    borderRadius: 200,
  },
  locationName: {
    marginTop: 30,
    alignSelf: "center",
    fontSize: 30,
    color: "#4f4f4f",
  },
  description: {
    color: "#4f4f4f",
    textAlign: "center",
    lineHeight: 35,
    marginTop: 15,
    marginBottom: 35,
    top: 250,
    backgroundColor: "#FF00FF",
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
