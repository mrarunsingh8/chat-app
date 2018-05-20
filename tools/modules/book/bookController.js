var bookModal = require("./bookModal");
var bookValidation = require('./bookValidation');
var path = require("path");

var bookController ={
    
    getList: function (req, res, next) {
        bookModal.getAllBook().then(function (results) {
            return res.render('modules/book/index', {bookData: results});
        }).catch(function (reason) {
            throw reason;
        });
    },

    getDetail: function (req, res, next) {
        var bookId = parseInt(req.params.id);
        if (typeof bookId === 'number') {
            bookModal.bookDetail(bookId).then(function (results) {
                return res.render('modules/book/form', {bookData: results[0]});
            }).catch(function (reason) {
                throw reason;
            });
        } else {
            return res.json({status: 200, error: "Please provide a Book id."});
        }
    },
    
    add: function (req, res, next) {
        if(req.method === "POST"){
            bookValidation(req).then(function (formError) {
                if(typeof formError === 'object' && !Object.keys(formError).length){
                    bookModal.AddNewBook(req.body).then(function (results) {
                        res.redirect("/book");
                    });
                }else{
                    res.render('modules/book/form', {bookData: req.body, formError: formError});
                }
            });
        }else{
            res.render("modules/book/form", {bookData:{}});
        }
    },

    update: function (req, res, next) {
        var bookId = parseInt(req.params.id);
        bookValidation(req).then(function (formError) {
            if(typeof formError === 'object' && !Object.keys(formError).length){
                bookModal.UpdateBook(req.body, bookId).then(function (results) {
                    return res.redirect('/book');
                }).catch(function (reason) {
                    throw reason;
                });
            }else{
                res.render('modules/book/form', {bookData: req.body, formError: formError});
            }
        });
    },

    delete: function (req, res, next) {
        var bookId = parseInt(req.params.id);
        bookModal.DeleteBook(bookId).then(function (results) {
            return res.redirect('/book');
        }).catch(function (reason) {
            throw reason;
        });
    },
    
    upload: function (req, res, next) {
        console.log(req.file);
        res.send(path);
    }
} 

module.exports = bookController;