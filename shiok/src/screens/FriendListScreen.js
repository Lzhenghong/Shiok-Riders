import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../components/Header';

const FriendListScreen = ({navigation}) => {
    return (
        <View>
            <Header 
                title = 'Friend List'
                backNav = {true}
                marginBottom = {15}
                callback = {() => navigation.navigate('Profile')}
            />
        </View>
    );
};

FriendListScreen.navigationOptions = () => {
    return {
      header: () => false
    };
  };

const styles = StyleSheet.create({});

export default FriendListScreen;