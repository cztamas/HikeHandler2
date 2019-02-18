'use strict';

const { dbConnectionString } = require('../../config');
const knex = require('knex')({
	client: 'pg',
	connection: dbConnectionString,
});

async function createUser(email) {
	await knex('users').insert({
		email
	});
	return (await getUserByEmail(email))[0];
}

async function getUserByEmail(email) {
	return knex('users').where({
		email
	}).select('id', 'email');
}

module.exports = {
	getUserByEmail,
	createUser
};
