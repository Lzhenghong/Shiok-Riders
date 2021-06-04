import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';

const GeoResults = ({results, callbackText, callbackObj}) => {
    if (results.length == 0) {
        return null;
    }
    return (
        <View>
            {
                results.map((item, i) => (
                    <ListItem 
                        key = {i}
                        bottomDivider 
                        topDivider
                        onPress = {() => {
                            callbackText(item.name);
                            callbackObj(item);
                        }}
                    >
                        <ListItem.Content>
                            <ListItem.Title style = {{fontWeight: 'bold'}}>
                                {item.name}
                            </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({});

export default GeoResults;