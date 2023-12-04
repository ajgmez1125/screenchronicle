var express = require('express');
var router = express.Router();

router.route('/')
    .get(function(req,res){
        res.render('register');
    })
    .post(function(req,res){
        res.redirect('/login');
    });

module.exports = router;