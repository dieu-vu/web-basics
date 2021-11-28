'use strict';
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bcrypt = require('bcryptjs');

const {httpError} = require('./utils/errors');
const passport = require('./utils/pass');
const authRoute = require('./routes/authRoute.js');

const app = express();
const port = 3000;
const cats = require('./routes/catRoute.js');
const users = require('./routes/userRoute.js');

//Load node modules by environment variables:
var environment = process.env.NODE_ENV || 'development';
if (environment == 'production') {
	require('./utils/production')(app, process.env.PORT || 3000);
} else {
	require('./utils/localhost')(app, process.env.HTTPS_PORT || 8000, process.env.HTTP_PORT || 3000);
}

app.use(cors());
app.use(passport.initialize());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.use(express.static('uploads'));
app.use('/thumbnails', express.static('thumbnails'));


app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', {session: false}), cats);
app.use('/user', passport.authenticate('jwt', {session: false}), users);

app.get('/', async (req,res) => {
	if (req.secure) {
		res.send(await bcrypt.hash('1234',10));
	} else {
		res.send('not secured?');
	}
});

//Handle error 
app.use((req, res, next) => {
	const err = httpError('Not found', 404); 
	next(err);//continue to the next block
});

app.use((err, req, res, next) => {
	const status = err.status || 500;
	res.status(status).json({error: err.message ||"internal error"});
});
