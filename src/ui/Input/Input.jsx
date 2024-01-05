import React from 'react';

export const Input = ({value, handler, className}) => {
	return <input className={className} type="text" value={value} onChange={handler} />;
};
