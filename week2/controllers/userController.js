
'use strict';
// userController
const userModel = require('../models/userModel.js');
const { body, validationResult } = require('express-validator');

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

const user_post = async (req, res, next) => {
	const errors = validationResult(req);
    if (!errors.isEmpty()) {
		console.error('user_post_validation', errors.array());
		const err = httpError('data not valid',400);
		next(err);
		return;
    }
	console.log('add user data');
	const user = req.body;
	const userAdded = await userModel.insertUser(user);
	res.send(userAdded);
};

module.exports = {
	user_list_get,
	user_get,
	user_post,
};
