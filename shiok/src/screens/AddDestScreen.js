import React, {useState, useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import { Input, Header, Button } from 'react-native-elements';
import {Context as LocationContext} from '../context/LocationContext';
import Spacer from '../components/Spacer';
import GeoAPI from '../api/GeoAPI';
import geoSearch from '../hooks/geoSearch';
import GeoResults from '../components/GeoResults';
import {Context as ListingContext} from '../context/ListingContext';
import {AntDesign} from '@expo/vector-icons';

const AddDestScreen = () => {
    return (
        <View>
            <Header 
                leftComponent = {<AntDesign name = 'arrowleft' color = 'white' size = {30} onPress = {() => navigation.navigate('Profile')} />}
                backgroundColor = '#3EB489'
                containerStyle = {styles.header}
                centerComponent = {{text: 'Add Drop Off Point', style: {color: '#fff', fontSize: 20, fontWeight: 'bold', paddingBottom: 20, marginBottom: 14}}}
            />
        </View>
    );
};

AddDestScreen.navigationOptions = () => {
    return {
      header: () => false,
    };
};

const styles = StyleSheet.create({
    header: {
        marginBottom: 15,
        height: 78.5
    }
});

export default AddDestScreen;