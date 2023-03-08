import React from 'react';
import auth from '@react-native-firebase/auth';
import styled from 'styled-components/native';

const Profile = () => {
	const logOut = async () => {
		await auth().signOut();
	};

	return (
		<Container>
			<Wrapper>
				<UserInfo>
					<Image />
					<Id>My name</Id>
				</UserInfo>

				<Btn onPress={logOut}>
					<BtnText>Logout</BtnText>
				</Btn>
			</Wrapper>
		</Container>
	);
};

const Container = styled.View`
	padding: 30px;
`;

const Wrapper = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const UserInfo = styled.View`
	flex-direction: row;
	align-items: center;
`;

const Image = styled.View`
	width: 70px;
	height: 70px;
	background-color: #fff;
	border-radius: 35px;
`;

const Id = styled.Text`
	margin-left: 15px;
	color: #fff;
	font-weight: 500;
`;

const Btn = styled.TouchableOpacity`
	height: 30px;
	width: 80px;
	align-items: center;
	justify-content: center;
	border-radius: 20px;
	background-color: #ff3f34;
`;

const BtnText = styled.Text`
	color: #fff;
	font-weight: 500;
`;

export default Profile;
