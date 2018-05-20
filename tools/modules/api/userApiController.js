var userModal = require('../user/userModal');
var paginClass = require('../../lib/paginClass');

userApiController = {
	getList: function(req, res, next){
		let page = (req.query.page || 1);
		let perPage = (req.query.perPage || 10);
		startPage = (page > 1)?((page - 1)*perPage): page-1;
		let dataParams = {page: page, startPage: startPage, perPage: perPage};
		userModal.getAllUser(dataParams).then(function(results){
			let totalCount = (results[0])?(results[0].totalCount || 0):0;
			let dataWithPagin = paginClass(dataParams, results, totalCount);
			return res.json(dataWithPagin);
		}).catch(function (reason) {
		    throw reason;
	    });
	},
	getDetail: function(req, res, next){
		let userId = parseInt(req.params.id);
		if(typeof userId === 'number'){
			userModal.userDetail(userId).then(function(results){
				return res.json({status: 200, error: null, rows: 1, response: results[0]});
			}).catch(function (reason) {
			    throw reason;
	        });
		}else{
			return res.json({status: 200, error: "Please provide a user id."});
		}
	},
	insert: function(req, res, next){
		userModal.AddNewUser(req.body).then(function (results) {
	        return res.json({status: 200, error: null, rows: results.length, response: results});
	    }).catch(function (reason) {
	        throw reason;
	    });
	},
	update: function(req, res, next){
		let userId = parseInt(req.params.id);
	    userModal.UpdateUser(req.body, userId).then(function (results) {
	        return res.json({status: 200, error: null, rows: results.length, response: results});
	    }).catch(function (reason) {
	        throw reason;
	    });
	},
	delete: function(req, res, next){
		let userId = parseInt(req.params.id);
	    userModal.DeleteUser(userId).then(function (results) {
	        return res.json({status: 200, error: null, rows: results.length, response: results});
	    }).catch(function (reason) {
	        throw reason;
	    });
	}
};
module.exports = userApiController;
