import React from 'react';
import styled from 'styled-components/native';

interface PosterProps {
	path: string;
}

const Poster: React.FC<PosterProps> = ({ path }) => {
	return (
		<Image
			source={{
				uri: `https://image.tmdb.org/t/p/w500${path}`,
			}}
		/>
	);
};

const Image = styled.Image`
	width: 100px;
	height: 160px;
	border-radius: 5px;
	background-color: rgba(255, 255, 255, 0.4);
`;

export default Poster;
