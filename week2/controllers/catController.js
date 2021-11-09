'use strict';
// catController
const catModel = require('../models/catModel.js');
const {httpError} = require('../utils/errors');
const { body, validationResult } = require('express-validator');

const cat_list_get = async (req, res) => {
	const cats = await catModel.getAllCats();
	if (cats.length > 0) {
		res.json(cats);
		return
	}; 
	const err = httpError('cats not found', 404);
	next(err);

};

const cat_get = async (req, res, next) => {
	const cat = await catModel.getCat(req.params.id, next);
	if (!cat) { //undefined value = falsey, or cat === undefined
		const err = httpError('Cat not found', 404);
		next(err);
		return; //stop the function so that we won't send res twice and get errors
	};
	res.json(cat);
};

const cat_post = async (req, res) => {
	
	const errors = validationResult(req);
	if (!errors.isEmpty()){
		console.error('invalid_cat_input', errors.array());
		const err = httpError('data not valid', 400);
		next(err);
		return;
	};
	console.log('add cat data');
	if(!req.file){
		const err = httpError('Invalid file', 400);
		next(err);
		return;
	}
	const cat = req.body;
	cat.filename = req.file.filename;
	const id = await catModel.insertCat(cat);
	console.log(req.file, req.body);
	res.json({message: `cat created with id: ${id}`, cat_id: id});
};

const cat_delete = async (req, res) => {
	const cat = req.body;
	const id = await catModel.deleteCat(cat.id);
	res.send(`removed catId ${id}`);
};

const cat_update_put = async (req, res) => {
	const cat = req.body;
	const updated = await catModel.modifyCat(cat);
	console.log(req.body, req.file);
	res.send(updated);
};
	
module.exports = {
	cat_list_get,
	cat_get,
	cat_post,
	cat_delete,
	cat_update_put,
};
