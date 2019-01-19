'use strict';

require('dotenv').config();

module.exports = {
	dbConnectionString: process.env.DATABASE_URL,
	port: process.env.PORT
};
