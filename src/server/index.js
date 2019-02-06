'use strict';

const verifyToken = require('./verifyToken');

const express = require('express');
const PostgresClient = require('pg').Client;
const config = require('../config');

const router = express.Router();

const postgresClient = new PostgresClient({
	connectionString: config.dbConnectionString,
});
postgresClient.connect();

router.use(express.json());

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

router.post('/login', async (req, res) => {
	console.log(req.body);
	const token = req.body.token;
	const tokenIsValid = await verifyToken(token);
	if (tokenIsValid) {
		return res.status(200).send('OK');
	}
	return res.status(403).send('Invalid token');
});

module.exports = router;