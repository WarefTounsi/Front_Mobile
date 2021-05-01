import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  CheckBox,
  Button,
  Alert,
} from "react-native";
import { Avatar, ListItem, SearchBar } from "react-native-elements";

import MainHeader from "./MainHeader";
// import { FullPokemonsAPI } from "../constants";
import {API_URL} from "../../env"
// import { Button } from "react-native-elements/dist/buttons/Button";

export default function SPath() {
  
  const [isLoading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [locations, setLocations] = React.useState('');
  const [displaylocations, setDisplaylocations] = useState([]);
  var [checkBoxes, setCheckBoxes] = useState([]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  function checkThisBox(itemID){
    checkBoxes[itemID-1] = !checkBoxes[itemID-1];
    console.log(checkBoxes)
    setCheckBoxes(checkBoxes);
    // let list=this.state.list
    // list[itemID].checked=!list[itemID].checked
    // this.setState({list:list})
 
  }

  function getLocations(){
        console.log("response");


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
        // console.log(response);
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
        onPress={() => { console.log("test");
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
      value={checkBoxes[item.id-1]}
    //   value={toggleCheckBox}
    onValueChange={(newValue) => checkThisBox(item.id)}
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
    setCheckBoxes(a);
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
          keyExtractor={(item) => item.id}
          initialNumToRender={10}
        />
        
      ) : (
        <ActivityIndicator animating size="large" style={{ marginTop: 20 }} />
      )}
            <Button title="Calculate" style={styles.buttons}         onPress={() => { console.log(checkBoxes);
            } }> </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  listItemSubtitle: { marginTop: 10, color: "#939393" },
  buttons: {
    flexDirection:"row",
    alignSelf: "center",

  },
});
