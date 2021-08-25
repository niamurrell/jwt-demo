const router = require('express').Router();

router.get('/', (req, res) => {
	res.send('Yes auth works.');
});



module.exports = router;