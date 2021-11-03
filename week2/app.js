'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

const cats = require('./routes/catRoute.js');
const users = require('./routes/userRoute.js');

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.use('/cat', cats);
app.use('/user', users);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
