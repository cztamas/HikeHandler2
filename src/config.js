'use strict';

require('dotenv').config();

module.exports = {
	dbUrl: process.env.DATABASE_URL,
	port: process.env.PORT
};
