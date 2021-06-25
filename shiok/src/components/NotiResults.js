import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem, Badge} from 'react-native-elements';
import { navigate } from "../navigationRef";


const NotiResults = ({results}) => {
    console.log(results);

    const formatDate = (dateobj) => {
        const date = new Date(dateobj);
        return `${date.getDate()}/${date.getMonth() + 1}`;
    }

    const subtitle = (item) => {
        switch (item.type) {
            case 'Offer':
                return 'You have received an offer from';
            case 'Accept':
                return 'Your offer is accepted by';
            case 'Reject':
                return 'Your offer is rejected by';
            default: 
                return 'You have been added as a friend by';
        }
    };

    const onPress = (item) => {
        if (item.type == 'Offer') {
            return () => navigate('OfferDecision', {item});
        }
    };  

    return (
        <View>
            {
                results.map(item => (
                    <ListItem
                        key = {item._id}
                        bottomDivider 
                        topDivide
                        onPress = {onPress(item)}
                        onLongPress = {() => console.log('longpress')}
                    >
                        <Badge 
                            status = 'primary'
                        />
                        <ListItem.Content style = {{flex: 6}}>
                            <ListItem.Title style = {{fontWeight: 'bold'}}>
                                {item.type}
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                {`${subtitle(item)} ${item.sender.username}`}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Content style = {{flex: 1, alignItems: 'flex-end'}}>
                            <ListItem.Subtitle style = {{fontWeight: 'bold'}}>
                                {formatDate(item.createdAt)}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({});

export default NotiResults;