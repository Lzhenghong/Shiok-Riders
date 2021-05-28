import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';

const Logo = () => {
    return (
        <>
            <Text h1 style = {styles.logoTop}>Shiok</Text>
            <Text h1 style = {styles.logoBottom}>Riders</Text>
        </>
    );
};

const styles = StyleSheet.create({
    logoTop: {
        color: '#3EB489',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    logoBottom: {
        color: '#555353',
        fontWeight: 'bold',
        alignSelf: 'center'
    }
});

export default Logo;