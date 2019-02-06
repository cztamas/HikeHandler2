'use strict';

const axios = require('axios');
const delay = require('@emartech/delay-js');
const { dbConnectionString } = require('../src/config');
const timeLimit = 10000;

const dbUrl = `http://${dbConnectionString.split('@')[1]}`;

const checkIfDbIsAlive = () => new Promise((resolve, reject) => {
	axios.get(dbUrl)
		.then(() => {
			reject('this is very strange...');
		})
		.catch(error => {
			const isAlive = error.code === 'ECONNRESET';
			resolve(isAlive);
		});
});

const timeoutHandle = setTimeout(() => {
	throw new Error('DB start timeout');
}, timeLimit);

console.log(`Checking DB at ${dbUrl}`);

(async () => {
	let isDbAlive = false;
	while (!isDbAlive) {
		isDbAlive = await checkIfDbIsAlive();
		await delay.wait(100);
	}
	clearTimeout(timeoutHandle);
	console.log('DB is running');
})();
