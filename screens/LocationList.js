import React, { useEffect, useState } from "react";
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
import { Avatar, ListItem, SearchBar } from "react-native-elements";

import {API_URL} from "../env"
import { AsyncStorage } from 'react-native';
import i18n from 'i18n-js';
import Card from '../components/Card';
export default function LocationList({ navigation,route }) {
  const [isLoading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [locations, setLocations] = React.useState('');
  const [displaylocations, setDisplaylocations] = useState([]);
  const [language, setLanguage] = React.useState('');
  const { params = {} } = route;

  async function retrieveData()  {
    try {
      value = i18n.locale;
      // value =  AsyncStorage.getItem('language');
      if (value !== null) {
        // We have data!!
        setLanguage(value);
        // console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
async  function getLocations(){
    await retrieveData();

    // console.log("language");
    console.log("language is")
    var url = API_URL
    if (route.params.region_id != 0){ 
       url = url+"regions/"+route.params.region_id;
       console.log(url)
    }
    else {
      console.log("no route")
       url = url+"locations"
       console.log(url)
    }
  //  console.log(params);
    fetch(url, {
      "method": "GET",
      "headers": {
        "content-Language": value,
      }
    })
      .then(response => response.json())
      .then(response => {
        // newArr.push(response.Locations);
        setLocations(response.Locations);
        setDisplaylocations(response.Locations);
      })
      .catch(err => {
        setLocations("err");


      });
}

  const renderLocations = ({ item, index }) => {
    
    return (  
      <ListItem
        bottomDivider={true}
        onPress={() => {
          navigation.navigate("LocationDetail", {
            location: displaylocations[item.id-1]
          });
        }}
      >
        <Card title={item.title} photo={item.photo}></Card>
        {/* <Avatar
          source={item.photo ? { uri: item.photo } : null}
          size="medium"
        /> */}

        {/* <ListItem.Content>
          <ListItem.Title>{item.title} </ListItem.Title>

          <ListItem.Subtitle style={styles.listItemSubtitle}>

            {item.id}
          </ListItem.Subtitle>
        </ListItem.Content> */}

        {/* <View style={{ flexDirection: "row" }}>{PokemonTypeElement}</View> */}
      </ListItem>
    );
  };

  const searchLocation = (keyword) => {
    setKeyword(keyword);

    if (keyword == "") {
      setDisplaylocations(locations);
    } else {
      const filteredLocations = locations.filter((location) => {
        return location.title.toLowerCase().includes(keyword.toLowerCase());
      });
      setDisplaylocations(filteredLocations);
    }
  };

  useEffect(() => {
    retrieveData();
    getLocations();
    setDisplaylocations(locations);
    const fetchData = async (url) => {
      try {
        retrieveData();
        getLocations();
        setDisplaylocations(locations);

        
        getLocations();
        setKeyword("");
        setLoading(false);
      } catch (error) {
        Alert.alert("Cannot connect to Server!");
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>


      <SearchBar
        placeholder="Find Locations by name ..."
        inputContainerStyle={{ backgroundColor: "#e9e9e9" }}
        containerStyle={{ backgroundColor: "transparent" }}
        lightTheme={true}
        round={true}
        value={keyword}
        onChangeText={searchLocation}
      />

      {!isLoading ? (
        <FlatList
          data={displaylocations}
          renderItem={renderLocations}
          keyExtractor={(item) => item.id.toString()}
          initialNumToRender={10}
        />
      ) : (
        <ActivityIndicator animating size="large" style={{ marginTop: 20 }} />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  listItemSubtitle: { marginTop: 10, color: "#939393" },
  buttons: {
    flexDirection: "row",
    alignSelf: "center",
  },
  locationName: {
    marginTop: 80,
    alignSelf: "center",
    fontSize: 30,
    color: "#4f4f4f",
  },
});
