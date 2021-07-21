import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import { Button } from 'react-native-elements';

window = Dimensions.get('window');

const ShiokButton = ({title, callback}) => {
    return (
        <Button 
            title = {title}
            buttonStyle = {styles.button}
            containerStyle = {{marginHorizontal: 10}}
            onPress = {callback}
        />
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FF8400',
        borderRadius: 20,
        alignSelf: 'center',
        width: window.width * 0.95,
        height: window.height * 0.043,
    }
});

export default ShiokButton;

