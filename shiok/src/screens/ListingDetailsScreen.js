import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Text, Header, Button, Rating} from 'react-native-elements';
import {AntDesign} from '@expo/vector-icons';
import Spacer from '../components/Spacer';
import ContactButtons from '../components/ContactButtons';
import { navigate } from "../navigationRef";
import NoPicIcon from '../components/NoPicIcon';
import Avatar from '../components/Avatar';

const window = Dimensions.get('window');

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
            {item.lister.pic == '' ?
            (<NoPicIcon 
                fraction = {0.11}
            />) : 
            (<Avatar 
                fraction = {0.24}
                pic = {item.lister.pic}
            />
            )}
            <Rating
                    startingValue = {item.lister.rating.average}
                    size = {50}
                    readonly = {true}
                    tintColor = '#f2f3f5'
                />
            <Spacer />
            <View style = {{flexDirection: 'row'}}>
                <Text style = {styles.profileLeft}>Username: </Text>
                {item.lister.username 
                    ? (<Text style = {styles.profileRight}>{item.lister.username}</Text>)
                    : (<Text style = {styles.profileRight}>-</Text>)}
            </View>
            <View style = {{flexDirection: 'row'}}>
                <Text style = {styles.profileLeft}>Phone Number: </Text>
                {item.lister.phoneNumber 
                    ? (<Text style = {styles.profileRight}>{item.lister.phoneNumber}</Text>)
                    : (<Text style = {styles.profileRight}>-</Text>)}
            </View>
            <View style = {{flexDirection: 'row'}}>
                <Text style = {styles.profileLeft}>Telegram Handle: </Text>
                {item.lister.teleHandle 
                    ? (<Text style = {styles.profileRight}>{item.lister.teleHandle}</Text>)
                    : (<Text style = {styles.profileRight}>-</Text>)}
            </View>
            {item.lister.type == 'Driver' ? 
            (<View style = {{flexDirection: 'row'}}>
                <Text style = {styles.profileLeft}>License Number: </Text>
                {item.lister.licenseNumber 
                    ? (<Text style = {styles.profileRight}>{item.lister.licenseNumber}</Text>)
                    : (<Text style = {styles.profileRight}>-</Text>)}
            </View>) : null}             
            <Spacer />
            <Spacer>
                <ContactButtons 
                    item = {item}
                />
            </Spacer>
            <Spacer />
            <Button 
                title = 'Confirm Offer'
                buttonStyle = {styles.button}
                onPress = {() => navigate('SubmitOffer', {item})}
            />
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
    },
    button: {
        backgroundColor: '#FF8400',
        borderRadius: 20,
        width: 387.5,
        alignSelf: 'center'
    }
});

export default ListingDetailsScreen;