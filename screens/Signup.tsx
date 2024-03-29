import React, { useRef, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { ActivityIndicator, Alert, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { Container, Input } from './Login';

const Signup = () => {
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
			await auth().createUserWithEmailAndPassword(email, pw);
		} catch (e: any) {
			switch (e.code) {
				case 'auth/weak-password': {
					Alert.alert('Insert a stronger password');
				}
				case 'auth/email-already-in-use': {
					Alert.alert('Email already in use.');
				}
				case 'auth/invalid-email': {
					Alert.alert('Insert a valid email');
				}
			}
			setLoading(false);
			setEmail('');
			setPw('');
		}
	};

	return (
		<Container>
			<Title>Create Account</Title>
			<Input
				value={email}
				placeholder="Email"
				onChangeText={(text) => setEmail(text)}
				onSubmitEditing={onSubmitEmail}
				returnKeyType="next"
				autoCapitalize="none"
				autoCorrect={false}
				keyboardType="email-address"
			/>
			<Input
				ref={pwRef}
				value={pw}
				placeholder="Password"
				onChangeText={(text) => setPw(text)}
				onSubmitEditing={onSubmitPw}
				returnKeyType="done"
				secureTextEntry
			/>
			<Btn onPress={onSubmitPw}>
				{loading ? (
					<ActivityIndicator color="white" size={16} />
				) : (
					<BtnText>Join</BtnText>
				)}
			</Btn>
		</Container>
	);
};

const Title = styled.Text`
	margin-bottom: 60px;
	color: #fff;
	font-size: 30px;
	font-weight: 500;
`;

const Btn = styled.TouchableOpacity`
	width: 100%;
	height: 50px;
	margin-top: 5px;
	border-radius: 25px;
	background-color: #20bf6b;
	align-items: center;
	justify-content: center;
`;

const BtnText = styled.Text`
	color: #fff;
	font-size: 16px;
	font-weight: 500;
`;

export default Signup;
