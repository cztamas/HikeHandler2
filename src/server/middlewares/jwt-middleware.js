'use strict';

const jwt = require('../lib/jwt');
const { cookieName } = require('../../config');

module.exports = (req, res, next) => {
	const jwtToken = req.cookies[cookieName];
	if (!jwtToken) {
		return res.status(401).send({ error: 'No JWT found' });
	}
	let tokenData;
	try {
		tokenData = jwt.decode(jwtToken);
	} catch (error) {
		res.cookie(cookieName, '');
		return res.status(401).send({ error: 'Invalid JWT token' });
	}
	if (Date.now() - tokenData.iat > tokenData.ttl) {
		res.cookie(cookieName, '');
		return res.status(401).send({ error: 'JWT expired' });
	}

	next();
};
