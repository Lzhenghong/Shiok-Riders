import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Input, Header} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';

const EditProfileScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [hp, setHp] = useState('');
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
                onChangeText = {setUsername}
                autoCapitalize = 'none'
                autoCorrect = {false}
            />
            <Input 
                label = 'Edit phone number'
                labelStyle = {{color:'#555353'}}
                value = {hp}
                onChangeText = {setHp}
                autoCapitalize = 'none'
                autoCorrect = {false}
            />
            <Spacer>
                <Button
                    title = 'Save Changes'
                    buttonStyle = {styles.button}
                    onPress = {() => navigation.navigate('Profile')}
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