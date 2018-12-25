const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport'),
     LocalStrategy = require('passport-local').Strategy;

process.env.SECRET_KEY  = 'secret';

        passport.use(new LocalStrategy(
            function (email, password, done) {
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
                                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                                    expiresIn: 1440
                                })
                                console.log("bcrypt found match", token)
                                done(null, token);
                            }
                            else {
                                done({error: "User does not exist"})
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
  
  