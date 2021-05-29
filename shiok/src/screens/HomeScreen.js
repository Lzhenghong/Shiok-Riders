import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import MapView from '../components/Map';
import {SafeAreaView} from 'react-navigation';
import {Context as LocationContext} from '../context/LocationContext';
import useLocation from '../hooks/useLocation';

const HomeScreen = () => {
    const {setLocation} = useContext(LocationContext);
    const err = useLocation(setLocation);
    return (
        <SafeAreaView forceInset = {{top: 'always'}}>
            <View>
                <Text>HomeScreen</Text>
                <MapView /> 
                {err ? <Text>Please enable location services</Text> : null}
            </View>
        </SafeAreaView>
    );
};

HomeScreen.navigationOptions = () => {
    return {
      header: () => false,
    };
  };

const styles = StyleSheet.create({});

export default HomeScreen;
