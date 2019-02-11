'use strict';

const { OAuth2Client } = require('google-auth-library');
const { googleClientId } = require('../../config');
const oAuthClient = new OAuth2Client(googleClientId);

module.exports = async function isTokenValid(idToken) {
	try {
		const response = await oAuthClient.verifyIdToken({
			idToken,
			audience: googleClientId
		});

		return {
			email: response.payload.email,
			isValid: true
		};
	} catch (error) {
		return {
			isValid: false
		};
	}
};
