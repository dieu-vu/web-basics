'use strict';
const express = require('express');
const app = express();
const port = 3000;

var cats = require('./routes/catRoute.js');
var users = require('./routes/userRoute.js');

app.use(cats);
app.use(users);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
