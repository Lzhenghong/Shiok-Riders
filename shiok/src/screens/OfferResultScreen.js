import React from 'react';
import {View, StyleSheet} from 'react-native';
import {PricingCard, Button } from 'react-native-elements';
import Header from '../components/Header';
import Communications from 'react-native-communications';

OfferResultScreen = ({navigation}) => { 
    const item = navigation.getParam('item');
    
    return (
        <View>
            <Header 
                title = 'Offer'
                backNav = {true}
                marginBottom = {15}
                callback = {() => navigation.navigate('Notification')}
            />
            <PricingCard 
                color = '#FF8400'
                title = {`Offer ${item.type}ed`} 
                price = {'$'.concat(item.offer.price)}
                info = {[`From: ${item.offer.origin}`, `To: ${item.offer.dest}`, `By: ${item.sender.username}`, `Phone Number: ${item.sender.phoneNumber}`, `Telehandle: @${item.sender.teleHandle}`]}
                button = {
                    <Button 
                        title = 'Message' 
                        buttonStyle = {styles.button} 
                        onPress = {() => {
                            Communications.textWithoutEncoding(item.sender.phoneNumber, '');
                        }}
                    />}
            /> 
        </View>
    );
};

OfferResultScreen.navigationOptions = () => {
    return {
      header: () => false,
    };
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FF8400',
        borderRadius: 20,
        alignSelf: 'center',
        width: 387.5,
        marginVertical: 5
    }
});

export default OfferResultScreen;