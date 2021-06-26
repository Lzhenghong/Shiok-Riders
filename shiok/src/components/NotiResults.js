import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem, Badge, Overlay, Text, Button} from 'react-native-elements';
import { navigate } from "../navigationRef";
import {Entypo} from '@expo/vector-icons';
import {Context as NotiContext} from '../context/NotiContext';
import ResultOverlay from '../components/ResultOverlay';

const NotiResults = ({results}) => {
    const [visible, setVisible] = useState(false);
    const [delVisible, setDelVisible] = useState(false);
    const [noti, setNoti] = useState('');
    const [reload, setReload] = useState(false);
    const {state, deleteNoti, fetchBookingNoti, clearErrorMessage} = useContext(NotiContext);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const toggleDelete = () => {
        setDelVisible(!delVisible);
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
                return () => navigate('OfferDecision', {item});
            case 'Accept':
                return () => navigate('OfferResult', {item});
            case 'Reject':
                return () => navigate('OfferResult', {item});
        }
    };  

    useEffect(() => {
        fetchBookingNoti();
    }, [reload]);

    return (
        <View>
            {
                results.map(item => (
                    <ListItem
                        key = {item._id}
                        bottomDivider 
                        topDivide
                        onPress = {onPress(item)}
                        onLongPress = {() => {
                            setNoti(item);
                            toggleOverlay();
                        }}
                    >
                        <Badge 
                            status = 'primary'
                        />
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
            <Overlay 
                visible = {visible}
                onBackdropPress = {() => toggleOverlay()}
                overlayStyle = {styles.overlay}
            >
                <View style = {{alignItems: 'center'}}>
                    <Entypo name = 'warning' size = {30} color = '#ffbf00'/> 
                    <Text h3 style = {styles.text}>Delete this notification?</Text>
                    <Text h4 style = {styles.subbody}>This action is irrevisible</Text>
                    <View style = {{flexDirection: 'row'}}>
                        <Button 
                            title = 'Yes'
                            buttonStyle = {styles.leftbutton}
                            onPress = {() => {
                                deleteNoti({item: noti})
                                    .then(res => {
                                        toggleOverlay();
                                        toggleDelete();
                                })
                            }}
                        />
                        <Button 
                            title = 'No'
                            buttonStyle = {styles.rightbutton}
                            onPress = {() => toggleOverlay()}
                        />
                    </View>
                </View>
            </Overlay>
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
                body = 'Notification deleted'
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