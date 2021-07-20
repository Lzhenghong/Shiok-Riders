import React, {useState} from 'react';
import {StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import {Text, Input} from 'react-native-elements';
import Spacer from './Spacer';
import Logo from './Logo';
import TwinButtons from './TwinButtons';

const window = Dimensions.get('window');

const SignInForm = ({title, errorMessage, onSubmit}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    toggleLoading = () => {
        setLoading(!loading);
    };

    return (
        <>
            <Logo />
            <Text style = {styles.title}>{title}</Text>
            <Spacer />
            <Input 
                label = 'Email'
                labelStyle = {{color:'#555353'}}
                value = {email}
                onChangeText = {setEmail}
                autoCapitalize = 'none'
                autoCorrect = {false}
            />
            <Input
                secureTextEntry
                label = 'Password'
                labelStyle = {{color:'#555353'}}
                value = {password}
                onChangeText = {setPassword}
                autoCapitalize = 'none'
                autoCorrect = {false}
            />
            {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
            {loading ? <ActivityIndicator /> : null}
            <Spacer>
                <TwinButtons 
                    buttonTitleLeft = 'Sign In As Hitcher'
                    buttonTitleRight = 'Sign In As Driver'
                    callbackLeft = {async () => {
                        await toggleLoading();
                        onSubmit({email, password, type: 'Hitcher'})
                            .then(res => toggleLoading());
                    }}
                    callbackRight = {async () => {
                        await toggleLoading();
                        onSubmit({email, password, type: 'Driver'})
                            .then(res => toggleLoading());
                    }}
                />
            </Spacer>
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        marginTop: window.height * 0.0225,
        marginBottom: window.height * 0.0225,
        color: '#555353',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: window.height * 0.025
    },
    errorMessage: {
        fontSize: window.height * 0.0175,
        color: 'red',
        marginLeft: 15,
        marginTop: -5
    }
});

export default SignInForm;