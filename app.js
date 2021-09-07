const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

// Configure Resources
app.use(express.json());
app.use(cookieParser());

// Set Environment & Variables
const nodeEnv = process.env.NODE_ENV || 'development';
if (nodeEnv === 'development') require('dotenv').config();

// Set Up Routes
const auth = require('./routes/auth');
const posts = require('./routes/posts');

app.get('/', (req, res) => res.send('It works'));
app.use('/auth', auth);
app.use('/posts', posts);

// Run the app
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`App is running on port ${port} in ${nodeEnv} mode.`);
});