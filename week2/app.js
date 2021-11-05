'use strict';
const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

var cats = require('./routes/catRoute.js');
var users = require('./routes/userRoute.js');

app.use('/cat', cats);
app.use('/user',users);

app.use((err, req, res, next) => {
	const status = err.status || 500;
	res.status(status).send(err.message ||"internal error");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
