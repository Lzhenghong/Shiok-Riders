import React, {useState, useContext} from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Text, Rating } from 'react-native-elements';
import Header from '../components/Header';
import Spacer from '../components/Spacer';
import Button from '../components/ShiokButton';
import {Context as ProfileContext} from '../context/ProfileContext';
import ResultOverlay from '../components/ResultOverlay';
import DeleteOverlay from '../components/DeleteOverlay';
import Communications from 'react-native-communications';
import NoPicIcon from '../components/NoPicIcon';
import Avatar from '../components/Avatar';

const window = Dimensions.get('window');

const FriendDetailScreen = ({navigation}) => {
    const item = navigation.getParam('item');
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const {state, deleteFriend, clearErrorMessage} = useContext(ProfileContext);

    const toggleDelete = () => {
        setDeleteVisible(!deleteVisible);
    };

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    toggleLoading = () => {
        setLoading(!loading);
    };

    return (
        <View>
            <Header 
                title = 'Friend Details'
                backNav = {true}
                marginBottom = {-1}
                callback = {() => navigation.navigate('FriendList')}
            />
            <Spacer />
            {item.pic == '' ?
            (<NoPicIcon 
                fraction = {0.11}
            />) :
            (<Avatar 
                fraction = {0.24}
                pic = {item.pic}
            />
            )}
            <Rating
                startingValue = {item.rating.average}
                size = {50}
                readonly = {true}
                tintColor = '#f2f3f5'
            />
            <Spacer />
            <Text style = {styles.client}>{`Username: ${item.username}`}</Text>
            <Text style = {styles.client}>{`Phone Number: ${item.phoneNumber}`}</Text>
            <Text style = {styles.client}>{`Telehandle: @${item.teleHandle}`}</Text>
            {item.type == 'Driver' ?
            <Text style = {styles.client}>{`License Number: @${item.licenseNumber}`}</Text> 
            : null}
            <Spacer />
            <Button 
                title = 'Message'
                callback = {() => Communications.textWithoutEncoding(item.phoneNumber, '')}
            />
            <Spacer />
            <Button 
                title = 'Delete Friend'
                callback = {() => toggleDelete()}
            />
            <DeleteOverlay 
                visible = {deleteVisible}
                onBackdrop = {() => toggleDelete()}
                text = 'Delete this friend?'
                subbody = 'This action is irreversible'
                onYes = {async () => {
                    await toggleLoading();
                    deleteFriend({friend: item}).then(async res => {
                        await toggleLoading();
                        toggleDelete();
                        toggleOverlay();
                    });
                }}
                onNo = {() => toggleDelete()}
            />
            <ResultOverlay 
                visible = {visible}
                onPress = {() => {
                    if (state.errorMessage) {
                        clearErrorMessage();
                        toggleOverlay();
                    } else {
                        toggleOverlay();
                        navigation.navigate('FriendList');
                    }
                }}
                errorMessage = {state.errorMessage}
                errorTitle = {state.errorMessage}
                errorSubtitle = 'Please check your connection'
                body = 'Friend deleted'
            />
            {loading ? <ActivityIndicator /> : null}
        </View>
    );
};

FriendDetailScreen.navigationOptions = () => {
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

export default FriendDetailScreen;