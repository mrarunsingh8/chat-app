var multer = require("multer");
var path = require("path");
var crypto = require("crypto");

let storage = multer.diskStorage({
    destination: path.resolve('public/uploads'),
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err);
            cb(null, raw.toString('hex') + path.extname(file.originalname))
        });
    }
});

let multerUploader = multer({ storage: storage });

module.exports = multerUploader;