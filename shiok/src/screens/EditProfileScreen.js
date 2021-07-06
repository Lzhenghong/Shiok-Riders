import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as ProfContext} from '../context/ProfileContext';
import Button from '../components/ShiokButton';
import Header from '../components/Header';
import ResultOverlay from '../components/ResultOverlay';

const EditProfileScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [hp, setHp] = useState('');
    const [tele, setTele] = useState('');
    const [lic, setLic] = useState('');
    const [visible, setVisible] = useState(false);
    const {state, editProfile, clearErrorMessage} = useContext(ProfContext);

    const checkNum = (input) => {
        return !isNaN(input);
    };

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    return (
        <View>
            <Header 
                title = 'Edit Profile'
                backNav = {true}
                marginBottom = {30}
                callback = {() => navigation.navigate('Profile')}
            />
            <Input 
                label = 'Edit username'
                labelStyle = {{color:'#555353'}}
                value = {username}
                placeholder = {state.user.username}
                onChangeText = {setUsername}
                autoCapitalize = 'none'
                autoCorrect = {false}
            />
            <Input 
                label = 'Edit phone number'
                labelStyle = {{color:'#555353'}}
                value = {hp}
                placeholder = {state.user.phoneNumber}
                onChangeText = {(newTerm) => {
                    checkNum(newTerm) ? setHp(newTerm) : setHp('');
                }}
                autoCapitalize = 'none'
                autoCorrect = {false}
            />
            <Input 
                label = 'Edit telegram handle'
                labelStyle = {{color:'#555353'}}
                value = {tele}
                placeholder = {state.user.teleHandle}
                onChangeText = {setTele}
                autoCapitalize = 'none'
                autoCorrect = {false}
            />
            {state.user.type == 'Driver' ?
            (<Input 
            label = 'Edit license number'
            labelStyle = {{color:'#555353'}}
            value = {lic}
            placeholder = {state.user.licenseNumber}
            onChangeText = {setLic}
            autoCapitalize = 'none'
            autoCorrect = {false}
            />) : null}
            <Spacer>
                <Button
                    title = 'Save Changes'
                    callback = {async () => {
                        const newUsername = (username == '' ? state.user.username : username);
                        const newHp = (hp == '' ? state.user.phoneNumber : hp);
                        const newTele = (tele == '' ? state.user.teleHandle : tele);
                        const newLic = (lic == '' ? state.user.licenseNumber : lic);
                        editProfile({username: newUsername, phoneNumber: newHp, teleHandle: newTele, licenseNumber: newLic}).then(res => {
                            toggleOverlay();
                        });
                    }}
                />
            </Spacer>
            <Spacer>
                <Button
                    title = 'Cancel Changes'
                    callback = {() => navigation.navigate('Profile')}
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
                body = 'Profile Updated'
            />
        </View>
    );
};

EditProfileScreen.navigationOptions = () => {
    return {
      header: () => false,
    };
  };

const styles = StyleSheet.create({});

export default EditProfileScreen;