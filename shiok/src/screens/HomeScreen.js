import React, {useContext, useState} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Text, Button} from 'react-native-elements';
import MapView from '../components/Map';
import {Context as ProfContext} from '../context/ProfileContext';
import {Context as LocationContext} from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import PriceSearch from '../components/PriceSearchBar';
import OriginSearch from '../components/OriginSearchBar';
import DestSearch from '../components/DestSearchBar';
import { NavigationEvents } from 'react-navigation';
import {Context as ListingContext} from '../context/ListingContext';
import ListingResults from '../components/ListingResults';
import Header from '../components/Header';
import geoSearch from '../hooks/geoSearch';
import reverseGeoSearch from '../hooks/reverseGeoSearch';
import Overlay from '../components/Overlay';

const window = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
    const [price, setPrice] = useState('');
    const [origin, setOrigin] = useState('');
    const [dest, setDest] = useState('');
    const [errVisible, setErrVisible] = useState(false);
    const [revVisible, setRevVisible] = useState(false);
    const [emptyVisible, setEmptyVisible] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [revErrorMsg, setRevErrorMsg] = useState('');

    const {state, setLocation} = useContext(LocationContext);
    const {state: profileState, fetchProfile} = useContext(ProfContext);
    const {state: listingState, fetchListing, clearErrorMessage} = useContext(ListingContext);
    const err = useLocation(setLocation);
    
    const searchAPI = geoSearch();
    const revSearch = reverseGeoSearch();

    const checkNum = (input) => {
        return !isNaN(input);
    };

    const toggleErr = () => {
        setErrVisible(!errVisible);
    };

    const toggleRev = () => {
        setRevVisible(!revVisible);
    };

    const toggleEmpty = () => {
        setEmptyVisible(!emptyVisible);
    };

    return (
        <View>
            <NavigationEvents onDidFocus = {() => {
                fetchProfile();
                }}
            />
            <Header 
                title = 'Home'
                backNav = {false}
                marginBottom = {-1}
            />
            <PriceSearch 
                term = {price}
                onTermChange = {(newTerm) => {
                    checkNum(newTerm) ? setPrice(newTerm) : setPrice('');
                }}
            />
            <OriginSearch 
                term = {origin}
                onTermChange = {setOrigin}
                onIconTap = {async () => {
                    const lat = state.currentLocation.coords.latitude.toString();
                    const long = state.currentLocation.coords.longitude.toString();
                    const {error, result} = await revSearch(lat, long);
                    if (error) {
                        setRevErrorMsg(result);
                    } else {
                        setOrigin(result.name);
                    }
                }}
            />
            <DestSearch 
                term = {dest}
                onTermChange = {setDest}
            />
            {err ? <Text>Please enable location services</Text> : null}
            <View>
                <MapView />
                {price && origin && dest ?
                (<View style = {{alignItems: 'center', width: window.width, height: 100, position: 'absolute', top: 0, left: 0}}>
                    <Button 
                        title = 'Search'
                        buttonStyle = {styles.button}
                        onPress = {async () => {
                            const promises = [await searchAPI(origin, 1), await searchAPI(dest, 1)];
                            Promise.all(promises).then(res => {
                                const [{error: originError, result: originResult}, {error: destError, result: destResult}] = res;
                                if (originError || destError) {
                                    toggleErr();
                                    setErrorMsg(originError ? originResult : destResult);
                                } else {
                                    fetchListing({originObj: originResult[0], destObj: destResult[0], priceString: price, type: profileState.user.type})
                                        .then(res => {
                                            toggleEmpty();
                                            toggleErr();
                                    });                                
                                }
                            })
                        }}
                    />
                </View>) : null}
                {revErrorMsg == '' ? null :
                (<Overlay 
                    visible = {revVisible}
                    onBackdrop = {() => toggleRev()}
                    body = {revErrorMsg}
                    subbody = 'Please check your connection'
                    onPress = {() => toggleRev()}
                />)
                }
                {errorMsg == '' ? null :
                (<Overlay 
                    visible = {errVisible}
                    onBackdrop = {() => toggleErr()}
                    body = {errorMsg}
                    subbody = 'Please check your connection'
                    onPress = {() => toggleErr()}
                />)
                }
                {listingState.result && listingState.result.length == 0 && price && origin && dest ?
                (<Overlay 
                    visible = {emptyVisible}
                    onBackdrop = {() => toggleEmpty()}
                    body = 'No search results'
                    subbody = 'Please create a new listing'
                    onPress = {() => {
                        toggleEmpty();
                        navigation.navigate('AddOrigin');
                    }}
                />)
                : null}
                {listingState.errorMessage ?
                (<Overlay 
                    visible = {errVisible}
                    onBackdrop = {() => toggleErr()}
                    body = {listingState.errorMessage}
                    subbody = 'Please check your connection'
                    onPress = {() => {
                        toggleErr();
                        clearErrorMessage();
                    }}
                />)
                : null}
                {listingState.result && price && origin && dest ?
                (<View style = {{width: window.width, height: 250, position: 'absolute', top: 39, left: 0}}>
                    <ScrollView>
                        <ListingResults 
                            results = {listingState.result}
                        />
                    </ScrollView>
                </View>) : null}
            </View>
        </View>
    );
};

HomeScreen.navigationOptions = () => {
    return {
      header: () => false,
    };
  };

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FF8400',
        width: window.width
    },
    errorMessage: {
        color: 'red',
        alignSelf: 'center',
        fontSize: 20
    }
});

export default HomeScreen;