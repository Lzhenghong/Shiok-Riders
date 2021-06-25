import React, {useContext} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Text} from 'react-native-elements';
import {Feather} from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';
import {Context as NotiContext} from '../context/NotiContext';
import NotiResults from './NotiResults';

const window = Dimensions.get('window');

const BookingNoti = () => {
    const {state, fetchBookingNoti} = useContext(NotiContext);

    return (
    <>
        <NavigationEvents onDidFocus = {fetchBookingNoti}/>
        {state.booking && state.booking.length > 0 ? 
        (<View>
            <NotiResults 
                results = {state.booking}
            />
        </View>) :
        (<View style = {styles.icon}>
            <Feather name = 'list' size = {200} color = '#b5b3b3'/>
            <Text h2 style = {styles.text}>You have no notification</Text>
        </View>)
        }
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

export default BookingNoti;