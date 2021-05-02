import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
// import Icon from 'react-native-vector-icons/Feather';
import { AsyncStorage } from 'react-native';
async  function storeData (data){
  try {
    console.log(data);
    await AsyncStorage.setItem(
      'language',
      data.label
    );
    console.log(await AsyncStorage.getItem('language'));
  } catch (error) {
    // Error saving data
  }
};
class SettingsListItem extends React.Component {
  
  render() {
    this.state = {
      country: 'uk'
  }
    return (
      <View style={styles.listItem}>
        <Text style={styles.listItemText}>{this.props.title}</Text>
        {/* <Icon style={styles.icon} name="ios-arrow-forward" size={25} /> */}
        <DropDownPicker
    items={[
        {label: 'USA', value: 'usa', icon: () => <Icon name="flag" size={18} color="#900" />, hidden: true},
        {label: 'en', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900" />},
        {label: 'fr', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" />},
        {label: 'ar', value: 'tunisie', icon: () => <Icon name="flag" size={18} color="#900" />},

    ]}
    defaultValue={this.state.country}
    containerStyle={{height: 40}}
    style={{backgroundColor: '#fafafa'}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    onChangeItem={item => storeData(item)}
/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignItems: 'center',
    padding: 100
  },
  listItemText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#434343',
    width: '90%'
  },
  icon: {
    color: '#CCCCCC',
    paddingLeft: 5
  }
});

export default SettingsListItem;