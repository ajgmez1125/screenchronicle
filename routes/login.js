var express = require('express');
var router = express.Router();
const passport = require('passport');
require('../config/passport')(passport)

router.route('/')
    .get(function(req, res, next){
        res.render('login');
    })
    .post(passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureMessage: true
    }));

module.exports = router;