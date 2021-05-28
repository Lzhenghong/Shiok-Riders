import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Text, Input, Button, Header} from 'react-native-elements';
import Spacer from '../components/Spacer';
import Logo from '../components/Logo';

const AuthForm = ({title, errorMessage, buttonTitle, onSubmit}) => {
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
                <Button 
                    title = {buttonTitle}
                    onPress = {() => onSubmit({email, password})} 
                    buttonStyle = {styles.button}
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
    button: {
        backgroundColor: '#FF8400'
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: -5
    }
});

export default AuthForm;