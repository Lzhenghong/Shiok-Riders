import React, {useState, useContext} from 'react';
import {View, StyleSheet, ScrollView, Dimensions, ActivityIndicator} from 'react-native';
import {ListItem, Badge} from 'react-native-elements';
import NoHistory from '../components/NoHistory';
import Header from '../components/Header';
import {Context as BookingContext} from '../context/BookingContext';
import ResultOverlay from '../components/ResultOverlay';
import DeleteOverlay from '../components/DeleteOverlay';
import { NavigationEvents } from 'react-navigation';

const window = Dimensions.get('window');

const HistoryScreen = ({navigation}) => {
    const [booking, setBooking] = useState(null);
    const [visible, setVisible] = useState(false);
    const [delVisible, setDelVisible] = useState(false);
    const [readVisible, setReadVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const {state, fetchHistory, deleteRecord, readRecord, clearErrorMessage} = useContext(BookingContext);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const toggleDelete = () => {
        setDelVisible(!delVisible);
    };

    const toggleRead = () => {
        setReadVisible(!readVisible);
    };

    toggleLoading = () => {
        setLoading(!loading);
    };

    const formatDate = (dateobj) => {
        const date = new Date(dateobj);
        return `${date.getDate()}/${date.getMonth() + 1}`;
    };

    const render = () => {
        if (!state.history) {
            return <ActivityIndicator size = 'large' style = {{marginTop: 200}} />;
        } else if (state.history.length == 0) {
            return <NoHistory/>;
        } else {
            return (
                <View style = {{height: window.height, width: window.width}}>
                    <ScrollView>
                        {
                            state.history.map((item, index) => (
                                <ListItem
                                    key = {index}
                                    bottomDivider 
                                    topDivide
                                    onPress = {async () => {
                                        await toggleLoading();
                                        readRecord({item}).then(async res => {
                                            await toggleLoading();
                                            if (!state.errorMessage) {
                                                navigation.navigate('HistoryDetail', {item});
                                            } else {
                                                toggleRead();
                                            }
                                        });
                                    }}
                                    onLongPress = {() => {
                                        setBooking(item);
                                        toggleOverlay();
                                    }}
                                >
                                    {item.read ? null :
                                    <Badge 
                                        status = 'primary'
                                    />}
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
                        {loading ? <ActivityIndicator /> : null}
                    </ScrollView>
                </View>
            );
        }
    };

    return (
        <View>
            <NavigationEvents onDidFocus = {() => fetchHistory()}/>
            <Header 
                title = 'History'
                backNav = {false}
                marginBottom = {-1}
            />
            {render()}
            <DeleteOverlay
                visible = {visible}
                onBackdrop = {() => toggleOverlay()}
                text = 'Delete this record?'
                subbody = 'This action is irrevisible'
                onYes = {async () => {
                    await toggleLoading();
                    deleteRecord({item: booking})
                        .then(async res => {
                            await toggleLoading();
                            toggleOverlay();
                            toggleDelete();
                    })
                }}
                onNo = {() => toggleOverlay()}
            />
            <ResultOverlay 
                visible = {delVisible}
                onPress = {() => {
                    clearErrorMessage();
                    toggleDelete();
                }}
                errorMessage = {state.errorMessage}
                errorTitle = {state.errorMessage}
                errorSubtitle = 'Please check your connection'
                body = 'Record deleted'
            />
            <ResultOverlay 
                visible = {readVisible}
                onPress = {() => {
                    clearErrorMessage();
                    toggleRead();
                }}
                errorMessage = {state.errorMessage}
                errorTitle = {state.errorMessage}
                errorSubtitle = 'Please check your connection'
                body = ''
            />
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