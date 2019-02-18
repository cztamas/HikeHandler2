'use strict';

require('dotenv').config();

const { googleClientId } = require('./client/config');

module.exports = {
	dbConnectionString: process.env.DATABASE_URL,
	port: process.env.PORT,
	permittedUsers: process.env.PERMITTED_USERS ? JSON.parse(process.env.PERMITTED_USERS) : [],
	jwtSecret: process.env.JWT_SECRET,
	googleClientId,
	cookieTTLInSeconds: 86400,
	environment: process.env.NODE_ENV === 'dev' ? 'dev' : 'production'
};
