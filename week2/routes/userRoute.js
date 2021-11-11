
'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const { body, validationResult } = require('express-validator');

router.route('/')
	.get(userController.user_list_get)
	.post(body('name').isLength({min: 3}).trim().escape(),
		body('email').isEmail().normalizeEmail(),
		body('passwd').matches('(?=.*[A-Z]).{8,}'),
		userController.user_post);

router.route('/:id')
	.get(userController.user_get);

module.exports = router;
