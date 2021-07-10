import React, {useState, useContext} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {Text, Rating } from 'react-native-elements';
import Header from '../components/Header';
import Spacer from '../components/Spacer';
import Button from '../components/ShiokButton';
import {Context as BookingContext} from '../context/BookingContext';
import ResultOverlay from '../components/ResultOverlay';
import Communications from 'react-native-communications';
import NoPicIcon from '../components/NoPicIcon';
import Avatar from '../components/Avatar';

const window = Dimensions.get('window');

const AddFriendScreen = ({navigation}) => {
    const item = navigation.getParam('item');
    const [friendVisible, setFriendVisible] = useState(false);
    const {state, addFriend, clearErrorMessage} = useContext(BookingContext);

    const toggleFriend = () => {
        setFriendVisible(!friendVisible);
    };

    const errSubtitle = () => {
        switch (state.errorMessage) {
            case 'Existing friend':
                return 'This user had been added previously';
            default:
                return 'Please check your connection';
        }
    };

    return (
        <View>
            <Header 
                title = 'Add Friend'
                backNav = {true}
                marginBottom = {-1}
                callback = {() => navigation.goBack()}
            />
            <Spacer />
            {item.sender.pic == '' ?
            (<NoPicIcon 
                fraction = {0.11}
            />) : 
            (<Avatar 
                fraction = {0.24}
                pic = {item.sender.pic}
            />
            )}
            <Rating
                startingValue = {item.sender.rating.average}
                size = {50}
                readonly = {true}
                tintColor = '#f2f3f5'
            />
            <Spacer />
            <Text style = {styles.client}>{`Username: ${item.sender.username}`}</Text>
            <Text style = {styles.client}>{`Phone Number: ${item.sender.phoneNumber}`}</Text>
            <Text style = {styles.client}>{`Telehandle: @${item.sender.teleHandle}`}</Text>
            {item.sender.type == 'Driver' ?
            <Text style = {styles.client}>{`License Number: @${item.sender.licenseNumber}`}</Text> 
            : null}
            <Spacer />
            <Button 
                title = 'Add Friend'
                callback = {async () => {
                    addFriend({client: item.sender}).then(res => {
                        toggleFriend();
                    });
                }}
            />
            <ResultOverlay 
                visible = {friendVisible}
                onPress = {() => {
                    toggleFriend();
                    clearErrorMessage();
                    if (state.errorMessage) {
                        navigation.goBack();
                    } else {
                        Communications.textWithoutEncoding(item.sender.phoneNumber,
                            `I would like to add you as friend on Shiok-Riders`);
                    } 
                }}
                errorMessage = {state.errorMessage}
                errorTitle = {state.errorMessage}
                errorSubtitle = {errSubtitle()}
                body = 'You have added this user'
            />
        </View>
    );
};

AddFriendScreen.navigationOptions = () => {
    return {
      header: () => false
    };
  };

const styles = StyleSheet.create({
    client: {
        marginLeft: 10,
        fontSize: window.height * 0.025
    },
});

export default AddFriendScreen;