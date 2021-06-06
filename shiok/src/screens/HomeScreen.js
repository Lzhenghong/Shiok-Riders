import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Header} from 'react-native-elements';
import MapView from '../components/Map';
import {Context as ProfContext} from '../context/ProfileContext';
import {Context as LocationContext} from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import PriceSearch from '../components/PriceSearchBar';
import OriginSearch from '../components/OriginSearchBar';
import DestSearch from '../components/DestSearchBar';
import { NavigationEvents } from 'react-navigation';

const HomeScreen = () => {
    const [price, setPrice] = useState('');
    const [origin, setOrigin] = useState('');
    const [dest, setDest] = useState('');
    const {setLocation} = useContext(LocationContext);
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
                onTermSubmit = {() => console.log(price)}
            />
            <OriginSearch 
                term = {origin}
                onTermChange = {setOrigin}
                onTermSubmit = {() => console.log(origin)}
            />
            <DestSearch 
                term = {dest}
                onTermChange = {setDest}
                onTermSubmit = {() => console.log(dest)}
            />
            <MapView /> 
            {err ? <Text>Please enable location services</Text> : null}
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
    }
});

export default HomeScreen;