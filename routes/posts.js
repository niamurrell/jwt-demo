const router = require('express').Router();
const { publicPosts, privatePosts } = require('../db');

router.get('/public', (req, res) => {
	res.status(200).json(publicPosts);
});

router.get('/private', (req, res) => {
	res.status(200).json(privatePosts);
});


module.exports = router;