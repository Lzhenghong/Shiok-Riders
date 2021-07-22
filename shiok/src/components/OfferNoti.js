import React, {useContext} from 'react';
import {View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import {Text} from 'react-native-elements';
import {Feather} from '@expo/vector-icons';
import {Context as NotiContext} from '../context/NotiContext';
import NotiResults from './NotiResults';

const window = Dimensions.get('window');

const OfferNoti = () => {
    var offerNoti;
    const {state} = useContext(NotiContext);
    if (state.noti) {
        offerNoti = state.noti.filter(item => {
            return (item.type == 'Offer' || item.type == 'Accept' || item.type == 'Reject');
        });
    }
    
    const render = () => {
        if (!state.noti) {
            return <ActivityIndicator size = 'large' style = {{marginTop: 200}} />;
        } else if (offerNoti.length == 0) {
            return (
                <View style = {styles.icon}>
                    <Feather name = 'list' size = {window.height * 0.24} color = '#b5b3b3'/>
                    <Text style = {styles.text}>You have no notification</Text>
                </View>
            );
        } else {
            return (
                <View>
                    <NotiResults 
                        results = {offerNoti}
                    />
                </View>
            );
        }
    }

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
        height: '100%',
        marginTop: window.height * 0.1
    },
    text: {
        color: '#b5b3b3',
        alignSelf: 'center',
        fontSize: window.height * 0.04
    }
});

export default OfferNoti;