'use strict';

const express = require('express');
const PostgresClient = require('pg').Client;
const config = require('../config');

const router = express.Router();

const postgresClient = new PostgresClient({
	connectionString: config.dbConnectionString,
});
postgresClient.connect();

router.get('/', (req, res) => {
	try {
		postgresClient.query('SELECT * FROM users', (err, result) => {
			if (err) {
				console.log('Error', err);
				res.status(500).send('An error happened.');
				return;
			}
			res.status(200).send(result.rows);
		});
	} catch (error) {
		res.status(500).send('An error happened.');
	}
});

module.exports = router;