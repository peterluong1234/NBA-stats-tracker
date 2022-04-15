const User = require("../models/user");
const Player = require("../models/player");
const Team = require("../models/team");
const request = require("request");
// const { request } = require("../server");

const rootURL = 'https://www.balldontlie.io/api/v1'


async function index(req, res) {
    // I want to display the user's favorite players
    // 1. find players who contain userId
    // const foundPlayers = await Player.find({ usersFavorited: req.user._id });

    // await res.render('users/index', { title: `favorite players`, foundPlayers: foundPlayers});
    let userId = req.user;
    if (userId == undefined) {
        res.redirect('/auth/google')
    }
    else {
    // await Player.find({ usersFavorited: req.user._id },function(err, foundPlayers) {
    //     if (err) {
    //         res.render('users/index', { title: `favorite players`})
    //     }
    //     else {
    //     res.render('users/index', { title: `favorite players`, foundPlayers: foundPlayers});}
    // })
        
    await Player.find({ usersFavorited: req.user._id },function(err, foundPlayers) {
        if (err) {
            res.render('users/index', { title: `favorite players`})
        }
        else {
            Team.find({ usersFavorited: req.user._id }, function(err, foundTeams) {
                if(err) {
                    res.render('users/index', { title: `favorite players`, foundPlayers: foundPlayers});
                }
                else {
                    res.render('users/index', { title: `favorite players`, foundPlayers: foundPlayers, foundTeams: foundTeams});
                }
            })
        
        }
    })
    }
}

module.exports = {
    index,
    // addToFavorites
};