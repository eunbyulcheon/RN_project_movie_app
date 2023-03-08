import React, { useRef, useState } from 'react';
import auth from '@react-native-firebase/auth';
import styled from 'styled-components/native';
import { color } from '../colors';
import { ActivityIndicator, Alert } from 'react-native';

const Login = ({ navigation: { navigate } }) => {
	const pwRef = useRef();
	const [email, setEmail] = useState('');
	const [pw, setPw] = useState('');
	const [loading, setLoading] = useState(false);

	const onSubmitEmail = () => {
		pwRef.current.focus();
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

	return (
		<Container>
			<Title>Welcome!</Title>
			<TextInput
				placeholder="Email"
				value={email}
				onChangeText={(text) => setEmail(text)}
				onSubmitEditing={onSubmitEmail}
				returnKeyType="next"
				keyboardType="email-address"
				autoCapitalize="none"
				autoCorrect={false}
			/>
			<TextInput
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

export const TextInput = styled.TextInput`
	width: 100%;
	height: 50px;
	margin-vertical: 5px;
	padding: 0px 20px;
	background-color: ${color.light_grey};
	border-radius: 25px;
`;

const Btn = styled.TouchableOpacity<{ bgColor: string }>`
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

export default Login;
