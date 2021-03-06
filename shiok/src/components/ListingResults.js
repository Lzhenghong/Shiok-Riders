import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import { navigate } from "../navigationRef";

const ListingResults = ({results}) => {
    if (results.length == 0) {
        return null;
    }
    return (
        <View>
            {
                results.map((item) => (
                    <ListItem 
                        key = {item._id}
                        bottomDivider 
                        topDivider
                        onPress = {() => navigate('ListingDetails', {item})}
                    >
                        <ListItem.Content>
                            <ListItem.Title >
                                {`${item.origin.name} to ${item.dest.name} - $${item.price}`}
                            </ListItem.Title>
                            <ListItem.Subtitle style = {{color: '#696e6b'}}>
                                {item.lister.username ? item.lister.username : item.lister.email}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron 
                            name = 'chevron-right'
                            type = 'feather'
                            color = '#3EB489'
                            size = {24}
                        />
                    </ListItem>
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({});

export default ListingResults;