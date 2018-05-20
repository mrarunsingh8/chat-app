let express = require('express');
let router = express.Router();

let authorApiController = require("../modules/api/authorApiController");
let userApiController = require("../modules/api/userApiController");
let bookApiController = require("../modules/api/bookApiController");

router.get('/', function(req, res, next) {
	res.send("Api goes Here.");
});

router.get('/user', userApiController.getList);
router.get('/user/:id', userApiController.getDetail);
router.post('/user', userApiController.insert);
router.put('/user', userApiController.insert);
router.put('/user/:id', userApiController.update);
router.patch('/user/:id', userApiController.update);
router.delete('/user/:id', userApiController.delete);


router.get('/book', bookApiController.getList);
router.get('/book/:id', bookApiController.getDetail);
router.post('/book', bookApiController.insert);
router.put('/book', bookApiController.insert);
router.put('/book/:id', bookApiController.update);
router.patch('/book/:id', bookApiController.update);
router.delete('/book/:id', bookApiController.delete);


router.get('/author', authorApiController.getList);
router.get('/author/:id', authorApiController.getDetail);
router.post('/author', authorApiController.insert);
router.put('/author', authorApiController.insert);
router.put('/author/:id', authorApiController.update);
router.patch('/author/:id', authorApiController.update);
router.delete('/author/:id', authorApiController.delete);

module.exports = router;