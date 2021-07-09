import React, {useState, useContext} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Icon, Text, Rating, Avatar } from 'react-native-elements';
import Header from '../components/Header';
import Spacer from '../components/Spacer';
import Button from '../components/ShiokButton';
import {Context as ProfileContext} from '../context/ProfileContext';
import ResultOverlay from '../components/ResultOverlay';
import DeleteOverlay from '../components/DeleteOverlay';
import Communications from 'react-native-communications';

const window = Dimensions.get('window');

const FriendDetailScreen = ({navigation}) => {
    const item = navigation.getParam('item');
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [visible, setVisible] = useState(false);

    const {state, deleteFriend, clearErrorMessage} = useContext(ProfileContext);

    const toggleDelete = () => {
        setDeleteVisible(!deleteVisible);
    };

    const toggleOverlay = () => {
        setVisible(!visible);
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
            (<Icon
                name = 'user'
                type = 'evilicon'
                color = '#CCCCCC'
                size = {100}
                containerStyle = {styles.icon}
                reverse = {true}
            />) :
            (<Avatar 
                rounded 
                containerStyle = {styles.icon}
                size = {211}
                source = {{uri: 'data:image/jpeg;base64,' + item.pic}}
            />
            )}
            <Rating
                startingValue = {item.rating.average}
                size = {50}
                readonly = {true}
                tintColor = '#f2f3f5'
            />
            <Spacer />
            <Text h4 style = {styles.client}>{`Username: ${item.username}`}</Text>
            <Text h4 style = {styles.client}>{`Phone Number: ${item.phoneNumber}`}</Text>
            <Text h4 style = {styles.client}>{`Telehandle: @${item.teleHandle}`}</Text>
            {item.type == 'Driver' ?
            <Text h4 style = {styles.client}>{`License Number: @${item.licenseNumber}`}</Text> 
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
                    deleteFriend({friend: item}).then(res => {
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
        </View>
    );
};

FriendDetailScreen.navigationOptions = () => {
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

export default FriendDetailScreen;