import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import {
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	Share,
	Platform,
} from 'react-native';
import styled from 'styled-components/native';
import { Movie, MovieDetails, moviesApi, TV, tvApi, TVDetails } from '../api';
import Poster from '../components/Poster';
import { LinearGradient } from 'expo-linear-gradient';
import { color } from '../colors';
import { useQuery } from 'react-query';
import Loader from '../components/Loader';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

type RootStackParamList = {
	Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Detail: React.FC<DetailScreenProps> = ({
	navigation: { setOptions },
	route: { params },
}) => {
	const isMovie = 'original_title' in params;
	const { isLoading, data } = useQuery<MovieDetails | TVDetails>(
		[isMovie ? 'movies' : 'tv', params.id],
		isMovie ? moviesApi.detail : tvApi.detail
	);

	const shareMedia = async () => {
		const isAndroid = Platform.OS === 'android';
		const homepage = isMovie
			? `https://www.imdb.com/title/${data?.imdb_id}/`
			: data?.homepage;

		if (isAndroid) {
			await Share.share({
				message: `${params.overview}\nCheck it out: ${homepage}`,
				title:
					'original_title' in params
						? params.original_title
						: params.original_name,
			});
		} else {
			await Share.share({
				url: homepage || '',
				title:
					'original_title' in params
						? params.original_title
						: params.original_name,
			});
		}
	};

	const ShareButton = () => (
		<TouchableOpacity onPress={shareMedia}>
			<Ionicons name="share-outline" color="#fff" size={24} />
		</TouchableOpacity>
	);

	useEffect(() => {
		setOptions({
			title: 'original_title' in params ? 'Movie' : 'TV Show',
		});
	}, []);

	useEffect(() => {
		if (data) {
			setOptions({
				headerRight: () => <ShareButton />,
			});
		}
	}, [data]);

	const openYoutubeLink = async (videoId: string) => {
		const baseUrl = `http://m.youtube.com/watch?v=${videoId}`;
		await WebBrowser.openBrowserAsync(baseUrl);
	};

	return (
		<Container>
			<Header>
				<Background
					style={StyleSheet.absoluteFill}
					source={{
						uri: `https://image.tmdb.org/t/p/w500${params.backdrop_path}`,
					}}
				/>
				<LinearGradient
					colors={['transparent', color.black_pearl]}
					style={StyleSheet.absoluteFill}
				/>
				<Column>
					<Poster path={params.poster_path || ''} />
					<Title>
						{'original_title' in params
							? params.original_title
							: params.original_name}
					</Title>
				</Column>
			</Header>

			<Data>
				<Info>
					{data?.genres.map((genre) => (
						<Genre>{genre.name}</Genre>
					))}
					<Rate>{data?.adult === true ? 'R' : 'G'}</Rate>
					<Time>{data?.runtime}m</Time>
				</Info>
				<Overview>{params.overview}</Overview>
				{isLoading ? <Loader /> : null}
				{data?.videos?.results?.map((video) =>
					video.name === 'Official Trailer' ? (
						<VideoBtn
							key={video.key}
							onPress={() => openYoutubeLink(video.key)}
						>
							<Ionicons name="logo-youtube" color="red" size={24} />
							<BtnText>{video.name}</BtnText>
						</VideoBtn>
					) : null
				)}
			</Data>
		</Container>
	);
};

const Container = styled.ScrollView`
	background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
	height: ${SCREEN_HEIGHT / 4}px;
	justify-content: flex-end;
	padding: 0px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
	flex-direction: row;
	width: 80%;
`;

const Title = styled.Text`
	color: #fff;
	font-size: 30px;
	align-self: flex-end;
	font-weight: 500;
	margin-left: 15px;
`;

const Data = styled.View`
	padding: 0px 20px;
`;

const Info = styled.View`
	flex-direction: row;
	margin-top: 20px;
`;

const Genre = styled.Text`
	padding: 5px;
	margin-right: 5px;
	border: 1px solid #fff;
	border-radius: 10px;
	color: #fff;
	font-size: 10px;
`;

const Rate = styled(Genre)`
	padding: 5px 7px;
`;

const Time = styled(Genre)``;

const Overview = styled.Text`
	margin: 20px 0px;
	color: ${(props) => props.theme.textColor};
`;

const VideoBtn = styled.TouchableOpacity`
	flex-direction: row;
	margin: 20px auto;
	border-radius: 25px;
	width: 100%;
	padding: 10px 30%;
	background-color: rgba(0, 0, 0, 0.4);
`;

const BtnText = styled.Text`
	color: #fff;
	font-weight: 500;
	line-height: 24px;
	margin-left: 10px;
`;

export default Detail;
