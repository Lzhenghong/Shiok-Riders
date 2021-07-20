import React, {useState, useContext} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {ListItem, Badge} from 'react-native-elements';
import { navigate } from "../navigationRef";
import {Context as NotiContext} from '../context/NotiContext';
import ResultOverlay from '../components/ResultOverlay';
import DeleteOverlay from '../components/DeleteOverlay';
import subtitle from '../hooks/notiSub';

const NotiResults = ({results}) => {
    const [visible, setVisible] = useState(false);
    const [delVisible, setDelVisible] = useState(false);
    const [readVisible, setReadVisible] = useState(false);
    const [noti, setNoti] = useState('');
    const [loading, setLoading] = useState(false);
    const {state, deleteNoti, readNoti, clearErrorMessage} = useContext(NotiContext);

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
    }

    const onPress = (item) => {
        switch (item.type) {
            case 'Offer':
                return navigate('OfferDecision', {item});
            case 'Accept':
                return navigate('OfferResult', {item});
            case 'Reject':
                return navigate('OfferResult', {item});
            default:
                return navigate('AddFriend', {item});
        }
    }; 

    return (
        <View>
            {
                results.map((item, index) => (
                    <ListItem
                        key = {index}
                        bottomDivider 
                        topDivide
                        onPress = {async () => {
                            await toggleLoading();
                            readNoti({item}).then(async res => {
                                await toggleLoading();
                                if (!state.errorMessage) {
                                    onPress(item);
                                } else {
                                    toggleRead();
                                }
                            });
                        }}
                        onLongPress = {() => {
                            setNoti(item);
                            toggleOverlay();
                        }}
                    >
                        {item.read ? null :
                        <Badge 
                            status = 'primary'
                        />}
                        <ListItem.Content style = {{flex: 6}}>
                            <ListItem.Title style = {{fontWeight: 'bold'}}>
                                {item.type}
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                {`${subtitle(item)} ${item.sender.username}`}
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
            <DeleteOverlay 
                visible = {visible}
                onBackdrop = {() => toggleOverlay()}
                text = 'Delete this notification?'
                subbody = 'This action is irrevisible'
                onYes = {async () => {
                    await toggleLoading();
                    deleteNoti({item: noti})
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
                body = 'Notification deleted'
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
            {loading ? <ActivityIndicator /> : null}
        </View>
    );
};

const styles = StyleSheet.create({});

export default NotiResults;