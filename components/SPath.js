import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  CheckBox,
  Button,
  Alert,
  Text,
} from "react-native";
import { Avatar, ListItem, SearchBar } from "react-native-elements";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import MainHeader from "./MainHeader";
// import { FullPokemonsAPI } from "../constants";
import { API_URL } from "../../env";
// import { Button } from "react-native-elements/dist/buttons/Button";

export default function SPath() {
  const [isLoading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [locations, setLocations] = React.useState("");
  const [displaylocations, setDisplaylocations] = useState([]);
  var [checkBoxes, setCheckBoxes] = useState([true, false]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [currentLocation, setCurrentLocation] = React.useState([]);

  // var checkBoxes = [false,false];
  function loading() {
    return <ActivityIndicator size="small" color="#0000ff" />;
  }
  var places = [];
  function checkThisBox(itemID) {
    checkBoxes[itemID - 1] = !checkBoxes[itemID - 1];
    console.log(checkBoxes);
    console.log();
    locations[itemID - 1]["checked"] = checkBoxes[itemID - 1];
    // if (checkBoxes[itemID-1])places.push()
    // setCheckBoxes(checkBoxes);
    // let list=this.state.list
    // list[itemID].checked=!list[itemID].checked
    // this.setState({list:list})
  }
  async function getLocationAsync() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied",
      });
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });
    const { latitude, longitude } = location.coords;
    setCurrentLocation(location.coords);
    // this.getGeocodeAsync({latitude, longitude})
    // this.setState({ location: {latitude, longitude}});
  }
  function calculate() {
    // console.log(checkBoxes);
    // console.log(locations[checkBoxes])
    // console.log(checkBoxes.reduce(
    //   (out, bool, index) => bool ? out.concat(index) : out,
    //   []))

    // let location =  Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
    getLocationAsync();
    let destinations = [
      { lat: currentLocation.latitude, lng: currentLocation.longitude },
    ];
    let faza = {};
    console.log(checkBoxes);
    for (const i in checkBoxes) {
      if (checkBoxes[i] == true) {
        faza = { lat: locations[i].lat, lng: locations[i].lng };
        destinations.push(faza);
      }
    }
    console.log(destinations);
    let distances = [];
    let min_distance = 1000;
    for (const i in destinations) {
      for (const j in destinations) {
        if (j != i) {
          console.log(
            ((destinations[i].lat - destinations[j].lat) * 100) ** 2 +
              ((destinations[i].lng - destinations[j].lng) * 100) ** 2
          );
        }
      }

      // console.log(i)
    }
    if (checkBoxes[0] && checkBoxes[1]) {
      Alert.alert(
        "Start -> " + locations[1].title + " -> " + locations[0].title
      );
    } else if (checkBoxes[0]) {
      Alert.alert("Start -> " + locations[0].title);
    } else if (checkBoxes[1]) {
      Alert.alert("Start -> " + locations[1].title);
    } else {
      <ActivityIndicator size="small" color="#0000ff" />;
      loading();
      Alert.alert("Select some locations to visit");
    }
    // console.log(locations);
  }

  function getLocations() {
    console.log("response");

    fetch(API_URL + "locations", {
      method: "GET",
      // "headers": {
      //   "x-rapidapi-host": "quotes15.p.rapidapi.com",
      //   "x-rapidapi-key": "yourapikey"
      // }
    })
      .then((response) => response.json())
      .then((response) => {
        // newArr.push(response.Locations);
        // console.log(response);
        setLocations(response.Locations);
        setDisplaylocations(response.Locations);
      })
      .catch((err) => {
        setLocations("err");
      });
  }

  const renderLocations = ({ item, index }) => {
    return (
      <ListItem
        bottomDivider={true}
        onPress={() => {
          console.log("test");
          //   navigation.navigate("LocationDetail", {
          //     location: displaylocations[item.id-1]
          //   });
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
          <CheckBox
            value={checkBoxes[item.id - 1]}
            // checked = {true}
            //   value={toggleCheckBox}
            onValueChange={(newValue) => checkThisBox(item.id)}
            onPress={() => console.log("bla69")}
            // onChange={() => {

            //     console.log(checkBoxes[item.id-1])
            //       checkThisBox(item.id)}}
          />
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
    var a = new Array(2);
    // setCheckBoxes(a);
    getLocations();
    setDisplaylocations(locations);
    const fetchData = async (url) => {
      try {
        getLocations();
        setDisplaylocations(locations);
        setLoading(false);

        // const response = await fetch(url);
        // const responseJson = await response.json();
        // getLocations();
        // setKeyword("");
      } catch (error) {
        // Alert.alert("Cannot connect to Server!");
      }
    };

    fetchData("FullPokemonsAPI");
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MainHeader
        title="Locations"
        isMain={true}
        // navigation={}
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
          keyExtractor={(item) => item.id.toString()}
          initialNumToRender={10}
        />
      ) : (
        <ActivityIndicator animating size="large" style={{ marginTop: 20 }} />
      )}
      <Button
        title="Calculate"
        style={styles.buttons}
        onPress={() => {
          calculate();
        }}
      >
        {" "}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  listItemSubtitle: { marginTop: 10, color: "#939393" },
  buttons: {
    flexDirection: "row",
    alignSelf: "center",
  },
});
