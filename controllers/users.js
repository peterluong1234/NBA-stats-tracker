const User = require("../models/user");
const Player = require("../models/player");
const request = require("request");
// const { request } = require("../server");

const rootURL = 'https://www.balldontlie.io/api/v1'


async function index(req, res) {
    // I want to display the user's favorite players
    // 1. find players who contain userId
    const foundPlayers = await Player.find({ usersFavorited: req.user._id });

    await res.render('users/index', { title: `favorite players`, foundPlayers: foundPlayers});
}

module.exports = {
    index,
    // addToFavorites
};