var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var user = require('../models/user');

router.get('/', (req, res) => {
    res.render('login');
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//create user.comparePassword(password) & user.findOne(username)
//in comparePassword, use bcrypt

passport.use(new localStrategy((username, password, done) => {
    return user.findOne(username).then((user) => {
        if (!user) {
            return done(null, false, {message: 'Username Not Found'});
        } 

        return user.comparePassword(password);
    }).then((result)=>{
        if(result)
            return done(null, ??);
    }).catch((err) => {
        return done(err);
    });
}));

router.post('/', passport.authenticate('local', {successRedirect:'/', failureRedirect:'/login', failureFlash: true}), (req, res) => {

});

module.exports = router;