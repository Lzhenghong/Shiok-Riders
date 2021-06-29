import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {ListItem, Badge} from 'react-native-elements';
import NoHistory from '../components/NoHistory';
import Header from '../components/Header';
import { NavigationEvents } from 'react-navigation';
import {Context as BookingContext} from '../context/BookingContext';
import ResultOverlay from '../components/ResultOverlay';
import DeleteOverlay from '../components/DeleteOverlay';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';

const window = Dimensions.get('window');

const HistoryScreen = ({navigation}) => {
    const [reload, setReload] = useState(false);
    const [booking, setBooking] = useState(null);
    const [visible, setVisible] = useState(false);
    const [delVisible, setDelVisible] = useState(false);

    const {state, fetchHistory, deleteRecord, clearErrorMessage} = useContext(BookingContext);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const toggleDelete = () => {
        setDelVisible(!delVisible);
    };

    const formatDate = (dateobj) => {
        const date = new Date(dateobj);
        return `${date.getDate()}/${date.getMonth() + 1}`;
    };

    /*useEffect(() => {
        fetchHistory();
    }, [reload]);*/

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
            (<View style = {{height: window.height, width: window.width}}>
                <ScrollView>
                    {
                        state.history.map((item, index) => (
                            <ListItem
                                key = {index}
                                bottomDivider 
                                topDivide
                                onPress = {() => navigation.navigate('HistoryDetail', {item})}
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
                </ScrollView>
            </View>)
            : <NoHistory/>}
            <DeleteOverlay
                visible = {visible}
                onBackdrop = {() => toggleOverlay()}
                text = 'Delete this record?'
                subbody = 'This action is irrevisible'
                onYes = {() => {
                    deleteRecord({item: booking})
                        .then(res => {
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
                    setReload(!reload);
                }}
                errorMessage = {state.errorMessage}
                errorTitle = {state.errorMessage}
                errorSubtitle = 'Please check your connection'
                body = 'Record deleted'
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