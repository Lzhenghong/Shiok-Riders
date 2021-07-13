import React, {useState, useContext} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import { Input} from 'react-native-elements';
import Spacer from '../components/Spacer';
import geoSearch from '../hooks/geoSearch';
import GeoResults from '../components/GeoResults';
import {Context as ListingContext} from '../context/ListingContext';
import Button from '../components/ShiokButton';
import Header from '../components/Header';
import Overlay from '../components/Overlay';
import checkNum from '../hooks/checkNum';

const limit = 12;
const window = Dimensions.get('window');

const AddDestScreen = ({navigation}) => {
    const [dest, setDest] = useState('');
    const [destObj, setDestObj] = useState('');
    const [price, setPrice] = useState('');
    const [results, setResults] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const {addDest, addPrice} = useContext(ListingContext);

    const [errVisible, setErrVisible] = useState(false);

    const toggleErr = () => {
        setErrVisible(!errVisible);
    };

    return (
        <View style = {{height: window.height}}>
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
                    callback = {async () => {
                        const {error, result} = await geoSearch(dest, limit);
                            if (error) {
                                setErrorMsg(result);
                                toggleErr();
                            } else {
                                setResults(result);
                            }
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
                <View style = {{height: window.height * 0.4, marginBottom: 12}}>
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