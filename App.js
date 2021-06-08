import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DrawerContent } from './screens/DrawerContent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from './components/context';
import i18n from 'i18n-js';

import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';
import memoize from 'lodash.memoize'

import About from './screens/About';
import Home from './screens/Home';
import LocationList from './screens/LocationList';
import LocationDetail from './screens/LocationDetail';
import Settings from './screens/Settings';
import Gmap from './screens/Gmap';
import OnBoardingScreen from './screens/OnBoardingScreen';
import Regions from './screens/Regions';
import MainHeader from "./components/MainHeader";

export default function App() {
  const Drawer = createDrawerNavigator();

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const authContext = React.useMemo(() => ({
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const translationGetters = {
    en: () => require('./I18n/en.json'),
    fr: () => require('./I18n/fr.json'),
    // ar: () => require('./I18n/ar.json')
  }
  const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
  )
  const setI18nConfig = () => {
    const fallback = { languageTag: 'en' }
    const origin = { languageTag: 'fr' }
    const { languageTag } = origin ;
    console.log(translate);
    translate.cache.clear();
    i18n.translations = { [languageTag]: translationGetters[languageTag]() }
    i18n.locale = languageTag;

  }
  setI18nConfig()

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  };
  const stackScreenOptions = {
    headerShown: true,
    gestureEnabled: true,
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  return (
    <PaperProvider theme={theme}>
          <AuthContext.Provider value={authContext}>
          
    <NavigationContainer theme={theme}>
    {/* <MainHeader
        // title=
        // isMain={true}
        navigation={Drawer}
      /> */}
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} drawerPosition="left" />} >
        <Drawer.Screen name="OnBoarding" component={OnBoardingScreen} />
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="About" component={About} />
          <Drawer.Screen name="LocationList" component={LocationList} />
          <Drawer.Screen name="LocationDetail" component={LocationDetail} />
          <Drawer.Screen name="Map" component={Gmap} />
          <Drawer.Screen name="Settings" component={Settings} />
          <Drawer.Screen name="Regions" component={Regions} />

        </Drawer.Navigator>
      
    
    </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
