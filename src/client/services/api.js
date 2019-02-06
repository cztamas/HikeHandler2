import axios from 'axios';

export const login = async idToken => {
	const response = await axios.post('/data/login', {
		token: idToken
	});

	return response.data;
};
