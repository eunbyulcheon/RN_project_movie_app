import React, { useRef, useState } from 'react';
import { ActivityIndicator, Alert, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { color } from '../colors';

const Login = ({ navigation: { navigate } }) => {
	const pwRef = useRef<TextInput>();
	const [email, setEmail] = useState('');
	const [pw, setPw] = useState('');
	const [loading, setLoading] = useState(false);

	const onSubmitEmail = () => {
		pwRef.current?.focus();
	};

	const onSubmitPw = async () => {
		if (email === '' || pw === '') {
			return Alert.alert('Complete the form.');
		}
		if (loading) return;
		setLoading(true);
		try {
			await auth().signInWithEmailAndPassword(email, pw);
		} catch (e: any) {
			switch (e.code) {
				case 'auth/invalid-email': {
					Alert.alert('Enter a valid email.');
				}
				case 'auth/user-not-found': {
					Alert.alert('User not found.');
				}
				case 'auth/wrong-password': {
					Alert.alert('Wrong Password');
				}
			}
		}
	};

	const onGoogleButtonPress = async () => {
		const { idToken } = await GoogleSignin.signIn();
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);
		return auth().signInWithCredential(googleCredential);
	};

	return (
		<Container>
			<Title>Welcome!</Title>
			<Input
				placeholder="Email"
				value={email}
				onChangeText={(text) => setEmail(text)}
				onSubmitEditing={onSubmitEmail}
				returnKeyType="next"
				keyboardType="email-address"
				autoCapitalize="none"
				autoCorrect={false}
			/>
			<Input
				placeholder="Password"
				ref={pwRef}
				value={pw}
				onChangeText={(text) => setPw(text)}
				onSubmitEditing={onSubmitPw}
				returnKeyType="done"
				secureTextEntry
			/>
			<Btn bgColor="#20bf6b" onPress={onSubmitPw}>
				{loading ? (
					<ActivityIndicator color="white" size={20} />
				) : (
					<BtnText>Login</BtnText>
				)}
			</Btn>
			<Btn
				bgColor="#fff"
				style={{ flexDirection: 'row' }}
				onPress={() => onGoogleButtonPress()}
			>
				<Ionicons name="logo-google" size={24} color="black" />
				<BtnText style={{ color: '#000', marginLeft: 10 }}>
					Login with Google
				</BtnText>
			</Btn>
			<Btn bgColor="#ff5e57" onPress={() => navigate('SignUp')}>
				<BtnText>Create Account</BtnText>
			</Btn>
		</Container>
	);
};

export const Container = styled.View`
	flex: 1;
	padding: 60px 40px;
	align-items: center;
	justify-content: center;
	background-color: ${color.black_pearl};
`;

const Title = styled.Text`
	margin-bottom: 60px;
	font-size: 30px;
	font-weight: 500;
	color: #fff;
`;

export const Input = styled.TextInput`
	width: 100%;
	height: 50px;
	margin-vertical: 5px;
	padding: 0px 20px;
	background-color: ${color.light_grey};
	border-radius: 25px;
`;

const Btn = styled.TouchableOpacity<{ bgColor?: string }>`
	width: 100%;
	height: 50px;
	margin-vertical: 5px;
	border-radius: 25px;
	align-items: center;
	justify-content: center;
	background-color: ${(props) => props.bgColor};
`;

const BtnText = styled.Text`
	color: #fff;
	font-size: 16px;
	font-weight: 500;
`;

const GoogleText = styled.Text`
	color: #000;
`;

export default Login;
