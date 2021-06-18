import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, PricingCard } from 'react-native-elements';
import {Context as ListingContext} from '../context/ListingContext';
import Overlay from '../components/Overlay';

ConfirmListingScreen = ({navigation}) => {
    const {state, addListing} = useContext(ListingContext);
    const [visible, setVisible] = useState(false);
    const [errVisible, setErrVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const toggleError = () => {
        setErrVisible(!errVisible);
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
                        onPress = {() => {
                            addListing({originObj: state.origin, destObj: state.dest, priceString: state.price});
                            toggleOverlay();
                        }}
                    />}
            />
            {state.errorMessage ? 
            <Overlay 
            visible = {errVisible}
            onBackdrop = {() => {
                toggleError();
            }}
            body = {errorMessage}
            onPress = {() => {
                toggleError();
            }}
            subbody = 'Please check your connection'
            /> :
            <Overlay 
                visible = {visible}
                onBackdrop = {() => {
                    toggleOverlay();
                    navigation.navigate('AddOrigin');
                }}
                body = 'Your listing is submitted!'
                onPress = {() => {
                    toggleOverlay();
                    navigation.navigate('AddOrigin');
                }}
            />
            }
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
    },
    overlay: {
        height: 200,
        alignSelf: 'center',
        justifyContent: 'center'
    }
});

export default ConfirmListingScreen;