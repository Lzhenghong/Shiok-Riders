import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Text } from 'react-native-elements';
import {AntDesign} from '@expo/vector-icons';
import Spacer from '../components/Spacer';

const NoHistory = () => {
    return (
        <View style = {styles.icon}>
            <AntDesign name = 'clockcircleo' size = {200} color = '#b5b3b3' />
            <View style = {{marginTop: 10}}>
                <Text h2 style = {styles.text}>You have no records</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '85%'
    },
    text: {
        color: '#b5b3b3',
        alignSelf: 'center'
        
    }
});

export default NoHistory;