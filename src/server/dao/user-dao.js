'use strict';

const { dbConnectionString } = require('../../config');
const knex = require('knex')({
	client: 'pg',
	connection: dbConnectionString,
});

async function createUser({ email, name }) {
	await knex('users').insert({
		email,
		name
	});
	return (await getUserByEmail(email))[0];
}

async function getUserByEmail(email) {
	return knex('users').where({
		email
	}).select('id', 'email', 'name');
}

module.exports = {
	getUserByEmail,
	createUser
};
