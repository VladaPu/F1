import React, { useEffect, useState } from 'react';
import './styles/global.scss';
import { CurrentWeather } from '../components/CurrnetWeather/CurrentWeather';
import { Spinner } from '../ui/Spinner/Spinner';
import { ForecastWeather } from '../components/ForecastWeather/ForecastWeather';

export const App = () => {
	const [coords, setCords] = useState({});
	const [currentWeatherData, setCurrentWeatherData] = useState(null);
	const [forecastWeatherData, setForecastWeatherData] = useState([]);
	const [errorMsg, setErrorMsg] = useState({});
	const [city, setCity] = useState('');

	console.log(city);

	useEffect(() => {
		if (!navigator.geolocation) {
			setErrorMsg({ browser: 'Ваш браузер не дружит с геолокацией...' });
		} else {
			navigator.geolocation.getCurrentPosition(success, error);
		}

		function success(position) {
			const { longitude, latitude } = position.coords;
			setCords({ latitude, longitude });
		}

		function error() {
			setErrorMsg({ ...error, geo: 'Не удалось определить геолокацию!' });
			fetch(`${process.env.IP_API_URL}?apiKey=${process.env.IP_API_KEY}`)
				.then((res) => res.json())
				.then((data) => setCity(data.location.city));
		}
	}, []);

	useEffect(() => {
		if (city) {
			fetch(
				`${process.env.OW_API_URL_CURRENT}?q=${city}&appid=${process.env.OW_API_KEY}&units=metric&lang=ru`
			)
				.then((res) => res.json())
				.then((data) => setCurrentWeatherData(data))
				.catch((err) => setErrorMsg({ ...errorMsg, cityOw: err }));
			fetch(
				`${process.env.OW_API_URL_FORECAST}?q=${city}&appid=${process.env.OW_API_KEY}&units=metric&lang=ru`
			)
				.then((res) => res.json())
				.then((data) => setForecastWeatherData(data?.list ?? []))
				.catch((err) => setErrorMsg({ ...errorMsg, forecastRes: err }));
		}
	}, [city]);

	useEffect(() => {
		if (coords?.latitude && coords?.longitude) {
			fetch(
				`${process.env.OW_API_URL_CURRENT}?lat=${coords.latitude}&lon=${coords.longitude}&appid=${process.env.OW_API_KEY}&units=metric&lang=ru`
			)
				.then((res) => res.json())
				.then((data) => setCurrentWeatherData(data))
				.catch((err) => setErrorMsg({ ...errorMsg, currentRes: err }));

			fetch(
				`${process.env.OW_API_URL_FORECAST}?lat=${coords.latitude}&lon=${coords.longitude}&appid=${process.env.OW_API_KEY}&units=metric&lang=ru`
			)
				.then((res) => res.json())
				.then((data) => setForecastWeatherData(data.list))
				.catch((err) => setErrorMsg({ ...errorMsg, forecastRes: err }));
		}
	}, [coords]);

	// const renderedForecast = forecastWeatherData.map((el) => (
	// 	<li key={el.dt}>
	// 		<time>{el.dt_txt}</time>,{' '}
	// 		<strong>{`${Math.round(el.main.temp)}℃`}</strong>
	// 	</li>
	// ));

	const renderForecast = () => {
		return forecastWeatherData.map((el) => (
			<li key={el.dt}>
				<time>{el.dt_txt}</time>,{' '}
				<strong>{`${Math.round(el.main.temp)}℃`}</strong>
			</li>
		));
	};

	console.log(forecastWeatherData);

	return (
		<div className="app">
			{currentWeatherData ? (
				<>
					<CurrentWeather
						temp={currentWeatherData?.main?.temp}
						city={currentWeatherData?.name}
						err={currentWeatherData.cod}
						setCity={setCity}
					/>
					<ForecastWeather>
						{currentWeatherData.cod === '404' ? null : renderForecast()}
					</ForecastWeather>
				</>
			) : (
				<Spinner />
			)}
		</div>
	);
};
