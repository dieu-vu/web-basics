
'use strict';
// userController
const userModel = require('../models/userModel.js');

const users = userModel.users;

const user_list_get = (req, res) => {
	const newUsers = users.map((user)=> {
		delete user.password;
		return user;
	});
	res.json(newUsers);
};

const user_get = (req, res) => {
	const user = getUser(req.params.id);
	delete user.password;
	res.json(user);
};

module.exports = {
	user_list_get,
	user_get,
};
