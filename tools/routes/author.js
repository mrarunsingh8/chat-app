var express = require('express');
var router = express.Router();

var authorController = require('../modules/author/authorController');


router.get('/', authorController.getList);
router.get('/delete/:id', authorController.delete);
router.get('/add', authorController.add);

router.post('/add', authorController.add);

router.get('/edit/:id', authorController.getDetail);
router.post('/edit/:id', authorController.update);

module.exports = router;
