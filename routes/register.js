var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')

const { check, validationResult } = require('express-validator')

let User = require('../models/user')

router.route('/')
    .get(function(req,res){
        res.render('register');
    })
    .post(
        check("username", "Username is required").notEmpty(),
        check("password", "Password is required").notEmpty(),
        check("email", "Email is required").notEmpty(),
        (req,res) => {

            const errors = validationResult(req)

            if(errors.isEmpty())
            {
                let { username, password, email } = req.body

                let user = new User({
                    username: username,
                    email: email
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hashed) => {
                        if(err)
                        {
                            console.log(err)
                        }
                        else
                        {
                            user.password = hashed
                            user.save()
                            res.redirect("/login")
                        }
                    }
                )})
            }
            else{
                res.render("register", {errors: errors.array()})
            }
        }
    );

module.exports = router;