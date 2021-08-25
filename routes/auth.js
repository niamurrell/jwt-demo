const router = require('express').Router();
const { check, validationResult } = require('express-validator');

router.get('/', (req, res) => {
	res.send('Yes auth works.');
});

router.post('/signup', [
	check('email', 'Please provide a valid email address.').isEmail(),
	check('password', 'Password must be 6 or more characters.').isLength({ min: 6 })
], (req, res) => {
	const { password, email } = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array()
		})
	}

	res.send(`Signup working and validated with ${password} and ${email}`);
});

module.exports = router;