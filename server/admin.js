'use strict';

var express = require('express');
var uuid = require('node-uuid');
var _ = require('lodash');

var rooms = require('./data/rooms.json');
var bodyParser = require('body-parser');

var router = express.Router();
module.exports = router;

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/rooms', (req, res) => {
    res.render("rooms", {
        title: 'Admin Rooms',
        rooms: rooms,
        active: 'rooms'
    });
});

router.get('/rooms/add', (req, res) => {
    res.render("add-room", {
        title: "Add Room",
        active: 'rooms'
    });
});

router.post('/rooms/add', (req, res) => {
    var room = {
        name: req.body.name,
        id: uuid.v4()
    };

    rooms.push(room);
    res.redirect(req.baseUrl + '/rooms');
});

router.get('/rooms/edit/:id', (req, res) => {
    var roomId = req.params.id;

    // var room = rooms.find(function(val) {
    //     return val.id === roomId
    // });
    var room = _.find(rooms, function (val) {
        return val.id === roomId;
    });
    //console.dir(room);

    res.render('edit-room', {
        title: 'Edit room',
        room: room,
        active: 'rooms'
    });
});

router.post('/rooms/edit/:id', (req, res) => {
    var roomId = req.params.id;
    var room = _.find(rooms, function (val) {
        return val.id === roomId;
    });

    room.name = req.body.name;

    res.redirect(req.baseUrl + '/rooms');
});

router.get('/rooms/delete/:id', (req, res) => {
    var roomId = req.params.id;

    rooms = rooms.filter(val => val.id !== roomId);

    res.redirect(req.baseUrl + '/rooms');
});