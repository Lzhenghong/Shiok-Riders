import React, {useContext} from 'react';
import {View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import {Text} from 'react-native-elements';
import {Feather} from '@expo/vector-icons';
import {Context as NotiContext} from '../context/NotiContext';
import NotiResults from './NotiResults';

const window = Dimensions.get('window');

const OfferNoti = () => {
    const {state} = useContext(NotiContext);

    const render = () => {
        if (!state.offer) {
            return <ActivityIndicator size = 'large' style = {{marginTop: 200}} />;
        } else if (state.offer.length == 0) {
            return (
                <View style = {styles.icon}>
                    <Feather name = 'list' size = {200} color = '#b5b3b3'/>
                    <Text h2 style = {styles.text}>You have no notification</Text>
                </View>
            );
        } else {
            return (
                <View>
                    <NotiResults 
                        results = {state.offer.filter(item => {
                            return (item.type == 'Offer' || item.type == 'Accept' || item.type == 'Reject');
                        })}
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
        height: '80%',
        marginTop: window.height * 0.15
    },
    text: {
        color: '#b5b3b3',
        alignSelf: 'center'
    }
});

export default OfferNoti;