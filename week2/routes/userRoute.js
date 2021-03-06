
'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.get('/', userController.user_list_get);
router.post('/', userController.user_post);

router.get('/:id', userController.user_get);


module.exports = router;
