"use strict";

const dbConnection = require("./db-connection.js");
const googleDrive = require("./drive");
const folderName = "HikeHandler";

async function createBackup() {
	console.log("Exporting data...");
	const data = await exportData();
	
	console.log({
		countries: data.countries.length,
		regions: data.regions.length,
		cps: data.cps.length,
		hikes: data.hikes.length
	});

	console.log("Locating parent folder...");
	const folderId = await getFolderId(folderName);
	const timeStamp = (new Date()).toUTCString();
	const fileName = `hikehandler-backup-${timeStamp}.json`;

	console.log("Uploading file...");
	await uploadData({
		fileName,
		data,
		folderId
	});
	console.log("done");
}

async function exportData() {
	dbConnection.connect();
	const data = await Promise.all([getHikes(), getRegions(), getCountries(), getCheckPoints()]).then(
		([hikes, regions, countries, cps]) => ({
			hikes,
			regions,
			countries,
			cps
		})
	);
	dbConnection.end();

	return data;
}

async function getFolderId(folderName) {
	const drive = await googleDrive.connect();

	const response = await drive.files.list({
		pageSize: 10,
		q: `mimeType = 'application/vnd.google-apps.folder' and name = '${folderName}'`
	});

	const files = response.data.files;
	if (!files.length) {
		return null;
	}
	return files[0].id;
}

async function uploadData({ fileName, data, folderId = null } = {}) {
	const drive = await googleDrive.connect();
	const fileMetadata = {
		name: fileName,
		parents: folderId ? [folderId] : [],
	};
	var media = {
		mimeType: "application/json",
		body: JSON.stringify(data)
	};
	drive.files.create({
		resource: fileMetadata,
		media: media,
		fields: "id"
	}, function (err) {
		if (err) {
			console.error(err);
		}
	});
}

createBackup();

async function getHikes() {
	const hikes = await dbConnection.query("SELECT * FROM hike");
	return hikes.map(parseHike);
}

async function getRegions() {
	const hikes = await dbConnection.query("SELECT * FROM region");
	return hikes.map(parseRegion);
}

async function getCountries() {
	const hikes = await dbConnection.query("SELECT * FROM country");
	return hikes.map(parseCountry);
}

async function getCheckPoints() {
	const hikes = await dbConnection.query("SELECT * FROM cp");
	return hikes.map(parseCp);
}

const parseCpString = cpString => cpString.split(".").filter(Boolean).map(x => parseInt(x, 10));
const formatDate = date => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

function parseHike(queryResult) {
	return {
		hikeID: queryResult.idhike,
		position: queryResult.position,
		date: formatDate(queryResult.date),
		regionID: queryResult.idregion,
		countryID: queryResult.idcountry,
		type: queryResult.type,
		description: queryResult.description,
		checkPointList: parseCpString(queryResult.cpstring)
	};
}

function parseCountry(queryResult) {
	return {
		countryID: queryResult.idcountry,
		name: queryResult.name,
		hikeCount: queryResult.hikecount,
		cpCount: queryResult.cpcount,
		regionCount: queryResult.regioncount,
		description: queryResult.description
	};
}

function parseRegion(queryResult) {
	return {
		regionID: queryResult.idregion,
		countryID: queryResult.idcountry,
		name: queryResult.name,
		hikeCount: queryResult.hikecount,
		cpCount: queryResult.cpcount,
		description: queryResult.description
	};
}

function parseCp(queryResult) {
	return {
		cpID: queryResult.idCP,
		regionID: queryResult.idregion,
		countryID: queryResult.idcountry,
		name: queryResult.name,
		hikeCount: queryResult.hikecount,
		description: queryResult.description,
		type: queryResult.type
	};
}
