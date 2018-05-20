var express = require('express');
var router = express.Router();
var bookController = require('../modules/book/bookController');

router.get('/', bookController.getList);

router.get('/add', bookController.add);

router.post('/add', bookController.add);

router.get('/edit/:id', bookController.getDetail);

router.post('/edit/:id', bookController.update);

router.get('/delete/:id', bookController.delete);

module.exports = router;
