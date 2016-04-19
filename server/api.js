'use strict';

var express = require("express");
var rooms = require("./data/rooms.json");
var messages = require("./data/messages.json");
var _ = require("lodash");
var uuid = require("node-uuid");
var users = require("./data/users.json");

var router = express.Router();
module.exports = router;

router.get('/rooms', (req, res) => {
    res.json(rooms);
});