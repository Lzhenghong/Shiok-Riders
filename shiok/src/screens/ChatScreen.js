import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Text, Header } from 'react-native-elements';
import {Entypo} from '@expo/vector-icons';

const ChatScreen = () => {
    return (
        <View>
            <Header 
                backgroundColor = '#3EB489'
                containerStyle = {styles.header}
                centerComponent = {{text: 'Chats', style: {color: '#fff', fontSize: 20, fontWeight: 'bold'}}}
            />
        </View>
    );
};

ChatScreen.navigationOptions = () => {
    return {
      header: false,
      tabBarIcon: <Entypo name = 'chat' size = {24} color = '#3EB489'/>,
      tabBarOptions: {activeTintColor: '#3EB489'}
    };
  };

const styles = StyleSheet.create({
    header: {
        marginBottom: 15
    }
});

export default ChatScreen;