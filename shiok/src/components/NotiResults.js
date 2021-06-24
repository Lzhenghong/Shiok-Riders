import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem, Button} from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

const NotiResults = ({results}) => {
    console.log(results);
    return (
        <View>
            {
                results.map(item => (
                    <ListItem
                        key = {item._id}
                        bottomDivider 
                        topDivide
                    >
                        <ListItem.Content>
                            <ListItem.Title style = {{fontWeight: 'bold'}}>{item.type}</ListItem.Title>
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