const router = require('express').Router();
const { publicPosts, privatePosts } = require('../db');
const checkAuth = require('../middleware/checkAuth');

const cookieOptions = {
	maxAge: 1000 * 30, // cookie will expire after 30 seconds
	secure: true, // cookies will only be sent over HTTPS
	httpOnly: true // cookie cannot be accessed from JS in the browser console
};

router.get('/public', (req, res) => {
	res.cookie('cookieSet', true, cookieOptions);
	res.status(200).json(publicPosts);
});

router.get('/private', checkAuth, (req, res) => {
	res.status(200).json(privatePosts);
});


module.exports = router;