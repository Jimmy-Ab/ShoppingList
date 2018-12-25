const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport'),
     LocalStrategy = require('passport-local').Strategy;

process.env.SECRET_KEY  = 'secret';

passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function(_id, done) {
    User.findById(_id, function(err, user) {
      done(err, user);
    });
  });


        passport.use("jimmy", new LocalStrategy({usernameField: 'email'},
            function (email, password, done) {
                console.log("sfsdkksjd");
                User.findOne({
                    email: email
                })
                    .then(user => {
                        console.log("user Found", user)
                        if (user){
                            if (bcrypt.compareSync(password, user.password)){
                                const payload = {
                                    _id: user._id,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    email: user.email
                                }
                                console.log("bcrypt found match", token)
                                user.token = token
                                done(null, user);
                            }
                        else {
                                done(new Error("User does not exist"))
                                console.log("failed one")
                            }
                        }
                        else {
                            done({error: "User does not exist"})
                            console.log("failed 2")
                        }
                    })
                    .catch(err => {
                        done('error: ' + err)
                        console.log("failed 3")
                    })
            }
        ))
  
  