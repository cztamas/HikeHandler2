'use strict';

const { dbConnectionString } = require('../../config');
const knex = require('knex')({
	client: 'pg',
	connection: dbConnectionString,
});

module.exports = {
	async createUser(email) {
		await knex('users').insert({
			email
		});
		return this.getUserByEmail(email);
	},
	async getUserByEmail(email) {
		return knex('users').where({
			email
		}).select('id', 'email');
	}
};
