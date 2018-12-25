const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport'),
     LocalStrategy = require('passport-local').Strategy;

process.env.SECRET_KEY  = 'secret';

module.exports = function(app){

    app.get('/api/users', (req, res) => {

        User.find()
            .sort({date: -1})
            .then(users => res.json(users));
    });

    app.post('/api/users', (req, res) => {

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });
        newUser.save()
               .then(users => res.json(users));
    });

    app.post('/login', (req, res, next) => {
        try {
        return passport.authenticate(
            'jimmy',
            {successRedirect: '/',
            failureRedirect: '/login'})(req, res, next)
        } catch(e) {
            res.send(e.message);
        }
    }
        
    )

    app.get('/api/profile', (req, res) => {
        var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

        User.findOne({
            _id: decoded._id
        })
            .then(user => {
                if (user){
                    res.json(user)
                }
                else {
                    res.send("User does not exist")
                }
            })
            .catch(err => {
                res.send('error: ' + err)
            })
    })

};