import React, {useState, useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import { Input} from 'react-native-elements';
import Spacer from '../components/Spacer';
import geoSearch from '../hooks/geoSearch';
import GeoResults from '../components/GeoResults';
import {Context as ListingContext} from '../context/ListingContext';
import Button from '../components/ShiokButton';
import Header from '../components/Header';

const limit = 12;

const AddDestScreen = ({navigation}) => {
    const [dest, setDest] = useState('');
    const [destObj, setDestObj] = useState('');
    const [price, setPrice] = useState('');
    const {addDest, addPrice} = useContext(ListingContext);
    const {searchAPI, results, errorMsg} = geoSearch();

    const [errVisible, setErrVisible] = useState(false);

    const toggleErr = () => {
        setErrVisible(!errVisible);
    };

    const checkNum = (input) => {
        return !isNaN(input);
    };

    return (
        <View style = {{height: '100%'}}>
            <Header 
                title = 'Add Drop Off Point'
                backNav = {true}
                marginBottom = {15}
                callback = {() => navigation.navigate('AddOrigin')}
            />
            <ScrollView>
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
                    callback = {() => {
                        toggleErr();
                        searchAPI(dest, limit);
                    }}
                />
                <Spacer />
                {errorMsg == '' ? null :
                (<Overlay 
                    visible = {errVisible}
                    onBackdrop = {() => toggleErr()}
                    body = {errorMsg}
                    subbody = 'Please check your connection'
                    onPress = {() => toggleErr()}
                />)
                }
                <View style = {{height: '48%', marginBottom: 12}}>
                    <ScrollView>
                        <GeoResults 
                            results = {results}
                            callbackText = {setDest}
                            callbackObj = {setDestObj}
                        />
                    </ScrollView>
                </View>
                <Spacer />
                {destObj && price ? 
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
            </ScrollView>
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