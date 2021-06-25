import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';

const TwinButtons = ({buttonTitleLeft, buttonTitleRight, callbackLeft, callbackRight}) => {
    return (
        <View style = {styles.buttonGroup}>
            <Button 
                title = {buttonTitleLeft}
                onPress = {callbackLeft} 
                buttonStyle = {styles.button}
            />
            <Button 
                title = {buttonTitleRight}
                onPress = {callbackRight} 
                buttonStyle = {styles.button}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    button: {
        backgroundColor: '#FF8400',
        borderRadius: 20,
        paddingHorizontal: 20
    }
});

export default TwinButtons;