import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const window = Dimensions.get('window');

const RecordMap = ({origin, dest}) => {

    return (
        <>
            <MapView
                style = {styles.map}
                region = {{
                    latitude: 1.366523,
                    longitude: 103.820461,
                    latitudeDelta: 0.18,
                    longitudeDelta: 0.18
                }}
            >
                <Marker
                    coordinate = {{latitude: origin.latitude, longitude: origin.longitude}}
                    pinColor = 'green'
                />
                <Marker
                    coordinate = {{latitude: dest.latitude, longitude: dest.longitude}}
                />
            </MapView>
        </>
    );
};

const styles = StyleSheet.create({
    map: {
        height: window.height * 0.25,
        marginVertical: 10  
    }
});

export default RecordMap;