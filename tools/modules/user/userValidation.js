var userValidation = function(req){
    return new Promise(function (resolve, reject) {
        req.assert('name', "Enter valid name").notEmpty();
        req.assert('email', "Enter valid email").isEmail();
        req.assert('username', "Enter valid username").notEmpty();
        req.assert('contact', "Enter valid contact.").notEmpty();

        req.getValidationResult().then(function (errors) {
            resolve(errors.mapped());
        });
    });
}

module.exports = userValidation;