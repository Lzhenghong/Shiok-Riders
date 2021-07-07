import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Header, Button, Icon, Rating} from 'react-native-elements';
import {AntDesign} from '@expo/vector-icons';
import Spacer from '../components/Spacer';
import ContactButtons from '../components/ContactButtons';
import { navigate } from "../navigationRef";

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
                size = {100}
                containerStyle = {styles.icon}
                reverse = {true}
            />
            <Rating
                    startingValue = {item.lister.rating.average}
                    size = {50}
                    readonly = {true}
                    tintColor = '#f2f3f5'
                />
            <Spacer />
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
            <View style = {{flexDirection: 'row'}}>
                <Text h4 style = {styles.profileLeft}>Telegram Handle: </Text>
                {item.lister.teleHandle 
                    ? (<Text h4 style = {styles.profileRight}>{item.lister.teleHandle}</Text>)
                    : (<Text h4 style = {styles.profileRight}>-</Text>)}
            </View>
            {item.lister.type == 'Driver' ? 
            (<View style = {{flexDirection: 'row'}}>
                <Text h4 style = {styles.profileLeft}>License Number: </Text>
                {item.lister.licenseNumber 
                    ? (<Text h4 style = {styles.profileRight}>{item.lister.licenseNumber}</Text>)
                    : (<Text h4 style = {styles.profileRight}>-</Text>)}
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
        borderRadius: 20,
        width: 387.5,
        alignSelf: 'center'
    }
});

export default ListingDetailsScreen;