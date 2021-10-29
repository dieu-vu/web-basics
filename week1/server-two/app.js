'use strict';
const pug = require('pug');
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug')


app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
app.get('/catinfo', (req, res) => {
  const cat = {
    name: 'Frank',
    birthdate: '2010-12-25',
    weight: 5,
  };
  res.json(cat);
});
