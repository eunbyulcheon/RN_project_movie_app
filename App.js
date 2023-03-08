import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import auth from '@react-native-firebase/auth';
import Root from './navigation/Root';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme, lightTheme } from './styled';
import SignInNav from './navigation/SigninStack';

const queryClient = new QueryClient();

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const isDark = useColorScheme() === 'dark';

	useEffect(() => {
		auth().onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		});
	}, []);

	useEffect(() => {
		async function prepare() {
			try {
				SplashScreen.preventAutoHideAsync();
				const fonts = loadFonts([Ionicons.font]);
				await Promise.all([...fonts]);
			} catch (e) {
				console.warn(e);
			} finally {
				setAppIsReady(true);
				SplashScreen.hideAsync();
			}
		}

		prepare();
	}, []);

	if (!appIsReady) {
		SplashScreen.preventAutoHideAsync();
	}

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
				<NavigationContainer>
					{isLoggedIn ? <Root /> : <SignInNav />}
				</NavigationContainer>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
