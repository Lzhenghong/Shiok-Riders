import React, {useContext} from 'react';
import {StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import MapView, {Circle} from 'react-native-maps';
import {Context as LocationContext} from '../context/LocationContext';

const window = Dimensions.get('window');

const Map = () => {
    const {state} = useContext(LocationContext);
    if (!state.currentLocation) {
        return <ActivityIndicator size = 'large' style = {{marginTop: 200}} />;
    }
    return (
        <MapView
            style = {styles.map}
            initialRegion = {{
                ...state.currentLocation.coords,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            }}
            region = {{
                ...state.currentLocation.coords,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            }}
        >
            <Circle 
                center = {state.currentLocation.coords}
                radius = {30}
                strokeColor = 'rgba(158, 158, 255, 1.0)'
                fillColor = 'rgba(158, 158, 255, 0.3)'
            />
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        height: window.height * 0.6
    }
});

export default Map;