const JWT = require('jsonwebtoken');
// const { users } = require('../db');

module.exports = async (req, res, next) => {
	const token = req.headers.authorization;

	// Check a token has been sent with the request
	if (!token) {
		return res.status(401).json({
			'errors': [
				{ 'msg': 'Access denied, not authorized.' }
			]
		})
	}

	try {
		// Verify token is valid
		let tokenPayload = await JWT.verify(token, process.env.JWT_SECRET);

		// Verify user exists
		// Including this check is not best practices and defeats the purpose of using JWTs since you're meant to avoid doing a database call. Instead, JWTs should be set with a short enough expiration date. HOWEVER, without this check (the way it's done in the tutorial), authorization will be granted as long as the token is valid, even if the user doesn't exist in the database anymore.

		// To follow best practices, do not include lines 25-34:

		// let user = users.find((user) => {
		// 	return user.email === tokenPayload.email;
		// });

		// if (!user) {
		// 	return res.status(400).json({
		// 		'errors': [
		// 			{ 'msg': 'Invalid credentials.' }
		// 		]
		// 	})
		// }

		req.user = tokenPayload;
		next();
	} catch (error) {
		return res.status(403).json({
			'errors': [
				{ 'msg': 'Access denied.' }
			]
		})
	}
};