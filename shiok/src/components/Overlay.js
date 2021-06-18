import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text, Overlay } from 'react-native-elements';
import {Entypo, AntDesign} from '@expo/vector-icons';

const ShiokOverlay = ({visible, onBackdrop, body, onPress, subbody}) => {
    return (
        <>
            <Overlay
                isVisible = {visible} 
                onBackdropPress = {onBackdrop}
                overlayStyle = {styles.overlay}
            >
                <View style = {{alignItems: 'center'}}>
                    {subbody ? <Entypo name = 'warning' size = {30} color = '#ffbf00'/> : <AntDesign name = 'checkcircle' size = {30} color = '#3EB489'/>}
                    <Text h3 style = {styles.text}>{body}</Text>
                    {subbody ? 
                    <Text h4 style = {styles.subbody}>{subbody}</Text>
                    : null}
                    <Button 
                        title = 'Done'
                        buttonStyle = {styles.button} 
                        onPress = {onPress}
                    />
                </View>
            </Overlay>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FF8400',
        borderRadius: 20,
        alignSelf: 'center',
        width: 387.5,
        marginVertical: 5
    },
    overlay: {
        height: 200,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: 10
    },
    subbody: {
        fontSize: 16,
        alignSelf: 'center',
        marginBottom: 10,
        color: '#babcbf'
    }
});

export default ShiokOverlay;