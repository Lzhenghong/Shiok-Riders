import React, {useContext} from 'react';
import {View, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import {Text} from 'react-native-elements';
import {FontAwesome5} from '@expo/vector-icons';
import {Context as NotiContext} from '../context/NotiContext';
import NotiResults from './NotiResults';

const window = Dimensions.get('window');

const FriendNoti = () => {
    const {state} = useContext(NotiContext);

    const render = () => {
        if (!state.friend) {
            return <ActivityIndicator size = 'large' style = {{marginTop: 200}} />;
        } else if (state.friend.length == 0) {
            return (
                <View style = {styles.icon}>
                    <FontAwesome5 name = 'user-friends' size = {205} color = '#b5b3b3'/>
                    <Text h2 style = {styles.text}>You have no notification</Text>
                </View>
            );
        } else {
            return (
                <View>
                    <NotiResults 
                        results = {state.friend.filter(item => {
                            return (item.type == 'Friend');
                        })}
                    />
                </View>
            );
        }
    };

    return (
        <>
            {render()}
        </>
    );
};

const styles = StyleSheet.create({
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '80%',
        marginTop: window.height * 0.15
    },
    text: {
        color: '#b5b3b3',
        alignSelf: 'center'
    }
});

export default FriendNoti;