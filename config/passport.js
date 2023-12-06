const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = (passport) => {
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
            //Find user given query
            User.findOne({email: email})
                .then((user) => {
                    if(!user){
                        return done(null, false, {message: "There is no user associated with that email"})
                    }
                    //If username is found, bcrypt is used to verify password
                    bcrypt.compare(password, user.password, (err, match) => {
                        if(err)
                        {
                            return(err)
                        }

                        if(match)
                        {
                            console.log('correct password')
                            return done(null, user)
                        }
                        else
                        {
                            return done(null, false, {message: "Incorrect password"})
                        }
                    })
            })
            .catch((err) => {
                console.log('err')
            })
    }))
        passport.serializeUser((user, done) => {
            done(null, user.id)
        });

        passport.deserializeUser((id, done) => {
            User.findById(id)
            .then(user => {
                done(null, user)
            })
            .catch((error) => {
                done(error, false);
            })
        });
}