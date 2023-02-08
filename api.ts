const API_KEY = '72feb8fcecfd18ec442929891d8da914';
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
	adult: boolean;
	backdrop_path: string | null;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface TV {
	name: string;
	original_name: string;
	origin_country: string[];
	vote_count: number;
	backdrop_path: string | null;
	vote_average: number;
	genre_ids: number[];
	id: number;
	original_language: string;
	overview: string;
	poster_path: string | null;
	first_air_date: string;
	popularity: number;
	media_type: string;
}

interface BaseResponse {
	page: number;
	total_results: number;
	total_pages: number;
}

export interface MovieResponse extends BaseResponse {
	results: Movie[];
}

export const moviesApi = {
	trending: () =>
		fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) =>
			res.json()
		),
	upcoming: () =>
		fetch(
			`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
		).then((res) => res.json()),
	nowPlaying: () =>
		fetch(
			`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
		).then((res) => res.json()),
};

export const tvApi = {
	trending: () =>
		fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`).then((res) =>
			res.json()
		),
	airingToday: () =>
		fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`).then((res) =>
			res.json()
		),
	topRated: () =>
		fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US`).then(
			(res) => res.json()
		),
};