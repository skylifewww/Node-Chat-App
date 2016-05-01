'use strict';

var express = require('express');
var app = express();
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var passport = require('passport');

var rooms = require('./data/rooms.json');

app.set("views", "./server/views");
app.set("view engine", "jade");

// serve static assets
app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/jquery/dist'));

//logging
app.use(require('./logging'));
require('express-debug')(app, {});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// passport
require('./passport-init');
app.use(require('express-session')({
    secret: 'keyboard cat', resave: false, saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use((req, res, next) => {
    console.log('client connected');
    next();
});

var authRouter = require('./auth');
app.use(authRouter);

app.use((req, res, next) => {
    if (req.isAuthenticated()) {
        next();
        return;
    }
    res.redirect('/login');
});

app.get('/', (req, res) => {
    res.render("home", { title: 'Home', active: 'home' });
});

var apiRouter = require('./api');
app.use("/api", apiRouter);

var adminRouter = require('./admin');
app.use("/admin", adminRouter);

app.use(function(req, res, next){
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.render('404', { url: req.url });
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});

app.listen(3000, () => console.log('listening on port ' + process.env.port));

