import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const SigninScreen = ({navigation}) => {
    const {state, signin} = useContext(AuthContext);
    return (
        <View style = {styles.container}>
            <AuthForm 
                title = 'Sign In'
                errorMessage = {state.errorMessage}
                buttonTitle = 'Sign In'
                onSubmit = {signin}
            />
            <TouchableOpacity 
                onPress = {() => navigation.navigate('Signup')}
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
        marginBottom: 200
    }
});

export default SigninScreen;
