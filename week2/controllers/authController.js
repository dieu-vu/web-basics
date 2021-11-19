'use strict';

const jwt = require('jsonwebtoken');
const passport = require('passport');

const login = (req, res, next) => {
  // TODO: add passport authenticate
	passport.authenticate('local', {session: false}, 
		(err, user, info) => {
			if( err || !user){
				next(err);		
				return;
			}	
			
			req.login(user, {session: false}, (err) => {
				next(err);
				return;
			});
			
			const token = jwt.sign(user,'foobar');
			return res.json({user, token});
		}
	)(req, res);
};

module.exports = {
  login,
};
