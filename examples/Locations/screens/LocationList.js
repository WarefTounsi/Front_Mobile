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

import MainHeader from "../../../components/MainHeader";
import { FullPokemonsAPI } from "../constants";
import {API_URL} from "../../../env"
import { AsyncStorage } from 'react-native';

export default function LocationList({ navigation }) {
  const [displayPokemons, setDisplayPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [locations, setLocations] = React.useState('');
  const [displaylocations, setDisplaylocations] = useState([]);
  const [language, setLanguage] = React.useState('');

  async function retrieveData()  {
    try {
      const value = await AsyncStorage.getItem('language');
      if (value !== null) {
        // We have data!!
        setLanguage(value);
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  function getLocations(){

    fetch(API_URL+"locations", {
      "method": "GET",
      "headers": {
        "content-Language": {language},
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
            pokemon: displayPokemons[index],
            location: displaylocations[item.id-1]
          });
        }}
      >
        <View>
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
            style={{ width: 100, height: 100, borderRadius: 200 / 2, flex: 1 }}
            placeholderStyle={{ backgroundColor: "transparent" }}
            PlaceholderContent={<ActivityIndicator />}
            source={{ uri: item.photo }}
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

          <Text style={styles.locationName}>{item.title} </Text>
          </View>
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
    getLocations();
        setDisplaylocations(locations);
    const fetchData = async (url) => {
      try {
        getLocations();
        setDisplaylocations(locations);

        const response = await fetch(url);
        const responseJson = await response.json();
        getLocations();
        setKeyword("");
        setLoading(false);
      } catch (error) {
        Alert.alert("Cannot connect to Server!");
      }
    };

    fetchData(FullPokemonsAPI);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MainHeader
        title="Locations"
        isMain={true}
        navigation={navigation}
      />

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
          keyExtractor={(item) => item.id}
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
