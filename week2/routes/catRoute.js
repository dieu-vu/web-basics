'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController.js');

const app = express();
const multer  = require('multer');
const upload = multer({ dest: './uploads/' });

router.get('/', catController.cat_list_get);

router.post('/', upload.single('cat'), catController.cat_post);

router.put('/', (req, res) => {
	res.send('With this endpoint you can edit cats.'); 
});
router.delete('/', (req, res) => {
	res.send('With this endpoint you can delete cats.');
});

router.get('/:id', catController.cat_get);

module.exports = router;
