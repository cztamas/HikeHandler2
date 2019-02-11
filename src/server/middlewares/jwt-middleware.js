'use strict';

const jwt = require('../lib/jwt');

module.exports = (req, res, next) => {
	const jwtToken = req.cookies.jwt;
	if (!jwtToken) {
		return res.status(401).send({ error: 'No JWT found' });
	}
	let tokenData;
	try {
		tokenData = jwt.decode(jwtToken);
	} catch (error) {
		res.cookie('jwt', '');
		return res.status(401).send({ error: 'Invalid JWT token' });
	}
	if (Date.now() - tokenData.iat > tokenData.ttl) {
		res.cookie('jwt', '');
		return res.status(401).send({ error: 'JWT expired' });
	}

	next();
};
