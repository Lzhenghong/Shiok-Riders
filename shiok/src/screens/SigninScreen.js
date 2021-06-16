import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext';
import SignInForm from '../components/SignInForm';

const SigninScreen = ({navigation}) => {
    const {state, signin, clearErrorMessage} = useContext(AuthContext);
    return (
        <View style = {styles.container}>
            <SignInForm
                title = 'Sign In'
                errorMessage = {state.errorMessage}
                onSubmit = {signin}
            />
            <TouchableOpacity 
                onPress = {() => {
                    clearErrorMessage();
                    navigation.navigate('Signup');
                }}
            >
                <Text style = {{fontSize: 18, marginTop: 30, alignSelf: 'center'}}>Don't have an account?</Text>
                <Text style = {{fontSize: 18, alignSelf: 'center'}}>Create an account here</Text>
            </TouchableOpacity>
        </View>
    );
};

SigninScreen.navigationOptions = () => {
    return {
      header: () => false,
    };
  };

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    }
});

export default SigninScreen;