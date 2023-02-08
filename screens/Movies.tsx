import React from 'react';
import { Dimensions, FlatList, useColorScheme } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import Slide from '../components/Slide';
import HMedia from '../components/HMedia';
import { useQuery, useQueryClient } from 'react-query';
import { MovieResponse, moviesApi } from '../api';
import Loader from '../components/Loader';
import HList, { ListTitle } from '../components/HList';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
	const queryClient = useQueryClient();
	const isDark = useColorScheme() === 'dark';

	const {
		isLoading: nowPlayingLoading,
		data: nowPlayingData,
		isRefetching: isRefetchingNowPlaying,
	} = useQuery<MovieResponse>(['movies', 'nowPlaying'], moviesApi.nowPlaying);
	const {
		isLoading: upcomingLoading,
		data: upcomingData,
		isRefetching: isRefetchingUpcoming,
	} = useQuery<MovieResponse>(['movies', 'upcoming'], moviesApi.upcoming);
	const {
		isLoading: trendingLoading,
		data: trendingData,
		isRefetching: isRefetchingTrending,
	} = useQuery<MovieResponse>(['movies', 'trending'], moviesApi.trending);

	const onRefresh = async () => {
		queryClient.refetchQueries(['movies']);
	};

	const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
	const refreshing =
		isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;

	return loading ? (
		<Loader />
	) : upcomingData ? (
		<FlatList
			onRefresh={onRefresh}
			refreshing={refreshing}
			ListHeaderComponent={
				<>
					<Swiper
						horizontal
						loop
						autoplay
						autoplayTimeout={3.5}
						showsButtons={false}
						showsPagination={false}
						containerStyle={{
							marginBottom: 30,
							width: '100%',
							height: SCREEN_HEIGHT / 4,
						}}
					>
						{nowPlayingData?.results.map((movie) => (
							<Slide
								key={movie.id}
								backdropPath={movie.backdrop_path || ''}
								posterPath={movie.poster_path || ''}
								originalTitle={movie.original_title}
								voteAverage={movie.vote_average}
								overview={movie.overview}
							/>
						))}
					</Swiper>

					{trendingData ? (
						<HList title="Trending Movies" data={trendingData.results} />
					) : null}

					<ComingSoonTitle isDark={isDark}>Coming Soon</ComingSoonTitle>
				</>
			}
			data={upcomingData.results}
			keyExtractor={(item) => item.id + ''}
			ItemSeparatorComponent={HSeparator}
			renderItem={({ item }) => (
				<HMedia
					posterPath={item.poster_path || ''}
					originalTitle={item.original_title}
					overview={item.overview}
					releaseDate={item.release_date}
				/>
			)}
		/>
	) : null;
};

const ComingSoonTitle = styled(ListTitle)`
	margin-bottom: 20px;
`;

const HSeparator = styled.View`
	height: 20px;
`;

export default Movies;