import React, {useState, useContext} from 'react';
import { View, StyleSheet, ActivityIndicator} from 'react-native';
import {Badge, Text, Icon, AirbnbRating, Overlay, Avatar} from 'react-native-elements';
import Header from '../components/Header';
import geoSearch from '../hooks/geoSearch';
import { NavigationEvents } from 'react-navigation';
import RecordMap from '../components/RecordMap';
import Spacer from '../components/Spacer';
import Button from '../components/ShiokButton';
import {Context as BookingContext} from '../context/BookingContext';
import ResultOverlay from '../components/ResultOverlay';
import Communications from 'react-native-communications';

const HistoryDetailScreen = ({navigation}) => {
    const item = navigation.getParam('item');

    const [origin, setOrigin] = useState(null);
    const [dest, setDest] = useState(null);
    const [rating, setRating] = useState(0);
    const [rateVisible, setRateVisible] = useState(false);
    const [errVisible, setErrVisible] = useState(false);
    const [friendVisible, setFriendVisible] = useState(false);

    const {state, rateClient, addFriend, clearErrorMessage} = useContext(BookingContext);

    const toggleRating = () => {
        setRateVisible(!rateVisible);
    };

    const toggleErr = () => {
        setErrVisible(!errVisible);
    };

    const toggleFriend = () => {
        setFriendVisible(!friendVisible);
    };

    const searchAPI = geoSearch();

    const formatDate = (dateobj) => {
        const date = new Date(dateobj);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
    };

    const errSubtitle = () => {
        switch (state.errorMessage) {
            case 'Existing friend':
                return 'This user had been added previously';
            default:
                return 'Please check your connection';
        }
    };

    return (
        <View>
            <NavigationEvents 
                onDidFocus = {async () => {
                    if (!item.rated) {
                        toggleRating();
                    }
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
            {item.client.pic == '' ? 
            (<Icon
                name = 'user'
                type = 'evilicon'
                color = '#CCCCCC'
                size = {90}
                containerStyle = {styles.icon}
                reverse = {true}
            />) : 
            (<Avatar 
                rounded 
                containerStyle = {styles.icon}
                size = {191}
                source = {{uri: 'data:image/jpeg;base64,' + item.client.pic}}
            />
            )}
            <Text h4 style = {styles.client}>{`Username: ${item.client.username}`}</Text>
            <Text h4 style = {styles.client}>{`Phone Number: ${item.client.phoneNumber}`}</Text>
            <Spacer>
                <Button 
                    title = 'Add Friend'
                    callback = {async () => {
                        addFriend({client: item.client}).then(res => {
                            toggleFriend();
                        });
                    }}
                />
            </Spacer>
            {origin && dest ? 
            (<RecordMap 
                origin = {origin}
                dest = {dest}
            />) : 
            <ActivityIndicator size = 'large' style = {{marginTop: 20}} />} 
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
            <Overlay 
                isVisible = {rateVisible}
                onBackdropPress = {() => toggleRating()}
                overlayStyle = {styles.overlay}
            >
                <View style = {{alignItems: 'center'}}>
                    <AirbnbRating 
                        count = {5}
                        defaultRating = {5}
                        size = {50}
                        onFinishRating = {(rating) => setRating(rating)}
                    />
                    <Spacer />
                    <Button 
                        title = 'Done'
                        callback = {async () => {
                            rateClient({item, rating}).then(res => {
                                toggleRating();
                                toggleErr();
                            });
                        }}
                    />
                </View>
            </Overlay>
            <ResultOverlay 
                visible = {errVisible}
                onPress = {() => {
                    clearErrorMessage();
                    toggleErr();
                }}
                errorMessage = {state.errorMessage}
                errorTitle = {state.errorMessage}
                errorSubtitle = {errSubtitle()}
                body = 'Your rating is submitted'
            />
            <ResultOverlay 
                visible = {friendVisible}
                onPress = {() => {
                    clearErrorMessage();
                    toggleFriend();
                    if (!state.errorMessage) {
                        Communications.textWithoutEncoding(item.client.phoneNumber,
                            `I would like to add you as friend on Shiok-Riders`);
                    }
                }}
                errorMessage = {state.errorMessage}
                errorTitle = {state.errorMessage}
                errorSubtitle = {errSubtitle()}
                body = 'You have added this user'
            />
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
    },
    overlay: {
        height: 200,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#FF8400',
        borderRadius: 20,
        alignSelf: 'center',
        width: 387.5,
        marginVertical: 5
    },
});

export default HistoryDetailScreen;