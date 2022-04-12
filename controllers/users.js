const User = require("../models/user");
const Player = require("../models/player");
const https = require('https');

function index(req, res) {
    console.log(req.user.favoritePlayer);
    res.render('users/index', { title: `favorite players` });
}

function addToFavorites(req, res) {
    console.log('added');
}

module.exports = {
    index,
    addToFavorites
};