'use strict';

exports.up = function(knex) {
	return knex.schema.createTable('users', function(table) {
		table.increments('id').primary();
		table.string('email');
		table.timestamp('created_at', true).defaultTo(knex.fn.now());
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable('users');
};