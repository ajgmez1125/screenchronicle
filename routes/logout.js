var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', (req,res) => {
    req.logout(() => {
        res.redirect('/')
    })
})

module.exports = router;