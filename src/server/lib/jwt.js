'use strict';

const jwt = require('jwt-simple');
const config = require('../../config');

const secret = config.jwtSecret;

module.exports = {
	encode: payload => {
		return jwt.encode(payload, secret);
	},
	decode: token => {
		return jwt.decode(token, secret);
	}
};
