import React, {useState, useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import { Input, Header, Button } from 'react-native-elements';
import {Context as LocationContext} from '../context/LocationContext';
import Spacer from '../components/Spacer';
import GeoAPI from '../api/GeoAPI';
import geoSearch from '../hooks/geoSearch';
import GeoResults from '../components/GeoResults';
import {Context as ListingContext} from '../context/ListingContext';

const access_key = '816681ab0b49d0f2a6b999f51654fb33';

const AddOriginScreen = ({navigation}) => {
    const [origin, setOrigin] = useState('');
    const [originObj, setOriginObj] = useState('');
    const {state} = useContext(LocationContext);
    const {addOrigin} = useContext(ListingContext);
    const [searchAPI, results, errorMsg] = geoSearch();

    return (
        <View style = {{flex: 1}}>
            <Header 
                backgroundColor = '#3EB489'
                containerStyle = {styles.header}
                centerComponent = {{text: 'Add Pick Up Point', style: {color: '#fff', fontSize: 20, fontWeight: 'bold'}}}
            />
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
                buttonStyle = {styles.button}
                onPress = {async () => {
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
            <Spacer>
                <Button 
                    title = 'Search'
                    buttonStyle = {styles.button}
                    onPress = {() => searchAPI(origin)}
                />
            </Spacer>
            {errorMsg == '' ? null : <Text>{errorMsg}</Text>}
            <Spacer />
            <View style = {{height: 400}}>
                <ScrollView>
                    <GeoResults 
                        results = {results}
                        callbackText = {setOrigin}
                        callbackObj = {setOriginObj}
                    />
                </ScrollView>
            </View>
            <Spacer />
            {origin ? 
            <Button 
                title = 'Confirm Pick Up Point'
                buttonStyle = {styles.button}
                onPress = {() => {
                    addOrigin(originObj);
                    navigation.navigate('AddDest');
                }}
            />
            : null
            }
        </View>
    );
};

AddOriginScreen.navigationOptions = () => {
    return {
      header: () => false,
    };
};


const styles = StyleSheet.create({
    header: {
        marginBottom: 30
    },
    button: {
        backgroundColor: '#FF8400',
        borderRadius: 20,
        alignSelf: 'center',
        width: 395
    }
});

export default AddOriginScreen;