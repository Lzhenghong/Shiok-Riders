import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import Header from '../components/Header';
import {Context as ProfileContext} from '../context/ProfileContext';
import { AntDesign } from '@expo/vector-icons';

const window = Dimensions.get('window')

const FriendListScreen = ({navigation}) => {
    const {state} = useContext(ProfileContext);

    return (
        <View>
            <Header 
                title = 'Friend List'
                backNav = {true}
                marginBottom = {-1}
                callback = {() => navigation.navigate('Profile')}
            />
            {Object.keys(state.user.friends).length == 0 ? 
            (<View style = {styles.icon}>
                <AntDesign 
                    name = 'adduser'
                    size = {window.height * 0.2} color = '#b5b3b3'
                />
                <Text style = {styles.text}>You have no friends</Text>
            </View>) :
            (<View style = {{height: window.height, width: window.width}}>
                <ScrollView>
                    {
                        Object.keys(state.user.friends).map(id => state.user.friends[id]).map((item, index) => (
                            <ListItem
                                key = {index}
                                bottomDivider   
                                topDivide
                                onPress = {() => navigation.navigate('FriendDetail', {item})}
                            >
                                <ListItem.Content>
                                    <ListItem.Title style = {{fontWeight: 'bold'}}>
                                        {item.username}
                                    </ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        ))
                    }
                </ScrollView>
            </View>)}
        </View>
    );
};

FriendListScreen.navigationOptions = () => {
    return {
      header: () => false
    };
  };

const styles = StyleSheet.create({
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '80%'
    },
    text: {
        color: '#b5b3b3',
        alignSelf: 'center',
        fontSize: window.height * 0.04
    }
});

export default FriendListScreen;