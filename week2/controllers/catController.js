'use strict';
// catController
const catModel = require('../models/catModel.js');


const cat_list_get = async (req, res) => {
	const cats = await catModel.getAllCats();
	res.json(cats);
};

const cat_get = async (req, res) => {
	const cat = await catModel.getCat(req.params.id);
	res.json(cat);
};

const cat_post = async (req, res) => {
	console.log('add cat data');
	const cat = req.body;
	cat.filename = req.file.filename;
	const id = await catModel.insertCat(cat);
	console.log(req.file, req.body);
	res.send(id)
};

const cat_delete = async (req, res) => {
	const cat = req.params.id
	const id = await catModel.deleteCat(catId);
	res.send(`removed catId ${id}`);
};
	
module.exports = {
	cat_list_get,
	cat_get,
	cat_post
};
