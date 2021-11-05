'use strict';
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

var cats = require('./routes/catRoute.js');
var users = require('./routes/userRoute.js');

app.use('/cat', cats);
app.use('/user',users);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
