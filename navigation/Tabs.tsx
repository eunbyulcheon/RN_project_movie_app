import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { color } from '../colors';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const Tabs = () => {
	const isDark = useColorScheme() === 'dark';

	return (
		<Tab.Navigator
			sceneContainerStyle={{
				backgroundColor: isDark ? color.black_pearl : '#fff',
			}}
			screenOptions={{
				unmountOnBlur: true,
				tabBarStyle: {
					backgroundColor: isDark ? color.black_pearl : '#fff',
				},
				tabBarActiveTintColor: isDark ? color.yellow : color.black_pearl,
				tabBarInactiveTintColor: isDark ? color.dark_grey : color.light_grey,
				headerStyle: {
					backgroundColor: isDark ? color.black_pearl : '#fff',
				},
				headerTitleStyle: {
					color: isDark ? '#fff' : color.black_pearl,
				},
				tabBarLabelStyle: {
					marginTop: -5,
					fontSize: 12,
					fontWeight: '600',
				},
			}}
		>
			<Tab.Screen
				name="Movies"
				component={Movies}
				options={{
					tabBarIcon: ({ focused, color, size }) => {
						return (
							<Ionicons
								name={focused ? 'film' : 'film-outline'}
								color={color}
								size={size}
							/>
						);
					},
				}}
			/>
			<Tab.Screen
				name="TV"
				component={Tv}
				options={{
					tabBarIcon: ({ focused, color, size }) => {
						return (
							<Ionicons
								name={focused ? 'tv' : 'tv-outline'}
								color={color}
								size={size}
							/>
						);
					},
				}}
			/>
			<Tab.Screen
				name="Search"
				component={Search}
				options={{
					tabBarIcon: ({ focused, color, size }) => {
						return (
							<Ionicons
								name={focused ? 'search' : 'search-outline'}
								color={color}
								size={size}
							/>
						);
					},
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ focused, color, size }) => {
						return (
							<Ionicons
								name={focused ? 'person-circle-sharp' : 'person-circle-outline'}
								color={color}
								size={size}
							/>
						);
					},
				}}
			/>
		</Tab.Navigator>
	);
};

export default Tabs;
