import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Tab } from 'react-native-elements';
import BookingNoti from '../components/OfferNoti';
import FriendNoti from '../components/FriendNoti';
import Header from '../components/Header';

const window = Dimensions.get('window');

const NotificationScreen = () => {
    const [index, setIndex] = useState(0);

    return (
        <View>
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
            <FriendNoti/>}
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