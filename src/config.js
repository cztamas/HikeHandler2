'use strict';

require('dotenv').config();

module.exports = {
	dbConnectionString: process.env.DATABASE_URL,
	port: process.env.PORT,
	googleClientId: process.env.GOOGLE_CLIENT_ID,
	permittedUsers: process.env.PERMITTED_USERS ? JSON.parse(process.env.PERMITTED_USERS) : [],
	jwtSecret: process.env.JWT_SECRET,
	cookieTTLInSeconds: 86400
};
