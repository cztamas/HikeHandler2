"use strict";

const readline = require("readline");

const askQuestion = question => new Promise((resolve, reject) => {
	try {
		const readLineInterface = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		readLineInterface.question(question, reply => {
			readLineInterface.close();
			resolve(reply);
		});
	} catch(error) {
		reject(error);
	}
});

module.exports = {
	question: askQuestion
};
