import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';

const window = Dimensions.get('window');

const NoPicIcon = ({fraction}) => {
    return (
        <Icon
            name = 'user'
            type = 'evilicon'
            color = '#CCCCCC'
            size = {window.height * fraction}
            containerStyle = {styles.icon}
            reverse = {true}
        />
    );
};

const styles = StyleSheet.create({
    icon: {
        alignSelf: 'center',
        marginBottom: 30
    }
});

export default NoPicIcon;