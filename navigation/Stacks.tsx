import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const ScreenOne = ({ navigation: { navigate } }) => (
	<TouchableOpacity onPress={() => navigate('Two')}>
		<Text>One</Text>
	</TouchableOpacity>
);
const ScreenTwo = ({ navigation: { navigate } }) => (
	<TouchableOpacity onPress={() => navigate('Three')}>
		<Text>Two</Text>
	</TouchableOpacity>
);
const ScreenThree = ({ navigation: { navigate } }) => (
	<TouchableOpacity onPress={() => navigate('Tabs', { screen: 'Search' })}>
		<Text>Three</Text>
	</TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stacks = () => (
	<NativeStack.Navigator
		screenOptions={{
			headerBackTitleVisible: false,
		}}
	>
		<NativeStack.Screen name="One" component={ScreenOne} />
		<NativeStack.Screen name="Two" component={ScreenTwo} />
		<NativeStack.Screen name="Three" component={ScreenThree} />
	</NativeStack.Navigator>
);

export default Stacks;
