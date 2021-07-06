import React, {useState, useContext} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Tab } from 'react-native-elements';
import OfferNoti from '../components/OfferNoti';
import FriendNoti from '../components/FriendNoti';
import Header from '../components/Header';
import { NavigationEvents } from 'react-navigation';
import {Context as NotiContext} from '../context/NotiContext';

const window = Dimensions.get('window');

const NotificationScreen = () => {
    const [index, setIndex] = useState(0);
    const {fetchOfferNoti, fetchFriendNoti} = useContext(NotiContext);

    return (
        <View>
            <NavigationEvents onDidFocus = {() => {
                fetchOfferNoti();
                fetchFriendNoti();
            }}/>
            <Header 
                title = 'Notification'
                backNav = {false}
                marginBottom = {-1}
            />
            <Tab 
                value = {index} 
                onChange = {setIndex}
                indicatorStyle = {{backgroundColor: '#FF8400'}}
            >
                <Tab.Item 
                    title = 'bookings'
                    onPress = {() => setIndex(0)}
                    titleStyle = {{color: '#FF8400'}}
                />
                <Tab.Item 
                    title = 'friends'
                    onPress = {() => setIndex(1)}   
                    titleStyle = {{color: '#FF8400'}}
                />
            </Tab>
            {!index ? 
            (<View style = {{height: window.height, width: window.width}}>
                <ScrollView>
                    <OfferNoti/>
                </ScrollView> 
            </View>) :
            (<View style = {{height: window.height, width: window.width}}>
                <ScrollView>
                    <FriendNoti/>
                </ScrollView> 
            </View>)}
        </View>
    );
};

NotificationScreen.navigationOptions = () => {
    return {
      header: () => false
    };
  };

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FF8400',
        borderRadius: 20
    }
});

export default NotificationScreen;