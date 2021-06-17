import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {FontAwesome5} from '@expo/vector-icons';

const FriendNoti = () => {
    return (
        <View style = {styles.icon}>
            <FontAwesome5 name = 'user-friends' size = {205} color = '#b5b3b3'/>
            <Text h2 style = {styles.text}>You have no notification</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '80%'
    },
    text: {
        color: '#b5b3b3',
        alignSelf: 'center'
    }
});

export default FriendNoti;