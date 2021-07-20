import React, {useState, useContext} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Button, PricingCard } from 'react-native-elements';
import Overlay from '../components/ResultOverlay';
import Header from '../components/Header';
import Communications from 'react-native-communications';
import Spacer from '../components/Spacer';
import TwinButtons from '../components/TwinButtons';
import {Context as NotiContext} from '../context/NotiContext';

OfferDecisionScreen = ({navigation}) => {
    const item = navigation.getParam('item');
    const [visible, setVisible] = useState(false);
    const [outcome, setOutcome] = useState('');
    const [loading, setLoading] = useState(false);
    const {state, sendResult, clearErrorMessage} = useContext(NotiContext);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    toggleLoading = () => {
        setLoading(!loading);
    };

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
                title = 'Offer Details'
                price = {'$'.concat(item.offer.price)}
                info = {[`From: ${item.offer.origin}`, `To: ${item.offer.dest}`, `By: ${item.sender.username}`, `Rating: ${item.sender.rating.average}/5`,
                    `Phone: ${item.sender.phoneNumber}`, `Telehandle: @${item.sender.teleHandle}`
                ]}
                button = {
                    <Button 
                        title = 'Message Lister' 
                        buttonStyle = {styles.button} 
                        onPress = {() => Communications.textWithoutEncoding(item.sender.phoneNumber, '')}
                    />}
            />  
            <Spacer>
                <TwinButtons 
                    buttonTitleLeft = 'Accept Offer'
                    buttonTitleRight = 'Reject Offer'
                    callbackLeft = {async () => {
                        setOutcome('accepted');
                        await toggleLoading();
                        sendResult({result: 'Accept', item: item})
                            .then(async res => {
                                await toggleLoading();
                                toggleOverlay()
                            });
                    }}
                    callbackRight = {async () => {
                        setOutcome('rejected');
                        await toggleLoading();
                        sendResult({result: 'Reject', item: item})
                            .then(async res => {
                                await toggleLoading();
                                toggleOverlay();
                            });
                    }}                
                />
            </Spacer>
            <Overlay 
                visible = {visible}
                onPress = {() => {
                    toggleOverlay();
                    clearErrorMessage();
                    if (state.errorMessage) {
                        navigation.navigate('Notification');
                    } else {
                        Communications.textWithoutEncoding(item.sender.phoneNumber,
                            `I have ${outcome} your offer from ${item.offer.origin} to ${item.offer.dest} for $${item.offer.price}`);
                        navigation.navigate('Notification');
                    }
                }}
                errorMessage = {state.errorMessage}
                errorTitle = {state.errorMessage}
                errorSubtitle = 'Please check your connection'
                body = 'You have sent a reply!'
            />
            {loading ? <ActivityIndicator /> : null}
        </View>
    );
};

OfferDecisionScreen.navigationOptions = () => {
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

export default OfferDecisionScreen;