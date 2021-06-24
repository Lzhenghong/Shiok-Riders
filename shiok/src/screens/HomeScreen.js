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
//import geoSearch from '../hooks/geoSearch';
import reverseGeoSearch from '../hooks/reverseGeoSearch';
import Overlay from '../components/Overlay';
import GeoAPI from '../api/GeoAPI';
import {Context as NotiContext} from '../context/NotiContext';

const window = Dimensions.get('window');
const access_key = '816681ab0b49d0f2a6b999f51654fb33';

const HomeScreen = ({navigation}) => {
    const [price, setPrice] = useState('');
    const [origin, setOrigin] = useState('');
    const [dest, setDest] = useState('');
    const [errVisible, setErrVisible] = useState(false);
    const [revVisible, setRevVisible] = useState(false);
    const [emptyVisible, setEmptyVisible] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    /*const [originObj, setOriginObj] = useState('');
    const [destObj, setDestObj] = useState('');*/

    const {state, setLocation} = useContext(LocationContext);
    const {state: profileState, fetchProfile} = useContext(ProfContext);
    const {state: listingState, fetchListing} = useContext(ListingContext);
    const {fetchBookingNoti} = useContext(NotiContext);
    const err = useLocation(setLocation);
    
    //const {searchAPI, results, errorMsg} = geoSearch();
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

    const toggleEmpty = () => {
        setEmptyVisible(!emptyVisible);
    };

    return (
        <View>
            <NavigationEvents onDidFocus = {() => {
                fetchProfile();
                fetchBookingNoti();
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
                onIconTap = {() => {
                    toggleRev();
                    const lat = state.currentLocation.coords.latitude.toString();
                    const long = state.currentLocation.coords.longitude.toString();
                    revSearch(lat, long);
                    setOrigin(revResults.name);
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
                            toggleErr();
                            toggleEmpty();
                            try {
                                const originResponse = await GeoAPI.get(`/forward?access_key=${access_key}&query=${origin}&limit=1&country=SG`);
                                const destResponse = await GeoAPI.get(`/forward?access_key=${access_key}&query=${dest}&limit=1&country=SG`); 
                                fetchListing({originObj: originResponse.data.data[0], destObj: destResponse.data.data[0], priceString: price, type: profileState.user.type});
                            } catch {
                                setErrorMsg('Could not fetch listing');
                            }
                            /*searchAPI(origin, 1)
                                .then(res => {
                                    console.log(results);
                                    setOriginObj(Object.assign({}, results[0]));
                                    searchAPI(dest, 1)
                                })
                                .then(res => {
                                    setDestObj(Object.assign({}, results[0]));
                                    console.log({originObj, destObj});
                                    fetchListing({originObj, destObj, priceString: price, type: profileState.user.type});
                                });*/
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
                (<Overlay 
                    visible = {emptyVisible}
                    onBackdrop = {() => toggleEmpty()}
                    body = {listingState.errorMessage}
                    subbody = 'Please create a new listing'
                    onPress = {() => {
                        toggleEmpty();
                        navigation.navigate('AddOrigin');
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