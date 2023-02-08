import React from 'react';
import { useColorScheme } from 'react-native';
import styled from 'styled-components/native';

interface VotesProps {
	rating: number;
}

const Votes: React.FC<VotesProps> = ({ rating }) => {
	const isDark = useColorScheme() === 'dark';

	return (
		<Rating isDark={isDark}>
			{rating > 0 ? `☆ ${rating.toFixed(1)}/10` : `Coming Soon`}
		</Rating>
	);
};

const Rating = styled.Text<{ isDark: boolean }>`
	color: ${(props) =>
		props.isDark ? 'rgba(255, 255, 255, 0.8)' : props.theme.textColor};
	font-size: 10px;
`;

export default Votes;
