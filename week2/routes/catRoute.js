'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const multer = require('multer');
const catController = require('../controllers/catController.js');
const { body, validationResult } = require('express-validator');

const fileFilter = (req, file, cb) => {
	if(file.mimetype.includes('image')){
		cb(null, true);
	};
	cb(null, false);
};
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})
const upload = multer({storage: storage, fileFilter});

router.route('/')
	.get(catController.cat_list_get)
	.post(upload.single('cat'),
		body('name').not().isEmpty(),
		body('birthdate').isDate().not().isEmpty(),
		body('weight').isNumeric().not().isEmpty(),
		//body('owner').not().isEmpty(),
		catController.cat_post)
router.route('/:id')
	.get(catController.cat_get)
	.delete(catController.cat_delete)
	.put(
		body('name').not().isEmpty(),
		body('birthdate').isDate().not().isEmpty(),
		body('weight').isNumeric().not().isEmpty(),
		catController.cat_update_put);

module.exports = router;
