'use strict';

const express = require('express');
const PostgresClient = require('pg').Client;

const config = require('../config');
console.log(config);

const router = express.Router();

const postgresClient = new PostgresClient({
	connectionString: config.dbUrl,
});
postgresClient.connect();

router.get('/', (req, res) => {
	try {
		postgresClient.query('SELECT * FROM test', (err, result) => {
			if (err) {
				res.status(500).send('An error happened.');
			}
			const data = result.rows[0].data;
			res.status(200).send(data);
		});
	} catch (error) {
		res.status(500).send('An error happened.');
	}
});

module.exports = router;