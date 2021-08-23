const express = require('express');
const app = express();

// Set Environment & Variables
const nodeEnv = process.env.NODE_ENV || 'development';
if (nodeEnv === 'development') require('dotenv').config();

app.get('/', (req, res) => {
	res.send('Yes it works.');
});

const port = process.env.PORT;
app.listen(port, () => {
	console.log(`App is running on port ${port} in ${nodeEnv} mode.`);
});