import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import { navigate } from "../navigationRef";


const NotiResults = ({results}) => {
    console.log(results);

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
                    >
                        <ListItem.Content>
                            <ListItem.Title style = {{fontWeight: 'bold'}}>
                                {item.type}
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                {`${subtitle(item)} ${item.sender.username}`}
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