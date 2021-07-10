import React, {useState, useContext} from 'react';
import { View, StyleSheet, ActivityIndicator} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Header from '../components/Header';
import Spacer from '../components/Spacer';
import Button from '../components/ShiokButton';
import {Context as ProfContext} from '../context/ProfileContext';
import ResultOverlay from '../components/ResultOverlay';
import NoPicIcon from '../components/NoPicIcon';
import Avatar from '../components/Avatar';

const ProfilePicScreen = ({navigation}) => {
    const {state, editPic, clearErrorMessage} = useContext(ProfContext);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pic, setPic] = useState(state.user.pic);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const toggleLoading = () => {
        setLoading(!loading);
    ;}

    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({base64: true});
        setPic(pickerResult.base64);
    }

    return (
        <View>
            <Header 
                title = 'Edit Profile Pic'
                backNav = {true}
                marginBottom = {-1}
                callback = {() => navigation.navigate('Profile')}
            />
            <Spacer />
            {pic == '' ? 
            (<NoPicIcon 
                fraction = {0.11}
            />) : 
            (<Avatar 
                fraction = {0.24}
                pic = {pic}
            />)}
            <Spacer>
                <Button 
                    title = 'Choose Image'
                    callback = {() => openImagePickerAsync()}
                />
            </Spacer>
            <Spacer>
                <Button 
                    title = 'Remove Image'
                    callback = {() => setPic('')}
                />
            </Spacer>
            <Spacer>
                <Button 
                    title = 'Save Image'
                    callback = {async () => {
                        toggleLoading();
                        editPic({pic}).then(res => {
                            toggleLoading();
                            toggleOverlay();
                        });
                    }}
                />
            </Spacer>
            <ResultOverlay 
                visible = {visible}
                onPress = {() => {
                    if (state.errorMessage) {
                        clearErrorMessage();
                        toggleOverlay();
                    } else {
                        toggleOverlay();
                        navigation.navigate('Profile');
                    }
                }}
                errorMessage = {state.errorMessage}
                errorTitle = {state.errorMessage}
                errorSubtitle = 'Please check your connection'
                body = 'Picture Updated'
            />
            {loading ? <ActivityIndicator /> : null}
        </View>
    )
};

ProfilePicScreen.navigationOptions = () => {
    return {
      header: () => false,
    };
  };

const styles = StyleSheet.create({
    icon: {
        alignSelf: 'center',
        marginBottom: 30
    }
});

export default ProfilePicScreen;
