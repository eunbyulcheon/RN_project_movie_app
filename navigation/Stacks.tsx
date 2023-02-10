import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Detail from '../screens/Detail';
import { color } from '../colors';
import { useColorScheme } from 'react-native';

const NativeStack = createNativeStackNavigator();

const Stacks = () => {
	const isDark = useColorScheme() === 'dark';

	return (
		<NativeStack.Navigator
			screenOptions={{
				headerBackTitleVisible: false,
				headerStyle: { backgroundColor: isDark ? color.black_pearl : '#fff' },
				headerTitleStyle: {
					color: isDark ? '#fff' : color.black_pearl,
				},
			}}
		>
			<NativeStack.Screen name="Detail" component={Detail} />
		</NativeStack.Navigator>
	);
};

export default Stacks;
