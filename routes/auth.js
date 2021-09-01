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

	let payload = { isAuthorized: true, email }; // BP: don't store email in token
	let key = process.env.JWT_SECRET;
	let tokenOptions = { expiresIn: '1h' };

	const token = await JWT.sign(payload, key, tokenOptions);

	// ALL CHECKS PASSED - SEND RESULT
	res.json({ token });
});

router.post('/login', async (req, res) => {
	const { password, email } = req.body;

	let existingUser = users.find((user) => {
		// You could use express-validator here to prevent unnecessary db requests
		return user.email === email;
	});

	if (!existingUser) {
		return res.status(400).json({
			'errors': [
				{ 'msg': 'Invalid credentials.' }
			]
		})
	}

	let isMatch = await bcrypt.compare(password, existingUser.password) // returns boolean

	if (!isMatch) {
		return res.status(400).json({
			'errors': [
				{ 'msg': 'Invalid credentials.' }
			]
		})
	}

	let payload = { isAuthorized: true, email }; // BP: don't store email in token
	let key = process.env.JWT_SECRET;
	let tokenOptions = { expiresIn: '1h' };

	const token = await JWT.sign(payload, key, tokenOptions);

	// ALL CHECKS PASSED - SEND JWT
	res.json({ token });
});

module.exports = router;