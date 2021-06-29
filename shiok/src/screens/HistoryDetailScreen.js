import React, {useState} from 'react';
import { View, StyleSheet, ActivityIndicator} from 'react-native';
import Header from '../components/Header';
import geoSearch from '../hooks/geoSearch';
import { NavigationEvents } from 'react-navigation';
import RecordMap from '../components/RecordMap';

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
            {origin && dest ? 
            (<RecordMap 
                origin = {origin}
                dest = {dest}
            />) : 
            <ActivityIndicator size = 'large' style = {{marginTop: 20}} />} 
        </View>
    );
};

HistoryDetailScreen.navigationOptions = () => {
    return {
      header: () => false,
    };
  };

const styles = StyleSheet.create({});

export default HistoryDetailScreen;