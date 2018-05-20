var bookModal = require('../book/bookModal');
var paginClass = require('../../lib/paginClass');

const bookApiController = {
	getList : function(req, res, next){
		let page = (req.query.page || 1);
		let perPage = (req.query.perPage || 10);
		startPage = (page > 1)?((page - 1)*perPage): page-1;
		let dataParams = {page: page, startPage: startPage, perPage: perPage};
		bookModal.getAllBook(dataParams).then(function (results) {
			results = results.filter(function(item){
				return item.image = '//'+req.headers.host+'/uploads/'+item.image;
			});
			let totalCount = (results[0])?(results[0].totalCount || 0):0;
			let dataWithPagin = paginClass(dataParams, results, totalCount);
			return res.json(dataWithPagin);
	        //return res.json({status: 200, error: null, rows: results.length, response: results});
	    }).catch(function (reason) {
	        throw reason;
	    });
	},
	getDetail: function(req, res, next){
		let bookId = parseInt(req.params.id);
		if(typeof bookId === 'number'){
		    bookModal.bookDetail(bookId).then(function(result){
	            return res.json({status: 200, error: null, rows: 1, response: result[0]});
	        }).catch(function(err){
	            throw err;
	        });
		}else{
			return res.json({status: 200, error: "Please provide a book id."});
		}
	},
	insert: function(req, res, next){
		bookModal.AddNewBook(req.body).then(function (results) {
	        return res.json({status: 200, error: null, rows: results.length, response: results});
	    }).catch(function (reason) {
	        throw reason;
	    });
	},
	update: function(req, res, next){
		let bookId = parseInt(req.params.id);
	    bookModal.UpdateBook(req.body, bookId).then(function (results) {
	        return res.json({status: 200, error: null, rows: results.length, response: results});
	    }).catch(function (reason) {
	        throw reason;
	    });
	},
	delete: function(req, res, next){
		let bookId = parseInt(req.params.id);
	    bookModal.DeleteBook(bookId).then(function (results) {
	        return res.json({status: 200, error: null, rows: results.length, response: results});
	    }).catch(function (reason) {
	        throw reason;
	    });
	}
};

module.exports = bookApiController;
