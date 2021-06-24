import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Header, Button, Input} from 'react-native-elements';
import {AntDesign} from '@expo/vector-icons';
import Spacer from '../components/Spacer';
import Communciations from 'react-native-communications';
import {Context as NotiContext} from '../context/NotiContext';
import {Context as ProfileContext} from '../context/ProfileContext';
import Overlay from '../components/ResultOverlay';

const SubmitOfferScreen = ({navigation}) => {
    const item = navigation.getParam('item');
    const [origin, setOrigin] = useState('');
    const [dest, setDest] = useState('');
    const [price, setPrice] = useState('');
    const [visible, setVisible] = useState(false);

    const {state: profileState} = useContext(ProfileContext);
    const {state, sendToDriver, clearErrorMessage} = useContext(NotiContext);

    const checkNum = (input) => {
        return !isNaN(input);
    };

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const errorSubtitle = () => {
        switch (state.errorMessage) {
            case 'Unable to find booking':
                return 'This booking has expired';
            case 'Already submitted an offer':
                return 'Please wait for the outcome';
            default:
                return 'Please check your connection';
        }
    }

    const finalOrigin = origin ? origin : item.origin.name;
    const finalDest = dest ? dest : item.dest.name;
    const finalPrice = price ? price : item.price.toString();

    return (
        <View>
            <Header 
                leftComponent = {<AntDesign name = 'arrowleft' color = 'white' size = {30} onPress = {() => navigation.navigate('ListingDetails')} />}
                backgroundColor = '#3EB489'
                containerStyle = {styles.header}
                centerComponent = {{text: 'Confirm Offer', style: {color: '#fff', fontSize: 20, fontWeight: 'bold', paddingBottom: 20, marginBottom: 14}}}
            />
            <Input 
                label = 'Pick Up Point'
                labelStyle = {{color:'#555353'}}
                value = {origin}
                placeholder = {item.origin.name}
                onChangeText = {setOrigin}
                autoCapitalize = 'none'
                autoCorrect = {false}
            />
            <Input 
                label = 'Drop Off Point'
                labelStyle = {{color:'#555353'}}
                value = {dest}
                placeholder = {item.dest.name}
                onChangeText = {setDest}
                autoCapitalize = 'none'
                autoCorrect = {false}
            />
            <Input 
                label = 'Price'
                labelStyle = {{color:'#555353'}}
                value = {price}
                placeholder = {item.price.toString()}
                onChangeText = {(newTerm) => {
                    checkNum(newTerm) ? setPrice(newTerm) : setPrice('');
                }}
                autoCapitalize = 'none'
                autoCorrect = {false}
            />
            <Spacer>
                <Button 
                    title = 'Submit Offer'
                    buttonStyle = {styles.button}
                    onPress = {() => {
                        const offer = {origin: finalOrigin, dest: finalDest, price: finalPrice};
                        sendToDriver({recipient: item.lister, type: 'Offer', booking: item, offer})
                            .then(res => toggleOverlay());
                    }}
                />
            </Spacer>
            <Overlay 
                visible = {visible}
                onPress = {() => {
                    toggleOverlay();
                    clearErrorMessage();
                    state.errorMessage ? navigation.navigate('Home') : Communciations.text(item.lister.phoneNumber,
                        `I would like to send you an offer on Shiok-Riders: from ${finalOrigin} to ${finalDest} for $${finalPrice}`);
                }}
                errorMessage = {state.errorMessage}
                errorTitle = {state.errorMessage}
                errorSubtitle = {errorSubtitle()}
                body = 'Your offer is submitted!'
            />
        </View>
    );
};

SubmitOfferScreen.navigationOptions = () => {
    return {
      header: () => false,
    };
  };

const styles = StyleSheet.create({
    header: {
        marginBottom: 30,
        height: 78.5
    },
    button: {
        backgroundColor: '#FF8400',
        borderRadius: 20,
        width: 387.5,
        alignSelf: 'center'
    }
});

export default SubmitOfferScreen;
