import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Header, Button, Icon} from 'react-native-elements';
import {AntDesign} from '@expo/vector-icons';
import Communciations from 'react-native-communications';
import Spacer from '../components/Spacer';
import { InteractionManager } from 'react-native';

const ListingDetailsScreen = ({navigation}) => {
    const item = navigation.getParam('item');
    return (
        <View>
            <Header 
                leftComponent = {<AntDesign name = 'arrowleft' color = 'white' size = {30} onPress = {() => navigation.navigate('Home')} />}
                backgroundColor = '#3EB489'
                containerStyle = {styles.header}
                centerComponent = {{text: 'Details', style: {color: '#fff', fontSize: 20, fontWeight: 'bold', paddingBottom: 20, marginBottom: 14}}}
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
                    {item.lister.username 
                        ? (<Text h4 style = {styles.profileRight}>{item.lister.username}</Text>)
                        : (<Text h4 style = {styles.profileRight}>-</Text>)}
                </View>
                <View style = {{flexDirection: 'row'}}>
                    <Text h4 style = {styles.profileLeft}>Phone Number: </Text>
                    {item.lister.phoneNumber 
                        ? (<Text h4 style = {styles.profileRight}>{item.lister.phoneNumber}</Text>)
                        : (<Text h4 style = {styles.profileRight}>-</Text>)}
                </View>
                {item.lister.type == 'Driver' ? 
                (<View style = {{flexDirection: 'row'}}>
                    <Text h4 style = {styles.profileLeft}>License Number: </Text>
                    {item.lister.licenseNumber 
                        ? (<Text h4 style = {styles.profileRight}>{item.lister.licenseNumber}</Text>)
                        : (<Text h4 style = {styles.profileRight}>-</Text>)}
                </View>) : <Spacer />}             
                <Spacer>
                    <Button 
                        title = 'Text'
                        buttonStyle = {styles.button}
                        titleStyle = {{marginLeft: 5}}
                        icon = {
                            <Icon 
                                name = 'message-circle'
                                type = 'feather'
                                color = 'white'
                            />
                        }
                        onPress = {() => Communciations.text(item.lister.phoneNumber, '')}
                    />
                </Spacer>
        </View>
    );
};

ListingDetailsScreen.navigationOptions = () => {
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
    },
    button: {
        backgroundColor: '#FF8400',
        borderRadius: 20
    }
});

export default ListingDetailsScreen;