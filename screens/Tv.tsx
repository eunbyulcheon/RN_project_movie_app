import React, { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useQuery, useQueryClient } from 'react-query';
import { tvApi } from '../api';
import HList from '../components/HList';
import Loader from '../components/Loader';

const Tv = () => {
	const queryClient = useQueryClient();
	const [refreshing, setRefreshing] = useState(false);

	const { isLoading: todayLoading, data: todayData } = useQuery(
		['tv', 'today'],
		tvApi.airingToday
	);
	const { isLoading: topRateLoading, data: topRatedData } = useQuery(
		['tv', 'topRate'],
		tvApi.topRated
	);
	const { isLoading: trendingLoading, data: trendingData } = useQuery(
		['tv', 'trending'],
		tvApi.trending
	);

	const onRefresh = async () => {
		setRefreshing(true);
		await queryClient.refetchQueries(['tv']);
		setRefreshing(false);
	};

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
