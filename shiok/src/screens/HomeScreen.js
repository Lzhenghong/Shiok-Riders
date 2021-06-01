import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Header} from 'react-native-elements';
import MapView from '../components/Map';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import {Context as LocationContext} from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import PriceSearch from '../components/PriceSearchBar';
import DestSearch from '../components/DestSearchBar';
import { NavigationEvents } from 'react-navigation';

const HomeScreen = () => {
    const [price, setPrice] = useState('');
    const [dest, setDest] = useState('');
    const {setLocation} = useContext(LocationContext);
    const {state, fetchProfile} = useContext(AuthContext);
    const err = useLocation(setLocation);
    //console.log(state);
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
                onTermChange = {newTerm => setPrice(newTerm)}
                onTermSubmit = {() => console.log(price)}
            />
            <DestSearch 
                term = {dest}
                onTermChange = {newTerm => setDest(newTerm)}
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