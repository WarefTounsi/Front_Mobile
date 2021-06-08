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
  Dimensions 
} from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';

import { IconButton, Colors } from 'react-native-paper';

// import MainHeader from "../components/MainHeader";

// import Config from "react-native-config";


// import { BackgroundColor } from "../constants";
import { API_URL } from "../env";

export default function LocationDetail({ navigation, route }) {
  const [media, setMedia] = useState([]);

  const { location = {} } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
 const BackgroundColor="#559EDF";


  function getPictures(){


    fetch(API_URL+"locations/"+(location.id-1)+"/media", {
      "method": "GET",
      // "headers": {
      //   "x-rapidapi-host": "quotes15.p.rapidapi.com",
      //   "x-rapidapi-key": "yourapikey"
      // }
    })
      .then(response => response.json())
      .then(response => {
        // newArr.push(response.Locations);
        setMedia(response.Media);
      })
      .catch(err => {
        setMedia(err);

      });
}
  function showSlider(item){
    console.log(item);
    setModalVisible(true);
  };
  const renderPictures = ({item,index}) => {
    
    return (
      <View >
                <TouchableOpacity onPress={() => showSlider(index)}>

      <Image
                  style={{width: 100, height: 100, margin: 5,
                  }} 
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
  }

  useEffect(() => {
    getPictures();
    const timeOut = setTimeout(() => {
    }, 800);

    // https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <View style={styles.container} >
      <Image
      style={StyleSheet.absoluteFillObject}
      source={{ uri: location.photo }}
    />
      {/* <MainHeader navigation={navigation} /> */}

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.content}>
        <TouchableOpacity onPress={() => console.log({process})}  style={styles.closeButton}><Text name="times" size={20} color="#757575" > test</Text>
          </TouchableOpacity>


          <Text style={styles.locationName}>{location.title}  </Text>

          

          <View>
            <Text style={styles.description}>
              {location.description_title} 
            </Text>
          </View>

          <View>
          <Button
  onPress={() => console.log(media)}
  title="Intro"
  color={BackgroundColor}
  accessibilityLabel="Learn more about this purple button"
/><Button
  onPress={() => console.log(API_URL)}
  title="Themes"

  color={BackgroundColor}
  accessibilityLabel="Learn more about this purple button"
/>
<Button
  onPress={() => console.log(media)}
  title="Stations"

  color={BackgroundColor}
  accessibilityLabel="Learn more about this purple button"
/>
          <FlatList
        data={media}
        style={{flex:1}}
        renderItem={renderPictures}
        numColumns={3}/>


          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: {BackgroundColor},
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    alignItems: 'center',
    alignSelf: "center",
    resizeMode: "contain",
    width:5000
    // flex: 1,    
    // flexDirection:"row",
  },
  button: {
    flex: 1,
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
    justifyContent: 'center',
    alignItems: 'center',
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
  item: {
    
  },
  // media: {
  //   backgroundColor: '#6495ED',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   flex: 1,
  //   margin: 1,
  // },
});
