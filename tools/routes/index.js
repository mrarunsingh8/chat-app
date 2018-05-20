var express = require('express');
var router = express.Router();
var multerUploader = require("../lib/multerUploader");

var db = require('../lib/dbConfig');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/upload', multerUploader.single('file'), async(req, res) => {
    let fileData = {
        fieldname: req.file.fieldname,
        originalname : req.file.originalname,
        mimetype : req.file.mimetype,
        filename : req.file.filename,
        size : req.file.size,
    };
    return res.send({status:200, error: null, fileData: fileData});
});

module.exports = router;
