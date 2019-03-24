const User = require('../../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

process.env.SECRET_KEY = 'secret';

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (_id, done) {
    User
        .findById(_id, function (err, user) {
            done(err, user);
        });
});

passport.use("jimmy", new LocalStrategy({
    usernameField: 'email'
}, function (email, password, done) {
    User
        .findOne({email: email})
        .then(user => {
            if(!user){
                done(new Error("email don't exist"));
                return;
            }
            console.log("user Found", user)
            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    done(null, user);
                } else {
                    done(new Error("password don't match!"))
                }
            } else {
                done({error: "User does not exist"})
            }
        })
        .catch(err => {
            done('error: ' + "user don't exist")
            console.log("failed 3")
        })
}))
