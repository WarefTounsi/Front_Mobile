import * as React from 'react';
import { I18nManager,Text, View, StyleSheet } from 'react-native';
import I18n from '../I18n/locales'
import i18n from 'i18n-js';

import { Picker,Icon } from "native-base"

 
const listLanguage = [
  {key:'en', label:'EN'}, {key:'ar', label:'AR'} ,{key:'fr',label: 'FR'}
]

export default class Settings extends React.Component {
constructor(props) {
    super(props)
    this.translationGetters = {
      en: () => require('../I18n/en.json'),
      fr: () => require('../I18n/fr.json'),
      // ar: () => require('../I18n/ar.json')
    },
    this.state = {
     languageSelected: 'en'
    }
  }
  
    async onChangeLanguage(languageSelected){
    this.setState({
      languageSelected
    })
    // console.log("bla");
    console.log(languageSelected)
    if (languageSelected == "ar"){
      console.log("arrr")
        I18nManager.forceRTL(false);
    }
    else {
       I18nManager.forceRTL(false);

    }
    i18n.translations = { [languageSelected]: this.translationGetters[languageSelected]() }
      I18n.locale = languageSelected 
  }
  render() {
    
    // i18n.translations = { [languageTag]: translationGetters[languageTag]() }
    const {languageSelected} = this.state
    return (
      <View style={styles.container}>
              <DropdownLanguage language={languageSelected} onChangeLanguage={this.onChangeLanguage.bind(this)}></DropdownLanguage>
       
        <Text style={styles.paragraph}>
          {I18n.t('home.title')}
        </Text>
        <Text style={styles.paragraph}>
          {languageSelected}     //           {I18n.locale}
     
        </Text>
      </View>
    );
  }
}
class DropdownLanguage extends React.Component {
  constructor(props) {
    super(props)  
  }
  
  render() {
    return (<View style={styles.dropdownLanguage}>
              <Text style={{width:70,}}>{I18n.t('settings.language')}: </Text>
              <Picker
                mode="dropdown"
                iosHeader={''} 
                style={{ width: undefined,height:40,}}
                selectedValue={this.props.language}
                onValueChange={this.props.onChangeLanguage.bind(this)}
              >
                {listLanguage.map((languageItem, i) => {
                    return <Picker.Item key={i} value={languageItem.key} label=         {languageItem.label} />
                })}
              </Picker>
            </View>
)
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#ecf0f1',
    padding: 8,
  },
   title: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dropdownLanguage :{
    width:110, height:50, position:'absolute',top:10,right:10, flexDirection:'row',flex:1,justifyContent: "center",alignItems: "center"
  },
  
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
