'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController.js');

router.get('/', catController.cat_list_get);

router.get('/cat', (req,res) => {
	res.send('From this endpoint you can get cats.');
});

router.post('/cat', (req, res) => {
	res.send(' With this endpoint you can add cats.');
});
router.put('/cat', (req, res) => {
	res.send('With this endpoint you can edit cats.'); 
});
router.delete('/cat', (req, res) => {
	res.send('With this endpoint you can delete cats.');
});

router.get('/cat/:id', (req,res) => {
	console.log('/cat route', req.params);
	res.send(`From this endpoint you can get a specific cat from catID :${req.params.id}`);
});
module.exports = router;
