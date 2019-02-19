'use strict';

const { createUser, getUserByEmail } = require('../dao/user-dao');
const config = require('../../config');
const jwt = require('../lib/jwt');
const verifyToken = require('../lib/verify-token');

module.exports = async (req, res) => {
	const token = req.body.token;
	const { isValid, email, name } = await verifyToken(token);
	if (!isValid) {
		return res.status(403).send('Invalid token');
	}
	const result = await getUserByEmail(email);

	if (result.length > 1) {
		return res.status(500).send();
	}
	let user;
	if (result.length === 0) {
		if (!config.permittedUsers.includes(email)) {
			return res.status(401).send({ error: 'You are not allowed to use this application.' });
		}
		user = await createUser({ email, name });
	} else {
		user = result[0];
	}

	const jwtToken = jwt.encode({
		email: user.email,
		name: user.name,
		id: user.id,
		iat: Date.now(),
		ttl: config.cookieTTLInSeconds * 1000
	});

	res.cookie(config.cookieName, jwtToken, { maxAge: config.cookieTTLInSeconds * 1000 });
	res.sendStatus(200);
};
