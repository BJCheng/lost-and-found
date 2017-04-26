var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var userModel = require('../models/user');

router.get('/', (req, res) => {
    res.render('login');
});

passport.serializeUser(function (user, done) {
    return done(null, user.email);
});

passport.deserializeUser(function (name, done) {
    return userModel.findUserByNameOrEmail(name).then((user)=>{
        return done(null, user);
    }).catch((err)=>{
        return done(err, null);
    });
});

//in comparePassword, use bcrypt
//passport flash nor showing

passport.use(new localStrategy((username, password, done) => {
    // change username to email
    return userModel.findUserByNameOrEmail(username).then((user) => {
        if (!user) 
            return done(null, false, { message: 'Username Not Found' });
        
        return userModel.confirmPassword(user, password).then((user)=>{
            if(!user)
               return done(null, false, { message: 'Username Not Found' }); 
            else
                return done(null, user);
        });
    }).catch((err) => {
        done(err);
    });
}));

router.post('/', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }), (req, res) => {
    req.flash('success_msg', 'Successed');
    res.redirect('/');
});

module.exports = router;