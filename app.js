const express = require('express');
const app = express();

// Set Environment & Variables
const nodeEnv = process.env.NODE_ENV || 'development';
if (nodeEnv === 'development') require('dotenv').config();

// Set Up Routes
const auth = require('./routes/auth');

app.get('/', (req, res) => res.send('It works'));
app.use('/auth', auth);

// Run the app
const port = process.env.PORT;
app.listen(port, () => {
	console.log(`App is running on port ${port} in ${nodeEnv} mode.`);
});