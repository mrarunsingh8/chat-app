var express = require("express");

var router = express.Router();

router.get("/", function (req, res, next) {
    res.render("partial/login", {layout: 'login-layout.ejs'});
});

module.exports = router;