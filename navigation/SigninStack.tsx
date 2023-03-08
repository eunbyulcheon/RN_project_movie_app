import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

const StackNav = createNativeStackNavigator();

const SignInNav = () => {
	return (
		<StackNav.Navigator
			screenOptions={{ presentation: 'modal', headerShown: false }}
		>
			<StackNav.Screen name="Login" component={Login} />
			<StackNav.Screen name="SignUp" component={Signup} />
		</StackNav.Navigator>
	);
};

export default SignInNav;
