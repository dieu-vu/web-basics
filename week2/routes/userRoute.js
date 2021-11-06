
'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.route('/')
	.get(userController.user_list_get)
	.post(userController.user_post);

router.route('/:id')
	.get(userController.user_get);

module.exports = router;
