'use strict';
const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;
const {httpError} = require('./utils/errors');

app.options('*', cors())
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

var cats = require('./routes/catRoute.js');
var users = require('./routes/userRoute.js');

app.use('/cat', cats);
app.use('/user',users);

//Handle error 
app.use((req, res, next) => {
	const err = httpError('Not found', 404); 
	next(err);//continue to the next block
});

app.use((err, req, res, next) => {
	const status = err.status || 500;
	res.status(status).json({error: err.message ||"internal error"});
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
