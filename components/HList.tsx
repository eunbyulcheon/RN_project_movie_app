import React from 'react';
import { FlatList, useColorScheme } from 'react-native';
import styled from 'styled-components/native';
import { Movie, TV } from '../api';
import VMedia from './VMedia';

interface HListProps {
	title: string;
	data: Movie[] | TV[];
}

const HList: React.FC<HListProps> = ({ title, data }) => {
	const isDark = useColorScheme() === 'dark';

	return (
		<ListContainer>
			<ListTitle isDark={isDark}>{title}</ListTitle>
			<FlatList
				data={data}
				horizontal
				showsHorizontalScrollIndicator={false}
				ItemSeparatorComponent={HListSeparator}
				contentContainerStyle={{ paddingHorizontal: 30 }}
				keyExtractor={(item: Movie | TV) => item.id + ''}
				renderItem={({ item }: { item: Movie | TV }) => (
					<VMedia
						posterPath={item.poster_path || ''}
						originalTitle={
							'original_title' in item
								? item.original_title
								: item.original_name
						}
						voteAverage={item.vote_average}
						fullData={item}
					/>
				)}
			/>
		</ListContainer>
	);
};

const ListContainer = styled.View`
	margin-bottom: 40px;
`;

export const ListTitle = styled.Text<{ isDark: boolean }>`
	color: ${(props) => (props.isDark ? '#fff' : props.theme.textColor)};
	font-size: 18px;
	font-weight: 600;
	margin-left: 30px;
	margin-bottom: 20px;
`;

export const HListSeparator = styled.View`
	width: 10px;
`;

export default HList;
