import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';

const ListingResults = ({results, callback}) => {
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
                        onPress = {callback}
                    >
                        <ListItem.Content>
                            <ListItem.Title >
                                {`${item.origin.name} to ${item.dest.name}`}
                            </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron 
                            name = 'message-circle'
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