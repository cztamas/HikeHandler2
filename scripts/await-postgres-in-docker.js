'use strict';

const { Docker, Options } = require('docker-cli-js');
const delay = require('@emartech/delay-js');

const dockerOptions = new Options();
const docker = new Docker(dockerOptions);

const getContainerId = async name => {
	const { containerList } = await docker.command('ps');
	const container = containerList.find(container => container.names === name);
	const containerId = container['container id'];
	return containerId;
};

const isPostgresReady = async name => {
	try {
		const containerId = await getContainerId(name);
		const result = await docker.command(`exec ${containerId} pg_isready`);
		const isReady = result.raw.split('-')[1].trim() === 'accepting connections';
		return isReady;
	} catch (error) {
		return false;
	}
};

const waitUntilReady = async (name, timeout = 10000) => {
	let timeoutHandle = setTimeout(() => {
		throw new Error('timeout reached');
	}, timeout);
	let isReady = false;
	while (!isReady) {
		isReady = await isPostgresReady(name);
		await delay.wait(100);
	}
	clearTimeout(timeoutHandle);
};

waitUntilReady(process.argv[2]);
