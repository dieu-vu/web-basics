'use strict';
const express = require('express');
const app = express();
const port = 3000;

var cats = require('./routes/catRoute.js');

app.use(cats);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
