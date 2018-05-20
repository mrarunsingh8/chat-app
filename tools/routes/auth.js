var express = require('express');
var router = express.Router();

var authModal = require('../modules/auth/authModal');

router.post('/', function(req, res, next) {

    authModal.isAuthenticateUser(req.body).then(function(resp){
    	if(resp.success){
    		res.setHeader('token', resp.token);
    	}
        res.json(resp);
    });
});



module.exports = router;
