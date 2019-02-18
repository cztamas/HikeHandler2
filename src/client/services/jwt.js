import config from '../config';

const cookies = require('browser-cookies');

export const deleteCookie = () => {
	cookies.set(config.cookieName, '');
};

export const getJwtData = () => {
	const jwt = cookies.get(config.cookieName);
	if (!jwt) {
		return null;
	}
	try {
		const base64EncodedJwtData = jwt.split('.')[1];
		const jwtData = JSON.parse(window.atob(base64EncodedJwtData));

		if (jwtData.iat + jwtData.ttl > Date.now()) {
			return jwtData;
		} else {
			deleteCookie();
			return null;
		}
	} catch (error) {
		console.log('Invalid JWT found and deleted:', jwt);
		deleteCookie();
		return null;
	}
};
