import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import React from 'react';
import {
	StyleSheet,
	TouchableWithoutFeedback,
	useColorScheme,
	View,
} from 'react-native';
import styled from 'styled-components/native';
import { Movie } from '../api';
import Poster from './Poster';
import Votes from './Votes';

interface SlideProps {
	backdropPath: string;
	posterPath: string;
	originalTitle: string;
	voteAverage: number;
	overview: string;
	fullData: Movie;
}

const Slide: React.FC<SlideProps> = ({
	backdropPath,
	posterPath,
	originalTitle,
	voteAverage,
	overview,
	fullData,
}) => {
	const isDark = useColorScheme() === 'dark';
	const { navigate } = useNavigation();
	const goToDetail = () =>
		navigate('Stacks', { screen: 'Detail', params: { ...fullData } });

	return (
		<TouchableWithoutFeedback onPress={goToDetail}>
			<View style={{ flex: 1 }}>
				<BgImg
					style={StyleSheet.absoluteFill}
					source={{
						uri: `https://image.tmdb.org/t/p/w500${backdropPath}`,
					}}
				/>
				<BlurView
					tint={isDark ? 'dark' : 'light'}
					intensity={50}
					style={StyleSheet.absoluteFill}
				>
					<Wrapper>
						<Poster path={posterPath} />
						<Column>
							<Title isDark={isDark}>{originalTitle}</Title>
							<Votes rating={voteAverage} />
							<Overview isDark={isDark}>{overview.slice(0, 90)}...</Overview>
						</Column>
					</Wrapper>
				</BlurView>
			</View>
		</TouchableWithoutFeedback>
	);
};

const BgImg = styled.Image``;

const Wrapper = styled.View`
	flex-direction: row;
	height: 100%;
	width: 90%;
	margin: 0 auto;
	justify-content: space-around;
	align-items: center;
`;

const Column = styled.View`
	width: 60%;
`;

const Title = styled.Text<{ isDark: boolean }>`
	margin-bottom: 10px;
	font-size: 16px;
	font-weight: 600;
	color: ${(props) => (props.isDark ? '#fff' : props.theme.textColor)};
`;

const Overview = styled.Text<{ isDark: boolean }>`
	margin-top: 10px;
	color: ${(props) =>
		props.isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0,0,0,0.8)'};
`;

export default Slide;
