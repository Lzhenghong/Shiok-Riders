import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Feather} from '@expo/vector-icons';

const OriginSearchBar = ({term, onTermChange, onIconTap}) => {
    return (
        <View>
            <SearchBar 
                placeholder = 'Tap icon to use current location'
                value = {term}
                onChangeText = {onTermChange}
                searchIcon = {<Feather name = 'crosshair' size = {20} color = '#3EB489' onPress = {onIconTap}/>}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default OriginSearchBar;