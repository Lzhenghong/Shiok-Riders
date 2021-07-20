import React, {useState} from 'react';
import {StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import {Text, Input} from 'react-native-elements';
import Spacer from './Spacer';
import Logo from './Logo';
import TwinButtons from './TwinButtons';
import checkNum from '../hooks/checkNum';

const window = Dimensions.get('window');

const SignUpForm = ({title, errorMessage, onSubmit}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
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
            <Input
                label = 'Phone Number'
                labelStyle = {{color:'#555353'}}
                value = {phoneNumber}
                onChangeText = {(newTerm => {
                    checkNum(newTerm) ? setPhoneNumber(newTerm) : setPhoneNumber('');
                })}
                autoCapitalize = 'none'
                autoCorrect = {false}
            />
            {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
            {loading ? <ActivityIndicator /> : null}
            <Spacer>
                <TwinButtons 
                    buttonTitleLeft = 'Sign Up As Hitcher'
                    buttonTitleRight = 'Sign Up As Driver'
                    callbackLeft = {async () => {
                        await toggleLoading();
                        onSubmit({email, password, type: 'Hitcher', phoneNumber})
                            .then(res => toggleLoading());
                    }}
                    callbackRight = {() => onSubmit({email, password, type: 'Driver', phoneNumber})}
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

export default SignUpForm;