import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import { Avatar} from 'react-native-elements';

const window = Dimensions.get('window');

const PicAvatar = ({fraction, pic}) => {
    return (
        <Avatar 
            rounded 
            containerStyle = {styles.icon}
            size = {window.height * fraction}
            source = {{uri: 'data:image/jpeg;base64,' + pic}}
        />
    );
};

const styles = StyleSheet.create({
    icon: {
        alignSelf: 'center',
        marginBottom: 30
    }
});

export default PicAvatar;