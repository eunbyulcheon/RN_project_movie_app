import React from 'react';
import styled from 'styled-components/native';
import { color } from '../colors';

const Login = ({ navigation: { navigate } }) => {
	return (
		<Container>
			<Title>Welcome!</Title>
			<TextInput placeholder="Email" />
			<TextInput placeholder="Password" />
			<Btn bgColor="#20bf6b">
				<BtnText>Login</BtnText>
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
