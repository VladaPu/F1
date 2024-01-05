import React from 'react';
import './ForecastWeather.scss';

export const ForecastWeather = ({ children }) => {
	return (
		<>
			<h3>Погода на 5 дней:</h3>
			<ul className="list">{children}</ul>
		</>
	);
};
