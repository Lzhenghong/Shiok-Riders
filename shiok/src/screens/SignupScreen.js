import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import {Text} from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext';
import SignUpForm from '../components/SignUpForm';
import Header from '../components/Header';
import Spacer from '../components/Spacer';

const window = Dimensions.get('window');

const SignupScreen = ({navigation}) => {
    const {state, signup, clearErrorMessage} = useContext(AuthContext);

    return (
        <View style = {{justifyContent: 'center'}}>
            <Header 
                title = ''
                marginBottom = {window.height * 0.015}
            />
            <Spacer />
            <View style = {styles.container}>
                <ScrollView>
                    <SignUpForm
                        title = 'Create Account'
                        errorMessage = {state.errorMessage}
                        onSubmit = {signup}
                    />
                    
                    <TouchableOpacity 
                        onPress = {() => {
                            clearErrorMessage();
                            navigation.navigate('Signin');
                        }}
                    >
                        <Text style = {{fontSize: window.height * 0.02, marginTop: window.height * 0.02, alignSelf: 'center'}}>Already have an account?</Text>
                        <Text style = {{fontSize: window.height * 0.02, alignSelf: 'center'}}>Sign in instead</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
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
        height: window.height,
        width: window.width
    }
});

export default SignupScreen;