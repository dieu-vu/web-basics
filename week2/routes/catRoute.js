'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController.js');
const multer = require('multer');
const upload = multer({dest:'./uploads/'});

router.route('/')
	.get(catController.cat_list_get)
	.post(upload.single('cat'), catController.cat_post)
	.put(catController.cat_update_put);
router.route('/:id')
	.get(catController.cat_get)
	.delete(catController.cat_delete);

module.exports = router;
