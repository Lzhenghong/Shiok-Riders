import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Text, Input, Header} from 'react-native-elements';
import Spacer from './Spacer';
import Logo from './Logo';
import TwinButtons from './TwinButtons';

const SignInForm = ({title, errorMessage, onSubmit}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <>
            <Header 
                backgroundColor = '#3EB489'
                containerStyle = {styles.header}
            />
            <Spacer>
                <Logo />
            </Spacer>
            <Spacer>
                <Text h3 style = {styles.title}>{title}</Text>
            </Spacer>
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
            <Spacer>
                <TwinButtons 
                    buttonTitleLeft = 'Sign In As Hitcher'
                    buttonTitleRight = 'Sign In As Driver'
                    callbackLeft = {() => onSubmit({email, password, type: 'Hitcher'})}
                    callbackRight = {() => onSubmit({email, password, type: 'Driver'})}
                />
            </Spacer>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        marginBottom: 40
    },  
    title: {
        marginTop: 25,
        marginBottom: 20,
        color: '#555353',
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: -5
    }
});

export default SignInForm;