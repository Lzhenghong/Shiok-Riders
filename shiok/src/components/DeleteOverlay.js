import React from 'react';
import { View, StyleSheet } from 'react-native';
import {Text, Overlay, Button } from 'react-native-elements';
import {Entypo} from '@expo/vector-icons';

const DeleteOverlay = ({visible, onBackdrop, text, subbody, onYes, onNo}) => {
    return (
        <Overlay 
            visible = {visible}
            onBackdropPress = {onBackdrop}
            overlayStyle = {styles.overlay}
        >
            <View style = {{alignItems: 'center'}}>
                <Entypo name = 'warning' size = {30} color = '#ffbf00'/> 
                <Text h3 style = {styles.text}>{text}</Text>
                <Text h4 style = {styles.subbody}>{subbody}</Text>
                <View style = {{flexDirection: 'row'}}>
                    <Button 
                        title = 'Yes'
                        buttonStyle = {styles.leftbutton}
                        onPress = {onYes}
                    />
                    <Button 
                        title = 'No'
                        buttonStyle = {styles.rightbutton}
                        onPress = {onNo}
                    />
                </View>
            </View>
        </Overlay>
    );
};

const styles = StyleSheet.create({
    overlay: {
        height: 200,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '97.5%'
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
    },
    leftbutton: {
        backgroundColor: '#FF8400',
        borderRadius: 20,
        paddingHorizontal: 20,
        width: '70%',
        alignSelf: 'flex-start',
    },
    rightbutton: {
        backgroundColor: '#FF8400',
        borderRadius: 20,
        paddingHorizontal: 20,
        width: '70%',
        alignSelf: 'flex-end',
    }
});

export default DeleteOverlay;