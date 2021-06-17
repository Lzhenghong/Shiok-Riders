import React from 'react';
import {View, StyleSheet} from 'react-native';
import NoHistory from '../components/NoHistory';
import Header from '../components/Header';

const HistoryScreen = () => {
    return (
        <View>
            <Header 
                title = 'History'
                backNav = {false}
                marginBottom = {-1}
            />
            <NoHistory/>
        </View>
    );
};

HistoryScreen.navigationOptions = () => {
    return {
      header: () => false,
    };
  };

const styles = StyleSheet.create({});

export default HistoryScreen;