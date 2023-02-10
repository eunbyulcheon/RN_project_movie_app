import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, useColorScheme } from 'react-native';
import styled from 'styled-components/native';
import { Movie, TV } from '../api';
import Poster from './Poster';
import Votes from './Votes';

interface VMediaProps {
	posterPath: string;
	originalTitle: string;
	voteAverage: number;
	fullData: Movie | TV;
}

const VMedia: React.FC<VMediaProps> = ({
	posterPath,
	originalTitle,
	voteAverage,
	fullData,
}) => {
	const isDark = useColorScheme() === 'dark';
	const { navigate } = useNavigation();
	const goToDetail = () =>
		navigate('Stacks', { screen: 'Detail', params: { ...fullData } });

	return (
		<TouchableOpacity onPress={goToDetail}>
			<Container>
				<Poster path={posterPath} />
				<Title isDark={isDark}>
					{originalTitle.slice(0, 12)}
					{originalTitle.length > 12 ? '...' : null}
				</Title>
				<Votes rating={voteAverage} />
			</Container>
		</TouchableOpacity>
	);
};

const Container = styled.View`
	align-items: center;
`;

const Title = styled.Text<{ isDark: boolean }>`
	color: ${(props) => (props.isDark ? '#fff' : props.theme.textColor)};
	font-weight: 600;
	margin-top: 7px;
	margin-bottom: 5px;
`;

export default VMedia;
