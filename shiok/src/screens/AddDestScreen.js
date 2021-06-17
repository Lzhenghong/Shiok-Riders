import React, {useState, useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import { Input} from 'react-native-elements';
import Spacer from '../components/Spacer';
import geoSearch from '../hooks/geoSearch';
import GeoResults from '../components/GeoResults';
import {Context as ListingContext} from '../context/ListingContext';
import Button from '../components/ShiokButton';
import Header from '../components/Header';

const AddDestScreen = ({navigation}) => {
    const [dest, setDest] = useState('');
    const [destObj, setDestObj] = useState('');
    const [price, setPrice] = useState('');
    const {addDest, addPrice} = useContext(ListingContext);
    const [searchAPI, results, errorMsg] = geoSearch();

    const checkNum = (input) => {
        return !isNaN(input);
    };

    return (
        <View>
            <Header 
                title = 'Add Drop Off Point'
                backNav = {false}
                marginBottom = {15}
                callback = {() => navigation.navigate('AddOrigin')}
            />
            <Input 
                label = 'Drop Off Point'
                labelStyle = {{color:'#555353'}}
                value = {dest}
                placeholder = 'Enter a location or address'
                onChangeText = {setDest}
                autoCapitalize = 'none'
                autoCorrect = {false}
            />
            <Input 
               value = {price}
               placeholder = 'Enter a price'
               onChangeText = {(newTerm) => {
                   checkNum(newTerm) ? setPrice(newTerm) : setPrice('');
               }} 
            />
            <Button 
                title = 'Search'
                callback = {() => searchAPI(dest)}
            />
            <Spacer />
            {errorMsg == '' ? null : <Text>{errorMsg}</Text>}
            <View style = {{height: '51%', marginBottom: 12}}>
                <ScrollView>
                    <GeoResults 
                        results = {results}
                        callbackText = {setDest}
                        callbackObj = {setDestObj}
                    />
                </ScrollView>
            </View>
            <Spacer />
            {dest && price ? 
            <Button 
                title = 'Confirm Drop Off Point'
                callback = {() => {
                    addDest(destObj);
                    addPrice(price);
                    navigation.navigate('ConfirmListing');
                }}
            />
            : null
            }
        </View>
    );
};

AddDestScreen.navigationOptions = () => {
    return {
      header: () => false,
    };
};

const styles = StyleSheet.create({});

export default AddDestScreen;