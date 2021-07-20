import React, {useState, useContext} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Button, PricingCard } from 'react-native-elements';
import {Context as ListingContext} from '../context/ListingContext';
import Overlay from '../components/ResultOverlay';
import Header from '../components/Header';

ConfirmListingScreen = ({navigation}) => {
    const {state, addListing, clearErrorMessage} = useContext(ListingContext);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    toggleLoading = () => {
        setLoading(!loading);
    };

    return (
        <View>
            <Header 
                title = 'Confirm Listing'
                backNav = {true}
                marginBottom = {15}
                callback = {() => navigation.navigate('AddDest')}
            />
            <PricingCard 
                color = '#FF8400'
                title = 'Your Listing'
                price = {'$'.concat(state.price)}
                info = {[`From: ${state.origin.name}`, `To: ${state.dest.name}`]}
                button = {
                    <Button 
                        title = 'Confirm' 
                        buttonStyle = {styles.button} 
                        onPress = {async () => {
                            await toggleLoading();
                            addListing({originObj: state.origin, destObj: state.dest, priceString: state.price})
                                .then(async res => {
                                    await toggleLoading();
                                    toggleOverlay();
                                });
                        }}
                    />}
            />
            <Overlay 
                visible = {visible}
                onPress = {() => {
                    toggleOverlay();
                    navigation.navigate('AddOrigin');
                    clearErrorMessage();
                }}
                errorMessage = {state.errorMessage}
                errorTitle = 'Could not submit listing'
                errorSubtitle = 'Please try again'
                body = 'Your listing is submitted!'
            />
            {loading ? <ActivityIndicator /> : null}
        </View>
    );
};

ConfirmListingScreen.navigationOptions = () => {
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
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: -5
    },
    text: {
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: 10
    }
});

export default ConfirmListingScreen;