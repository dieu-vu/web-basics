
'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const { body, validationResult } = require('express-validator');

router.get('/token', userController.checkToken);

router.route('/')
	.get(userController.user_list_get)

router.route('/:id')
	.get(userController.user_get);


module.exports = router;
