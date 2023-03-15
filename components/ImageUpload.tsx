import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

const ImageUpload = () => {
	const [image, setImage] = useState(null);
	const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

	const pickImage = async () => {
		if (!status?.granted) {
			const permission = await requestPermission();
			if (!permission.granted) {
				return null;
			}
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
			aspect: [1, 1],
		});

		if (!result.canceled) {
			setImage(result.uri);
		}

		console.log(result);
	};

	return (
		<Image>
			<Btn onPress={pickImage}>
				<Ionicons name="camera" color="black" size={16} />
			</Btn>
			{image ? (
				<Picture
					source={{ uri: image }}
					style={{ width: 80, height: 80, borderRadius: 40 }}
				/>
			) : (
				<Ionicons name="person" size={30} color="black" />
			)}
		</Image>
	);
};

const Image = styled.View`
	width: 80px;
	height: 80px;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.3);
	border-radius: 40px;
`;

const Btn = styled.TouchableOpacity`
	width: 20px;
	height: 20px;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 2px;
	right: 2px;
	border-radius: 10px;
	background-color: #fff;
`;

const Picture = styled.Image``;

export default ImageUpload;
