'use strict';
// catController
const catModel = require('../models/catModel.js');
const {httpError} = require('../utils/errors');
const { body, validationResult } = require('express-validator');
const {makeThumbnail} = require('../utils/resize');
const {getCoordinates} = require('../utils/imageMeta');

const cat_list_get = async (req, res, next) => {
	//console.log("req.user", req.user);
	const cats = await catModel.getAllCats(req.user);
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
	console.log("cat owner:", cat.owner);
	res.json(cat);
};

const cat_post = async (req, res, next) => {
	
	const errors = validationResult(req);
	if (!errors.isEmpty()){
		console.error('invalid_cat_input', errors.array());
		const err = httpError('data not valid', 400);
		next(err);
		return;
	};
	//console.log('add cat data');
	if(!req.file){
		const err = httpError('Invalid file', 400);
		next(err);
		return;
	}
	
	try{
		const coords = await getCoordinates(req.file.path);
		req.body.coords = JSON.stringify(coords);
	} catch (e) {
		req.body.coords = '[25.01, 60.29]'
	}

	try {
		const thumb = makeThumbnail(req.file.path, req.file.filename);

		const cat = req.body;
		cat.filename = req.file.filename;
		cat.owner = req.user.user_id;
		console.log('cat_post owner', cat);
		console.log('cat_post owner', req.user.user_id);

		const id = await catModel.insertCat(cat);
		//console.log(req.file, req.body);
		if(thumb){
			res.json({message: `cat created with id: ${id}`, cat_id: id});
		}
	} catch (e) {
		console.log('cat_post error', e.message);
		const err = httpError('Error uploading cat', 404);
		next(err);
		return;
	}

};

const cat_delete = async (req, res) => {
	const cat_id = req.params.id;
	console.log('CAT_DELETE', cat_id); 
	console.log('CAT_DELETE',req.user);
	const id = await catModel.deleteCat(cat_id, req.user.user_id);
	res.send(`removed catId ${id}`);
};

const cat_update_put = async (req, res) => {
	const cat = req.body;
	console.log('CAT_PUT', cat);
	cat.id = req.params.id;
	cat.owner = req.user.user_id;
	const updated = await catModel.modifyCat(cat);
	console.log("USER_PUT", req.user.user_id);
	console.log(req.body, req.file);
	console.log("cat owner in put method", cat.owner)
	res.send(updated);
};
	
module.exports = {
	cat_list_get,
	cat_get,
	cat_post,
	cat_delete,
	cat_update_put,
};
