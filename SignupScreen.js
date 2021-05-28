import React, {useContext, useState} from 'react';
import {View, StyleSheet,TouchableOpacity} from 'react-native';
import {Text, Input, Button, Header} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';

const SignupScreen = ({navigation}) => {
    const {state, signup} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style = {styles.container}>
            <Header 
                backgroundColor = '#3EB489'
                containerStyle = {styles.header}
            />
            <Spacer>
            <Text h1 style = {styles.logoTop}>Shiok</Text>
            <Text h1 style = {styles.logoBottom}>Riders</Text>
            </Spacer>
            <Spacer>
                <Text h3 style = {styles.title}>Create Account</Text>
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
            {state.errorMessage ? (
            <Text style={styles.errorMessage}>{state.errorMessage}</Text>
            ) : null}
            <Spacer>
                <Button 
                    title = 'Sign Up'
                    onPress = {() => signup({email, password})} 
                    buttonStyle = {styles.button}
                />
            </Spacer>
            <TouchableOpacity 
                onPress = {() => navigation.navigate('Signin')}
            >
                <Text style = {{fontSize: 18, marginTop: 30, alignSelf: 'center'}}>Already have an account?</Text>
                <Text style = {{fontSize: 18, alignSelf: 'center'}}>Sign in instead</Text>
            </TouchableOpacity>
        </View>
    );
};

SignupScreen.navigationOptions = () => {
    return {
      header: () => false,
    };
  };

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginBottom: 200
    },
    header: {
        marginBottom: 40
    },  
    logoTop: {
        color: '#3EB489',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    logoBottom: {
        color: '#555353',
        fontWeight: 'bold',
        alignSelf: 'center'
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
    },
});

export default SignupScreen;