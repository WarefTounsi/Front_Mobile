import React from "react";
import { useState, useEffect, useRef } from "react";
import { View, Text,StyleSheet,Image  } from "react-native";

import { GOOGLE_API } from "../../env";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import GetLocation from 'react-native-get-location';
// import Geolocation from '@react-native-community/geolocation';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapViewDirections from "react-native-maps-directions";


// 
import { Marker } from 'react-native-maps';
import {API_URL} from "../../env";
// import { Avatar } from "react-native-elements/dist/avatar/Avatar";
// import MainHeader from "./components/MainHeader";

export default function Gmap({ navigation }) {
  // const locations = getLocations();

//   const [markers, setMarkers] = React.useState('');
const [locations, setLocations] = React.useState([]);
const [currentLocation, setCurrentLocation] = React.useState([]);
const [markers, setMarkers] = React.useState([]);
const path =  [
    {lat: 36.9352001, lng: 10.7766924 },
    {lat: 36.9358131, lng: 10.7770143 },
    {lat: 36.9361256, lng: 10.7767353 },
    {lat: 36.9366784, lng: 10.7739458 }
]
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

        let Array=[];
        for (let location of response.Locations) {
            // console.log(location);
            Array.push({latlng:{latitude: parseFloat(location.lat), longitude: parseFloat(location.lng)},id:location.id,title:location.title,description:location.description_title,image:location.photo})
        }
        setMarkers(Array);


        
        setLocations(response.Locations);
      })
      .catch(err => {
        setLocations("err");


      });
}
async function getLocationAsync () {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
    const { latitude , longitude } = location.coords
    setCurrentLocation(location.coords)
    console.log(location)
    // this.getGeocodeAsync({latitude, longitude})
    // this.setState({ location: {latitude, longitude}});

  };
  useEffect(() => {
    getLocations();
    getLocationAsync();
    // Geolocation.getCurrentPosition(info => console.log(info));
    // console.log(GetLocation.getCurrentPosition());

    let location = Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
    console.log(location)
    // axios.get(`http://6a5dbf9f25ce.ngrok.io/api/locations`)
    // .then(res => {
    //       setQuote(res);

      // return persons;
//    })
  }, [])


  
  const styles = StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    container: {
        paddingTop: 50,
      },
      tinyLogo: {
        width: 50,
        height: 50,
      },
      logo: {
        width: 66,
        height: 58,
        
      },
});
  
  return (
    // https://reactnative.dev/docs/view
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <Text>{GOOGLE_API}</Text>
      {/* https://reactnative.dev/docs/text */}

      <MapView
  style={styles.map}
  provider={PROVIDER_GOOGLE}
               showsUserLocation
               initialRegion={{
               latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421}}
>
{markers.map((marker, index) => (
    <Marker
      key={index}
      coordinate={marker.latlng}
      title={marker.title}
      description={marker.description}
      onPress={() => console.log(locations[index])}
      onCalloutPress={() => navigation.navigate("LocationDetail", {
        location: locations[marker.id-1]

      })}

      >
        <Image
    source={{uri:marker.image}}
    size="medium"
    style={{width: 50, height: 50, borderRadius: 200/ 2, flex:1}} 
            
    placeholderStyle={{ backgroundColor: "transparent" }}
    
    
    />
    </Marker>
    ))}
 
 <MapViewDirections
    origin={{
        latitude: currentLocation.latitude,
         longitude: currentLocation.longitude}}
    destination={markers[0]}
    apikey="AIzaSyB2Yno10-YTnLjjn_Vtk0V8cdcY5lC4plU"
  />
</MapView>
        
       
    </View>
  );
  
}
