import React, { useState } from 'react';
import './CurrentWeather.scss';
import { Input } from '../../ui/Input/Input';

export const CurrentWeather = ({ temp, city, setCity, err }) => {
	const [inputValue, setInputValue] = useState('');

	const inputHandler = (evt) => {
		setInputValue(evt.target.value);
	};

	const formHandler = (evt) => {
		evt.preventDefault();
		setCity(inputValue);
		setInputValue('');
	};


	return (
		<form onSubmit={formHandler} className="CurrentWeather">
			<h1>{err === '404' ? 'City not found' : `${Math.round(temp)}℃`}</h1>
			{err === '404' ? null : <strong>в {city}</strong>}
			<Input
				className="CurrentWeather__input"
				handler={inputHandler}
				value={inputValue}
			/>
			<button className="CurrentWeather__btn">Find</button>
		</form>
	);
};
