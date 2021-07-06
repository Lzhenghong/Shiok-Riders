import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem, Badge} from 'react-native-elements';
import { navigate } from "../navigationRef";
import {Context as NotiContext} from '../context/NotiContext';
import ResultOverlay from '../components/ResultOverlay';
import DeleteOverlay from '../components/DeleteOverlay';

const NotiResults = ({results}) => {
    const [visible, setVisible] = useState(false);
    const [delVisible, setDelVisible] = useState(false);
    const [readVisible, setReadVisible] = useState(false);
    const [noti, setNoti] = useState('');
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

    const formatDate = (dateobj) => {
        const date = new Date(dateobj);
        return `${date.getDate()}/${date.getMonth() + 1}`;
    }

    const subtitle = (item) => {
        switch (item.type) {
            case 'Offer':
                return 'You have received an offer from';
            case 'Accept':
                return 'Your offer is accepted by';
            case 'Reject':
                return 'Your offer is rejected by';
            default: 
                return 'You have been added as a friend by';
        }
    };  

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
                            readNoti({item}).then(res => {
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
                onYes = {() => {
                    deleteNoti({item: noti})
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
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        height: 200,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '97.5%'
    },
    text: {
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: 10
    },
    subbody: {
        fontSize: 16,
        alignSelf: 'center',
        marginBottom: 10,
        color: '#babcbf'
    },
    leftbutton: {
        backgroundColor: '#FF8400',
        borderRadius: 20,
        paddingHorizontal: 20,
        width: '70%',
        alignSelf: 'flex-start',
    },
    rightbutton: {
        backgroundColor: '#FF8400',
        borderRadius: 20,
        paddingHorizontal: 20,
        width: '70%',
        alignSelf: 'flex-end',
    }
});

export default NotiResults;