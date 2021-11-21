'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const multer = require('multer');
const catController = require('../controllers/catController.js');
const { body, validationResult } = require('express-validator');
var cors = require('cors');

const fileFilter = (req, file, cb) => {
	if(file.mimetype.includes('image')){
		cb(null, true);
	};
	cb(null, false);
};
const upload = multer({dest:'./uploads/', fileFilter});

router.route('/')
	.get(catController.cat_list_get)
	.post(upload.single('cat'),
		body('name').not().isEmpty(),
		body('birthdate').isDate().not().isEmpty(),
		body('weight').isNumeric().not().isEmpty(),
		body('owner').not().isEmpty(),
		catController.cat_post)
	.put(
		body('name').not().isEmpty(),
		body('birthdate').isDate().not().isEmpty(),
		body('weight').isNumeric().not().isEmpty(),
		body('owner').not().isEmpty(),
		catController.cat_update_put);
router.route('/:id')
	.get(cors(),catController.cat_get)
	.delete(cors(),catController.cat_delete);

module.exports = router;
