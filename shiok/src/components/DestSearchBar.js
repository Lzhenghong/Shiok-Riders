import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Entypo} from '@expo/vector-icons';

const DestSearchBar = ({term, onTermChange}) => {
    return (
        <View>
            <SearchBar 
                placeholder = 'Enter your destination'
                value = {term}
                onChangeText = {onTermChange}
                searchIcon = {<Entypo name = 'location-pin' size = {20} color = '#3EB489'/>}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default DestSearchBar;