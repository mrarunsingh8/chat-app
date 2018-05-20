var express = require('express');
var router = express.Router();

var userController = require('../modules/user/userController');

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.render('modules/user/index', { title: 'Express' });
});*/

router.get('/', userController.getList);
router.get('/delete/:id', userController.delete);
router.get('/add', userController.add);

router.post('/add', userController.add);

router.get('/edit/:id', userController.getDetail);
router.post('/edit/:id', userController.update);

module.exports = router;
