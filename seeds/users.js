'use strict';

exports.seed = function(knex) {
	return knex('users').del()
		.then(function () {
			return knex('users').insert([
				{ email: 'test.email.1@whatever.com'},
				{ email: 'test.email.2@whatever.com'}
			]);
		});
};
