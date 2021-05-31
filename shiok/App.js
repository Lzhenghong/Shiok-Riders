import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';

import {Provider as AuthProvider} from './src/context/AuthContext';
import {setNavigator} from './src/navigationRef';
import {Provider as LocationProvider} from './src/context/LocationContext';
import {Feather} from '@expo/vector-icons';

const bookingFlow = createStackNavigator({
  Home: HomeScreen
});

const profileFlow = createStackNavigator({
  Profile: ProfileScreen,
  EditProfile: EditProfileScreen
});

bookingFlow.navigationOptions = () => {
  return {
    title: 'Home',
    tabBarIcon: <Feather name = 'home' size = {24} color = '#3EB489'/>,
    tabBarOptions: {activeTintColor: '#3EB489'}
  };
};

profileFlow.navigationOptions = () => {
  return {
    title: 'Profile',
    tabBarIcon: <Feather name = 'user' size = {24} color = '#3EB489'/>,
    tabBarOptions: {activeTintColor: '#3EB489'}
    };
};

const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createBottomTabNavigator({
    bookingFlow,
    History: HistoryScreen,
    profileFlow
  })
});

//export default createAppContainer(switchNavigator);

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <LocationProvider>
      <AuthProvider>
        <App
          ref={(navigator) => {
            setNavigator(navigator);
          }}
        />
      </AuthProvider>
    </LocationProvider>
  );
};