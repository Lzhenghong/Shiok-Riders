import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Input, Header} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as ProfContext} from '../context/ProfileContext';

const EditProfileScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [hp, setHp] = useState('');
    const [lic, setLic] = useState('');
    const {state, editProfile} = useContext(ProfContext);

    const checkNum = (input) => {
        return !isNaN(input);
    };

    return (
        <View>
            <Header 
                backgroundColor = '#3EB489'
                containerStyle = {styles.header}
                centerComponent = {{text: 'Edit Profile', style: {color: '#fff', fontSize: 20, fontWeight: 'bold', paddingBottom: 20, marginBottom: 14}}}
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
                    buttonStyle = {styles.button}
                    onPress = {() => {
                        const newUsername = (username == '' ? state.user.username : username);
                        const newHp = (hp == '' ? state.user.phoneNumber : hp);
                        const newLic = (lic == '' ? state.user.licenseNumber : lic);
                        editProfile({username: newUsername, phoneNumber: newHp, licenseNumber: newLic});
                        navigation.navigate('Profile');
                    }}
                />
            </Spacer>
            <Spacer>
                <Button
                    title = 'Cancel Changes'
                    buttonStyle = {styles.button}
                    onPress = {() => navigation.navigate('Profile')}
                />
            </Spacer>
        </View>
    );
};

EditProfileScreen.navigationOptions = () => {
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
        borderRadius: 20
    }
});

export default EditProfileScreen;