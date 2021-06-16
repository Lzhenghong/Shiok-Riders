import React, {useContext} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Text, Icon, Header} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import {Context as ProfContext} from '../context/ProfileContext';
import { NavigationEvents } from 'react-navigation';
import Button from '../components/ShiokButton';

const ProfileScreen = ({navigation}) => {
    const {signout} = useContext(AuthContext);
    const {state, fetchProfile} = useContext(ProfContext);

    if (!state.user) {
        return <ActivityIndicator size = 'large' style = {{marginTop: 200}} />;
    }
    else {
        return (
            <View>
                <NavigationEvents onDidFocus = {fetchProfile}/>
                <Header 
                    backgroundColor = '#3EB489'
                    containerStyle = {styles.header}
                    centerComponent = {{text: 'Profile', style: {color: '#fff', fontSize: 20, fontWeight: 'bold', paddingBottom: 20, marginBottom: 14}}}
                />
                <Spacer />
                    <Icon
                        name = 'user'
                        type = 'evilicon'
                        color = '#CCCCCC'
                        size = {150}
                        containerStyle = {styles.icon}
                        reverse = {true}
                    />
                <View style = {{flexDirection: 'row'}}>
                    <Text h4 style = {styles.profileLeft}>Username: </Text>
                    {state.user.username 
                        ? (<Text h4 style = {styles.profileRight}>{state.user.username}</Text>)
                        : (<Text h4 style = {styles.profileRight}>-</Text>)}
                </View>
                <View style = {{flexDirection: 'row'}}>
                    <Text h4 style = {styles.profileLeft}>Email: </Text>
                    <Text h4 style = {styles.profileRight}>{state.user.email}</Text>
                </View>
                <View style = {{flexDirection: 'row'}}>
                    <Text h4 style = {styles.profileLeft}>Phone Number: </Text>
                    {state.user.phoneNumber 
                        ? (<Text h4 style = {styles.profileRight}>{state.user.phoneNumber}</Text>)
                        : (<Text h4 style = {styles.profileRight}>-</Text>)}
                </View>
                <View style = {{flexDirection: 'row'}}>
                    <Text h4 style = {styles.profileLeft}>Telegram Handle: </Text>
                    {state.user.teleHandle 
                        ? (<Text h4 style = {styles.profileRight}>@{state.user.teleHandle}</Text>)
                        : (<Text h4 style = {styles.profileRight}>@-</Text>)}
                </View>
                {state.user.type == 'Driver' ? 
                (<View style = {{flexDirection: 'row'}}>
                    <Text h4 style = {styles.profileLeft}>License Number: </Text>
                    {state.user.licenseNumber 
                        ? (<Text h4 style = {styles.profileRight}>{state.user.licenseNumber}</Text>)
                        : (<Text h4 style = {styles.profileRight}>-</Text>)}
                </View>) : null}   
                <Spacer />          
                <Spacer>
                    <Button 
                        title = 'Edit Profile'
                        callback = {() => navigation.navigate('EditProfile')}
                    />
                </Spacer>
                <Spacer>
                    <Button 
                        title = "Friends List"
                        callback = {() => navigation.navigate('FriendList')}
                    />
                </Spacer>
                <Spacer>
                    <Button 
                        title = 'Sign Out'
                        callback = {signout}
                    />
                </Spacer>
            </View>
        );
    }
};

ProfileScreen.navigationOptions = () => {
    return {
      header: () => false,
    };
  };

const styles = StyleSheet.create({
    header: {
        marginBottom: -1,
        height: 78.5
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
    }
});

export default ProfileScreen;