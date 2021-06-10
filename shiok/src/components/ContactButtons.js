import React from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import Communciations from 'react-native-communications';
import Spacer from '../components/Spacer';
import {FontAwesome} from '@expo/vector-icons';
import {EvilIcons} from '@expo/vector-icons';

const whatsappUrl = 'whatsapp://send?text=';
const telegramUrl = 'http://t.me/';

const ContactButtons = ({item}) => {
    return (
        <View>
            <View style = {{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Button 
                    title = 'Text'
                    buttonStyle = {styles.button}
                    titleStyle = {styles.title}
                    icon = {
                        <Icon 
                            name = 'message-circle'
                            type = 'feather'
                            color = 'white'
                        />
                    }
                    onPress = {() => Communciations.text(item.lister.phoneNumber, '')}
                />
                <Button 
                    title = 'Call'
                    buttonStyle = {styles.button}
                    titleStyle = {styles.title}
                    icon = {
                        <Icon 
                            name = 'phone'
                            type = 'feather'
                            color = 'white'
                        />
                    }
                    onPress = {() => Communciations.phonecall(item.lister.phoneNumber, true)}
                />
            </View>
            <Spacer />
            <View style = {{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Button 
                    title = 'Whatsapp'
                    buttonStyle = {styles.button}
                    titleStyle = {styles.title}
                    icon = {
                        <FontAwesome 
                            name = 'whatsapp'
                            size = {26}
                            color = 'white'
                        />
                    }
                    onPress = {() => Linking.openURL(`${whatsappUrl}${''}&phone=65${item.lister.phoneNumber}`)}
                />
                <Button 
                    title = 'Telegram'
                    buttonStyle = {styles.button}
                    titleStyle = {styles.title}
                    icon = {
                        <EvilIcons 
                            name = 'sc-telegram'
                            size = {26}
                            color = 'white'
                        />
                    }
                    onPress = {() => Linking.openURL(`${telegramUrl}${item.lister.teleHandle}`)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FF8400',
        borderRadius: 20,
        width: 190,
        height: 40
    },
    title: {
        marginLeft: 5
    }
});

export default ContactButtons;