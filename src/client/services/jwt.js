import config from '../config';

const cookies = require('browser-cookies');
const { decode } = require('jwt-simple');

export const deleteCookie = () => {
	cookies.set(config.cookieName, '');
};

export const getJwtData = () => {
	const jwt = cookies.get(config.cookieName);
	if (!jwt) {
		return null;
	}
	try {
		const jwtData = decode(jwt, null, true);

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
