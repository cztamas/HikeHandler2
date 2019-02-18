'use strict';

exports.seed = function(knex) {
	return knex('users').del()
		.then(function () {
			return knex('users').insert([
				{ email: 'test.email.1@production.com'},
				{ email: 'test.email.2@production.com'},
				{ email: 'test.email.3@production.com'}
			]);
		});
};
