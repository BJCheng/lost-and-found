var express = require('express');
var router = express.Router();
var user = require('../models/user');

router.get('/', (req, res) => {
    res.render('register');
});
router.post('/', (req, res) => {
    res.send(JSON.stringify(req.body));
    req.checkBody('name', 'User name is empty.').notEmpty();
    req.checkBody('phone', 'Mobile phone number is empty.').notEmpty();
    req.checkBody('phone', 'Mobile phone number has wrong format.').isMobilePhone('en-US');
    req.checkBody('email', 'E-mail address is empty.').notEmpty();
    req.checkBody('email', 'E-mail address format.').isEmail();
    req.checkBody('password', 'Password is empty').notEmpty();
    req.checkBody('password2', 'Passwords are not matched').equals(req.body.password);

    let errors = req.validationErrors();
    if (errors) {
        res.render('register', { errors: errors });
    } else {
        // calling model to save info into db
        let info = {
            'name': req.body.name,
            'phone': req.body.phone,
            'email': req.body.email,
            'pwd': req.body.password,
        };
        user.insertOne(info).then((result) => {
            if (result.ok < 1) throw (insertResult)
            req.flash('success_msg', 'You Are Now Registered');
            res.redirect('login');  //用render會沒有flash message
        }).catch((err) => {
            req.flash('err_msg', 'Register faild because: ' + err);
            res.redirect('register');  //用render會沒有flash message
        });
    }
});

module.exports = router;