import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button, Icon, Header} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';

const EditProfileScreen = () => {
    return (
        <View>
            <Header 
                backgroundColor = '#3EB489'
                containerStyle = {styles.header}
                centerComponent = {{text: 'Profile', style: {color: '#fff', fontSize: 20, fontWeight: 'bold', paddingBottom: 20, marginBottom: 14}}}
            />
            <Text>Edit Profile</Text>
        </View>
    );
};

EditProfileScreen.navigationOptions = () => {
    return {
      header: () => false,
    };
  };

const styles = StyleSheet.create({
    header: {
        marginBottom: -1,
        height: 78.5
    }
});

export default EditProfileScreen;