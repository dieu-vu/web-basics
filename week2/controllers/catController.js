'use strict';
// catController
const catModel = require('../models/catModel');

const cats = catModel.cats;

const cat_list_get = (req, res) => {
	res.json(cats);
};

const cat_get = (req, res) => {
	res.json(catModel.getCat(req.params.id));
};

const cat_post = (req, res) => {
	console.log('add cat data');
	res.send('From this end point you can add cats.');
};
module.exports = {
	cat_list_get,
	cat_get,
	cat_post,
};
