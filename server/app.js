'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");

app.set("views", "./server/views");
app.set("view engine", "jade");

var accessLogStream = fs.createWriteStream(__dirname + '/../access.log', {flags: 'a'});
app.use(require("morgan")("combined", {stream: accessLogStream}));

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/jquery/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log('client connected');
    next();
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

app.listen(3000, () => console.log('listening'));