
'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.get('/users', userController.user_list_get);

router.get('/users/:id', userController.user_get);

module.exports = router;
