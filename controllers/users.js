const User = require("../models/user");
const Player = require("../models/player");
const https = require('https');

function index(req, res) {
    console.log(req.user);
    res.render('users/index', { title: `favorite players` });
}

module.exports = {
    index
};