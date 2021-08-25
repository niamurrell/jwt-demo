const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const { users } = require('../db');

router.get('/', (req, res) => {
	res.send('Yes auth works.');
});

router.post('/signup', [
	check('email', 'Please provide a valid email address.').isEmail(),
	check('password', 'Password must be 6 or more characters.').isLength({ min: 6 })
], (req, res) => {
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

	// ALL CHECKS PASSED - SEND RESULT
	res.send(`Signup working and validated with ${password} and ${email}`);
});

module.exports = router;