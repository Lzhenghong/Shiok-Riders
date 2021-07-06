import React, {useState, useContext} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Icon, Text, Rating } from 'react-native-elements';
import Header from '../components/Header';
import Spacer from '../components/Spacer';
import Button from '../components/ShiokButton';
import {Context as BookingContext} from '../context/BookingContext';
import ResultOverlay from '../components/ResultOverlay';
import Communications from 'react-native-communications';

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
            <Icon
                name = 'user'
                type = 'evilicon'
                color = '#CCCCCC'
                size = {100}
                containerStyle = {styles.icon}
                reverse = {true}
            />
            <Rating
                startingValue = {item.sender.rating.average}
                size = {50}
                readOnly = {true}
                tintColor = '#f2f3f5'
            />
            <Spacer />
            <Text h4 style = {styles.client}>{`Username: ${item.sender.username}`}</Text>
            <Text h4 style = {styles.client}>{`Phone Number: ${item.sender.phoneNumber}`}</Text>
            <Text h4 style = {styles.client}>{`Telehandle: @${item.sender.teleHandle}`}</Text>
            {item.sender.type == 'Driver' ?
            <Text h4 style = {styles.client}>{`License Number: @${item.sender.licenseNumber}`}</Text> 
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
    icon: {
        alignSelf: 'center',
        marginBottom: 30
    },
    client: {
        marginLeft: 10
    },
});

export default AddFriendScreen;