import React, {useContext} from 'react';
import {View, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import {Text} from 'react-native-elements';
import {FontAwesome5} from '@expo/vector-icons';
import {Context as NotiContext} from '../context/NotiContext';
import NotiResults from './NotiResults';
import Spacer from '../components/Spacer';

const window = Dimensions.get('window');

const FriendNoti = () => {
    const {state} = useContext(NotiContext);
    const friendNoti = state.noti.filter(item => {
        return (item.type == 'Friend');
    });

    const render = () => {
        if (!state.noti) {
            return <ActivityIndicator size = 'large' style = {{marginTop: 200}} />;
        } else if (friendNoti.length == 0) {
            return (
                <View style = {styles.icon}>
                    <FontAwesome5 name = 'user-friends' size = {window.height * 0.2} color = '#b5b3b3'/>
                    <Spacer />
                    <Text style = {styles.text}>You have no notification</Text>
                </View>
            );
        } else {
            return (
                <View>
                    <NotiResults 
                        results = {friendNoti}
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
        alignSelf: 'center',
        fontSize: window.height * 0.04
    }
});

export default FriendNoti;