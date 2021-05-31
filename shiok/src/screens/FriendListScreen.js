import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Header } from 'react-native-elements';
import {AntDesign} from '@expo/vector-icons';

const FriendListScreen = ({navigation}) => {
    return (
        <View>
            <Header 
                leftComponent = {<AntDesign name = 'arrowleft' color = 'white' size = {30} onPress = {() => navigation.navigate('Profile')} />}
                backgroundColor = '#3EB489'
                containerStyle = {styles.header}
                centerComponent = {{text: 'Friends List', style: {color: '#fff', fontSize: 20, fontWeight: 'bold', paddingBottom: 20, marginBottom: 14}}}
            />
        </View>
    );
};

FriendListScreen.navigationOptions = () => {
    return {
      header: () => false
    };
  };

const styles = StyleSheet.create({
    header: {
        marginBottom: 15,
        height: 78.5
    }
});

export default FriendListScreen;