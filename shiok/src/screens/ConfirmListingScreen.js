import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import { Header, Button, PricingCard, Text, Overlay } from 'react-native-elements';
import {Context as ListingContext} from '../context/ListingContext';
import {AntDesign} from '@expo/vector-icons';

ConfirmListingScreen = ({navigation}) => {
    const {state, addListing} = useContext(ListingContext);
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    return (
        <View>
            <Header 
                leftComponent = {<AntDesign name = 'arrowleft' color = 'white' size = {30} onPress = {() => navigation.navigate('AddDest')} />}
                backgroundColor = '#3EB489'
                containerStyle = {styles.header}
                centerComponent = {{text: 'Confirm', style: {color: '#fff', fontSize: 20, fontWeight: 'bold', paddingBottom: 20, marginBottom: 14}}}
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
                    navigation.navigate('Home');
                }}
                overlayStyle = {styles.overlay}
            >
                <Text h3 style = {styles.text}>Your listing is submitted!</Text>
                <Button 
                    title = 'Back To Home' 
                    buttonStyle = {styles.button} 
                    onPress = {() => {
                        toggleOverlay();
                        navigation.navigate('Home');
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
    header: {
        marginBottom: 15,
        height: 78.5
    },
    button: {
        backgroundColor: '#FF8400',
        borderRadius: 20,
        alignSelf: 'center',
        width: 395,
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