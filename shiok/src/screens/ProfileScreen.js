import React, {useContext} from 'react';
import {View, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import {Text, Icon, Rating} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import {Context as ProfContext} from '../context/ProfileContext';
import { NavigationEvents } from 'react-navigation';
import Button from '../components/ShiokButton';
import Header from '../components/Header';
import NoPicIcon from '../components/NoPicIcon';
import Avatar from '../components/Avatar';

const window = Dimensions.get('window');

const ProfileScreen = ({navigation}) => {
    const {signout} = useContext(AuthContext);
    const {state, fetchProfile} = useContext(ProfContext);

    if (!state.user) {
        return <ActivityIndicator size = 'large' style = {{marginTop: 200}} />;
    } else {
        return (
            <View>
                <NavigationEvents onDidFocus = {fetchProfile}/>
                <Header 
                    title = 'Profile'
                    backNav = {false}
                    marginBottom = {-1}
                />
                <Spacer />
                {state.user.pic == '' ? 
                (
                <View>
                    <NoPicIcon 
                        fraction = {0.11}
                    />
                    <View style = {{height: 40, width: 40, position: 'absolute', bottom: 15, right: 100}}>
                        <Icon 
                            name = 'pencil'
                            type = 'evilicon'
                            color = '#CCCCCC'
                            size = {window.height * 0.045}
                            onPress = {() => navigation.navigate('ProfilePic')}
                        />
                    </View>
                </View>) : 
                (
                <View>
                    <Avatar 
                        fraction = {0.24}
                        pic = {state.user.pic}
                    />
                    <View style = {{height: 40, width: 40, position: 'absolute', bottom: 15, right: 100}}>
                        <Icon 
                            name = 'pencil'
                            type = 'evilicon'
                            color = '#CCCCCC'
                            size = {40}
                            onPress = {() => navigation.navigate('ProfilePic')}
                        />
                    </View>
                </View>)}
                <Rating
                    startingValue = {state.user.rating.average}
                    size = {50}
                    readonly = {true}
                    tintColor = '#f2f3f5'
                />
                <Spacer />
                <View style = {{flexDirection: 'row'}}>
                    <Text style = {styles.profileLeft}>Username: </Text>
                    {state.user.username 
                        ? (<Text style = {styles.profileRight}>{state.user.username}</Text>)
                        : (<Text style = {styles.profileRight}>-</Text>)}
                </View>
                <View style = {{flexDirection: 'row'}}>
                    <Text style = {styles.profileLeft}>Email: </Text>
                    <Text style = {styles.profileRight}>{state.user.email}</Text>
                </View>
                <View style = {{flexDirection: 'row'}}>
                    <Text style = {styles.profileLeft}>Phone Number: </Text>
                    {state.user.phoneNumber 
                        ? (<Text style = {styles.profileRight}>{state.user.phoneNumber}</Text>)
                        : (<Text style = {styles.profileRight}>-</Text>)}
                </View>
                <View style = {{flexDirection: 'row'}}>
                    <Text style = {styles.profileLeft}>Telegram Handle: </Text>
                    {state.user.teleHandle 
                        ? (<Text style = {styles.profileRight}>@{state.user.teleHandle}</Text>)
                        : (<Text style = {styles.profileRight}>@-</Text>)}
                </View>
                {state.user.type == 'Driver' ? 
                (<View style = {{flexDirection: 'row'}}>
                    <Text style = {styles.profileLeft}>License Number: </Text>
                    {state.user.licenseNumber 
                        ? (<Text style = {styles.profileRight}>{state.user.licenseNumber}</Text>)
                        : (<Text style = {styles.profileRight}>-</Text>)}
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
    profileLeft: {
        color: 'black',
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        marginLeft: 15,
        fontSize: window.height * 0.025
    },
    profileRight: {
        color: '#555353',
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: window.height * 0.025
    }
});

export default ProfileScreen;