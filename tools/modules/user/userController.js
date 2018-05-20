var userModal = require('./userModal');
var userValidation = require('./userValidation');

var userController = {
    getList: function (req, res, next) {
        userModal.getAllUser().then(function (results) {
            return res.render('modules/user/index', {userData: results});
        }).catch(function (reason) {
            throw reason;
        });
    },

    getDetail: function (req, res, next) {
        var userId = parseInt(req.params.id);
        if (typeof userId === 'number') {
            userModal.userDetail(userId).then(function (results) {
                return res.render('modules/user/form', {userData: results[0]});
            }).catch(function (reason) {
                throw reason;
            });
        } else {
            return res.json({status: 200, error: "Please provide a user id."});
        }
    },

    add: function (req, res, next) {
        if(req.method == 'POST'){
            userValidation(req).then(function (formError) {
                if(typeof formError === 'object' && !Object.keys(formError).length){
                    userModal.AddNewUser(req.body).then(function (results) {
                        return res.redirect("/user");
                    });
                }else{
                    res.render('modules/user/form', {userData: req.body, formError: formError});//
                }
            });
        }else{
            res.render("modules/user/form", {formError: {}});
        }
    },

    update: function (req, res, next) {
        var userId = parseInt(req.params.id);
        userValidation(req).then(function (formError) {
            if(typeof formError === 'object' && !Object.keys(formError).length){
                userModal.UpdateUser(req.body, userId).then(function (results) {
                    return res.redirect('/user');
                }).catch(function (reason) {
                    throw reason;
                });
            }else{
                res.render('modules/user/form', {userData: req.body, formError: formError});
            }
        });
    },

    delete: function (req, res, next) {
        var userId = parseInt(req.params.id);
        userModal.DeleteUser(userId).then(function (results) {
            return res.redirect('/user');
        }).catch(function (reason) {
            throw reason;
        });
    },

};

module.exports = userController;