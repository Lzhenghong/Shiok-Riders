import React, {useState, useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Input} from 'react-native-elements';
import {Context as LocationContext} from '../context/LocationContext';
import Spacer from '../components/Spacer';
import geoSearch from '../hooks/geoSearch';
import reverseGeoSearch from '../hooks/reverseGeoSearch';
import GeoResults from '../components/GeoResults';
import {Context as ListingContext} from '../context/ListingContext';
import Button from '../components/ShiokButton';
import Header from '../components/Header';
import Overlay from '../components/Overlay';

const limit = 12;

const AddOriginScreen = ({navigation}) => {
    const [origin, setOrigin] = useState('');
    const [originObj, setOriginObj] = useState('');
    const [results, setResults] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [revErrorMsg, setRevErrorMsg] = useState('');

    const {state} = useContext(LocationContext);
    const {addOrigin} = useContext(ListingContext);

    const searchAPI = geoSearch();
    const revSearch = reverseGeoSearch();

    const [errVisible, setErrVisible] = useState(false);
    const [revVisible, setRevVisible] = useState(false);

    const toggleErr = () => {
        setErrVisible(!errVisible);
    };

    const toggleRev = () => {
        setRevVisible(!revVisible);
    };

    return (
        <View style = {{height: '100%'}}>
            <Header 
                title = 'Add Pick Up Point'
                backNav = {false}
                marginBottom = {30}
            />
            <ScrollView>
                <Input 
                    label = 'Pick Up Point'
                    labelStyle = {{color:'#555353'}}
                    value = {origin}
                    placeholder = 'Enter a location or address'
                    onChangeText = {setOrigin}
                    autoCapitalize = 'none'
                    autoCorrect = {false}
                />
                <Button
                    title = 'Use Current Location'
                    callback = {async () => {
                        const lat = state.currentLocation.coords.latitude.toString();
                        const long = state.currentLocation.coords.longitude.toString();
                        const {error, result} = await revSearch(lat, long);
                        if (error) {
                            setRevErrorMsg(result);
                            toggleRev();
                        } else {
                            setOrigin(result.name);
                            setOriginObj(result);
                        }
                    }}
                />
                <Spacer>
                    <Button 
                        title = 'Search'
                        callback = {async () => {
                            const {error, result} = await searchAPI(origin, limit);
                            if (error) {
                                setErrorMsg(result);
                                toggleErr();
                            } else {
                                setResults(result);
                            }
                        }}
                    />
                </Spacer>
                {originObj && results.length == 0 ?
                <Button 
                title = 'Confirm Pick Up Point'
                containerStyle = {{marginHorizontal: 10}}
                callback = {() => {
                    addOrigin(originObj);
                    navigation.navigate('AddDest');
                    }}
                /> : null
                }
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
                <Spacer />
                <View style = {{height: '48%'}}>
                    <ScrollView>
                        <GeoResults 
                            results = {results}
                            callbackText = {setOrigin}
                            callbackObj = {setOriginObj}
                        />
                    </ScrollView>
                </View>
                <Spacer />
                {originObj && results.length != 0 ? 
                <Button 
                    title = 'Confirm Pick Up Point'
                    containerStyle = {{marginHorizontal: 10}}
                    callback = {() => {
                        addOrigin(originObj);
                        navigation.navigate('AddDest');
                    }}
                />
                : null
                }
            </ScrollView>
        </View>
    );
};

AddOriginScreen.navigationOptions = () => {
    return {
      header: () => false,
    };
};


const styles = StyleSheet.create({});

export default AddOriginScreen;