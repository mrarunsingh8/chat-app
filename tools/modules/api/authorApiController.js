var authorModel = require('../author/authorModal');
var paginClass = require('../../lib/paginClass');

let authorApiController = {
	getList: function(req, res, next){
		let page = (req.query.page || 1);
		let perPage = (req.query.perPage || 10);
		startPage = (page > 1)?((page - 1)*perPage): page-1;
		let dataParams = {page: page, startPage: startPage, perPage: perPage};
		authorModel.getAllAuthor(dataParams).then(function(results){
			let totalCount = (results[0])?(results[0].totalCount || 0):0;
			let dataWithPagin = paginClass(dataParams, results, totalCount);
			return res.json(dataWithPagin);
		}).catch(function (reason) {
		    throw reason;
	    });
	},
	getDetail: function(req, res, next){
		let authorId = parseInt(req.params.id);
		if(typeof authorId === 'number'){
			authorModel.authorDetail(authorId).then(function(results){
				return res.json({status: 200, error: null, rows: 1, response: results[0]});
			}).catch(function (reason) {
			    throw reason;
	        });
		}else{
			return res.json({status: 200, error: "Please provide a author id."});
		}
	},
	insert: function(req, res, next){
		authorModel.AddNewAuthor(req.body).then(function (results) {
	        return res.json({status: 200, error: null, rows: results.length, response: results});
	    }).catch(function (reason) {
	        throw reason;
	    });
	},
	update: function(req, res, next){
		let authorId = parseInt(req.params.id);
	    authorModel.UpdateAuthor(req.body, authorId).then(function (results) {
	        return res.json({status: 200, error: null, rows: results.length, response: results});
	    }).catch(function (reason) {
	        throw reason;
	    });
	},
	delete: function(req, res, next){
		let authorId = parseInt(req.params.id);
	    authorModel.DeleteAuthor(authorId).then(function (results) {
	        return res.json({status: 200, error: null, rows: results.length, response: results});
	    }).catch(function (reason) {
	        throw reason;
	    });
	}
};

module.exports = authorApiController;
