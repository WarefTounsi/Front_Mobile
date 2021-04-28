import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Avatar, ListItem, SearchBar } from "react-native-elements";

import MainHeader from "../components/MainHeader";
import { FullPokemonsAPI } from "../constants";
import {API_URL} from "../../../env"

export default function LocationList({ navigation }) {
  const [displayPokemons, setDisplayPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [locations, setLocations] = React.useState('');
  const [displaylocations, setDisplaylocations] = useState([]);

  function getLocations(){

    fetch(API_URL+"locations", {
      "method": "GET",
      // "headers": {
      //   "x-rapidapi-host": "quotes15.p.rapidapi.com",
      //   "x-rapidapi-key": "yourapikey"
      // }
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
            location: displaylocations[index]
          });
        }}
      >
        <Avatar
          source={item.photo ? { uri: item.photo } : null}
          size="medium"
        />

        <ListItem.Content>
          <ListItem.Title>{item.title} </ListItem.Title>

          <ListItem.Subtitle style={styles.listItemSubtitle}>

            {item.id}
          </ListItem.Subtitle>
        </ListItem.Content>

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
});
