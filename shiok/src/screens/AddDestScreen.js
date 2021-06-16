import React, {useState, useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import { Input, Header} from 'react-native-elements';
import Spacer from '../components/Spacer';
import geoSearch from '../hooks/geoSearch';
import GeoResults from '../components/GeoResults';
import {Context as ListingContext} from '../context/ListingContext';
import {AntDesign} from '@expo/vector-icons';
import Button from '../components/ShiokButton';


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
                leftComponent = {<AntDesign name = 'arrowleft' color = 'white' size = {30} onPress = {() => navigation.navigate('AddOrigin')} />}
                backgroundColor = '#3EB489'
                containerStyle = {styles.header}
                centerComponent = {{text: 'Add Drop Off Point', style: {color: '#fff', fontSize: 20, fontWeight: 'bold', paddingBottom: 20, marginBottom: 14}}}
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

const styles = StyleSheet.create({
    header: {
        marginBottom: 15,
        height: 78.5
    }
});

export default AddDestScreen;