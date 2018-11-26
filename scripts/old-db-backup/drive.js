"use strict";

const fs = require("fs");
const { google } = require("googleapis");
const open = require("open");
const path = require("path");
const readline = require("./readline");

// If modifying these scopes, delete token.json.
const SCOPES = [
	"https://www.googleapis.com/auth/drive.metadata.readonly",
	"https://www.googleapis.com/auth/drive.file"
];

const CREDENTIALS_PATH = path.join(__dirname, "../../credentials/drive-credentials.json");
const TOKEN_PATH = path.join(__dirname, "../../credentials/drive-token.json");

let driveInstance;

async function getDriveInstance() {
	if (!driveInstance) {
		driveInstance = await createDriveInstance();
	}
	return driveInstance;
}

function createDriveInstance() {
	return new Promise((resolve, reject) => {
		fs.readFile(CREDENTIALS_PATH, async (err, content) => {
			if (err) {
				return reject(err);
			}
			const credentials = JSON.parse(content);
			const oAuth2Client = await getAuthorizedClient(credentials);

			const drive = google.drive({
				version: "v3",
				auth: oAuth2Client
			});

			resolve(drive);
		});
	});
}

function getAuthorizedClient(credentials) {
	return new Promise((resolve, reject) => {
		try {
			const { client_secret, client_id, redirect_uris } = credentials.installed;
			const oAuth2Client = new google.auth.OAuth2(
				client_id, client_secret, redirect_uris[0]
			);
		
			// Check if we have previously stored a token.
			fs.readFile(TOKEN_PATH, async (err, token) => {
				if (err) {
					await getAccessToken(oAuth2Client);
				} else {
					oAuth2Client.setCredentials(JSON.parse(token));
				}
				resolve(oAuth2Client);
			});
		} catch (error) {
			reject(error);
		}
	});
}

function getAccessToken(oAuth2Client) {
	return new Promise(async (resolve, reject) => {
		const authUrl = oAuth2Client.generateAuthUrl({
			access_type: "offline",
			scope: SCOPES,
		});
		open(authUrl);
		const authorizationCode = await readline.question("Enter the code from the authorization page here: ");
		oAuth2Client.getToken(authorizationCode, (err, token) => {
			if (err) {
				return reject(err);
			}
			oAuth2Client.setCredentials(token);
			// Store the token to disk for later program executions
			fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
				if (err) {
					return reject(err);
				}
				console.log("Token stored to", TOKEN_PATH);
			});
			resolve(oAuth2Client);
		});
	});
}

module.exports = {
	connect: getDriveInstance
};
