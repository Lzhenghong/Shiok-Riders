import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import { Text} from 'react-native-elements';
import {AntDesign} from '@expo/vector-icons';

const window = Dimensions.get('window');

const NoHistory = () => {
    return (
        <View style = {styles.icon}>
            <AntDesign name = 'clockcircleo' size = {window.height * 0.24} color = '#b5b3b3' />
            <View style = {{marginTop: 10}}>
                <Text style = {styles.text}>You have no records</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '85%',
        
    },
    text: {
        color: '#b5b3b3',
        alignSelf: 'center',
        fontSize: window.height * 0.04
        
    }
});

export default NoHistory;