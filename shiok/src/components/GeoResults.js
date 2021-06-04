import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';

const GeoResults = ({results}) => {
    if (results.length == 0) {
        return null;
    }
    return (
        <View>
            {
                results.map((item) => (
                    <ListItem 
                        bottomDivider 
                        topDivider
                        onPress = {() => console.log('yee')}
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