import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Ionicons} from '@expo/vector-icons';

const PriceSearchBar = ({term, onTermChange}) => {
    return (
        <View>
            <SearchBar 
                placeholder = 'Filter by price'
                value = {term}
                onChangeText = {onTermChange}
                searchIcon = {<Ionicons name = 'funnel-outline' size = {20} color = '#3EB489'/>}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default PriceSearchBar;