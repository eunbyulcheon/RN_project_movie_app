import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useQuery, useQueryClient } from 'react-query';
import { tvApi } from '../api';
import HList from '../components/HList';
import Loader from '../components/Loader';

const Tv = () => {
	const queryClient = useQueryClient();
	const {
		isLoading: todayLoading,
		data: todayData,
		isRefetching: todayRefetching,
	} = useQuery(['tv', 'today'], tvApi.airingToday);
	const {
		isLoading: topRateLoading,
		data: topRatedData,
		isRefetching: topRateRefetching,
	} = useQuery(['tv', 'topRate'], tvApi.topRated);
	const {
		isLoading: trendingLoading,
		data: trendingData,
		isRefetching: trendingRefetching,
	} = useQuery(['tv', 'trending'], tvApi.trending);

	const onRefresh = () => {
		queryClient.refetchQueries(['tv']);
	};

	const refreshing = todayRefetching || topRateRefetching || trendingRefetching;
	const loading = todayLoading || topRateLoading || trendingLoading;

	return loading ? (
		<Loader />
	) : (
		<ScrollView
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
			contentContainerStyle={{ paddingVertical: 20 }}
		>
			<HList title="Trending TV" data={trendingData.results} />
			<HList title="Airing Today" data={todayData.results} />
			<HList title="Top Rated" data={topRatedData.results} />
		</ScrollView>
	);
};

export default Tv;
