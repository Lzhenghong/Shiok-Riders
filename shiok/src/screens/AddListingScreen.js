import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Text, Header } from 'react-native-elements';
import {AntDesign} from '@expo/vector-icons';

const AddListingScreen = () => {
    return (
        <View>
            <Header 
                backgroundColor = '#3EB489'
                containerStyle = {styles.header}
                centerComponent = {{text: 'Add Listing', style: {color: '#fff', fontSize: 20, fontWeight: 'bold'}}}
            />
        </View>
    );
};

AddListingScreen.navigationOptions = () => {
    return {
      header: false,
      tabBarIcon: <AntDesign name = 'plussquareo' size = {24} color = '#3EB489'/>,
      tabBarOptions: {activeTintColor: '#3EB489'}
    };
  };

const styles = StyleSheet.create({
    header: {
        marginBottom: 15
    }
});

export default AddListingScreen;