const router = require('express').Router();
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const { users } = require('../db');

router.get('/', (req, res) => {
	res.send('Yes auth works.');
});

router.post('/signup', [
	check('email', 'Please provide a valid email address.').isEmail(),
	check('password', 'Password must be 6 or more characters.').isLength({ min: 6 })
], async (req, res) => { // hashing the password is an async function
	const { password, email } = req.body;

	// VALIDATE INPUT
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array()
		})
	}

	// VALIDATE USER IS UNIQUE
	let existingUser = users.find((user) => {
		return user.email === email;
	});

	if (existingUser) {
		return res.status(400).json({
			'errors': [
				{ 'msg': 'Username must be unique.' }
			]
		})
	}

	// HASH THE NEW USER PASSWORD

	const hashedPass = await bcrypt.hash(password, 11);

	users.push({
		email: email,
		password: hashedPass
	});

	let payload = { isAuthorized: true, email };
	let key = process.env.JWT_SECRET;
	let tokenOptions = { expiresIn: '6h' };

	const token = await JWT.sign(payload, key, tokenOptions);

	// ALL CHECKS PASSED - SEND RESULT
	console.log({ token });
	res.json({ token });
});

module.exports = router;