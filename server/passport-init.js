var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var users = require("./data/users.json");
var _ = require("lodash");

passport.use(new LocalStrategy(function(username, password, done){
    var user = _.find(users, u => u.name === username);
    console.log(username, password);
    if(!username || !password || !user || user.password !== password){
        console.log('NOPE!');
        return done(null, false, {message: 'Username and password don\'t match'});
    }

    done(null, user);
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
