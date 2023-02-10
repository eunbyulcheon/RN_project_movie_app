import React, { useState } from 'react';
import { Dimensions, FlatList, useColorScheme } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import Slide from '../components/Slide';
import HMedia from '../components/HMedia';
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
import { MovieResponse, moviesApi } from '../api';
import Loader from '../components/Loader';
import HList, { ListTitle } from '../components/HList';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
	const queryClient = useQueryClient();
	const [refreshing, setRefreshing] = useState(false);
	const isDark = useColorScheme() === 'dark';

	const { isLoading: nowPlayingLoading, data: nowPlayingData } =
		useQuery<MovieResponse>(['movies', 'nowPlaying'], moviesApi.nowPlaying);
	const {
		isLoading: upcomingLoading,
		data: upcomingData,
		hasNextPage,
		fetchNextPage,
	} = useInfiniteQuery<MovieResponse>(
		['movies', 'upcoming'],
		moviesApi.upcoming,
		{
			getNextPageParam: (currentPage) => {
				const nextPage = currentPage.page + 1;
				return nextPage > currentPage.total_pages ? null : nextPage;
			},
		}
	);
	const { isLoading: trendingLoading, data: trendingData } =
		useQuery<MovieResponse>(['movies', 'trending'], moviesApi.trending);

	const onRefresh = async () => {
		setRefreshing(true);
		await queryClient.refetchQueries(['movies']);
		setRefreshing(false);
	};

	const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

	const loadMore = () => {
		if (hasNextPage) {
			fetchNextPage();
		}
	};

	return loading ? (
		<Loader />
	) : upcomingData ? (
		<FlatList
			onEndReached={loadMore}
			onEndReachedThreshold={0}
			onRefresh={onRefresh}
			refreshing={refreshing}
			style={{ marginBottom: 20 }}
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
								fullData={movie}
							/>
						))}
					</Swiper>

					{trendingData ? (
						<HList title="Trending Movies" data={trendingData.results} />
					) : null}

					<ComingSoonTitle isDark={isDark}>Coming Soon</ComingSoonTitle>
				</>
			}
			data={upcomingData.pages.map((page) => page.results).flat()}
			keyExtractor={(item) => item.id + ''}
			ItemSeparatorComponent={HSeparator}
			renderItem={({ item }) => (
				<HMedia
					posterPath={item.poster_path || ''}
					originalTitle={item.original_title}
					overview={item.overview}
					releaseDate={item.release_date}
					fullData={item}
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
