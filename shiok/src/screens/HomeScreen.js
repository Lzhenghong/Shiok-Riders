import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Header, Button} from 'react-native-elements';
import MapView from '../components/Map';
import {Context as ProfContext} from '../context/ProfileContext';
import {Context as LocationContext} from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import PriceSearch from '../components/PriceSearchBar';
import OriginSearch from '../components/OriginSearchBar';
import DestSearch from '../components/DestSearchBar';
import { NavigationEvents } from 'react-navigation';
import GeoAPI from '../api/GeoAPI';
import geoSearch from '../hooks/geoSearch';
import GeoResults from '../components/GeoResults';
import {Context as ListingContext} from '../context/ListingContext';
import { Dimensions } from 'react-native';

const access_key = '816681ab0b49d0f2a6b999f51654fb33';
const window = Dimensions.get('window');

const HomeScreen = () => {
    const [price, setPrice] = useState('');
    const [origin, setOrigin] = useState('');
    const [originObj, setOriginObj] = useState('');
    const [dest, setDest] = useState('');

    const {state, setLocation} = useContext(LocationContext);
    const {fetchProfile} = useContext(ProfContext);
    const err = useLocation(setLocation);

    const checkNum = (input) => {
        return !isNaN(input);
    };

    return (
        <View>
            <NavigationEvents onDidFocus = {fetchProfile}/>
            <Header 
                backgroundColor = '#3EB489'
                containerStyle = {styles.header}
                centerComponent = {{text: 'Home', style: {color: '#fff', fontSize: 20, fontWeight: 'bold', paddingBottom: 20, marginBottom: 14}}}
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
                    try {
                        const response = await GeoAPI.get(`/reverse?access_key=${access_key}&query=${lat},${long}&limit=1&country=SG`);
                        setOrigin(response.data.data[0].name);
                        setOriginObj(response.data.data[0]);
                    } catch (err) {
                        console.log('Cannot get current location');
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
                    />
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
    header: {
        marginBottom: -1,
        height: 78.5
    },
    button: {
        backgroundColor: '#FF8400',
        width: window.width
    }
});

export default HomeScreen;