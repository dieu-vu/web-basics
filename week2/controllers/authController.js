'use strict';

const jwt = require('jsonwebtoken');
const passport = require('passport');
const {httpError} = require('../utils/errors');

const login = (req, res, next) => {
  // TODO: add passport authenticate
	passport.authenticate('local', {session: false}, 
		(err, user, info) => {
			if( err || !user){
				next(httpError('username/password incorrect',400));		
				return;
			}	
			
			req.login(user, {session: false}, (err) => {
				next(httpError('login error',400));
				return;
			});
			
			const token = jwt.sign(user,'foobar');
			return res.json({user, token});
		}
	)(req, res, next);
};

module.exports = {
  login,
};
