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

const HomeScreen = () => {
    const [price, setPrice] = useState('');
    const [origin, setOrigin] = useState('');
    const [originObj, setOriginObj] = useState('');
    const [destObj, setDestObj] = useState('');
    const [dest, setDest] = useState('');
    const [errVisible, setErrVisible] = useState(false);
    const [revVisible, setRevVisible] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const {state, setLocation} = useContext(LocationContext);
    const {state: profileState, fetchProfile} = useContext(ProfContext);
    const {state: listingState, fetchListing} = useContext(ListingContext);
    const err = useLocation(setLocation);

    const {searchAPI, results, errorMsg} = geoSearch();
    const {searchAPI: revSearch, results: revResults, errorMsg: revErrorMsg} = reverseGeoSearch();

    const checkNum = (input) => {
        return !isNaN(input);
    };

    const toggleErr = () => {
        setErrVisible(!errVisible);
    };

    const toggleRev = () => {
        setRevVisible(!revVisible);
    };

    return (
        <View>
            <NavigationEvents onDidFocus = {fetchProfile}/>
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
                onIconTap = {() => {
                    toggleRev();
                    const lat = state.currentLocation.coords.latitude.toString();
                    const long = state.currentLocation.coords.longitude.toString();
                    revSearch(lat, long);
                    setOrigin(revResults.name);
                    setOriginObj(revResults);
                }}
            />
            <DestSearch 
                term = {dest}
                onTermChange = {setDest}
                onTermSubmit = {() => {
                    setConfirm(true);
                    searchAPI(dest, 1);
                    if (results) {
                        setDestObj(results[0]);
                        console.log(destObj);
                    } else {
                        toggleErr();
                    }
                }}
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
                            if (confirm) {
                                if (!originObj) {
                                    console.log('1');
                                    searchAPI(origin, 1);
                                    console.log(origin);
                                    console.log(results[0]);
                                    console.log(destObj);
                                    fetchListing({originObj: Object.assign({}, results[0]), destObj, priceString: price, type: profileState.user.type});
                                    setOriginObj('');
                                } else {    
                                    console.log('2');
                                    fetchListing({originObj, destObj, priceString: price, type: profileState.user.type});
                                    setOriginObj('');
                                }
                            } else {
                                console.log('not confirmed');
                            }
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
                {listingState.errorMessage == 'No search results' && price && origin && dest ?
                (<View style = {{width: window.width, height: 250, position: 'absolute', top: 39, left: 0}}>
                    <Text style = {styles.errorMessage}>No matching results found</Text>
                </View>)
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