'use strict';

const config = require('./src/config');

module.exports = {
	client: 'pg',
	connection: config.dbConnectionString,
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations'
	}
};
