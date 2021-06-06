import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Feather} from '@expo/vector-icons';

const OriginSearchBar = ({term, onTermChange, onTermSubmit}) => {
    return (
        <View>
            <SearchBar 
                placeholder = 'Enter your current location'
                value = {term}
                onChangeText = {onTermChange}
                onEndEditing = {onTermSubmit}
                searchIcon = {<Feather name = 'crosshair' size = {20} color = '#3EB489'/>}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default OriginSearchBar;