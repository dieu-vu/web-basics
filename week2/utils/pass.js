'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { getUserLogin } = require('../models/userModel');
const bcrypt = require('bcryptjs');

// local strategy for username password login
passport.use(new Strategy(
    async (username, password, done) => {
      const params = [username];
      try {
        const [user] = await getUserLogin(params);
        console.log('Local strategy', user); // result is binary row
        if (!user) {
          return done(null, false, {message: 'Incorrect email.'});
        }
        //if (!await bcrypt.compare(user.password, password)) {
        if (user.password !== password) {
          return done(null, false, {message: 'Incorrect password.'});
        }
		delete(user.password);
        return done(null, {...user}, {message: 'Logged In Successfully'}); // use spread syntax to create shallow copy to get rid of binary row type
      } catch (err) {
        return done(err);
      }
    }));

// TODO: JWT strategy for handling bearer token
passport.use(new JWTStrategy(
	{
		jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		secretOrKey: 'foobar'
	},
	(jwtPayload, done) => {
		//console.log('jwtpayload', jwtPayload)
		return done(null, jwtPayload);
	}
)
);

// consider .env for secret, e.g. secretOrKey: process.env.JWT_SECRET


module.exports = passport;
