'use strict';
const cors = require('cors');
const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 3000;

const sslkey = fs.readFileSync('../ssl-key.pem');
const sslcert = fs.readFileSync('../ssl-cert.pem');
const options = {
  key: sslkey,
  cert: sslcert
};
https.createServer(options, app).listen(8000);

//Force redirection from http to https:
http.createServer((req, res) => {
  res.writeHead(301, { 'Location': 'https://localhost:8000' + req.url });
  res.end();
}).listen(3000);

const {httpError} = require('./utils/errors');
const passport = require('./utils/pass');
const authRoute = require('./routes/authRoute.js');

app.use(cors());
app.use(passport.initialize());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.use(express.static('uploads'));
app.use('/thumbnails', express.static('thumbnails'));

var cats = require('./routes/catRoute.js');
var users = require('./routes/userRoute.js');

app.get('/', (req,res) => {
	res.send('Hello secure world!')
});
app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', {session: false}), cats);
app.use('/user', passport.authenticate('jwt', {session: false}), users);

//Handle error 
app.use((req, res, next) => {
	const err = httpError('Not found', 404); 
	next(err);//continue to the next block
});

app.use((err, req, res, next) => {
	const status = err.status || 500;
	res.status(status).json({error: err.message ||"internal error"});
});
