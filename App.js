import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import Root from './navigation/Root';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme, lightTheme } from './styled';

// SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
const loadAssets = (images) =>
	images.map((image) => {
		if (typeof image === 'string') {
			return Image.prefetch(image);
		} else {
			return Asset.loadAsync(image);
		}
	});

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);

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

	const isDark = useColorScheme() === 'dark';

	if (!appIsReady) {
		SplashScreen.preventAutoHideAsync();
	}

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
				<NavigationContainer>
					<Root />
				</NavigationContainer>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
