'use strict';

exports.seed = function(knex) {
	return knex('users').del()
		.then(function () {
			return knex('users').insert([
				{ email: 'test.email.1@dev.com', name: 'John Doe' }
			]);
		});
};
