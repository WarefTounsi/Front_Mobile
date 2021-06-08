// Components/Search.js

import {
    View,
    TextInput,
    FlatList,
    Image,
    Button,
    Modal,
    TouchableOpacity,
    SafeAreaView,
  } from "react-native";
import React, { useEffect, useState } from "react";
import ImageViewer from "react-native-image-zoom-viewer";

import { API_URL } from "../env";

export default function Categories({location}) {
    const [media, setMedia] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

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
    useEffect(() => {
        getPictures();
    })
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

    return (
      <View>
        <TextInput placeholder='Titre du film'/>
        <Button title='Rechercher' onPress={() => {}}/>
        <FlatList
            data={media}
            style={{ flex: 1 }}
            renderItem={renderPictures}
            numColumns={3}
          />
      </View>
    )
  
}