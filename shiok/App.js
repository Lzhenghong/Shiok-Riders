import React  from 'react';
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
import AddOriginScreen from './src/screens/AddOriginScreen';
import AddDestScreen from './src/screens/AddDestScreen';
import ConfirmListingScreen from './src/screens/ConfirmListingScreen';
import FriendListScreen from './src/screens/FriendListScreen';
import ListingDetailsScreen from './src/screens/ListingDetailsScreen';
import SubmitOfferScreen from './src/screens/SubmitOfferScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import OfferDecisionScreen from './src/screens/OfferDecisionScreen';
import OfferResultScreen from './src/screens/OfferResultScreen';
import HistoryDetailScreen from './src/screens/HistoryDetailScreen';
import AddFriendScreen from './src/screens/AddFriendScreen';
import FriendDetailScreen from './src/screens/FriendDetailScreen';
import ProfilePicScreen from './src/screens/ProfilePicScreen';

import {Provider as AuthProvider} from './src/context/AuthContext';
import {setNavigator} from './src/navigationRef';
import {Provider as LocationProvider} from './src/context/LocationContext';
import {Provider as ProfProvider} from './src/context/ProfileContext';
import {Provider as ListingProvider} from './src/context/ListingContext';
import {Provider as NotiProvider} from './src/context/NotiContext';
import {Provider as BookingProvider} from './src/context/BookingContext';
import {Feather} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';

const bookingFlow = createStackNavigator({
	Home: HomeScreen,
	ListingDetails: ListingDetailsScreen,
	SubmitOffer: SubmitOfferScreen
});

bookingFlow.navigationOptions = () => {
	return {  
		title: 'Home',
		tabBarIcon: ({tintColor}) => (
			<Feather name = 'home' size = {24} color = {tintColor}/>
		)
	};
};

const historyFlow = createStackNavigator({
	History: HistoryScreen,
	HistoryDetail: HistoryDetailScreen
});

historyFlow.navigationOptions = () => {
	return {
		title: 'History',
		tabBarIcon: ({tintColor}) => (
			<Feather name = 'clock' size = {24} color = {tintColor}/>
		)
	}
}

const listingFlow = createStackNavigator({
	AddOrigin: AddOriginScreen,
	AddDest: AddDestScreen,
	ConfirmListing: ConfirmListingScreen
});

listingFlow.navigationOptions = () => {
	return {
	  title: 'Add',
	  tabBarIcon: ({tintColor}) => (
		  <AntDesign name = 'plussquareo' size = {24} color = {tintColor}/>
	  )
	};
};

const notificationFlow = createStackNavigator({
  	Notification: NotificationScreen,
	OfferDecision: OfferDecisionScreen,
	OfferResult: OfferResultScreen,
	AddFriend: AddFriendScreen
});

notificationFlow.navigationOptions = ({screenProps}) => {
	return {
		title: 'Notification',
		tabBarIcon: ({tintColor}) => (
			<Ionicons
				name = 'notifications-outline' 
				size = {24} 
				color = {tintColor}
			/>
		)
	}
}

const profileFlow = createStackNavigator({
	Profile: ProfileScreen,
	EditProfile: EditProfileScreen,
	FriendList: FriendListScreen,
	FriendDetail: FriendDetailScreen,
	ProfilePic: ProfilePicScreen
});

profileFlow.navigationOptions = () => {
	return {
		title: 'Profile',
		tabBarIcon: ({tintColor}) => (
			<Feather name = 'user' size = {24} color = {tintColor}/>
		)
	};
};

const switchNavigator = createSwitchNavigator({
	Loading: LoadingScreen,
	loginFlow: createStackNavigator({
		Signup: SignupScreen,
		Signin: SigninScreen
	}),
	mainFlow: createBottomTabNavigator(
		{
			bookingFlow,
			historyFlow,
			listingFlow,
			notificationFlow,
			profileFlow
		},
		{
			tabBarOptions: {
				inactiveTintColor: '#3EB489',
				activeTintColor: '#FF8400'
			}
		}
	)
});

const App = createAppContainer(switchNavigator);

export default () => {
	return (
		<BookingProvider>
			<NotiProvider>
				<ListingProvider>
					<ProfProvider>
						<LocationProvider>
							<AuthProvider>
								<App
									ref={(navigator) => {
									setNavigator(navigator);
									}}
									//screenProps = {{notiCount}}
								/>
							</AuthProvider>
						</LocationProvider>
					</ProfProvider>
				</ListingProvider>
			</NotiProvider>
		</BookingProvider>
	);
};