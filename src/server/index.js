'use strict';

const express = require('express');
const mongodb = require('mongodb');
const nconf = require('nconf');

const router = express.Router();
const MongoClient = mongodb.MongoClient;

const dbUser = nconf.get('DB_USERNAME');
const dbPassword = nconf.get('DB_PASSWORD');
const dbURL = nconf.get('DB_URL').replace('<dbuser>', dbUser).replace('<dbpassword>', dbPassword);
const dbName = nconf.get('DB_NAME');

// for the time being...
let db;
MongoClient.connect(dbURL)
	.then(connection => connection.db(dbName))
	.then(database => {		
		console.log('Connected to DB');
		db = database;
	})
	.catch(err => {
		console.log(`Error: ${err}`);
	});

router.get('/', (req, res) => {
	if (!db) {
		res.status(500).send('Cannot connect to DB');
	}
	db.collection('test')
		.find()
		.toArray()
		.then(result => {
			let data = result[0].data;
			res.status(200).send(data);
		})
		.catch(err => {
			res.status(500).send(err);
		});
});

module.exports = router;