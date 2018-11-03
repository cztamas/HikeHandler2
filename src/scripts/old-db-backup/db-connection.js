"use strict";

const mysql = require("mysql");
const path = require("path");

const configFilePath = path.join(__dirname, "../../../backup-config.json");
const config = require(configFilePath);

const connection = mysql.createConnection({
	host: config.db.hostname,
	user: config.db.username,
	password: config.db.password,
	database: config.db.database
});
 
function query(queryString) {
	return new Promise((resolve, reject) => {
		connection.query(queryString, (error, result) => {
			if (error) {
				return reject(error);
			}
			return resolve(result);
		});
	});
}

module.exports = {
	connect: connection.connect.bind(connection),
	end: connection.end.bind(connection),
	query
};
