import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import { Header, Button, PricingCard } from 'react-native-elements';
import {Context as ListingContext} from '../context/ListingContext';
import {AntDesign} from '@expo/vector-icons';

ConfirmListingScreen = ({navigation}) => {
    const {state} = useContext(ListingContext);

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
                button = {<Button title = 'Confirm' buttonStyle = {styles.button} onPress = {() => console.log('hehe')}/>}
            />
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
    }
});

export default ConfirmListingScreen;