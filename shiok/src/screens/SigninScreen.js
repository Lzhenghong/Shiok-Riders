import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import {Text} from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext';
import SignInForm from '../components/SignInForm';
import Header from '../components/Header';
import Spacer from '../components/Spacer';

const window = Dimensions.get('window');

const SigninScreen = ({navigation}) => {
    const {state, signin, clearErrorMessage} = useContext(AuthContext);
    return (
        <View style = {{justifyContent: 'center'}}>
            <Header 
                title = ''
                marginBottom = {window.height * 0.015}
            />
            <Spacer />
            <View style = {styles.container}> 
                <ScrollView>
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
                </ScrollView>
            </View>
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
        height: window.height,
        width: window.width
    }
});

export default SigninScreen;