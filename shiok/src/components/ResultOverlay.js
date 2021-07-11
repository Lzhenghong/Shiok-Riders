import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Button, Text, Overlay } from 'react-native-elements';
import {Entypo, AntDesign} from '@expo/vector-icons';

const window = Dimensions.get('window');

const ResultOverlay = ({visible, onPress, errorMessage, errorTitle, errorSubtitle, body}) => {
    return (
        <>
            <Overlay
                isVisible = {visible} 
                onBackdropPress = {onPress}
                overlayStyle = {styles.overlay}
            >
                <View style = {{alignItems: 'center'}}>
                    {errorMessage ? 
                    (<>
                        <Entypo name = 'warning' size = {30} color = '#ffbf00'/> 
                        <Text style = {styles.text}>{errorTitle}</Text>
                        <Text style = {styles.subbody}>{errorSubtitle}</Text> 
                    </>)
                    : 
                    (<>
                        <AntDesign name = 'checkcircle' size = {30} color = '#3EB489'/>
                        <Text style = {styles.text}>{body}</Text>
                    </>)
                    }
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
        marginBottom: 10,
        fontSize: window.height * 0.035
    },
    subbody: {
        fontSize: 16,
        alignSelf: 'center',
        marginBottom: 10,
        color: '#babcbf',
        fontSize: window.height * 0.025
    }
});

export default ResultOverlay;

