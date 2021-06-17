import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, PricingCard, Text, Overlay } from 'react-native-elements';
import {Context as ListingContext} from '../context/ListingContext';

ConfirmListingScreen = ({navigation}) => {
    const {state, addListing} = useContext(ListingContext);
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
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
            <Text style = {styles.errorMessage}>{state.errorMessage}</Text> :
            <Overlay 
                isVisible = {visible} 
                onBackdropPress = {() => {
                    toggleOverlay();
                    navigation.navigate('AddOrigin');
                }}
                overlayStyle = {styles.overlay}
            >
                <Text h3 style = {styles.text}>Your listing is submitted!</Text>
                <Button 
                    title = 'Done' 
                    buttonStyle = {styles.button} 
                    onPress = {() => {
                        toggleOverlay();
                        navigation.navigate('AddOrigin');
                    }}
                />
            </Overlay>
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