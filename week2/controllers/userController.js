
'use strict';
// userController
const userModel = require('../models/userModel.js');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const {httpError} = require('../utils/errors');

const user_list_get = async (req, res) => {
	const users = await userModel.getAllUsers();
	const newUsers = users.map((user)=> {
		delete user.password;
		return user;
	});
	res.json(newUsers);
};

const user_get = async (req, res) => {
	const user = await userModel.getUser(req.params.id);
	//delete user.password;
	res.json(user);
};

//const user_post = async (req, res, next) => {
//	const errors = validationResult(req);
//    if (!errors.isEmpty()) {
//		console.error('user_post_validation', errors.array());
//		const err = httpError('data not valid',400);
//		next(err);
//		return;
//    }
//	console.log('add user data');
//	try{
//		req.body.passwd = bcrypt.hashSync(req.body.passwd, 10);
//		const user = req.body;
//		const id = await userModel.insertUser(user);
//		res.json({message: `user created with id: ${id}`, user_id: id});
//	} catch (e) {
//		console.log('user post error', e.message);
//		const err = httpError('Error registering user', 400);
//		next(err);
//		return;
//	}
//};

const checkToken = (req, res, next) => {
 if (!req.user) {
   next(new Error('token not valid'));
 } else {
   res.json({ user: req.user });
 }
};


module.exports = {
	user_list_get,
	user_get,
//	user_post,
	checkToken,
};
