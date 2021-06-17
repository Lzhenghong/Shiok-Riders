import React from 'react';
import { StyleSheet } from 'react-native';
import {Header} from 'react-native-elements';
import {AntDesign} from '@expo/vector-icons';

const ShiokHeader = ({title, backNav, marginBottom, callback}) => {
    return (
        <>
        {backNav ?
        (<Header 
            leftComponent = {<AntDesign name = 'arrowleft' color = 'white' size = {30} onPress = {callback} />}
            backgroundColor = '#3EB489'
            containerStyle = {{marginBottom, height: 78.5}}
            centerComponent = {{text: title, style: {color: '#fff', fontSize: 20, fontWeight: 'bold', paddingBottom: 20, marginBottom: 14}}}
        />) : 
        (<Header 
            backgroundColor = '#3EB489'
            containerStyle = {{marginBottom, height: 78.5}}
            centerComponent = {{text: title, style: {color: '#fff', fontSize: 20, fontWeight: 'bold', paddingBottom: 22.5, marginBottom: 14}}}
        />)}
        </>
    );
};

const styles = StyleSheet.create({});

export default ShiokHeader;