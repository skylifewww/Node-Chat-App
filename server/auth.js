var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get('/login', function (req, res) {
    //console.log(flash('error'));
    res.render('login', {message: req.flash('error')});
});

router.post("/login", function(req, res, next) {
    var pattern = /^\s*$/;
    if (pattern.test(req.body.username) || pattern.test(req.body.password)) {
        res.render('login', {message: 'Please enter a username and password'});
    } else {
        next();
    }
}, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash : true
}));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});

module.exports = router;