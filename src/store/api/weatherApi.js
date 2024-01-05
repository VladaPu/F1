import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const weatherApi = createApi({
	reducerPath: 'weatherApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://openweathermap.org/',
		mode: 'cors',
	}),
	prepareHeaders: (headers) => {
		headers.set('Access-Control-Allow-Origin', '*');
		headers.set('Content-Type', 'application/json');
	},
	endpoints: (build) => ({
		getWeather: build.query({
			query: (lat, lon, units, lang) =>
				`/current/?appid=${process.env.OW_API_KEY}`,
		}),
	}),
});

export const { useGetWeatherQuery } = weatherApi;
