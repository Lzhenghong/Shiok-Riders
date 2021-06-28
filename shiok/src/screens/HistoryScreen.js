import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import NoHistory from '../components/NoHistory';
import Header from '../components/Header';
import { NavigationEvents } from 'react-navigation';
import {Context as BookingContext} from '../context/BookingContext';

const HistoryScreen = () => {
    const {state, fetchHistory} = useContext(BookingContext);

    const formatDate = (dateobj) => {
        const date = new Date(dateobj);
        return `${date.getDate()}/${date.getMonth() + 1}`;
    }

    return (
        <View>
            <NavigationEvents onDidFocus = {() => {
                fetchHistory();
            }}/>
            <Header 
                title = 'History'
                backNav = {false}
                marginBottom = {-1}
            />
            {state.history && state.history.length > 0 ?
            (<View>
                {
                    state.history.map(item => (
                        <ListItem
                            key = {item._id}
                            bottomDivider 
                            topDivide
                        >
                            <ListItem.Content style = {{flex: 6}}>
                                <ListItem.Title style = {{fontWeight: 'bold'}}>
                                    {`${item.offer.origin} to ${item.offer.dest} for $${item.offer.price}`}
                                </ListItem.Title>
                                <ListItem.Subtitle>
                                    {`${item.client.username}`}
                                </ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Content style = {{flex: 1, alignItems: 'flex-end'}}>
                                <ListItem.Subtitle style = {{fontWeight: 'bold'}}>
                                    {formatDate(item.createdAt)}
                                </ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    ))
                }
            </View>)
            : <NoHistory/>}
        </View>
    );
};

HistoryScreen.navigationOptions = () => {
    return {
      header: () => false,
    };
  };

const styles = StyleSheet.create({});

export default HistoryScreen;