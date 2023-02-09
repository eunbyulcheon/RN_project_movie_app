import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { moviesApi, tvApi } from '../api';
import HList from '../components/HList';
import Loader from '../components/Loader';

const Search = () => {
	const [query, setQuery] = useState('');
	const {
		isLoading: loadingMovies,
		data: moviesData,
		refetch: searchMovies,
	} = useQuery(['searchMovies', query], moviesApi.search, {
		enabled: false,
	});
	const {
		isLoading: loadingTv,
		data: tvData,
		refetch: searchTv,
	} = useQuery(['searchTv', query], tvApi.search, {
		enabled: false,
	});

	const onChangeText = (text: string) => setQuery(text);
	const onSubmit = () => {
		if (query === '') return;
		searchMovies();
		searchTv();
	};

	return (
		<Container>
			<SearchBar
				placeholder="Search for Movie of TV Show"
				placeholderTextColor="grey"
				returnKeyType="search"
				onChangeText={onChangeText}
				onSubmitEditing={onSubmit}
			/>
			{loadingMovies || loadingTv ? <Loader /> : null}
			{moviesData ? (
				<HList title="Movie Results" data={moviesData.results} />
			) : null}
			{tvData ? <HList title="TV Results" data={tvData.results} /> : null}
		</Container>
	);
};

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
	width: 90%;
	margin: 20px auto 40px;
	padding: 10px 15px;
	border-radius: 15px;
	background-color: #fff;
`;

export default Search;
