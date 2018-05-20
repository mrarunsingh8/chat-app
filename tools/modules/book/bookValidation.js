var bookValidation = function(req){
    return new Promise(function (resolve, reject) {
        req.assert('bookname', "Enter valid book name").notEmpty();
        req.assert('authorname', "Enter valid author name").notEmpty();
        req.assert('version', "Enter valid version").notEmpty();
        req.assert('description', "Enter description").notEmpty();
        req.assert('price', "Enter valid price.").notEmpty();

        req.getValidationResult().then(function (errors) {
            resolve(errors.mapped());
        });
    });
}

module.exports = bookValidation;