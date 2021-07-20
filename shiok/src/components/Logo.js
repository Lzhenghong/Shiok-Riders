import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Text} from 'react-native-elements';

const window = Dimensions.get('window');

const Logo = () => {
    return (
        <>
            <Text style = {styles.logoTop}>Shiok</Text>
            <Text style = {styles.logoBottom}>Riders</Text>
        </>
    );
};

const styles = StyleSheet.create({
    logoTop: {
        color: '#3EB489',
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: window.height * 0.045
    },
    logoBottom: {
        color: '#555353',
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: window.height * 0.045
    }
});

export default Logo;