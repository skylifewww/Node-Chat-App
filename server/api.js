'use strict';

var express = require("express");
var _ = require("lodash");
var uuid = require("node-uuid");
var bodyParser = require('body-parser');

var rooms = require("./data/rooms.json");
var messages = require("./data/messages.json");
var users = require("./data/users.json");


var router = express.Router();
module.exports = router;

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/rooms', (req, res) => {
    res.json(rooms);
});

router.route('/rooms/:roomId/messages')
    .get((req, res) => {
        var roomId = req.params.roomId;

        var msgs = messages.filter((msg) => {
            return msg.roomId === roomId;
        });

        var room = _.find(rooms, function (val) {
            return val.id === roomId;
        });

        var data = {
            messages: msgs,
            room: room
        };

        res.json(data);
    })
    .post((req, res) => {
        var roomId = req.params.roomId;

        var room = _.find(rooms, function (val) {
            return val.id === roomId;
        });

        // var msgs = messages.filter((msg) => {
        //     return msg.roomId === roomId;
        // });

        var message = {
            text: req.body.text,
            roomId: roomId,
            userId: '44f885e8-87e9-4911-973c-4074188f408a',
            id: uuid.v4()
        };

        messages.push(message);

        res.sendStatus(200);
    })
    .delete((req, res) => {

        var roomId = req.params.roomId;

        messages = messages.filter(val => val.roomId !== roomId);

        res.sendStatus(200);
    });