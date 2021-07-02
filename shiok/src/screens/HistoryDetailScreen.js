import React, {useState} from 'react';
import { View, StyleSheet, ActivityIndicator} from 'react-native';
import {Badge, Text, Icon} from 'react-native-elements';
import Header from '../components/Header';
import geoSearch from '../hooks/geoSearch';
import { NavigationEvents } from 'react-navigation';
import RecordMap from '../components/RecordMap';
import Spacer from '../components/Spacer';
import Button from '../components/ShiokButton';

const HistoryDetailScreen = ({navigation}) => {
    const item = navigation.getParam('item');

    const [origin, setOrigin] = useState(null);
    const [dest, setDest] = useState(null);

    const searchAPI = geoSearch();

    const formatDate = (dateobj) => {
        const date = new Date(dateobj);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
    };

    return (
        <View>
            <NavigationEvents 
                onDidFocus = {async () => {
                    const promises = [await searchAPI(item.offer.origin, 1), await searchAPI(item.offer.dest, 1)];
                    Promise.all(promises).then(res => {
                        const [{error: originError, result: originResult}, {error: destError, result: destResult}] = res;
                        if (!originError && !destError) {
                            setOrigin(originResult[0]);
                            setDest(destResult[0]);
                        }
                    });
                }}
            />
            <Header 
                title = {formatDate(item.createdAt)}
                backNav = {true}
                marginBottom = {-1}
                callback = {() => navigation.navigate('History')}
            />
            <Spacer />
            <Icon
                name = 'user'
                type = 'evilicon'
                color = '#CCCCCC'
                size = {90}
                containerStyle = {styles.icon}
                reverse = {true}
            />
            <Text h4 style = {styles.client}>{`Username: ${item.client.username}`}</Text>
            <Text h4 style = {styles.client}>{`Phone Number: ${item.client.phoneNumber}`}</Text>
            <Spacer>
                <Button 
                    title = 'Add Friend'
                />
            </Spacer>
            {origin && dest ? 
            (<>
                <RecordMap 
                    origin = {origin}
                    dest = {dest}
                />
                <View style = {{flexDirection: 'row'}}>
                    <Badge 
                        status = 'success' 
                        containerStyle = {styles.badge}
                    />
                    <Text h4>{`From: ${item.offer.origin}`}</Text>
                </View> 
                <Spacer />
                <View style = {{flexDirection: 'row'}}>
                    <Badge 
                        status = 'error' 
                        containerStyle = {styles.badge}
                    />
                    <Text h4>{`To: ${item.offer.dest}`}</Text>
                </View>
                <Spacer />
                <View style = {{flexDirection: 'row'}}>
                    <Badge 
                        status = 'warning' 
                        containerStyle = {styles.badge}
                    />
                    <Text h4>{`For: $${item.offer.price}`}</Text>
                </View>
            </>) : 
            <ActivityIndicator size = 'large' style = {{marginTop: 20}} />} 
        </View>
    );
};

HistoryDetailScreen.navigationOptions = () => {
    return {
      header: () => false,
    };
  };

const styles = StyleSheet.create({
    badge: {
        alignSelf: 'center',
        marginHorizontal: 10
    },
    icon: {
        alignSelf: 'center',
        marginBottom: 30
    },
    client: {
        marginLeft: 10
    }
});

export default HistoryDetailScreen;