import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, PricingCard } from 'react-native-elements';
import Header from '../components/Header';

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
                info = {[`From: ${item.offer.origin}`, `To: ${item.offer.dest}`, `By: ${item.sender.username}`]}
                button = {
                    <Button 
                        title = 'Add Friend' 
                        buttonStyle = {styles.button} 
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