import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button, Icon, Header} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';

const ProfileScreen = () => {
    const {state, signout} = useContext(AuthContext);

    return (
        <View>
            <Header 
                backgroundColor = '#3EB489'
                containerStyle = {styles.header}
            />
            <Spacer>
                <Text h1 style = {styles.title}>Profile</Text>
            </Spacer>
            <Spacer />
                <Icon
                    name = 'user'
                    type = 'evilicon'
                    color = '#CCCCCC'
                    size = {150}
                    containerStyle = {styles.icon}
                />
            <View style = {{flexDirection: 'row'}}>
                <Text h4 style = {styles.profileLeft}>Username: </Text>
                <Text h4 style = {styles.profileRight}>{state.email}</Text>
            </View>
            <View style = {{flexDirection: 'row'}}>
                <Text h4 style = {styles.profileLeft}>Email: </Text>
                <Text h4 style = {styles.profileRight}>{state.email}</Text>
            </View>
            <View style = {{flexDirection: 'row'}}>
                <Text h4 style = {styles.profileLeft}>Phone Number: </Text>
                {state.hp 
                    ? (<Text h4 style = {styles.profileRight}>{state.hp}</Text>)
                    : (<Text h4 style = {styles.profileRight}>-</Text>)}
            </View>
            <Spacer />
            <Spacer />
            <Spacer>
                <Button 
                    title = 'Edit Profile'
                    buttonStyle = {styles.button}
                />
            </Spacer>
            <Spacer>
                <Button 
                    title = "Friend's List"
                    buttonStyle = {styles.button}
                />
            </Spacer>
            <Spacer>
                <Button 
                    title = 'Sign Out'
                    buttonStyle = {styles.button}
                    onPress = {signout}
                />
            </Spacer>
        </View>
    );
};

ProfileScreen.navigationOptions = () => {
    return {
      header: () => false,
    };
  };

const styles = StyleSheet.create({
    header: {
        marginBottom: 40
    },  
    title: {
        color: '#3EB489',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    icon: {
        alignSelf: 'center',
        marginBottom: 30
    },
    profileLeft: {
        color: 'black',
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        marginLeft: 15
    },
    profileRight: {
        color: '#555353',
        alignSelf: 'flex-start',
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#FF8400',
        borderRadius: 20
    }
});

export default ProfileScreen;
