import React from 'react';
import {StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';

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
        width: '97.5%',
        height: 39,
    }
});

export default ShiokButton;

