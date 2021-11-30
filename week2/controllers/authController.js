'use strict';

const jwt = require('jsonwebtoken');
const passport = require('passport');
const {httpError} = require('../utils/errors');
const bcrypt = require('bcryptjs');
const {insertUser} = require('../models/userModel');
const { body, validationResult } = require('express-validator');

const login = (req, res, next) => {
  // TODO: add passport authenticate
	passport.authenticate('local', {session: false}, 
		(err, user, info) => {
			if( err || !user){
				next(httpError('username/password incorrect',400));		
				return;
			}	
			
			req.login(user, {session: false}, (err) => {
				if (err){
					next(httpError('login error',400));
					return;
				}
				const token = jwt.sign(user,'foobar');
				return res.json({user, token});
			});
		})(req, res, next);
};

const user_create_post = async (req, res, next) => {
	const errors = validationResult(req);
	
	if (!errors.isEmpty()) {
		console.log('user create error', errors);
		const err = httpError('data not valid',400);
		next(err);
		return;
	}
	try {
		req.body.password = bcrypt.hashSync(req.body.password, 12);
		const user = req.body;
		console.log("REGISTER", req.body);
		const id = await insertUser(user);
		res.json({message: `user created with id: ${id}`, user_id: id});
	} catch (e) {
		console.log('user post error', e.message);
		const err = httpError('Error registering user', 400);
		next(err);
		return;
	}
};

const logout = (req, res) => {
	req.logout();
	res.json({message: 'logout'});
};

module.exports = {
	login,
	user_create_post,
	logout,
};
