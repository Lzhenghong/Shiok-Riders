import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import { Text, Header, Input, Button } from 'react-native-elements';
import {Entypo} from '@expo/vector-icons';
import Spacer from '../components/Spacer';
import Communications from 'react-native-communications';

const ChatScreen = () => {
    const [hp, setHp] = useState('');

    const checkNum = (input) => {
        return !isNaN(input);
    };

    return (
        <View>
            <Header 
                backgroundColor = '#3EB489'
                containerStyle = {styles.header}
                centerComponent = {{text: 'Chats', style: {color: '#fff', fontSize: 20, fontWeight: 'bold'}}}
            />
            <Input 
                label = 'Insert phone Number'
                labelStyle = {{color:'#555353'}}
                value = {hp}
                onChangeText = {(newTerm) => {
                    checkNum(newTerm) ? setHp(newTerm) : setHp('');
                }}
                autoCapitalize = 'none'
                autoCorrect = {false}
            />
            <Spacer />
            <Button 
                title = 'Send Text'
                buttonStyle = {styles.button}
                onPress = {() => {
                    hp ? Communications.text(hp, 'test shiok rider chat') : console.log('error sending text');
                }}
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
    },
    button: {
        backgroundColor: '#FF8400',
        borderRadius: 20
    }
});

export default ChatScreen;