'use strict';
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.use(express.static('public'));
const pug = require('pug');

app.get('/', function (req, res) {
  res.render('index',{title: 'Title', pageheading: 'Click on the cat'});
});

app.get('/page2', (req,res) => {
	res.render('page2', {title:'Title', pageheading: 'Hello from page 2'});
});

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
