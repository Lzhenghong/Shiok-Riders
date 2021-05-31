import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const SignupScreen = ({navigation}) => {
    const {state, signup, clearErrorMessage} = useContext(AuthContext);

    return (
        <View style = {styles.container}>
            <AuthForm 
                title = 'Create Account'
                errorMessage = {state.errorMessage}
                buttonTitleLeft = 'Sign Up As Hitcher'
                buttonTitleRight = 'Sign Up As Driver'
                onSubmit = {signup}
            />
            <TouchableOpacity 
                onPress = {() => {
                    clearErrorMessage();
                    navigation.navigate('Signin');
                }}
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
    }
});

export default SignupScreen;