'use strict';

const { OAuth2Client } = require('google-auth-library');
const { googleClientId } = require('../config');
const client = new OAuth2Client(googleClientId);

const isTokenValid = async idToken => {
	try {
		await client.verifyIdToken({
			idToken,
			audience: googleClientId
		});
		return true;
	} catch (error) {
		return false;
	}
};

module.exports = isTokenValid;
